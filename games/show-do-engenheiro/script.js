// ============================================
// SHOW DO ENGENHEIRO - LÓGICA DO JOGO
// ============================================

// Estado do jogo
const gameState = {
    playerName: '',
    currentQuestionIndex: 0,
    correctAnswers: 0,
    currentPrize: 0,
    selectedQuestions: [],
    timer: null,
    timeLeft: 60,
    helps: {
        eliminate: true,
        skip: true,
        hint: true
    }
};

// Tabela de prêmios (15 níveis)
const prizes = [
    1000,      // 1
    2000,      // 2
    3000,      // 3
    4000,      // 4
    5000,      // 5 - Checkpoint 1
    10000,     // 6
    20000,     // 7
    30000,     // 8
    40000,     // 9
    50000,     // 10 - Checkpoint 2
    100000,    // 11
    200000,    // 12
    500000,    // 13
    750000,    // 14
    1000000    // 15 - PRÊMIO MÁXIMO
];

// Checkpoints
const checkpoints = [4, 9]; // Índices das perguntas 5 e 10

// ============================================
// ELEMENTOS DO DOM
// ============================================
const screens = {
    start: document.getElementById('start-screen'),
    game: document.getElementById('game-screen'),
    end: document.getElementById('end-screen')
};

const elements = {
    // Tela inicial
    playerNameInput: document.getElementById('player-name'),
    startButton: document.getElementById('start-button'),
    recordsList: document.getElementById('records-list'),

    // Tela de jogo
    currentPlayer: document.getElementById('current-player'),
    currentQuestionNum: document.getElementById('current-question-num'),
    currentPrizeValue: document.getElementById('current-prize-value'),
    timerSeconds: document.getElementById('timer-seconds'),
    timerBar: document.getElementById('timer-bar'),
    questionPrize: document.getElementById('question-prize'),
    questionDisplay: document.getElementById('question-display'),
    alternativeBtns: document.querySelectorAll('.alternative-btn'),
    helpEliminate: document.getElementById('help-eliminate'),
    helpSkip: document.getElementById('help-skip'),
    helpHint: document.getElementById('help-hint'),
    stopButton: document.getElementById('stop-button'),
    hintDisplay: document.getElementById('hint-display'),
    hintText: document.getElementById('hint-text'),

    // Tela final
    resultIcon: document.getElementById('result-icon'),
    resultTitle: document.getElementById('result-title'),
    finalPlayerName: document.getElementById('final-player-name'),
    finalPrizeValue: document.getElementById('final-prize-value'),
    finalCorrectAnswers: document.getElementById('final-correct-answers'),
    newRecordBadge: document.getElementById('new-record-badge'),
    playAgainButton: document.getElementById('play-again-button')
};

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

// Formatar valor em Real
function formatMoney(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0
    }).format(value);
}

// Mudar tela
function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

// Placeholder para sons (futuro)
function playSound(soundName) {
    // console.log(`Som: ${soundName}`);
    // Implementar quando adicionar arquivos de som
}

// ============================================
// SISTEMA DE RECORDES (localStorage)
// ============================================

function loadRecords() {
    const records = localStorage.getItem('showDoEngenheiroRecords');
    return records ? JSON.parse(records) : [];
}

function saveRecord(name, prize) {
    const records = loadRecords();
    records.push({
        name,
        prize,
        date: new Date().toISOString()
    });

    // Ordenar por prêmio (maior primeiro) e manter top 10
    records.sort((a, b) => b.prize - a.prize);
    const top10 = records.slice(0, 10);

    localStorage.setItem('showDoEngenheiroRecords', JSON.stringify(top10));
    return top10;
}

function displayRecords() {
    const records = loadRecords();
    const recordsList = elements.recordsList;

    if (records.length === 0) {
        recordsList.innerHTML = '<p class="no-records">Nenhum recorde ainda. Seja o primeiro!</p>';
        return;
    }

    recordsList.innerHTML = records.slice(0, 5).map((record, index) => `
        <div class="record-item">
            <div class="record-position">#${index + 1}</div>
            <div class="record-name">${record.name}</div>
            <div class="record-prize">${formatMoney(record.prize)}</div>
        </div>
    `).join('');
}

