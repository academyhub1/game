// =====================================================
// SOLIDWORKS ARENA - Arcade Game Engine
// Professional Arcade Game Implementation
// =====================================================

// ==================== GAME STATE ====================
const GameState = {
    // Current state
    screen: 'insert-coin',
    mode: null, // 'easy' or 'hard'

    // Questions
    questionsBank: [],
    currentQuestions: [],
    currentIndex: 0,
    selectedAnswer: null,

    // Game stats
    score: 0,
    lives: 3,
    maxLives: 3,
    combo: 0,
    maxCombo: 0,
    level: 1,
    correctCount: 0,
    wrongCount: 0,

    // Timer
    timeLimit: 15,
    timeRemaining: 15,
    timerInterval: null,

    // Config
    questionCount: 30,
    pointsPerCorrect: 100,
    pointsPerWrong: -50,
    comboMultipliers: {
        2: 1.5,
        5: 2,
        10: 3,
        15: 4
    },

    // Ranking
    rankings: []
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🎮 SOLIDWORKS ARENA - Iniciando...');

    // Load questions
    await loadQuestions();

    // Load rankings from localStorage
    loadRankings();
    displayTopScores();

    // Setup event listeners
    setupEventListeners();

    console.log('✅ Jogo pronto!');
});

// ==================== QUESTION MANAGEMENT ====================
async function loadQuestions() {
    try {
        const response = await fetch('data/questions.json');
        const data = await response.json();
        GameState.questionsBank = data.questions;
        console.log(`✅ ${GameState.questionsBank.length} questões carregadas!`);
        return true;
    } catch (error) {
        console.error('❌ Erro ao carregar questões:', error);
        alert('Erro ao carregar banco de questões!');
        return false;
    }
}

function selectRandomQuestions(count) {
    const shuffled = [...GameState.questionsBank].sort(() => Math.random() - 0.5);
    GameState.currentQuestions = shuffled.slice(0, count);
    console.log(`🎲 ${GameState.currentQuestions.length} questões selecionadas`);
}

// ==================== SCREEN MANAGEMENT ====================
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    const screen = document.getElementById('screen-' + screenId);
    if (screen) {
        screen.classList.add('active');
        GameState.screen = screenId;

        // Screen-specific actions
        if (screenId === 'gameplay') {
            startTimer();
        }
    }
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
    // Mode selection buttons
    document.querySelectorAll('.arcade-button[data-mode]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const mode = btn.dataset.mode;
            startGame(mode);
        });
    });

    // Game over buttons
    document.getElementById('btn-play-again').addEventListener('click', () => {
        startGame(GameState.mode);
    });

    document.getElementById('btn-menu').addEventListener('click', () => {
        showScreen('insert-coin');
        resetGame();
    });
}

// ==================== GAME START ====================
function startGame(mode) {
    console.log(`🎮 Iniciando modo: ${mode}`);

    GameState.mode = mode;
    resetGame();

    // Configure based on mode
    if (mode === 'easy') {
        GameState.questionCount = 30;
        GameState.lives = 3;
        GameState.maxLives = 3;
    } else {
        GameState.questionCount = 50;
        GameState.lives = 1;
        GameState.maxLives = 1;
    }

    // Select questions
    selectRandomQuestions(GameState.questionCount);

    // Show gameplay screen
    showScreen('gameplay');

    // Load first question
    loadQuestion();

    // Play start sound effect (visual)
    visualSoundEffect('START');
}

function resetGame() {
    GameState.currentIndex = 0;
    GameState.score = 0;
    GameState.lives = GameState.maxLives;
    GameState.combo = 0;
    GameState.maxCombo = 0;
    GameState.level = 1;
    GameState.correctCount = 0;
    GameState.wrongCount = 0;
    GameState.selectedAnswer = null;

    // Clear timer
    if (GameState.timerInterval) {
        clearInterval(GameState.timerInterval);
    }

    updateHUD();
}

// ==================== QUESTION LOADING ====================
function loadQuestion() {
    const question = GameState.currentQuestions[GameState.currentIndex];

    // Update HUD
    updateHUD();
    updateProgressBar();

    // Update category
    document.getElementById('category-display').textContent = question.category.toUpperCase();

    // Update question text
    document.getElementById('question-text').textContent = question.question;

    // Clear previous options
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    // Create option buttons
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-button';
        btn.textContent = option;
        btn.dataset.index = index;

        btn.addEventListener('click', () => selectOption(index, btn));

        optionsContainer.appendChild(btn);
    });

    // Reset timer
    GameState.timeRemaining = question.timeLimit || GameState.timeLimit;
    resetTimer();

    // Reset selection
    GameState.selectedAnswer = null;

    // Visual effect
    createParticles(10, 'load');
}

