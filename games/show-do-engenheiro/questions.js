// Banco de Perguntas - Show do Engenheiro
// Total: 100 perguntas (40 fáceis, 35 médias, 25 difíceis)

const questions = [
    // ============================================
    // PERGUNTAS FÁCEIS (1-40)
    // ============================================
    {
        id: 1,
        difficulty: "easy",
        question: "Qual comando do SolidWorks é usado para criar um furo com assistente?",
        options: [
            "Extruded Cut",
            "Hole Wizard",
            "Revolved Cut",
            "Fillet",
            "Shell"
        ],
        correct: 1,
        hint: "Este comando possui um assistente que cria furos padronizados automaticamente"
    },
    {
        id: 2,
        difficulty: "easy",
        question: "Quantos milímetros tem uma polegada?",
        options: [
            "25,4 mm",
            "2,54 mm",
            "10 mm",
            "30 mm",
            "100 mm"
        ],
        correct: 0,
        hint: "É um valor com vírgula, próximo de 25"
    },
    {
        id: 3,
        difficulty: "easy",
        question: "Qual o símbolo usado para representar 'diâmetro' em desenho técnico?",
        options: [
            "D",
            "Ø",
            "R",
            "L",
            "C"
        ],
        correct: 1,
        hint: "É um símbolo circular com uma linha diagonal"
    },
    {
        id: 4,
        difficulty: "easy",
        question: "O que significa 'M8' em uma especificação de rosca?",
        options: [
            "Rosca métrica de 8mm de diâmetro nominal",
            "Rosca de 8 polegadas",
            "Material tipo 8",
            "Medida de 8 metros",
            "Modelo número 8"
        ],
        correct: 0,
        hint: "A letra M indica o sistema de rosca, e o número é o diâmetro"
    },
    {
        id: 5,
        difficulty: "easy",
        question: "Qual material é mais leve: alumínio ou aço?",
        options: [
            "Alumínio",
            "Aço",
            "Ambos têm a mesma densidade",
            "Depende do tipo de aço",
            "Depende da temperatura"
        ],
        correct: 0,
        hint: "Um dos metais mais usados em aviação por ser leve"
    },
    {
        id: 6,
        difficulty: "easy",
        question: "Qual ferramenta é usada para medir dimensões internas com precisão?",
        options: [
            "Trena",
            "Paquímetro",
            "Esquadro",
            "Régua",
            "Transferidor"
        ],
        correct: 1,
        hint: "Possui bicos internos e externos e lê em décimos de milímetro"
    },
    {
        id: 7,
        difficulty: "easy",
        question: "O que é um 'chanfro' em uma peça?",
        options: [
            "Um furo passante",
            "Um corte angular na borda",
            "Uma rosca interna",
            "Uma curva suave",
            "Uma textura superficial"
        ],
        correct: 1,
        hint: "Serve para facilitar montagem e eliminar rebarbas em bordas"
    },
    {
        id: 8,
        difficulty: "easy",
        question: "No SolidWorks, qual comando cria cantos arredondados?",
        options: [
            "Chamfer",
            "Fillet",
            "Round",
            "Curve",
            "Blend"
        ],
        correct: 1,
        hint: "Em português significa 'filete' ou 'concordância'"
    },
    {
        id: 9,
        difficulty: "easy",
        question: "Qual o aço mais comum para construção mecânica geral?",
        options: [
            "AISI 1020",
            "AISI 4340",
            "AISI 304",
            "AISI D2",
            "AISI 52100"
        ],
        correct: 0,
        hint: "É um aço carbono de baixa liga, muito usado para solda"
    },
    {
        id: 10,
        difficulty: "easy",
        question: "O que significa a sigla 'CAD'?",
        options: [
            "Computer Aided Design",
            "Computer Automated Drawing",
            "Calculated Auto Design",
            "Creative Art Design",
            "Coordinate Axis Drawing"
        ],
        correct: 0,
        hint: "É o termo para softwares de projeto assistido por computador"
    },
    {
        id: 11,
        difficulty: "easy",
        question: "Qual processo de fabricação consiste em retirar material com uma ferramenta de corte?",
        options: [
            "Fundição",
            "Usinagem",
            "Injeção",
            "Estampagem",
            "Soldagem"
        ],
        correct: 1,
        hint: "Torno e fresa fazem parte deste processo"
    },
    {
        id: 12,
        difficulty: "easy",
        question: "O que é um 'parafuso sextavado'?",
        options: [
            "Parafuso com cabeça de 6 lados",
            "Parafuso com 6 roscas",
            "Parafuso de 6mm",
            "Parafuso com 6 polegadas",
            "Parafuso para 6 aplicações"
        ],
        correct: 0,
        hint: "O nome vem do formato da cabeça, que recebe chave"
    },
    {
        id: 13,
        difficulty: "easy",
        question: "Qual unidade mede dureza por penetração de esfera de aço?",
        options: [
            "Rockwell (HRC)",
            "Brinell (HB)",
            "Vickers (HV)",
            "Shore (HS)",
            "Mohs"
        ],
        correct: 1,
        hint: "O nome do teste vem de um engenheiro sueco"
    },
    {
        id: 14,
        difficulty: "easy",
        question: "No desenho técnico, o que representa uma linha tracejada?",
        options: [
            "Arestas visíveis",
            "Arestas invisíveis/ocultas",
            "Linhas de centro",
            "Linhas de cota",
            "Linhas de corte"
        ],
        correct: 1,
        hint: "Mostra o que está 'por trás' da vista"
    },
    {
        id: 15,
        difficulty: "easy",
        question: "Qual o nome da projeção técnica mais usada no Brasil?",
        options: [
            "Projeção Americana (3º diedro)",
            "Projeção Europeia (1º diedro)",
            "Projeção Isométrica",
            "Projeção Cavaleira",
            "Projeção Cônica"
        ],
        correct: 1,
        hint: "É o método usado na Europa e adotado pela ABNT"
    },
    {
        id: 16,
        difficulty: "easy",
        question: "O que é um 'rebite'?",
        options: [
            "Tipo de parafuso especial",
            "Elemento de união permanente por deformação",
            "Ferramenta de corte",
            "Tipo de solda",
            "Acessório de medição"
        ],
        correct: 1,
        hint: "Muito usado em aviões, é uma união que não é desmontável"
    },
    {
        id: 17,
        difficulty: "easy",
        question: "Qual comando do SolidWorks espelha features simetricamente?",
        options: [
            "Copy",
            "Mirror",
            "Pattern",
            "Symmetry",
            "Reflect"
        ],
        correct: 1,
        hint: "O nome em inglês significa 'espelho'"
    },
    {
        id: 18,
        difficulty: "easy",
        question: "O que é 'torneamento'?",
        options: [
            "Processo de dobra de chapas",
            "Usinagem com peça girando",
            "Tratamento térmico",
            "Processo de soldagem",
            "Medição de torque"
        ],
        correct: 1,
        hint: "Feito em um torno, a peça gira e a ferramenta retira material"
    },
    {
        id: 19,
        difficulty: "easy",
        question: "Qual material é mais resistente à corrosão?",
        options: [
            "Aço carbono",
            "Aço inoxidável",
            "Ferro fundido",
            "Aço 1045",
            "Aço rápido"
        ],
        correct: 1,
        hint: "Contém cromo e é usado em ambientes úmidos"
    },
    {
        id: 20,
        difficulty: "easy",
        question: "O que é uma 'porca'?",
        options: [
            "Tipo de parafuso",
            "Peça com rosca interna para fixação",
            "Ferramenta de aperto",
            "Tipo de chaveta",
            "Elemento de vedação"
        ],
        correct: 1,
        hint: "Trabalha em conjunto com parafuso ou prisioneiro"
    },
    {
        id: 21,
        difficulty: "easy",
        question: "Qual a função de um 'rolamento'?",
        options: [
            "Vedar fluidos",
            "Reduzir atrito em movimentos rotativos",
            "Acoplar eixos",
            "Transmitir torque",
            "Amortecer impactos"
        ],
        correct: 1,
        hint: "Possui esferas ou rolos entre anéis"
    },
    {
        id: 22,
        difficulty: "easy",
        question: "No SolidWorks, qual extensão tem um arquivo de peça?",
        options: [
            ".dwg",
            ".prt",
            ".sldprt",
            ".asm",
            ".step"
        ],
        correct: 2,
        hint: "Começa com 'sld' e termina com 'prt'"
    },
    {
        id: 23,
        difficulty: "easy",
        question: "O que mede um 'micrômetro'?",
        options: [
            "Ângulos",
            "Temperatura",
            "Dimensões com alta precisão",
            "Dureza",
            "Rugosidade"
        ],
        correct: 2,
        hint: "Ferramenta de medição mais precisa que o paquímetro"
    },
    {
        id: 24,
        difficulty: "easy",
        question: "Qual o processo de união de metais por fusão localizada?",
        options: [
            "Brasagem",
            "Soldagem",
            "Rebitagem",
            "Colagem",
            "Aparafusamento"
        ],
        correct: 1,
        hint: "Usa eletrodo ou arame consumível e alta temperatura"
    },
    {
        id: 25,
        difficulty: "easy",
        question: "O que é um 'eixo' em engenharia mecânica?",
        options: [
            "Linha imaginária de referência",
            "Componente cilíndrico que transmite rotação",
            "Ferramenta de corte",
            "Sistema de coordenadas",
            "Tipo de rolamento"
        ],
        correct: 1,
        hint: "Componente rotativo que pode transmitir potência"
    },
    {
        id: 26,
        difficulty: "easy",
        question: "Qual ferramenta manual é usada para fazer roscas internas?",
        options: [
            "Macho",
            "Cossinete",
            "Broca",
            "Alargador",
            "Escareador"
        ],
        correct: 0,
        hint: "Usado em conjunto com um desandador"
    },
    {
        id: 27,
        difficulty: "easy",
        question: "O que significa 'RPM'?",
        options: [
            "Rotações Por Minuto",
            "Resistência Por Material",
            "Raio Por Metro",
            "Revolução Por Máquina",
            "Rosca Por Milímetro"
        ],
        correct: 0,
        hint: "Unidade que mede velocidade de rotação"
    },
    {
        id: 28,
        difficulty: "easy",
        question: "Qual o nome do processo de fabricar peças derramando metal líquido em molde?",
        options: [
            "Forjamento",
            "Fundição",
            "Estampagem",
            "Trefilação",
            "Extrusão"
        ],
        correct: 1,
        hint: "Usado para peças complexas, como blocos de motor"
    },
    {
        id: 29,
        difficulty: "easy",
        question: "No SolidWorks, o que é uma 'montagem' (Assembly)?",
        options: [
            "Uma peça única",
            "Conjunto de peças relacionadas",
            "Um desenho 2D",
            "Uma simulação",
            "Um arquivo de backup"
        ],
        correct: 1,
        hint: "Onde se juntam várias peças para formar um produto"
    },
    {
        id: 30,
        difficulty: "easy",
        question: "Qual a principal característica do alumínio?",
        options: [
            "Alta densidade",
            "Baixa condutividade",
            "Leveza e resistência à corrosão",
            "Magnetismo forte",
            "Baixo ponto de fusão comparado a plásticos"
        ],
        correct: 2,
        hint: "Metal leve muito usado em aplicações aeroespaciais"
    },
    {
        id: 31,
        difficulty: "easy",
        question: "O que é uma 'chaveta'?",
        options: [
            "Tipo de parafuso",
            "Elemento que transmite torque entre eixo e cubo",
            "Ferramenta de medição",
            "Tipo de rolamento",
            "Acabamento superficial"
        ],
        correct: 1,
        hint: "Encaixa em rasgos tanto no eixo quanto no componente montado"
    },
    {
        id: 32,
        difficulty: "easy",
        question: "Qual comando cria uma peça girando um perfil em torno de um eixo?",
        options: [
            "Extrude",
            "Revolve",
            "Sweep",
            "Loft",
            "Shell"
        ],
        correct: 1,
        hint: "Usado para criar peças cilíndricas ou cônicas"
    },
    {
        id: 33,
        difficulty: "easy",
        question: "O que é 'fresamento'?",
        options: [
            "Processo de soldagem",
            "Usinagem com ferramenta rotativa de múltiplos cortes",
            "Tratamento térmico",
            "Processo de fundição",
            "Medição de temperatura"
        ],
        correct: 1,
        hint: "Feito em uma fresadora, a ferramenta gira e a peça é fixada"
    },
    {
        id: 34,
        difficulty: "easy",
        question: "Qual a escala mais comum para desenhos mecânicos de peças pequenas?",
        options: [
            "1:1 (tamanho real)",
            "1:10 (reduzido)",
            "2:1 (ampliado)",
            "1:100 (muito reduzido)",
            "10:1 (muito ampliado)"
        ],
        correct: 0,
        hint: "Para peças pequenas, geralmente usa-se o tamanho natural"
    },
    {
        id: 35,
        difficulty: "easy",
        question: "O que é um 'prisioneiro'?",
        options: [
            "Tipo de porca",
            "Parafuso sem cabeça, rosqueado em ambas as pontas",
            "Tipo de chaveta",
            "Elemento de vedação",
            "Ferramenta de fixação"
        ],
        correct: 1,
        hint: "Parafuso que fica 'preso' em um dos componentes"
    },
    {
        id: 36,
        difficulty: "easy",
        question: "Qual o símbolo para 'raio' em desenho técnico?",
        options: [
            "D",
            "Ø",
            "R",
            "L",
            "C"
        ],
        correct: 2,
        hint: "É simplesmente a primeira letra da palavra"
    },
    {
        id: 37,
        difficulty: "easy",
        question: "O que é 'rosca à direita'?",
        options: [
            "Rosca que aperta girando no sentido horário",
            "Rosca localizada no lado direito",
            "Rosca com passo para direita",
            "Rosca feita em torno à direita",
            "Rosca de 90 graus"
        ],
        correct: 0,
        hint: "É o padrão mais comum, como parafusos normais"
    },
    {
        id: 38,
        difficulty: "easy",
        question: "Qual material é um aço inoxidável austenítico comum?",
        options: [
            "AISI 1020",
            "AISI 304",
            "AISI 4140",
            "AISI D2",
            "AISI 1045"
        ],
        correct: 1,
        hint: "Muito usado em equipamentos de cozinha e químicos"
    },
    {
        id: 39,
        difficulty: "easy",
        question: "No SolidWorks, qual vista mostra a peça de cima?",
        options: [
            "Vista Frontal",
            "Vista Lateral",
            "Vista Superior",
            "Vista Isométrica",
            "Vista em Corte"
        ],
        correct: 2,
        hint: "A resposta está no próprio nome da direção"
    },
    {
        id: 40,
        difficulty: "easy",
        question: "O que é um 'O-ring'?",
        options: [
            "Tipo de rolamento",
            "Anel de vedação elastomérico",
            "Parafuso circular",
            "Ferramenta de medição",
            "Tipo de rosca"
        ],
        correct: 1,
        hint: "Usado para vedar fluidos, tem formato de anel"
    },

    // ============================================
    // PERGUNTAS MÉDIAS (41-75)
    // ============================================
    {
        id: 41,
        difficulty: "medium",
        question: "O que significa o ajuste H7/g6 em um eixo-furo?",
        options: [
            "Ajuste com folga",
            "Ajuste com interferência",
            "Ajuste incerto",
            "Ajuste deslizante",
            "Ajuste de precisão extrema"
        ],
        correct: 0,
        hint: "A letra minúscula abaixo de 'h' indica folga"
    },
    {
        id: 42,
        difficulty: "medium",
        question: "Qual tratamento térmico aumenta a dureza superficial do aço por difusão de carbono?",
        options: [
            "Têmpera",
            "Revenimento",
            "Normalização",
            "Cementação",
            "Recozimento"
        ],
        correct: 3,
        hint: "Adiciona carbono na superfície da peça"
    },
    {
        id: 43,
        difficulty: "medium",
        question: "Qual o símbolo GD&T para 'perpendicularidade'?",
        options: [
            "//",
            "⊥",
            "○",
            "⌒",
            "∠"
        ],
        correct: 1,
        hint: "É o símbolo matemático de perpendicular"
    },
    {
        id: 44,
        difficulty: "medium",
        question: "Em um rolamento 6205, o que significa '6205'?",
        options: [
            "Diâmetro interno de 62,05 mm",
            "Código que indica tipo e dimensões",
            "Carga máxima de 6205 N",
            "Rotação máxima de 6205 RPM",
            "Ano de fabricação 1962/05"
        ],
        correct: 1,
        hint: "É um código padronizado SKF/ISO que indica série, tipo e diâmetro"
    },
    {
        id: 45,
        difficulty: "medium",
        question: "Qual o processo de conformação plástica que usa matriz fechada?",
        options: [
            "Laminação",
            "Forjamento em matriz",
            "Trefilação",
            "Extrusão",
            "Estampagem"
        ],
        correct: 1,
        hint: "A peça é comprimida entre duas matrizes"
    },
    {
        id: 46,
        difficulty: "medium",
        question: "O que é o 'limite de escoamento' de um material?",
        options: [
            "Tensão onde o material rompe",
            "Tensão onde inicia deformação plástica permanente",
            "Máxima deformação elástica",
            "Temperatura de fusão",
            "Dureza máxima"
        ],
        correct: 1,
        hint: "Ponto onde o material não volta mais à forma original"
    },
    {
        id: 47,
        difficulty: "medium",
        question: "Qual norma define tolerâncias geométricas internacionalmente?",
        options: [
            "ISO 9001",
            "ASME Y14.5",
            "ISO 2768",
            "DIN 406",
            "ABNT NBR 6409"
        ],
        correct: 1,
        hint: "É a norma americana, muito usada mundialmente para GD&T"
    },
    {
        id: 48,
        difficulty: "medium",
        question: "O que é 'dureza Rockwell C' (HRC)?",
        options: [
            "Medição com esfera de aço",
            "Medição com cone de diamante",
            "Medição com pirâmide de diamante",
            "Medição por risco",
            "Medição por impacto"
        ],
        correct: 1,
        hint: "Usa um penetrador cônico de diamante Brale"
    },
    {
        id: 49,
        difficulty: "medium",
        question: "Qual tipo de rosca é usada em tubulações hidráulicas no Brasil?",
        options: [
            "Métrica (M)",
            "Whitworth/BSP",
            "UNC",
            "NPT",
            "ACME"
        ],
        correct: 1,
        hint: "Sistema inglês muito comum em hidráulica"
    },
    {
        id: 50,
        difficulty: "medium",
        question: "O que é 'momento fletor'?",
        options: [
            "Força de torção em eixo",
            "Momento que tende a flexionar uma viga",
            "Velocidade angular",
            "Pressão em fluidos",
            "Deformação por cisalhamento"
        ],
        correct: 1,
        hint: "Causa flexão em vigas, como uma pessoa sobre uma tábua"
    },
    {
        id: 51,
        difficulty: "medium",
        question: "No SolidWorks, o que são 'Configurações'?",
        options: [
            "Ajustes do software",
            "Variações de uma mesma peça no mesmo arquivo",
            "Tipos de montagem",
            "Formatos de exportação",
            "Permissões de usuário"
        ],
        correct: 1,
        hint: "Permite ter múltiplas versões de dimensões na mesma peça"
    },
    {
        id: 52,
        difficulty: "medium",
        question: "Qual o aço carbono médio mais usado para eixos e engrenagens?",
        options: [
            "AISI 1020",
            "AISI 1045",
            "AISI 4340",
            "AISI 304",
            "AISI D2"
        ],
        correct: 1,
        hint: "Tem 0,45% de carbono aproximadamente"
    },
    {
        id: 53,
        difficulty: "medium",
        question: "O que é 'estampagem profunda' (deep drawing)?",
        options: [
            "Corte de chapas grossas",
            "Conformação de chapas em formas côncavas",
            "Soldagem profunda",
            "Usinagem de furos profundos",
            "Tratamento superficial"
        ],
        correct: 1,
        hint: "Processo usado para fazer panelas, latas, etc"
    },
    {
        id: 54,
        difficulty: "medium",
        question: "Qual propriedade mede a capacidade de um material se deformar plasticamente?",
        options: [
            "Dureza",
            "Resiliência",
            "Ductilidade",
            "Tenacidade",
            "Elasticidade"
        ],
        correct: 2,
        hint: "Materiais com alta ductilidade podem ser esticados em fios"
    },
    {
        id: 55,
        difficulty: "medium",
        question: "O que é uma 'engrenagem cônica'?",
        options: [
            "Engrenagem cilíndrica",
            "Engrenagem para eixos concorrentes",
            "Engrenagem helicoidal",
            "Engrenagem sem-fim",
            "Engrenagem planetária"
        ],
        correct: 1,
        hint: "Usada quando os eixos se encontram em ângulo, como em diferenciais"
    },
    {
        id: 56,
        difficulty: "medium",
        question: "Qual o processo de fabricação de injeção plástica?",
        options: [
            "Metal fundido em molde",
            "Plástico derretido injetado sob pressão em molde",
            "Conformação de chapas",
            "Usinagem de polímeros",
            "Impressão 3D"
        ],
        correct: 1,
        hint: "Processo usado para fazer a maioria das peças plásticas"
    },
    {
        id: 57,
        difficulty: "medium",
        question: "O que é 'paralelismo' em GD&T?",
        options: [
            "Duas superfícies a 90 graus",
            "Superfície equidistante de uma referência",
            "Superfície plana",
            "Cilindro perfeito",
            "Simetria de perfil"
        ],
        correct: 1,
        hint: "Controla se uma superfície é paralela a outra"
    },
    {
        id: 58,
        difficulty: "medium",
        question: "Qual o nome do processo de união de metais abaixo do ponto de fusão?",
        options: [
            "Soldagem",
            "Brasagem",
            "Fundição",
            "Forjamento",
            "Cementação"
        ],
        correct: 1,
        hint: "Usa metal de adição com ponto de fusão mais baixo"
    },
    {
        id: 59,
        difficulty: "medium",
        question: "O que é um 'acoplamento' em transmissão mecânica?",
        options: [
            "Elemento que une dois eixos para transmitir torque",
            "Tipo de rolamento",
            "Sistema de engrenagens",
            "Tipo de chaveta",
            "Freio mecânico"
        ],
        correct: 0,
        hint: "Conecta eixos, podendo ser rígido ou flexível"
    },
    {
        id: 60,
        difficulty: "medium",
        question: "Qual tipo de ferro fundido tem grafita em forma esferoidal?",
        options: [
            "Ferro fundido cinzento",
            "Ferro fundido branco",
            "Ferro fundido nodular",
            "Ferro fundido maleável",
            "Ferro fundido vermicular"
        ],
        correct: 2,
        hint: "Também chamado de 'ductil', tem melhor resistência mecânica"
    },
    {
        id: 61,
        difficulty: "medium",
        question: "O que é 'rugosidade superficial'?",
        options: [
            "Dureza da superfície",
            "Irregularidades microscópicas da superfície",
            "Cor da superfície",
            "Tratamento térmico",
            "Resistência à corrosão"
        ],
        correct: 1,
        hint: "Medida das ondulações e picos na superfície da peça"
    },
    {
        id: 62,
        difficulty: "medium",
        question: "No SolidWorks PDM, o que é um 'workflow'?",
        options: [
            "Tipo de montagem",
            "Fluxo de aprovação de documentos",
            "Comando de modelagem",
            "Tipo de arquivo",
            "Sistema de unidades"
        ],
        correct: 1,
        hint: "Define etapas de revisão e aprovação de arquivos"
    },
    {
        id: 63,
        difficulty: "medium",
        question: "Qual a diferença entre AISI 304 e AISI 316?",
        options: [
            "316 tem molibdênio, mais resistente à corrosão",
            "304 é mais duro",
            "316 é magnético",
            "304 tem mais carbono",
            "Não há diferença"
        ],
        correct: 0,
        hint: "O 316 é usado em ambientes marítimos e químicos"
    },
    {
        id: 64,
        difficulty: "medium",
        question: "O que é 'torque'?",
        options: [
            "Força linear",
            "Momento de força rotacional",
            "Velocidade angular",
            "Pressão de fluido",
            "Deformação elástica"
        ],
        correct: 1,
        hint: "É força multiplicada pela distância ao centro de rotação"
    },
    {
        id: 65,
        difficulty: "medium",
        question: "Qual processo produz peças longas de seção constante empurrando material por matriz?",
        options: [
            "Laminação",
            "Trefilação",
            "Extrusão",
            "Forjamento",
            "Estampagem"
        ],
        correct: 2,
        hint: "Usado para perfis de alumínio e macarrão!"
    },
    {
        id: 66,
        difficulty: "medium",
        question: "O que é 'anodização'?",
        options: [
            "Tratamento térmico",
            "Tratamento superficial eletrolítico para alumínio",
            "Processo de soldagem",
            "Tipo de pintura",
            "Processo de usinagem"
        ],
        correct: 1,
        hint: "Cria camada protetora de óxido em alumínio, pode ser colorida"
    },
    {
        id: 67,
        difficulty: "medium",
        question: "Qual o símbolo GD&T para 'planicidade'?",
        options: [
            "○",
            "⏤",
            "◇",
            "⌓",
            "▭"
        ],
        correct: 2,
        hint: "É um paralelogramo/losango"
    },
    {
        id: 68,
        difficulty: "medium",
        question: "O que é uma 'correia dentada'?",
        options: [
            "Correia lisa",
            "Correia com dentes que engatam em polias",
            "Corrente metálica",
            "Correia em V",
            "Cabo de aço"
        ],
        correct: 1,
        hint: "Transmite movimento sem deslizamento, usada em motores automotivos"
    },
    {
        id: 69,
        difficulty: "medium",
        question: "Qual aço de alta liga é usado em ferramentas de corte?",
        options: [
            "AISI 1020",
            "AISI 304",
            "AISI D2",
            "AISI 1045",
            "AISI 316"
        ],
        correct: 2,
        hint: "É um aço ferramenta com alto cromo"
    },
    {
        id: 70,
        difficulty: "medium",
        question: "O que é 'concentração de tensões'?",
        options: [
            "Tensão uniforme",
            "Aumento localizado de tensão em mudanças de geometria",
            "Pressão de fluidos",
            "Força distribuída",
            "Deformação elástica"
        ],
        correct: 1,
        hint: "Ocorre em cantos vivos, furos e mudanças bruscas de seção"
    },
    {
        id: 71,
        difficulty: "medium",
        question: "No SolidWorks, o que é uma 'tabela de projetos' (Design Table)?",
        options: [
            "Tabela de propriedades",
            "Excel que controla configurações parametricamente",
            "Lista de materiais",
            "Tabela de furos",
            "Cronograma de projeto"
        ],
        correct: 1,
        hint: "Usa Excel para criar múltiplas configurações automaticamente"
    },
    {
        id: 72,
        difficulty: "medium",
        question: "Qual o princípio de funcionamento de um 'freio a disco'?",
        options: [
            "Atrito entre pastilhas e disco",
            "Sistema hidráulico de travamento",
            "Freio eletromagnético",
            "Freio por resistência do ar",
            "Sistema de engrenagens"
        ],
        correct: 0,
        hint: "Converte energia cinética em calor por atrito"
    },
    {
        id: 73,
        difficulty: "medium",
        question: "O que é 'trefilação'?",
        options: [
            "Corte de chapas",
            "Puxar material através de matriz para reduzir seção",
            "Processo de fundição",
            "Tratamento térmico",
            "Processo de soldagem"
        ],
        correct: 1,
        hint: "Usado para fabricar arames e fios"
    },
    {
        id: 74,
        difficulty: "medium",
        question: "Qual norma define tolerâncias gerais de usinagem?",
        options: [
            "ISO 9001",
            "ISO 2768",
            "ASME Y14.5",
            "AWS D1.1",
            "ISO 14001"
        ],
        correct: 1,
        hint: "Define classes fina (f), média (m), grosseira (c)"
    },
    {
        id: 75,
        difficulty: "medium",
        question: "O que é um 'anel elástico' (anel de retenção)?",
        options: [
            "Tipo de mola",
            "Anel que encaixa em ranhura para fixação axial",
            "O-ring de vedação",
            "Arruela",
            "Porca de trava"
        ],
        correct: 1,
        hint: "Usado para segurar rolamentos e componentes em eixos"
    },

    // ============================================
    // PERGUNTAS DIFÍCEIS (76-100)
    // ============================================
    {
        id: 76,
        difficulty: "hard",
        question: "O que significa MMC (Maximum Material Condition) em GD&T?",
        options: [
            "Máxima condição de montagem",
            "Condição de máximo material (furo menor, eixo maior)",
            "Mínimo material crítico",
            "Material metálico comum",
            "Margem de manufatura crítica"
        ],
        correct: 1,
        hint: "Quando a peça tem máximo material: furo no mínimo, eixo no máximo"
    },
    {
        id: 77,
        difficulty: "hard",
        question: "Qual a fórmula da tensão de cisalhamento pura?",
        options: [
            "τ = F/A",
            "τ = M/Z",
            "τ = T·r/J",
            "τ = E·ε",
            "τ = P/A"
        ],
        correct: 0,
        hint: "Força tangencial dividida pela área"
    },
    {
        id: 78,
        difficulty: "hard",
        question: "O que é o diagrama TTT (Temperatura-Tempo-Transformação)?",
        options: [
            "Gráfico de resistência mecânica",
            "Curvas de transformação de fases durante resfriamento",
            "Tabela de tolerâncias",
            "Diagrama de tensões",
            "Cronograma de projeto"
        ],
        correct: 1,
        hint: "Usado para definir tratamentos térmicos e microestruturas"
    },
    {
        id: 79,
        difficulty: "hard",
        question: "Qual o modificador GD&T que permite 'bonus tolerance'?",
        options: [
            "LMC",
            "RFS",
            "MMC",
            "RMB",
            "FSC"
        ],
        correct: 2,
        hint: "Quando aplicado, permite tolerância adicional conforme o desvio de tamanho"
    },
    {
        id: 80,
        difficulty: "hard",
        question: "O que é 'fadiga de contato' (pitting)?",
        options: [
            "Corrosão química",
            "Falha por destacamento superficial devido a tensões cíclicas",
            "Desgaste abrasivo",
            "Fratura frágil",
            "Deformação plástica"
        ],
        correct: 1,
        hint: "Comum em dentes de engrenagens e pistas de rolamentos"
    },
    {
        id: 81,
        difficulty: "hard",
        question: "Qual a diferença entre têmpera e revenimento?",
        options: [
            "Têmpera resfria rápido (martensita), revenimento aquece moderadamente (reduz fragilidade)",
            "São o mesmo processo",
            "Revenimento é mais rápido",
            "Têmpera é para alumínio",
            "Revenimento aumenta dureza"
        ],
        correct: 0,
        hint: "Têmpera endurece muito mas fica frágil; revenimento ajusta propriedades"
    },
    {
        id: 82,
        difficulty: "hard",
        question: "O que é 'perfil de linha' em GD&T?",
        options: [
            "Controla forma de superfície 2D",
            "Controla forma de uma linha/contorno 2D",
            "Controla rugosidade",
            "Controla planicidade",
            "Controla paralelismo"
        ],
        correct: 1,
        hint: "É um dos controles de forma mais versáteis do GD&T"
    },
    {
        id: 83,
        difficulty: "hard",
        question: "Qual a microestrutura resultante de resfriamento rápido de aço de alto carbono?",
        options: [
            "Ferrita",
            "Perlita",
            "Martensita",
            "Austenita",
            "Bainita"
        ],
        correct: 2,
        hint: "Estrutura muito dura e frágil, agulhas supersaturadas de carbono"
    },
    {
        id: 84,
        difficulty: "hard",
        question: "Como calcular momento de inércia de seção circular cheia (I)?",
        options: [
            "I = π·d⁴/64",
            "I = π·d³/32",
            "I = π·d²/4",
            "I = π·d⁴/32",
            "I = d⁴/12"
        ],
        correct: 0,
        hint: "Para eixos sólidos, usa diâmetro elevado à quarta potência"
    },
    {
        id: 85,
        difficulty: "hard",
        question: "O que é LMC (Least Material Condition)?",
        options: [
            "Condição de mínimo material (furo maior, eixo menor)",
            "Limite mínimo de carga",
            "Condição de máximo material",
            "Lubrificação mínima crítica",
            "Limite de medição calibrada"
        ],
        correct: 0,
        hint: "Oposto de MMC: furo no máximo diâmetro, eixo no mínimo"
    },
    {
        id: 86,
        difficulty: "hard",
        question: "Qual o critério de falha para materiais dúcteis sob carga estática?",
        options: [
            "Critério de Coulomb",
            "Critério de von Mises",
            "Critério de Griffith",
            "Critério de Goodman",
            "Critério de Paris"
        ],
        correct: 1,
        hint: "Também chamado de teoria da energia de distorção"
    },
    {
        id: 87,
        difficulty: "hard",
        question: "O que é 'runout' (batimento) em GD&T?",
        options: [
            "Erro de paralelismo",
            "Variação de posição durante rotação completa",
            "Erro de perpendicularidade",
            "Rugosidade superficial",
            "Erro de forma"
        ],
        correct: 1,
        hint: "Mede quanto uma superfície 'bate' ao girar em torno de um eixo datum"
    },
    {
        id: 88,
        difficulty: "hard",
        question: "Qual a norma AWS para qualificação de procedimentos de soldagem?",
        options: [
            "AWS D1.1",
            "AWS A2.4",
            "AWS B1.10",
            "AWS C5.1",
            "AWS G2.3"
        ],
        correct: 0,
        hint: "É a norma estrutural de soldagem mais usada"
    },
    {
        id: 89,
        difficulty: "hard",
        question: "O que é 'fluência' (creep) em materiais?",
        options: [
            "Deformação instantânea",
            "Deformação plástica lenta sob carga constante em alta temperatura",
            "Corrosão acelerada",
            "Fadiga térmica",
            "Expansão térmica"
        ],
        correct: 1,
        hint: "Problema em turbinas e caldeiras que operam em altas temperaturas"
    },
    {
        id: 90,
        difficulty: "hard",
        question: "Como é calculada a tensão de flexão máxima em viga?",
        options: [
            "σ = M·c/I",
            "σ = F/A",
            "σ = T/J",
            "σ = P·L/A",
            "σ = E·ε"
        ],
        correct: 0,
        hint: "Momento fletor vezes distância ao eixo neutro, dividido por momento de inércia"
    },
    {
        id: 91,
        difficulty: "hard",
        question: "O que é 'datum reference frame' em GD&T?",
        options: [
            "Sistema de coordenadas cartesiano 3D estabelecido por datums",
            "Moldura de referência de desenho",
            "Sistema de tolerâncias",
            "Frame de montagem",
            "Estrutura de suporte"
        ],
        correct: 0,
        hint: "Estabelece origem e orientação para medição de tolerâncias geométricas"
    },
    {
        id: 92,
        difficulty: "hard",
        question: "Qual a principal diferença entre austenita e martensita?",
        options: [
            "Austenita é CFC estável em alta T; martensita é TCC supersaturada dura",
            "São a mesma coisa",
            "Austenita é mais dura",
            "Martensita é mais dúctil",
            "Austenita é magnética"
        ],
        correct: 0,
        hint: "Austenita é estável a quente e não magnética; martensita é produto de têmpera"
    },
    {
        id: 93,
        difficulty: "hard",
        question: "O que é análise de elementos finitos (FEA/MEF)?",
        options: [
            "Análise química de materiais",
            "Método numérico que divide estrutura em pequenos elementos para análise",
            "Análise de custos",
            "Método de inspeção visual",
            "Análise de tolerâncias"
        ],
        correct: 1,
        hint: "Usado para simular tensões, deformações e comportamento estrutural"
    },
    {
        id: 94,
        difficulty: "hard",
        question: "Qual o fator de concentração de tensão (Kt) em furo circular em chapa plana infinita?",
        options: [
            "Kt = 1",
            "Kt = 2",
            "Kt = 3",
            "Kt = 4",
            "Kt = 5"
        ],
        correct: 2,
        hint: "É um valor teórico clássico para furos sob tração"
    },
    {
        id: 95,
        difficulty: "hard",
        question: "O que é a 'lei de Paris' em fadiga?",
        options: [
            "Lei de corrosão",
            "Equação de propagação de trinca por fadiga (da/dN)",
            "Lei de deformação plástica",
            "Lei de transferência de calor",
            "Lei de atrito"
        ],
        correct: 1,
        hint: "Relaciona taxa de crescimento de trinca com amplitude de tensão"
    },
    {
        id: 96,
        difficulty: "hard",
        question: "O que é 'position tolerance' com MMC em GD&T?",
        options: [
            "Controla posição de features com bonus tolerance conforme tamanho real",
            "Tolerância de paralelismo",
            "Tolerância dimensional",
            "Tolerância de forma",
            "Tolerância de acabamento"
        ],
        correct: 0,
        hint: "Muito usado para padrões de furos, permite mais tolerância se furos forem maiores"
    },
    {
        id: 97,
        difficulty: "hard",
        question: "Qual o módulo de elasticidade (E) aproximado do aço?",
        options: [
            "70 GPa",
            "110 GPa",
            "210 GPa",
            "310 GPa",
            "410 GPa"
        ],
        correct: 2,
        hint: "Aproximadamente 210 GigaPascal ou 30 milhões de PSI"
    },
    {
        id: 98,
        difficulty: "hard",
        question: "O que caracteriza o aço AISI 4340?",
        options: [
            "Aço baixa liga comum",
            "Aço liga Ni-Cr-Mo de alta resistência para aplicações críticas",
            "Aço inoxidável",
            "Aço ferramenta",
            "Aço rápido"
        ],
        correct: 1,
        hint: "Usado em eixos virabrequim, peças aeroespaciais, altíssima resistência"
    },
    {
        id: 99,
        difficulty: "hard",
        question: "O que é 'composição química de zona afetada pelo calor' (ZAC/HAZ)?",
        options: [
            "Zona soldada",
            "Região próxima à solda que sofreu alteração metalúrgica",
            "Metal de adição",
            "Zona de corrosão",
            "Região tratada termicamente"
        ],
        correct: 1,
        hint: "Região não fundida mas afetada pelo calor da soldagem"
    },
    {
        id: 100,
        difficulty: "hard",
        question: "Qual o objetivo principal de análise modal em FEA?",
        options: [
            "Calcular tensões estáticas",
            "Determinar frequências naturais e modos de vibração",
            "Analisar corrosão",
            "Calcular custos",
            "Otimizar peso"
        ],
        correct: 1,
        hint: "Fundamental para evitar ressonância em estruturas dinâmicas"
    }
];

// Embaralhar array (função auxiliar para o jogo)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Exportar para uso no script principal
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { questions, shuffleArray };
}
