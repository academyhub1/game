// ========================================
// ESTADO GLOBAL DA APLICAÇÃO
// ========================================
const AppState = {
    questionsBank: [],           // Banco completo de questões
    currentQuestions: [],        // Questões da sessão atual (30 aleatórias)
    currentQuestionIndex: 0,     // Índice da questão atual
    selectedAnswer: null,        // Resposta selecionada pelo usuário
    mode: null,                  // 'practice' ou 'exam'

    // Estatísticas
    correctCount: 0,
    wrongCount: 0,

    // Modo Prova Real (Gamificação)
    score: 0,
    combo: 0,
    maxCombo: 0,

    // Constantes de Pontuação
    POINTS_PER_CORRECT: 100,
    POINTS_PER_WRONG: -50,
    COMBO_THRESHOLD_2X: 3,
    COMBO_THRESHOLD_3X: 5,
};

// ========================================
// GERENCIAMENTO DE TELAS
// ========================================
function showScreen(screenId) {
    // Oculta todas as telas
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Mostra a tela desejada
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
    }
}

// ========================================
// CARREGAMENTO DE QUESTÕES
// ========================================
async function loadQuestions() {
    try {
        const response = await fetch('data/questions.json');
        const data = await response.json();
        AppState.questionsBank = data.questoes;
        console.log(`✅ ${AppState.questionsBank.length} questões carregadas!`);
        return true;
    } catch (error) {
        console.error('❌ Erro ao carregar questões:', error);
        alert('Erro ao carregar banco de questões. Verifique se o arquivo existe.');
        return false;
    }
}

// ========================================
// SELEÇÃO ALEATÓRIA DE QUESTÕES
// ========================================
function selectRandomQuestions(count = 30) {
    // Cria uma cópia do banco e embaralha
    const shuffled = [...AppState.questionsBank].sort(() => Math.random() - 0.5);
    // Seleciona as primeiras 'count' questões
    AppState.currentQuestions = shuffled.slice(0, Math.min(count, shuffled.length));
    console.log(`🎲 ${AppState.currentQuestions.length} questões selecionadas aleatoriamente`);
}

// ========================================
// INICIALIZAÇÃO DE MODO
// ========================================
function startGame(mode) {
    AppState.mode = mode;

    // Reset de estatísticas
    AppState.currentQuestionIndex = 0;
    AppState.correctCount = 0;
    AppState.wrongCount = 0;
    AppState.score = 0;
    AppState.combo = 0;
    AppState.maxCombo = 0;
    AppState.selectedAnswer = null;

    // Seleciona questões aleatórias
    selectRandomQuestions(30);

    // Configura UI baseado no modo
    if (mode === 'exam') {
        document.getElementById('exam-hud').style.display = 'flex';
        updateScoreDisplay();
    } else {
        document.getElementById('exam-hud').style.display = 'none';
    }

    // Mostra a tela de quiz
    showScreen('quiz-screen');

    // Carrega a primeira questão
    loadQuestion();
}

// ========================================
// CARREGAR QUESTÃO ATUAL
// ========================================
function loadQuestion() {
    const question = AppState.currentQuestions[AppState.currentQuestionIndex];

    // Atualiza HUD
    document.getElementById('current-question').textContent = AppState.currentQuestionIndex + 1;
    document.getElementById('total-questions').textContent = AppState.currentQuestions.length;

    // Atualiza nível e tópico
    const levelBadge = document.getElementById('question-level');
    levelBadge.textContent = question.nivel.charAt(0).toUpperCase() + question.nivel.slice(1);
    levelBadge.className = 'badge badge-' + question.nivel;

    document.getElementById('question-topic').textContent = question.topico;

    // Atualiza barra de progresso
    const progress = ((AppState.currentQuestionIndex + 1) / AppState.currentQuestions.length) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';

    // Atualiza texto da pergunta
    document.getElementById('question-text').textContent = question.pergunta;

    // Limpa feedback anterior
    document.getElementById('feedback-area').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('confirm-btn').style.display = 'inline-block';
    document.getElementById('confirm-btn').disabled = true;

    // Renderiza opções
    renderOptions(question);

    // Reset de seleção
    AppState.selectedAnswer = null;
}

// ========================================
// RENDERIZAR OPÇÕES
// ========================================
function renderOptions(question) {
    const container = document.getElementById('options-container');
    container.innerHTML = '';

    question.opcoes.forEach((opcao, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = opcao;
        optionDiv.dataset.answer = opcao.charAt(0); // 'a', 'b', 'c', 'd'

        optionDiv.addEventListener('click', () => selectOption(optionDiv));

        container.appendChild(optionDiv);
    });
}