// ==================== OPTION SELECTION ====================
function selectOption(index, btnElement) {
    // Remove previous selection
    document.querySelectorAll('.option-button').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Select new option
    btnElement.classList.add('selected');
    GameState.selectedAnswer = index;

    // Auto-confirm after 0.5s
    setTimeout(() => {
        if (GameState.selectedAnswer === index) {
            confirmAnswer();
        }
    }, 500);
}

// ==================== ANSWER CONFIRMATION ====================
function confirmAnswer() {
    if (GameState.selectedAnswer === null) return;

    // Stop timer
    stopTimer();

    const question = GameState.currentQuestions[GameState.currentIndex];
    const isCorrect = GameState.selectedAnswer === question.correct;

    // Disable all options
    document.querySelectorAll('.option-button').forEach((btn, idx) => {
        btn.classList.add('disabled');

        // Highlight correct answer
        if (idx === question.correct) {
            btn.classList.add('correct');
        }

        // Highlight wrong answer
        if (idx === GameState.selectedAnswer && !isCorrect) {
            btn.classList.add('wrong');
        }
    });

    // Process answer
    if (isCorrect) {
        handleCorrectAnswer(question);
    } else {
        handleWrongAnswer(question);
    }

    // Update HUD
    updateHUD();

    // Next question after delay
    setTimeout(() => {
        nextQuestion();
    }, 2000);
}

// ==================== CORRECT ANSWER ====================
function handleCorrectAnswer(question) {
    GameState.correctCount++;
    GameState.combo++;

    if (GameState.combo > GameState.maxCombo) {
        GameState.maxCombo = GameState.combo;
    }

    // Calculate points with combo multiplier
    let points = question.points || GameState.pointsPerCorrect;
    let multiplier = 1;

    for (const [threshold, mult] of Object.entries(GameState.comboMultipliers)) {
        if (GameState.combo >= parseInt(threshold)) {
            multiplier = mult;
        }
    }

    const finalPoints = Math.floor(points * multiplier);
    GameState.score += finalPoints;

    // Visual effects
    if (multiplier > 1) {
        showScorePopup(`+${finalPoints}`, 'combo', `${multiplier}x COMBO!`);
        visualSoundEffect('COMBO');
    } else {
        showScorePopup(`+${finalPoints}`, 'positive');
        visualSoundEffect('CORRECT');
    }

    createParticles(20, 'correct');

    // Level up every 5 correct answers
    if (GameState.correctCount % 5 === 0) {
        GameState.level++;
        visualSoundEffect('LEVELUP');
    }
}

// ==================== WRONG ANSWER ====================
function handleWrongAnswer(question) {
    GameState.wrongCount++;
    GameState.combo = 0; // Reset combo
    GameState.lives--;

    // Calculate points loss
    const pointsLost = Math.abs(GameState.pointsPerWrong);
    GameState.score = Math.max(0, GameState.score + GameState.pointsPerWrong);

    // Visual effects
    showScorePopup(`-${pointsLost}`, 'negative');
    visualSoundEffect('WRONG');
    createParticles(15, 'wrong');

    // Update lives display
    updateLives();

    // Check game over
    if (GameState.lives <= 0) {
        setTimeout(() => {
            gameOver();
        }, 2000);
    }
}

// ==================== TIMER SYSTEM ====================
function startTimer() {
    stopTimer(); // Clear any existing timer

    GameState.timerInterval = setInterval(() => {
        GameState.timeRemaining--;
        updateTimerDisplay();

        if (GameState.timeRemaining <= 0) {
            timeOut();
        }
    }, 1000);
}

function stopTimer() {
    if (GameState.timerInterval) {
        clearInterval(GameState.timerInterval);
        GameState.timerInterval = null;
    }
}

function resetTimer() {
    stopTimer();
    updateTimerDisplay();
    startTimer();
}

function timeOut() {
    console.log('⏰ Tempo esgotado!');
    stopTimer();

    // Treat as wrong answer
    GameState.selectedAnswer = -1; // Invalid answer

    // Show timeout message
    showScorePopup('TIME OUT!', 'negative');
    visualSoundEffect('TIMEOUT');

    // Process as wrong
    handleWrongAnswer(GameState.currentQuestions[GameState.currentIndex]);

    // Next question
    setTimeout(() => {
        nextQuestion();
    }, 2000);
}