function isNewRecord(prize) {
    const records = loadRecords();
    if (records.length < 10) return true;
    return prize > records[records.length - 1].prize;
}

// ============================================
// SELEÇÃO DE PERGUNTAS
// ============================================

function selectQuestions() {
    // Separar perguntas por dificuldade
    const easyQuestions = questions.filter(q => q.difficulty === 'easy');
    const mediumQuestions = questions.filter(q => q.difficulty === 'medium');
    const hardQuestions = questions.filter(q => q.difficulty === 'hard');

    // Embaralhar cada categoria
    const shuffledEasy = shuffleArray(easyQuestions);
    const shuffledMedium = shuffleArray(mediumQuestions);
    const shuffledHard = shuffleArray(hardQuestions);

    // Selecionar 5 de cada
    const selected = [
        ...shuffledEasy.slice(0, 5),    // Perguntas 1-5
        ...shuffledMedium.slice(0, 5),  // Perguntas 6-10
        ...shuffledHard.slice(0, 5)     // Perguntas 11-15
    ];

    return selected;
}

// ============================================
// TIMER
// ============================================

function startTimer() {
    gameState.timeLeft = 60;
    updateTimerDisplay();

    gameState.timer = setInterval(() => {
        gameState.timeLeft--;
        updateTimerDisplay();

        // Aviso quando faltam 10 segundos
        if (gameState.timeLeft === 10) {
            elements.timerSeconds.parentElement.classList.add('warning');
            elements.timerBar.classList.add('warning');
        }

        // Tempo esgotado
        if (gameState.timeLeft <= 0) {
            stopTimer();
            handleTimeout();
        }
    }, 1000);
}

function stopTimer() {
    if (gameState.timer) {
        clearInterval(gameState.timer);
        gameState.timer = null;
    }
}

function updateTimerDisplay() {
    elements.timerSeconds.textContent = gameState.timeLeft;
    const percentage = (gameState.timeLeft / 60) * 100;
    elements.timerBar.style.width = `${percentage}%`;
}

function handleTimeout() {
    playSound('wrong');
    showWrongAnswerFeedback(null);

    setTimeout(() => {
        endGame('timeout');
    }, 2000);
}

// ============================================
// DISPLAY DE PERGUNTA
// ============================================

function displayQuestion() {
    const question = gameState.selectedQuestions[gameState.currentQuestionIndex];
    const questionNumber = gameState.currentQuestionIndex + 1;
    const prize = prizes[gameState.currentQuestionIndex];

    // Atualizar cabeçalho
    elements.currentQuestionNum.textContent = questionNumber;
    elements.currentPrizeValue.textContent = formatMoney(gameState.currentPrize);

    // Atualizar pergunta
    elements.questionPrize.textContent = formatMoney(prize);
    elements.questionDisplay.textContent = question.question;

    // Atualizar alternativas
    elements.alternativeBtns.forEach((btn, index) => {
        const altText = btn.querySelector('.alt-text');
        altText.textContent = question.options[index];
        btn.disabled = false;
        btn.classList.remove('correct', 'wrong', 'eliminated');
    });

    // Esconder dica
    elements.hintDisplay.classList.add('hidden');

    // Reset timer
    elements.timerSeconds.parentElement.classList.remove('warning');
    elements.timerBar.classList.remove('warning');

    // Iniciar timer
    startTimer();
}

// ============================================
// VERIFICAÇÃO DE RESPOSTA
// ============================================

function checkAnswer(selectedIndex) {
    stopTimer();

    const question = gameState.selectedQuestions[gameState.currentQuestionIndex];
    const isCorrect = selectedIndex === question.correct;

    // Desabilitar todos os botões
    elements.alternativeBtns.forEach(btn => btn.disabled = true);

    if (isCorrect) {
        handleCorrectAnswer(selectedIndex);
    } else {
        handleWrongAnswer(selectedIndex, question.correct);
    }
}

