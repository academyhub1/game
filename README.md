# 🎮 SOLIDWORKS ARENA - Arcade Challenge

> **Jogo de arcade profissional estilo fliperama anos 80/90 para testar conhecimentos em SolidWorks**

[![Play Now](https://img.shields.io/badge/▶️_PLAY_NOW-00f0ff?style=for-the-badge)](https://academyhub1.github.io/game/)

---

## 🕹️ Sobre o Jogo

**SOLIDWORKS ARENA** é uma experiência arcade retrô completa que transforma o aprendizado de SolidWorks em um desafio emocionante! Com visual neon, efeitos CRT, sistema de vidas, timer de pressão e ranking global, você vai se sentir em um fliperama de verdade.

### ✨ Características do Arcade

#### 🎨 **Visual Retrô Autêntico**
- Efeitos CRT com scanlines animadas
- Neon lights (azul, rosa, verde, amarelo, roxo)
- Animações estilo pixel art
- Efeito glitch nos títulos
- Partículas e explosões visuais

#### 🎯 **Mecânicas de Jogo**
- **Sistema de Vidas** - Perca vidas a cada erro
- **Timer por Questão** - Pressão de arcade real (10-15s por questão)
- **Sistema de Combos** - Multiplicadores crescentes (1.5x, 2x, 3x, 4x)
- **Níveis Progressivos** - Suba de nível a cada 5 acertos
- **Pontuação Dinâmica** - Ganhe/perca pontos em tempo real

#### 🏆 **Ranking e Progresso**
- Hall of Fame persistente (localStorage)
- Top 10 melhores pontuações
- Estatísticas detalhadas ao final
- Conquistas e mensagens motivacionais

---

## 🎮 Modos de Jogo

### 🟢 **MODO INICIANTE**
- 📝 30 questões aleatórias
- ❤️ 3 vidas
- ⏱️ 12-15 segundos por questão
- 🎯 Ideal para aprendizado

### 🔴 **MODO MESTRE**
- 📝 50 questões aleatórias
- ❤️ 1 vida (hardcore!)
- ⏱️ 10-15 segundos por questão
- 🏆 Desafio extremo

---

## 📊 Sistema de Pontuação

| Ação | Pontos Base | Com Combo |
|------|-------------|-----------|
| Acerto (Easy) | +100 | +100 a +400 |
| Acerto (Medium) | +150 | +150 a +600 |
| Acerto (Hard) | +200 | +200 a +800 |
| Erro | -50 | -50 |
| Time Out | -50 + Vida | -50 + Vida |

### 🔥 Multiplicadores de Combo
- **2 acertos consecutivos** → 1.5x
- **5 acertos consecutivos** → 2.0x
- **10 acertos consecutivos** → 3.0x
- **15+ acertos consecutivos** → 4.0x

---

## 📚 Conteúdo do Jogo

### 50 Questões Cobrindo:
- 🖥️ **Interface** - Navegação, atalhos, FeatureManager
- ✏️ **Esboço 2D** - Restrições, ferramentas, geometria
- 🧊 **Modelagem 3D** - Recursos sólidos, superfícies, padrões
- 🔧 **Montagens** - Restrições, detecção, submontagens
- 📐 **Desenho Técnico** - Vistas, seções, dimensionamento
- 🔨 **Chapa Metálica** - Dobras, planificação, fator K
- 🧪 **Simulação** - Análise estática, tensões, materiais

### Níveis de Dificuldade:
- **Level 1 (Easy)** - 100 pontos - 10-12s
- **Level 2 (Medium)** - 150 pontos - 12-15s
- **Level 3 (Hard)** - 200 pontos - 13-15s

---

## 🚀 Como Jogar

### Acesso Online (Recomendado)
```
🌐 https://academyhub1.github.io/game/
```

### Instalação Local
```bash
# Clone o repositório
git clone https://github.com/academyhub1/game.git

# Entre no diretório
cd game

# Abra o index.html no navegador
open index.html  # Mac
xdg-open index.html  # Linux
start index.html  # Windows
```

---

## 🎮 Controles

| Ação | Controle |
|------|----------|
| Iniciar Jogo | Clique no modo desejado |
| Selecionar Resposta | Clique na opção |
| Confirmar | Auto-confirma em 0.5s |
| Jogar Novamente | Botão "CONTINUE" |
| Voltar ao Menu | Botão "MENU" |

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Efeitos neon, animações, CRT
- **JavaScript (ES6+)** - Engine completa do jogo
- **Google Fonts** - Press Start 2P (fonte arcade)

### Features Técnicas
- ✅ Sistema de estado global (GameState)
- ✅ Gerenciamento de timer com intervals
- ✅ LocalStorage para persistência de dados
- ✅ Sistema de partículas dinâmico
- ✅ Animações CSS avançadas
- ✅ Responsivo (mobile-first)

---

## 📁 Estrutura do Projeto

```
game/
├── index.html              # Estrutura principal (3 telas)
├── css/
│   └── arcade.css          # Estilos arcade completos (1000+ linhas)
├── js/
│   └── arcade.js           # Engine do jogo (600+ linhas)
├── data/
│   └── questions.json      # Banco de 50 questões
└── README.md               # Esta documentação
```

---

## 🎯 Critérios de Aprovação

| Nota | Aproveitamento | Status | Mensagem |
|------|----------------|--------|----------|
| 9.0+ | 90%+ | ⭐ SOLIDWORKS MASTER | Excelência total! |
| 7.0-8.9 | 70-89% | ⭐ SOLIDWORKS EXPERT | Ótimo desempenho! |
| 5.0-6.9 | 50-69% | 📚 SOLIDWORKS STUDENT | Continue praticando! |
| <5.0 | <50% | 💪 KEEP PRACTICING | Estude mais! |

---

## 🎨 Paleta de Cores Neon

| Cor | Uso | Hex Code |
|-----|-----|----------|
| 🔵 Neon Blue | Primária, bordas | `#00f0ff` |
| 🩷 Neon Pink | Secundária, erros | `#ff006e` |
| 🟢 Neon Green | Acertos, progresso | `#00ff41` |
| 🟡 Neon Yellow | Combos, avisos | `#ffea00` |
| 🟣 Neon Purple | Categorias, ranking | `#bd00ff` |
| 🟠 Neon Orange | Multiplicadores | `#ff6600` |

---

## 🏆 Hall of Fame

As 10 melhores pontuações são salvas localmente no navegador. Compete contra você mesmo e seus amigos!

**Pontuações Iniciais:**
1. 🥇 ACE - 50,000 PTS
2. 🥈 PRO - 35,000 PTS
3. 🥉 CAD - 20,000 PTS

---

## 📱 Responsividade

O jogo funciona perfeitamente em:
- 📱 **Smartphones** (320px+) - Interface adaptada
- 📱 **Tablets** (768px+) - Layout otimizado
- 💻 **Desktops** (1024px+) - Experiência completa
- 🖥️ **Telas grandes** (1920px+) - Visual épico

---

## 🔧 Próximas Atualizações

- [ ] Sons reais (beeps e efeitos arcade)
- [ ] Modo multiplayer online
- [ ] Power-ups especiais (freeze time, 50/50, etc.)
- [ ] Achievements desbloqueáveis
- [ ] Leaderboard global (backend)
- [ ] Modo infinito (endless)
- [ ] Boss fights temáticos
- [ ] Mais 100 questões

---

## 🤝 Contribuindo

Quer adicionar mais questões ou melhorias? Contribuições são bem-vindas!

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaQuestao`)
3. Commit suas mudanças (`git commit -m 'Add: Nova questão sobre X'`)
4. Push para a branch (`git push origin feature/NovaQuestao`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto foi desenvolvido para **Engenharia Academy** como ferramenta educacional gamificada.

---

## 🎮 Easter Eggs

🤫 Descubra segredos escondidos no jogo:
- Consegue fazer combo de 20 acertos?
- Zere o modo MESTRE sem errar uma vez
- Alcance 100,000 pontos
- Complete o jogo em menos de 10 minutos

---

<div align="center">

### 🕹️ **INSERT COIN TO CONTINUE** 🕹️

**Desenvolvido com ❤️ e muito neon para gamers e engenheiros**

[![GitHub](https://img.shields.io/badge/GitHub-academyhub1-00f0ff?style=for-the-badge&logo=github)](https://github.com/academyhub1/game)
[![Play Now](https://img.shields.io/badge/▶️_PLAY_NOW-ff006e?style=for-the-badge)](https://academyhub1.github.io/game/)

---

**🎯 Bora zerar esse jogo e dominar o SolidWorks! 🚀**

</div>