function updateTimerDisplay() {
    const timerText = document.getElementById('timer-display');
    const timerBar = document.getElementById('timer-bar');
    const question = GameState.currentQuestions[GameState.currentIndex];
    const maxTime = question?.timeLimit || GameState.timeLimit;

    timerText.textContent = GameState.timeRemaining;

    // Update timer bar
    const percentage = (GameState.timeRemaining / maxTime) * 100;
    timerBar.style.width = percentage + '%';

    // Color coding
    timerText.classList.remove('warning', 'critical');
    timerBar.classList.remove('warning', 'critical');

    if (GameState.timeRemaining <= 3) {
        timerText.classList.add('critical');
        timerBar.classList.add('critical');
    } else if (GameState.timeRemaining <= 5) {
        timerText.classList.add('warning');
        timerBar.classList.add('warning');
    }
}

// ==================== HUD UPDATE ====================
function updateHUD() {
    // Score
    document.getElementById('score-display').textContent = String(GameState.score).padStart(6, '0');

    // Level
    document.getElementById('level-display').textContent = String(GameState.level).padStart(2, '0');

    // Combo
    const comboDisplay = document.getElementById('combo-display');
    comboDisplay.textContent = 'x' + GameState.combo;

    if (GameState.combo >= 10) {
        comboDisplay.classList.add('active');
    } else {
        comboDisplay.classList.remove('active');
    }

    // Lives
    updateLives();
}