function handleCorrectAnswer(selectedIndex) {
    playSound('correct');

    // Marcar resposta correta
    elements.alternativeBtns[selectedIndex].classList.add('correct');

    // Atualizar estado
    gameState.correctAnswers++;
    gameState.currentPrize = prizes[gameState.currentQuestionIndex];

    setTimeout(() => {
        // Verificar se venceu o jogo
        if (gameState.currentQuestionIndex === 14) {
            endGame('victory');
        } else {
            // Próxima pergunta
            gameState.currentQuestionIndex++;
            displayQuestion();
        }
    }, 2000);
}

function handleWrongAnswer(selectedIndex, correctIndex) {
    playSound('wrong');

    // Marcar resposta errada e correta
    elements.alternativeBtns[selectedIndex].classList.add('wrong');
    elements.alternativeBtns[correctIndex].classList.add('correct');

    setTimeout(() => {
        // Voltar para o checkpoint
        const lastCheckpoint = checkpoints.filter(cp => cp < gameState.currentQuestionIndex).pop();
        if (lastCheckpoint !== undefined) {
            gameState.currentPrize = prizes[lastCheckpoint];
        } else {
            gameState.currentPrize = 0;
        }

        endGame('wrong');
    }, 3000);
}

function showWrongAnswerFeedback(selectedIndex) {
    const question = gameState.selectedQuestions[gameState.currentQuestionIndex];

    if (selectedIndex !== null) {
        elements.alternativeBtns[selectedIndex].classList.add('wrong');
    }
    elements.alternativeBtns[question.correct].classList.add('correct');
}

// ============================================
// SISTEMA DE AJUDAS
// ============================================

function useEliminateHelp() {
    if (!gameState.helps.eliminate) return;

    const question = gameState.selectedQuestions[gameState.currentQuestionIndex];
    const wrongIndexes = [];

    // Coletar índices das respostas erradas
    question.options.forEach((_, index) => {
        if (index !== question.correct) {
            wrongIndexes.push(index);
        }
    });

    // Embaralhar e pegar 2
    const shuffled = shuffleArray(wrongIndexes);
    const toEliminate = shuffled.slice(0, 2);

    // Eliminar visualmente
    toEliminate.forEach(index => {
        elements.alternativeBtns[index].classList.add('eliminated');
        elements.alternativeBtns[index].disabled = true;
    });

    // Desabilitar ajuda
    gameState.helps.eliminate = false;
    elements.helpEliminate.disabled = true;

    playSound('help');
}

function useSkipHelp() {
    if (!gameState.helps.skip) return;

    stopTimer();

    // Manter prêmio atual
    // gameState.currentPrize permanece o mesmo

    // Desabilitar ajuda
    gameState.helps.skip = false;
    elements.helpSkip.disabled = true;

    playSound('help');

    // Ir para próxima pergunta
    if (gameState.currentQuestionIndex < 14) {
        gameState.currentQuestionIndex++;
        displayQuestion();
    } else {
        // Se for a última pergunta, não pode pular
        alert('Esta é a última pergunta! Não é possível pular.');
        gameState.helps.skip = true;
        elements.helpSkip.disabled = false;
        startTimer();
    }
}

function useHintHelp() {
    if (!gameState.helps.hint) return;

    const question = gameState.selectedQuestions[gameState.currentQuestionIndex];

    // Mostrar dica
    elements.hintText.textContent = question.hint;
    elements.hintDisplay.classList.remove('hidden');

    // Desabilitar ajuda
    gameState.helps.hint = false;
    elements.helpHint.disabled = true;

    playSound('help');
}

// ============================================
// PARAR O JOGO
// ============================================

