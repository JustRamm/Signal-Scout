import React, { useState, useEffect, useRef } from 'react';
import { SCENARIOS } from '../data/signalScoutData';
import TutorialScreen from './TutorialScreen';
import RegistrationScreen from './RegistrationScreen';
import GameView from './GameView';
import GameOverScreen from './GameOverScreen';
import PauseOverlay from '../components/PauseOverlay';
import RatingScreen from './RatingScreen';
import FinalCompletionScreen from './FinalCompletionScreen';


const SignalScoutScreen = ({ audioManager, onExit, isPaused: externalPaused = false }) => {
    // Game State
    const [gameState, setGameState] = useState('REGISTRATION'); // REGISTRATION, INTRO, PLAYING, SUCCESS, END, RATING, COMPLETED
    const [player, setPlayer] = useState(null);
    const [score, setScore] = useState(0);
    const [gameProgress, setGameProgress] = useState(20); // 0 to 100
    const [mistakes, setMistakes] = useState(0);
    const [people, setPeople] = useState([]);
    const [feedback, setFeedback] = useState(null);
    const [paused, setPaused] = useState(false);

    // Refs
    const usedScenarioIdsRef = useRef(new Set());
    const spawnTimerRef = useRef(null);

    // --- Music & Ambient Logic ---
    useEffect(() => {
        if (!audioManager) return;

        if (gameState === 'REGISTRATION' || gameState === 'INTRO') {
            audioManager.playMenuMusic();
        } else if (gameState === 'COMPLETED') {
            audioManager.playVictory();
        }
    }, [gameState, audioManager]);

    // --- Asset Mapping ---
    const getStickmanAsset = (category) => {
        const assets = {
            'Youth': ['/stickman_assets/stickman_laptop.svg', '/stickman_assets/stickman_phone.svg', '/stickman_assets/thinking_stickman.svg', '/stickman_assets/girl_idle.svg'],
            'Elderly': ['/stickman_assets/sad_stickman.svg', '/stickman_assets/empty_stickman.svg', '/stickman_assets/stickman_group.svg'],
            'Men': ['/stickman_assets/guy_distressed.svg', '/stickman_assets/guy_idle.svg', '/stickman_assets/guy_walk_right.svg', '/stickman_assets/stickman_phone.svg'],
            'Women': ['/stickman_assets/girl_walk_right.svg', '/stickman_assets/girl_idle.svg', '/stickman_assets/thinking_stickman.svg', '/stickman_assets/dog_walker.svg']
        };

        const categoryAssets = assets[category] || assets['Youth'];
        return categoryAssets[Math.floor(Math.random() * categoryAssets.length)];
    };

    // --- Game Engine Logic ---

    const startGame = () => {
        setGameState('PLAYING');
        setScore(0);
        setGameProgress(20);
        setMistakes(0);
        setPeople([]);
        setPaused(false);
        usedScenarioIdsRef.current = new Set();
    };

    const handleRegister = (data) => {
        const playerRecord = {
            name: data.name,
            age: parseInt(data.age),
            gender: data.gender,
            field_of_study: data.fieldOfStudy,
            has_prior_training: data.hasPriorTraining,
            university: data.university,
            college: data.college,
            state: data.state,
            score: 0,
            mistakes: 0,
            created_at: new Date().toISOString()
        };

        setPlayer(playerRecord);
        setGameState('INTRO');
        if (audioManager) audioManager.playConfirm();
    };

    const endGame = (finalProgress) => {
        const isSuccess = finalProgress >= 100;
        setGameState(isSuccess ? 'SUCCESS' : 'END');

        if (isSuccess && audioManager) audioManager.playVictory();
        else if (audioManager) audioManager.playGameOver();
    };

    const handleRatingSubmit = (rating, userFeedback) => {
        setGameState('COMPLETED');
    };

    const restartGame = () => {
        setGameState('REGISTRATION');
        setPlayer(null);
        setScore(0);
        setMistakes(0);
        setGameProgress(20);
        setPeople([]);
        if (audioManager) audioManager.playConfirm();
    };

    const togglePause = () => {
        if (gameState !== 'PLAYING') return;
        setPaused(prev => !prev);
        if (audioManager) audioManager.playPop();
    };

    useEffect(() => {
        if (gameState !== 'PLAYING' || externalPaused || paused) return;
        if (gameProgress >= 100) endGame(100);
        else if (gameProgress <= 0) endGame(0);
    }, [gameProgress, gameState]);

    useEffect(() => {
        if (gameState !== 'PLAYING' || externalPaused || paused) {
            if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
            return;
        }

        const spawnPair = () => {
            setPeople(currentPeople => {
                const centerOccupied = currentPeople.some(p => p.x > 10 && p.x < 90 && !p.isClicked);
                if (centerOccupied || currentPeople.length >= 2) return currentPeople;

                const riskScenarios = SCENARIOS.filter(s => s.type === 'risk' && !usedScenarioIdsRef.current.has(s.id));
                const safeScenarios = SCENARIOS.filter(s => s.type === 'safe' && !usedScenarioIdsRef.current.has(s.id));

                if (riskScenarios.length === 0 || safeScenarios.length === 0) {
                    usedScenarioIdsRef.current = new Set();
                    return currentPeople;
                }

                const risk = riskScenarios[Math.floor(Math.random() * riskScenarios.length)];
                const safe = safeScenarios[Math.floor(Math.random() * safeScenarios.length)];

                usedScenarioIdsRef.current.add(risk.id);
                usedScenarioIdsRef.current.add(safe.id);

                const riskFromLeft = Math.random() > 0.5;
                const lanes = [71, 74, 77].sort(() => Math.random() - 0.5);

                const pair = [
                    {
                        uid: Date.now() + 1,
                        data: risk,
                        x: riskFromLeft ? -35 : 135,
                        y: lanes[0],
                        direction: riskFromLeft ? 1 : -1,
                        baseSpeed: 0.045,
                        asset: getStickmanAsset(risk.category),
                        isClicked: false
                    },
                    {
                        uid: Date.now() + 2,
                        data: safe,
                        x: riskFromLeft ? 135 : -35,
                        y: lanes[1],
                        direction: riskFromLeft ? -1 : 1,
                        baseSpeed: 0.045,
                        asset: getStickmanAsset(safe.category),
                        isClicked: false
                    }
                ];

                return [...currentPeople, ...pair];
            });
        };

        if (people.length === 0) spawnPair();
        spawnTimerRef.current = setInterval(spawnPair, 1000);
        return () => clearInterval(spawnTimerRef.current);
    }, [gameState, externalPaused, paused, people.length]);

    const stepCountRef = useRef(0);
    useEffect(() => {
        if (gameState !== 'PLAYING' || externalPaused || paused) return;

        const interval = setInterval(() => {
            stepCountRef.current = (stepCountRef.current + 1) % 18;
            const shouldStep = stepCountRef.current === 0;

            setPeople(prev => {
                if (shouldStep && audioManager && prev.some(p => !p.isClicked)) {
                    audioManager.playRunStep();
                }
                return prev.map(p => {
                    const distFromCenter = Math.abs(p.x - 50);
                    const exitBoost = p.isClicked ? 20 : 1;
                    const speedMult = p.isClicked ? 1 : (1 + Math.pow(Math.max(0, distFromCenter - 10) / 12, 2.5) * 8);

                    return {
                        ...p,
                        x: p.x + (p.baseSpeed * speedMult * exitBoost * p.direction)
                    };
                }).filter(p => p.x > -50 && p.x < 150);
            });
        }, 16);

        return () => clearInterval(interval);
    }, [gameState, externalPaused, paused, audioManager]);


    const handlePersonClick = (person) => {
        if (person.isClicked || gameState !== 'PLAYING' || externalPaused || paused) return;

        setPeople(prev => prev.map(p => ({ ...p, isClicked: true })));
        if (audioManager) audioManager.playZoom();

        if (person.data.type === 'risk') {
            if (audioManager) audioManager.playDing();
            setScore(prev => prev + 100);
            setGameProgress(prev => Math.min(100, prev + 12));
            setFeedback({
                text: `Signal Found: ${person.data.clue}`,
                desc: "This is a cry for help. Identifying these early is key to saving a life.",
                type: 'good',
                x: person.x,
                y: person.y,
                score: '+100'
            });
        } else {
            if (audioManager) audioManager.playSad();
            setScore(prev => Math.max(0, prev - 50));
            setMistakes(prev => prev + 1);
            setGameProgress(prev => Math.max(0, prev - 20));
            setFeedback({
                text: "Normal Stress",
                desc: "This person is expressing regular daily challenges, not a crisis.",
                type: 'bad',
                x: person.x,
                y: person.y,
                score: '-50'
            });
        }

        setTimeout(() => setFeedback(null), 2000);
    };

    return (
        <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col overflow-hidden font-sans select-none text-white">

            {gameState === 'REGISTRATION' && (
                <RegistrationScreen onRegister={handleRegister} audioManager={audioManager} />
            )}

            {gameState === 'INTRO' && <TutorialScreen onStart={startGame} />}

            {gameState === 'PLAYING' && (
                <GameView
                    score={score}
                    gameProgress={gameProgress}
                    people={people}
                    feedback={feedback}
                    onPersonClick={handlePersonClick}
                    onExit={onExit}
                    onTogglePause={togglePause}
                    isPaused={paused}
                    audioManager={audioManager}
                />
            )}

            {(gameState === 'END' || gameState === 'SUCCESS') && (
                <GameOverScreen
                    score={score}
                    isSuccess={gameState === 'SUCCESS'}
                    onPlayAgain={startGame}
                    onNext={() => setGameState('RATING')}
                    onExit={onExit}
                />
            )}

            {gameState === 'RATING' && (
                <RatingScreen onSubmit={handleRatingSubmit} audioManager={audioManager} />
            )}

            {gameState === 'COMPLETED' && (
                <FinalCompletionScreen onRestart={restartGame} onExit={onExit} />
            )}

            {paused && <PauseOverlay onResume={togglePause} />}

        </div>
    );
};

export default SignalScoutScreen;