// ========================================
// SELECIONAR OPÇÃO
// ========================================
function selectOption(optionElement) {
    // Remove seleção anterior
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });

    // Seleciona nova opção
    optionElement.classList.add('selected');
    AppState.selectedAnswer = optionElement.dataset.answer;

    // Habilita botão de confirmar
    document.getElementById('confirm-btn').disabled = false;
}

// ========================================
// CONFIRMAR RESPOSTA
// ========================================
function confirmAnswer() {
    if (!AppState.selectedAnswer) return;

    const question = AppState.currentQuestions[AppState.currentQuestionIndex];
    const isCorrect = AppState.selectedAnswer === question.respostaCorreta;

    // Desabilita todas as opções
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.add('disabled');
    });

    // Destaca resposta correta e incorreta
    document.querySelectorAll('.option').forEach(opt => {
        if (opt.dataset.answer === question.respostaCorreta) {
            opt.classList.add('correct');
        } else if (opt.dataset.answer === AppState.selectedAnswer && !isCorrect) {
            opt.classList.add('incorrect');
        }
    });

    // Atualiza estatísticas
    if (isCorrect) {
        AppState.correctCount++;
        AppState.combo++;

        // Atualiza maior combo
        if (AppState.combo > AppState.maxCombo) {
            AppState.maxCombo = AppState.combo;
        }
    } else {
        AppState.wrongCount++;
        AppState.combo = 0; // Reset do combo
    }

    // Processamento específico por modo
    if (AppState.mode === 'practice') {
        handlePracticeModeFeedback(isCorrect, question);
    } else {
        handleExamModeScoring(isCorrect);
    }

    // Esconde botão confirmar, mostra próximo
    document.getElementById('confirm-btn').style.display = 'none';

    // Verifica se é a última questão
    if (AppState.currentQuestionIndex < AppState.currentQuestions.length - 1) {
        document.getElementById('next-btn').style.display = 'inline-block';
    } else {
        // Última questão - mostra botão de finalizar
        const nextBtn = document.getElementById('next-btn');
        nextBtn.textContent = 'Ver Resultados';
        nextBtn.style.display = 'inline-block';
    }

    // Atualiza contador no HUD (modo prova)
    if (AppState.mode === 'exam') {
        document.getElementById('correct-count').textContent = AppState.correctCount;
    }
}

// ========================================
// FEEDBACK MODO SIMULADO
// ========================================
function handlePracticeModeFeedback(isCorrect, question) {
    const feedbackArea = document.getElementById('feedback-area');
    const feedbackResult = document.getElementById('feedback-result');
    const feedbackExplanation = document.getElementById('feedback-explanation');

    // Resultado
    if (isCorrect) {
        feedbackResult.textContent = '✅ Resposta Correta!';
        feedbackResult.className = 'feedback-result correct';
    } else {
        feedbackResult.textContent = '❌ Resposta Incorreta';
        feedbackResult.className = 'feedback-result incorrect';
    }

    // Explicação
    feedbackExplanation.innerHTML = `<p><strong>Explicação:</strong> ${question.explicacao}</p>`;

    // Mostra área de feedback
    feedbackArea.style.display = 'block';
}

// ========================================
// PONTUAÇÃO MODO PROVA REAL
// ========================================
function handleExamModeScoring(isCorrect) {
    let pointsGained = 0;
    let multiplier = 1;

    // Calcula multiplicador de combo
    if (AppState.combo >= AppState.COMBO_THRESHOLD_3X) {
        multiplier = 3;
    } else if (AppState.combo >= AppState.COMBO_THRESHOLD_2X) {
        multiplier = 2;
    }

    if (isCorrect) {
        pointsGained = AppState.POINTS_PER_CORRECT * multiplier;
        AppState.score += pointsGained;

        // Notificação visual
        if (multiplier > 1) {
            showScoreNotification(`+${pointsGained} pts\n${multiplier}x COMBO! 🔥`, 'combo');
        } else {
            showScoreNotification(`+${pointsGained} pts`, 'positive');
        }
    } else {
        pointsGained = AppState.POINTS_PER_WRONG;
        AppState.score = Math.max(0, AppState.score + pointsGained); // Não deixa ficar negativo

        showScoreNotification(`${pointsGained} pts`, 'negative');
    }

    updateScoreDisplay();
}