function stopGame() {
    const confirmStop = confirm(
        `Você quer parar e levar ${formatMoney(gameState.currentPrize)}?`
    );

    if (confirmStop) {
        stopTimer();
        endGame('stopped');
    }
}

// ============================================
// FIM DO JOGO
// ============================================

function endGame(reason) {
    stopTimer();

    // Configurar tela final baseado no motivo
    switch (reason) {
        case 'victory':
            elements.resultIcon.textContent = '🏆';
            elements.resultTitle.textContent = 'PARABÉNS! VOCÊ VENCEU!';
            gameState.currentPrize = prizes[14]; // 1 milhão
            break;

        case 'stopped':
            elements.resultIcon.textContent = '💰';
            elements.resultTitle.textContent = 'Você parou!';
            break;

        case 'wrong':
            elements.resultIcon.textContent = '😔';
            elements.resultTitle.textContent = 'Resposta Errada!';
            break;

        case 'timeout':
            elements.resultIcon.textContent = '⏰';
            elements.resultTitle.textContent = 'Tempo Esgotado!';
            gameState.currentPrize = 0;
            break;
    }

    // Preencher informações finais
    elements.finalPlayerName.textContent = gameState.playerName;
    elements.finalPrizeValue.textContent = formatMoney(gameState.currentPrize);
    elements.finalCorrectAnswers.textContent = gameState.correctAnswers;

    // Verificar e salvar recorde
    if (gameState.currentPrize > 0) {
        const newRecord = isNewRecord(gameState.currentPrize);
        saveRecord(gameState.playerName, gameState.currentPrize);

        if (newRecord) {
            elements.newRecordBadge.classList.remove('hidden');
        } else {
            elements.newRecordBadge.classList.add('hidden');
        }
    } else {
        elements.newRecordBadge.classList.add('hidden');
    }

    // Mostrar tela final
    showScreen('end');
}

// ============================================
// INICIAR JOGO
// ============================================

function startGame() {
    // Resetar estado
    gameState.playerName = elements.playerNameInput.value.trim();
    gameState.currentQuestionIndex = 0;
    gameState.correctAnswers = 0;
    gameState.currentPrize = 0;
    gameState.timeLeft = 60;
    gameState.helps = {
        eliminate: true,
        skip: true,
        hint: true
    };

    // Reabilitar botões de ajuda
    elements.helpEliminate.disabled = false;
    elements.helpSkip.disabled = false;
    elements.helpHint.disabled = false;

    // Selecionar perguntas
    gameState.selectedQuestions = selectQuestions();

    // Atualizar display do jogador
    elements.currentPlayer.textContent = gameState.playerName;

    // Mostrar tela de jogo
    showScreen('game');

    // Exibir primeira pergunta
    displayQuestion();
}

// ============================================
// EVENT LISTENERS
// ============================================

// Validação do nome do jogador
elements.playerNameInput.addEventListener('input', (e) => {
    const name = e.target.value.trim();
    elements.startButton.disabled = name.length === 0;
});

// Permitir Enter para começar
elements.playerNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !elements.startButton.disabled) {
        startGame();
    }
});

// Botão começar
elements.startButton.addEventListener('click', startGame);

// Botões de alternativa
elements.alternativeBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        checkAnswer(index);
    });
});

// Botões de ajuda
elements.helpEliminate.addEventListener('click', useEliminateHelp);
elements.helpSkip.addEventListener('click', useSkipHelp);
elements.helpHint.addEventListener('click', useHintHelp);

// Botão parar
elements.stopButton.addEventListener('click', stopGame);

// Botão jogar novamente
elements.playAgainButton.addEventListener('click', () => {
    // Atualizar recordes na tela inicial
    displayRecords();

    // Limpar campo de nome
    elements.playerNameInput.value = '';
    elements.startButton.disabled = true;

    // Voltar para tela inicial
    showScreen('start');
});

// ============================================
// INICIALIZAÇÃO
// ============================================

// Carregar recordes ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    displayRecords();

    // Focar no input de nome
    elements.playerNameInput.focus();
});