function updateLives() {
    const livesContainer = document.getElementById('lives-display');
    livesContainer.innerHTML = '';

    for (let i = 0; i < GameState.maxLives; i++) {
        const life = document.createElement('span');
        life.className = 'life-icon';
        life.textContent = '♥';

        if (i >= GameState.lives) {
            life.classList.add('lost');
        }

        livesContainer.appendChild(life);
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');

    const progress = ((GameState.currentIndex + 1) / GameState.currentQuestions.length) * 100;
    progressBar.style.width = progress + '%';

    progressText.textContent = `QUESTÃO ${GameState.currentIndex + 1}/${GameState.currentQuestions.length}`;
}

// ==================== NEXT QUESTION ====================
function nextQuestion() {
    GameState.currentIndex++;

    if (GameState.currentIndex < GameState.currentQuestions.length) {
        loadQuestion();
    } else {
        gameOver();
    }
}

// ==================== GAME OVER ====================
function gameOver() {
    console.log('🎮 GAME OVER!');
    stopTimer();

    // Calculate final grade
    const totalQuestions = GameState.currentQuestions.length;
    const grade = (GameState.correctCount / totalQuestions) * 10;

    // Determine status
    const gameoverStatus = document.getElementById('gameover-status');
    const statusSpan = gameoverStatus.querySelector('.glitch');

    if (grade >= 7.0) {
        statusSpan.textContent = 'VICTORY!';
        statusSpan.dataset.text = 'VICTORY!';
        gameoverStatus.classList.add('victory');
        visualSoundEffect('VICTORY');
    } else {
        statusSpan.textContent = 'GAME OVER';
        statusSpan.dataset.text = 'GAME OVER';
        gameoverStatus.classList.remove('victory');
        visualSoundEffect('GAMEOVER');
    }

    // Update stats
    document.getElementById('final-score').textContent = String(GameState.score).padStart(6, '0');
    document.getElementById('final-correct').textContent = String(GameState.correctCount).padStart(2, '0');
    document.getElementById('final-wrong').textContent = String(GameState.wrongCount).padStart(2, '0');
    document.getElementById('final-combo').textContent = 'x' + String(GameState.maxCombo).padStart(2, '0');
    document.getElementById('final-grade').textContent = grade.toFixed(1);

    // Achievement message
    const achievementMsg = document.getElementById('achievement-message');
    const achievementText = achievementMsg.querySelector('.achievement-text');

    if (grade >= 9.0) {
        achievementText.textContent = '🌟 SOLIDWORKS MASTER 🌟';
    } else if (grade >= 7.0) {
        achievementText.textContent = '⭐ SOLIDWORKS EXPERT ⭐';
    } else if (grade >= 5.0) {
        achievementText.textContent = '📚 SOLIDWORKS STUDENT 📚';
    } else {
        achievementText.textContent = '💪 KEEP PRACTICING 💪';
    }

    // Save to rankings
    saveRanking();
    displayRankings();

    // Show screen
    showScreen('gameover');

    // Start continue countdown
    startContinueCountdown();
}

// ==================== RANKING SYSTEM ====================
function loadRankings() {
    const saved = localStorage.getItem('solidworks-arena-rankings');
    if (saved) {
        GameState.rankings = JSON.parse(saved);
    } else {
        // Default rankings
        GameState.rankings = [
            { score: 50000, name: 'ACE' },
            { score: 35000, name: 'PRO' },
            { score: 20000, name: 'CAD' }
        ];
    }
}

function saveRanking() {
    // Add current score
    GameState.rankings.push({
        score: GameState.score,
        name: 'YOU',
        date: new Date().toISOString()
    });

    // Sort by score
    GameState.rankings.sort((a, b) => b.score - a.score);

    // Keep top 10
    GameState.rankings = GameState.rankings.slice(0, 10);

    // Save to localStorage
    localStorage.setItem('solidworks-arena-rankings', JSON.stringify(GameState.rankings));
}

function displayTopScores() {
    const container = document.getElementById('top-scores');
    container.innerHTML = '';

    GameState.rankings.slice(0, 3).forEach((rank, index) => {
        const div = document.createElement('div');
        div.className = 'score-entry';

        const position = ['1ST', '2ND', '3RD'][index];
        div.textContent = `${position}... ${rank.score} PTS... ${rank.name}`;

        container.appendChild(div);
    });
}

function displayRankings() {
    const container = document.getElementById('ranking-list');
    container.innerHTML = '';

    GameState.rankings.forEach((rank, index) => {
        const div = document.createElement('div');
        div.className = 'rank-entry';

        if (rank.name === 'YOU' && rank.score === GameState.score) {
            div.classList.add('current');
        }

        const position = document.createElement('span');
        position.className = 'rank-position';
        position.textContent = `${index + 1}º`;

        const name = document.createElement('span');
        name.textContent = rank.name;

        const score = document.createElement('span');
        score.className = 'rank-score';
        score.textContent = `${rank.score} PTS`;

        div.appendChild(position);
        div.appendChild(name);
        div.appendChild(score);

        container.appendChild(div);
    });
}

// ==================== VISUAL EFFECTS ====================
function showScorePopup(text, type, subtitle = '') {
    const popup = document.getElementById('score-popup');

    if (subtitle) {
        popup.innerHTML = `<div>${text}</div><div style="font-size: 2rem;">${subtitle}</div>`;
    } else {
        popup.textContent = text;
    }

    popup.className = 'score-popup show ' + type;

    setTimeout(() => {
        popup.className = 'score-popup';
    }, 1500);
}

function createParticles(count, type) {
    const container = document.getElementById('particles-container');
    const colors = {
        'correct': '#00ff41',
        'wrong': '#ff006e',
        'load': '#00f0ff',
        'combo': '#ffea00'
    };

    const color = colors[type] || '#00f0ff';

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = (Math.random() * 100) + '%';
        particle.style.top = (Math.random() * 100) + '%';
        particle.style.background = color;
        particle.style.boxShadow = `0 0 10px ${color}`;

        container.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1500);
    }
}

function visualSoundEffect(type) {
    const viz = document.getElementById('audio-viz');

    const effects = {
        'START': '▶️ START',
        'CORRECT': '✅ CORRECT',
        'WRONG': '❌ WRONG',
        'COMBO': '🔥 COMBO',
        'LEVELUP': '⬆️ LEVEL UP',
        'TIMEOUT': '⏰ TIME OUT',
        'VICTORY': '🏆 VICTORY',
        'GAMEOVER': '💀 GAME OVER'
    };

    viz.textContent = effects[type] || type;
    viz.style.display = 'block';
    viz.style.animation = 'none';

    setTimeout(() => {
        viz.style.animation = 'fade-out 0.5s ease';
        setTimeout(() => {
            viz.style.display = 'none';
        }, 500);
    }, 100);
}

function startContinueCountdown() {
    let seconds = 10;
    const timerElement = document.getElementById('continue-timer');

    const countdown = setInterval(() => {
        seconds--;
        timerElement.textContent = `Continue em ${seconds}s...`;

        if (seconds <= 0) {
            clearInterval(countdown);
            showScreen('insert-coin');
            resetGame();
        }
    }, 1000);
}

// ==================== UTILITY FUNCTIONS ====================
function formatScore(score) {
    return String(score).padStart(6, '0');
}

console.log('🎮 SOLIDWORKS ARENA - Engine loaded!');
