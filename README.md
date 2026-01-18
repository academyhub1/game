# 🎮 SolidWorks Academy - Simulado Gamificado

Plataforma web interativa para avaliação de conhecimentos em SolidWorks, com dois modos de jogo: **Simulado** (foco em aprendizado) e **Prova Real** (desafio gamificado).

## 🎯 Objetivo do Projeto

Criar uma experiência de aprendizado envolvente e eficaz para estudantes de SolidWorks através de:
- **Feedback educativo imediato** no modo de prática
- **Sistema de gamificação** com pontos, combos e desafios
- **Banco de questões abrangente** cobrindo níveis iniciante e intermediário
- **Interface moderna e responsiva** que funciona em qualquer dispositivo

## ✨ Características Principais

### 🎓 Modo Simulado (Prática)
- ✅ Feedback imediato após cada resposta
- ✅ Explicações detalhadas para reforçar o aprendizado
- ✅ Sem pressão de tempo ou perda de pontos
- ✅ Foco total no entendimento dos conceitos

### 🏆 Modo Prova Real (Desafio)
- ✅ Sistema de pontuação (+100 por acerto, -50 por erro)
- ✅ Multiplicador de combo (2x após 3 acertos, 3x após 5 acertos)
- ✅ Rastreamento de estatísticas em tempo real
- ✅ Critério de aprovação: nota mínima 7.0

### 📚 Conteúdo Abrangente
- 40 questões de SolidWorks cobrindo:
  - Interface e navegação
  - Esboço 2D (restrições, ferramentas, geometria)
  - Modelagem 3D (extrusão, revolução, padrões, recursos)
  - Montagens (restrições, submontagens)
  - Desenho Técnico (vistas, dimensionamento, BOM)
  - Chapa Metálica (dobras, planificação)
  - Simulação básica (análise estática)

## 🚀 Como Usar

### Instalação
Nenhuma instalação necessária! Basta abrir o arquivo `index.html` em qualquer navegador moderno.

```bash
# Clone o repositório
git clone <repository-url>

# Navegue até o diretório
cd game

# Abra o index.html no navegador
# (ou use um servidor local como Live Server no VS Code)
```

### Estrutura de Arquivos
```
game/
├── index.html           # Página principal
├── css/
│   └── styles.css       # Estilos (design system, responsividade)
├── js/
│   └── app.js           # Lógica da aplicação (state management, gamificação)
├── data/
│   └── questions.json   # Banco de questões (40 questões)
├── assets/              # Imagens e recursos (logo, etc.)
└── README.md            # Este arquivo
```

## 🎨 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica e acessível
- **CSS3** - Design system moderno, animações, responsividade
- **JavaScript (ES6+)** - Lógica de negócio, state management
- **JSON** - Armazenamento de questões

## 📱 Responsividade

A aplicação foi desenvolvida com abordagem **mobile-first** e funciona perfeitamente em:
- 📱 Smartphones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Telas grandes (1920px+)

## 🎯 Sistema de Pontuação (Modo Prova Real)

| Ação | Pontos | Observações |
|------|--------|-------------|
| Resposta Correta | +100 | Base |
| Resposta Incorreta | -50 | Pontuação não fica negativa |
| Combo 2x | +200 | Após 3 acertos consecutivos |
| Combo 3x | +300 | Após 5 acertos consecutivos |

**Critério de Aprovação:** Nota mínima de 7.0 (70% de acerto)

## 🔧 Expansão do Banco de Questões

Para adicionar mais questões, edite o arquivo `data/questions.json` seguindo o formato:

```json
{
  "id": "sw_XXX",
  "nivel": "iniciante",  // ou "intermediario"
  "topico": "Nome do Tópico",
  "pergunta": "Texto da pergunta?",
  "opcoes": [
    "a) Opção A",
    "b) Opção B",
    "c) Opção C",
    "d) Opção D"
  ],
  "respostaCorreta": "a",  // letra da resposta correta
  "explicacao": "Explicação detalhada do conceito..."
}
```

## 🎨 Paleta de Cores

| Cor | Uso | Hex |
|-----|-----|-----|
| Laranja Primário | Acentos, botões primários | `#FF6B35` |
| Azul Escuro | Background, textos principais | `#1A1F2E` |
| Azul Médio | Background alternativo | `#2C3E50` |
| Verde Sucesso | Feedbacks positivos | `#27AE60` |
| Vermelho Erro | Feedbacks negativos | `#E74C3C` |
| Amarelo Aviso | Combos, alertas | `#F39C12` |

## 🚀 Próximos Passos (Roadmap)

- [ ] Adicionar mais 460 questões (objetivo: 500+ questões)
- [ ] Implementar sistema de categorias/filtros por tópico
- [ ] Adicionar modo "Desafio Diário"
- [ ] Sistema de ranking e leaderboard
- [ ] Exportar resultados em PDF
- [ ] Integração com backend para salvar progresso
- [ ] Modo multiplayer/competitivo
- [ ] Questões com imagens e diagramas

## 📄 Licença

Este projeto foi desenvolvido para a **Engenharia Academy**.

---

**Desenvolvido com ❤️ para estudantes de SolidWorks**