// ========================================
// ATUALIZAR DISPLAY DE PONTUAÇÃO
// ========================================
function updateScoreDisplay() {
    document.getElementById('score-display').textContent = AppState.score;

    const comboDisplay = document.getElementById('combo-display');

    if (AppState.combo >= AppState.COMBO_THRESHOLD_3X) {
        comboDisplay.textContent = '3x 🔥';
        comboDisplay.style.color = '#E74C3C';
    } else if (AppState.combo >= AppState.COMBO_THRESHOLD_2X) {
        comboDisplay.textContent = '2x ⚡';
        comboDisplay.style.color = '#F39C12';
    } else {
        comboDisplay.textContent = AppState.combo + 'x';
        comboDisplay.style.color = '#F39C12';
    }
}

// ========================================
// NOTIFICAÇÃO DE PONTOS
// ========================================
function showScoreNotification(text, type) {
    const notification = document.getElementById('score-notification');
    notification.textContent = text;
    notification.className = 'score-notification ' + type;

    // Remove animação anterior
    notification.style.animation = 'none';

    // Força reflow para reiniciar animação
    setTimeout(() => {
        notification.style.animation = 'scorePopup 1s ease';
    }, 10);
}

// ========================================
// PRÓXIMA QUESTÃO
// ========================================
function nextQuestion() {
    AppState.currentQuestionIndex++;

    if (AppState.currentQuestionIndex < AppState.currentQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// ========================================
// MOSTRAR RESULTADOS
// ========================================
function showResults() {
    // Calcula nota (0 a 10)
    const totalQuestions = AppState.currentQuestions.length;
    const finalGrade = (AppState.correctCount / totalQuestions) * 10;

    // Status de aprovação (apenas para modo prova)
    const resultsStatus = document.getElementById('results-status');

    if (AppState.mode === 'exam') {
        if (finalGrade >= 7.0) {
            resultsStatus.textContent = '🎉 APROVADO!';
            resultsStatus.className = 'results-status approved';
        } else {
            resultsStatus.textContent = '😔 REPROVADO';
            resultsStatus.className = 'results-status failed';
        }
        resultsStatus.style.display = 'block';
    } else {
        resultsStatus.style.display = 'none';
    }

    // Exibe nota final
    document.getElementById('final-score').textContent = finalGrade.toFixed(1);

    // Estatísticas básicas
    document.getElementById('total-correct').textContent = AppState.correctCount;
    document.getElementById('total-wrong').textContent = AppState.wrongCount;

    // Estatísticas do modo prova
    if (AppState.mode === 'exam') {
        document.getElementById('total-score-container').style.display = 'block';
        document.getElementById('total-score').textContent = AppState.score;

        document.getElementById('max-combo-container').style.display = 'block';
        document.getElementById('max-combo').textContent = AppState.maxCombo + 'x';
    } else {
        document.getElementById('total-score-container').style.display = 'none';
        document.getElementById('max-combo-container').style.display = 'none';
    }

    // Mensagem personalizada
    const resultsMessage = document.getElementById('results-message');
    let message = '';

    if (finalGrade >= 9.0) {
        message = '🌟 Excelente! Você demonstrou domínio excepcional do SolidWorks!';
    } else if (finalGrade >= 7.0) {
        message = '👍 Muito bem! Você está no caminho certo. Continue praticando!';
    } else if (finalGrade >= 5.0) {
        message = '📚 Você tem uma base boa, mas ainda há espaço para melhorar. Revise os conceitos e tente novamente!';
    } else {
        message = '💪 Não desanime! Use o Modo Simulado para estudar e fortalecer seus conhecimentos.';
    }

    resultsMessage.textContent = message;

    // Mostra tela de resultados
    showScreen('results-screen');
}

// ========================================
// REINICIAR JOGO
// ========================================
function retryGame() {
    startGame(AppState.mode);
}

function goHome() {
    showScreen('home-screen');
}

// ========================================
// EVENT LISTENERS
// ========================================
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Iniciando aplicação SolidWorks Academy...');

    // Carrega banco de questões
    const loaded = await loadQuestions();

    if (!loaded) {
        return; // Para se não conseguir carregar
    }

    // Botões da tela inicial
    document.getElementById('practice-mode-btn').addEventListener('click', () => {
        startGame('practice');
    });

    document.getElementById('exam-mode-btn').addEventListener('click', () => {
        startGame('exam');
    });

    // Botões do quiz
    document.getElementById('confirm-btn').addEventListener('click', confirmAnswer);

    document.getElementById('next-btn').addEventListener('click', () => {
        // Verifica se é a última questão
        if (AppState.currentQuestionIndex >= AppState.currentQuestions.length - 1) {
            showResults();
        } else {
            nextQuestion();
        }
    });

    // Botões da tela de resultados
    document.getElementById('retry-btn').addEventListener('click', retryGame);
    document.getElementById('home-btn').addEventListener('click', goHome);

    console.log('✅ Aplicação pronta!');
});
