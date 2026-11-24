// Elementos da tela
const canvas = document.getElementById("canvas-jogo");
const ctx = canvas.getContext("2d");

const textoRodada = document.getElementById("texto-rodada");
const textoVidas = document.getElementById("texto-vidas");
const textoPontos = document.getElementById("texto-pontos");
const textoMissao = document.getElementById("texto-missao");
const caixaFeedback = document.getElementById("caixa-feedback");
const textoFeedback = document.getElementById("texto-feedback");

const telaInicio = document.getElementById("tela-inicio");
const telaFim = document.getElementById("tela-fim");
const tituloFim = document.getElementById("titulo-fim");
const resumoFim = document.getElementById("resumo-fim");
const pontosFinais = document.getElementById("pontos-finais");

const btnIniciar = document.getElementById("btn-iniciar");
const btnReiniciar = document.getElementById("btn-reiniciar");
const btnTema = document.getElementById("btn-tema");
const botoesSeta = document.querySelectorAll(".btn-seta");

// Configurações do labirinto (12 colunas x 12 linhas, cada bloco tem 40px)
const TAMANHO_GRADE = 12;
const TAMANHO_BLOCO = canvas.width / TAMANHO_GRADE;
const TOTAL_RODADAS = 8;

// Mapa da Biblioteca Mágica: 1 = estante de livros (parede), 0 = corredor
const MAPA = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// Banco de 8 rodadas com dificuldade progressiva
const DESAFIOS = [
  {
    alvoClasse: "VERBO",
    instrucao: "Coma um VERBO (ação)",
    livros: [
      { palavra: "CORRER", classe: "VERBO", motivo: "'Correr' indica uma ação, por isso é um verbo." },
      { palavra: "LIVRO", classe: "SUBSTANTIVO", motivo: "'Livro' é o nome de um objeto, então é um substantivo." },
      { palavra: "AZUL", classe: "ADJETIVO", motivo: "'Azul' dá uma característica, por isso é um adjetivo." }
    ]
  },
  {
    alvoClasse: "SUBSTANTIVO",
    instrucao: "Coma um SUBSTANTIVO (nome de ser ou coisa)",
    livros: [
      { palavra: "CASTELO", classe: "SUBSTANTIVO", motivo: "'Castelo' dá nome a um lugar/construção, sendo um substantivo." },
      { palavra: "PULAR", classe: "VERBO", motivo: "'Pular' expressa uma ação, portanto é um verbo." },
      { palavra: "RÁPIDO", classe: "ADJETIVO", motivo: "'Rápido' qualifica algo ou alguém, então é um adjetivo." }
    ]
  },
  {
    alvoClasse: "ADJETIVO",
    instrucao: "Coma um ADJETIVO (qualidade)",
    livros: [
      { palavra: "MÁGICO", classe: "ADJETIVO", motivo: "'Mágico' atribui uma qualidade, por isso é um adjetivo." },
      { palavra: "ESCOLA", classe: "SUBSTANTIVO", motivo: "'Escola' é o nome de um lugar, logo é um substantivo." },
      { palavra: "CANTAR", classe: "VERBO", motivo: "'Cantar' mostra uma ação, sendo um verbo." }
    ]
  },
  {
    alvoClasse: "VERBO",
    instrucao: "Coma um VERBO (ação ou estado)",
    livros: [
      { palavra: "ESTUDAR", classe: "VERBO", motivo: "'Estudar' representa uma ação praticada por alguém." },
      { palavra: "CADERNO", classe: "SUBSTANTIVO", motivo: "'Caderno' dá nome a um material escolar (substantivo)." },
      { palavra: "ALEGRE", classe: "ADJETIVO", motivo: "'Alegre' descreve como alguém está (adjetivo)." }
    ]
  },
  {
    alvoClasse: "ADJETIVO",
    instrucao: "Coma um ADJETIVO (característica)",
    livros: [
      { palavra: "ANTIGO", classe: "ADJETIVO", motivo: "'Antigo' caracteriza um objeto ou lugar (adjetivo)." },
      { palavra: "ESTANTE", classe: "SUBSTANTIVO", motivo: "'Estante' é o nome de um móvel (substantivo)." },
      { palavra: "ESCREVER", classe: "VERBO", motivo: "'Escrever' indica uma ação (verbo)." }
    ]
  },
  {
    alvoClasse: "SUBSTANTIVO",
    instrucao: "Coma um SUBSTANTIVO (nome)",
    livros: [
      { palavra: "CORAGEM", classe: "SUBSTANTIVO", motivo: "'Coragem' é um substantivo abstrato que dá nome a um sentimento." },
      { palavra: "VALENTE", classe: "ADJETIVO", motivo: "'Valente' é uma qualidade de quem tem coragem (adjetivo)." },
      { palavra: "SONHAR", classe: "VERBO", motivo: "'Sonhar' expressa uma ação da mente (verbo)." }
    ]
  },
  {
    alvoClasse: "VERBO",
    instrucao: "Coma um VERBO (cuidado com as pegadinhas!)",
    livros: [
      { palavra: "DESCOBRIR", classe: "VERBO", motivo: "'Descobrir' é uma ação, portanto é um verbo." },
      { palavra: "DESCOBERTA", classe: "SUBSTANTIVO", motivo: "'Descoberta' dá nome ao resultado da ação (substantivo)." },
      { palavra: "CURIOSO", classe: "ADJETIVO", motivo: "'Curioso' é uma característica de alguém (adjetivo)." }
    ]
  },
  {
    alvoClasse: "ADJETIVO",
    instrucao: "Rodada Final! Coma um ADJETIVO",
    livros: [
      { palavra: "BRILHANTE", classe: "ADJETIVO", motivo: "'Brilhante' qualifica algo que brilha, sendo um adjetivo." },
      { palavra: "BRILHO", classe: "SUBSTANTIVO", motivo: "'Brilho' é o nome dado à luz emitida (substantivo)." },
      { palavra: "BRILHAR", classe: "VERBO", motivo: "'Brilhar' indica a ação de emitir luz (verbo)." }
    ]
  }
];

// Posições livres no labirinto para espalhar os 3 livros longe do jogador
const PONTOS_LIVROS = [
  { x: 9, y: 1 },
  { x: 10, y: 10 },
  { x: 1, y: 10 },
  { x: 6, y: 5 },
  { x: 9, y: 6 }
];

// Estado atual do jogo
let estado = {
  jogando: false,
  rodadaAtual: 0,
  vidas: 3,
  pontos: 0,
  tempoInicio: 0,
  jogador: { x: 1, y: 1, direcao: "direita", bocaAberta: true },
  livrosNaTela: []
};

// Cores dos livros espalhados
const CORES_LIVROS = ["#e11d48", "#2563eb", "#059669"];

// Verifica se o usuário prefere menos animações no sistema
const prefereMenosAnimacao = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Embaralha uma lista de itens
function embaralhar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// Inicia ou reinicia a partida
function iniciarJogo() {
  estado.jogando = true;
  estado.rodadaAtual = 0;
  estado.vidas = 3;
  estado.pontos = 0;
  estado.tempoInicio = Date.now();

  telaInicio.hidden = true;
  telaFim.hidden = true;

  atualizarPainel();
  carregarRodada();
  notificarAlturaPortal();
}

// Prepara os livros e o jogador para a rodada atual
function carregarRodada() {
  const desafio = DESAFIOS[estado.rodadaAtual];
  estado.jogador = { x: 1, y: 1, direcao: "direita", bocaAberta: true };

  // Escolhe 3 posições diferentes e mistura os livros
  const posicoesEscolhidas = embaralhar(PONTOS_LIVROS).slice(0, 3);
  const livrosMisturados = embaralhar(desafio.livros);

  estado.livrosNaTela = livrosMisturados.map((livro, indice) => ({
    ...livro,
    x: posicoesEscolhidas[indice].x,
    y: posicoesEscolhidas[indice].y,
    cor: CORES_LIVROS[indice]
  }));

  textoMissao.innerHTML = `Missão: <strong>${desafio.instrucao}</strong>`;
  atualizarPainel();
  desenharJogo();
}

// Atualiza textos de rodada, vidas e pontos na tela
function atualizarPainel() {
  textoRodada.textContent = `${estado.rodadaAtual + 1} / ${TOTAL_RODADAS}`;
  textoVidas.textContent = "❤️".repeat(Math.max(0, estado.vidas)) || "💔";
  textoVidas.setAttribute("aria-label", `${estado.vidas} vidas restantes`);
  textoPontos.textContent = estado.pontos;
}

// Mostra a explicação educativa de acerto ou erro
function mostrarFeedback(tipo, mensagem) {
  caixaFeedback.className = `painel-feedback ${tipo}`;
  textoFeedback.textContent = mensagem;
}

// Movimenta o Papa-Livros pelo labirinto
function moverJogador(direcao) {
  if (!estado.jogando) return;

  let novoX = estado.jogador.x;
  let novoY = estado.jogador.y;

  if (direcao === "cima") novoY -= 1;
  if (direcao === "baixo") novoY += 1;
  if (direcao === "esquerda") novoX -= 1;
  if (direcao === "direita") novoX += 1;

  estado.jogador.direcao = direcao;

  // Verifica se o próximo espaço não é uma estante (parede = 1)
  if (MAPA[novoY] && MAPA[novoY][novoX] === 0) {
    estado.jogador.x = novoX;
    estado.jogador.y = novoY;

    if (!prefereMenosAnimacao) {
      estado.jogador.bocaAberta = !estado.jogador.bocaAberta;
    }

    verificarColisaoLivro();
  }

  desenharJogo();
}

// Verifica se o jogador encostou em algum livro
function verificarColisaoLivro() {
  const indiceLivro = estado.livrosNaTela.findIndex(
    (livro) => livro.x === estado.jogador.x && livro.y === estado.jogador.y
  );

  if (indiceLivro === -1) return;

  const livroComido = estado.livrosNaTela[indiceLivro];
  const desafioAtual = DESAFIOS[estado.rodadaAtual];

  if (livroComido.classe === desafioAtual.alvoClasse) {
    // Acertou!
    estado.pontos += 100;
    mostrarFeedback("acerto", `Muito bem! ${livroComido.motivo}`);
    estado.rodadaAtual += 1;

    if (estado.rodadaAtual >= TOTAL_RODADAS) {
      finalizarJogo(true);
    } else {
      carregarRodada();
    }
  } else {
    // Errou!
    estado.vidas -= 1;
    // Remove o livro errado da tela para o jogador continuar tentando na rodada
    estado.livrosNaTela.splice(indiceLivro, 1);
    mostrarFeedback("erro", `Ops! ${livroComido.motivo}`);
    atualizarPainel();

    if (estado.vidas <= 0) {
      finalizarJogo(false);
    }
  }
}

// Encerra a partida e avisa o portal
function finalizarJogo(venceu) {
  estado.jogando = false;
  const tempoTotalMs = Date.now() - estado.tempoInicio;
  const pontuacaoMaxima = TOTAL_RODADAS * 100;

  tituloFim.textContent = venceu ? "Parabéns! Você venceu! 🎉" : "Fim de Jogo! 📚";
  resumoFim.textContent = venceu
    ? "Você dominou os substantivos, adjetivos e verbos da Biblioteca Mágica!"
    : "Suas vidas acabaram, mas cada erro ajudou a aprender. Tente novamente!";
  pontosFinais.textContent = `${estado.pontos} / ${pontuacaoMaxima}`;

  telaFim.hidden = false;
  notificarAlturaPortal();

  // Contrato com o portal educacional
  window.parent.postMessage(
    {
      type: "vrgame:finish",
      score: estado.pontos,
      maxScore: pontuacaoMaxima,
      timeMs: tempoTotalMs,
      detail: { jogo: "papa-livros" }
    },
    "*"
  );
}

// Desenha todo o cenário, os livros e o personagem no Canvas
function desenharJogo() {
  const temaEscuro = document.documentElement.getAttribute("data-tema") === "escuro";

  // Fundo do piso da biblioteca
  ctx.fillStyle = temaEscuro ? "#1e192b" : "#f8f4ec";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Desenha estantes (paredes) e detalhes de livros nas prateleiras
  for (let linha = 0; linha < TAMANHO_GRADE; linha++) {
    for (let coluna = 0; coluna < TAMANHO_GRADE; coluna++) {
      const x = coluna * TAMANHO_BLOCO;
      const y = linha * TAMANHO_BLOCO;

      if (MAPA[linha][coluna] === 1) {
        // Madeira da estante
        ctx.fillStyle = temaEscuro ? "#3b2847" : "#6d4c3d";
        ctx.fillRect(x, y, TAMANHO_BLOCO, TAMANHO_BLOCO);

        // Borda da prateleira
        ctx.strokeStyle = temaEscuro ? "#261830" : "#4a3228";
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 1, y + 1, TAMANHO_BLOCO - 2, TAMANHO_BLOCO - 2);

        // Lombadas coloridas decorativas dentro da estante
        ctx.fillStyle = temaEscuro ? "#7e5bef" : "#c08457";
        ctx.fillRect(x + 6, y + 8, 6, TAMANHO_BLOCO - 16);
        ctx.fillStyle = temaEscuro ? "#f59e0b" : "#9a3412";
        ctx.fillRect(x + 16, y + 10, 6, TAMANHO_BLOCO - 18);
        ctx.fillStyle = temaEscuro ? "#10b981" : "#3f6212";
        ctx.fillRect(x + 26, y + 7, 6, TAMANHO_BLOCO - 15);
      }
    }
  }

  // Desenha os 3 livros espalhados e suas etiquetas com as palavras
  estado.livrosNaTela.forEach((livro) => {
    const cx = livro.x * TAMANHO_BLOCO + TAMANHO_BLOCO / 2;
    const cy = livro.y * TAMANHO_BLOCO + TAMANHO_BLOCO / 2;

    // Capa do livro
    ctx.fillStyle = livro.cor;
    ctx.beginPath();
    ctx.roundRect(cx - 13, cy - 11, 26, 22, 4);
    ctx.fill();

    // Páginas brancas do livro
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(cx - 10, cy - 8, 9, 16);
    ctx.fillRect(cx + 1, cy - 8, 9, 16);

    // Etiqueta flutuante com a palavra
    ctx.font = "bold 12px sans-serif";
    const larguraTexto = ctx.measureText(livro.palavra).width + 12;
    const etiquetaY = cy - 26 < 6 ? cy + 16 : cy - 28;

    ctx.fillStyle = temaEscuro ? "#111827" : "#ffffff";
    ctx.beginPath();
    ctx.roundRect(cx - larguraTexto / 2, etiquetaY, larguraTexto, 18, 6);
    ctx.fill();

    ctx.strokeStyle = livro.cor;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = temaEscuro ? "#f9fafb" : "#1f2937";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(livro.palavra, cx, etiquetaY + 9);
  });

  // Desenha o personagem Papa-Livros
  const px = estado.jogador.x * TAMANHO_BLOCO + TAMANHO_BLOCO / 2;
  const py = estado.jogador.y * TAMANHO_BLOCO + TAMANHO_BLOCO / 2;
  const raio = TAMANHO_BLOCO * 0.38;

  let anguloBase = 0;
  if (estado.jogador.direcao === "baixo") anguloBase = Math.PI / 2;
  if (estado.jogador.direcao === "esquerda") anguloBase = Math.PI;
  if (estado.jogador.direcao === "cima") anguloBase = -Math.PI / 2;

  const aberturaBoca = estado.jogador.bocaAberta ? 0.25 * Math.PI : 0.04 * Math.PI;

  ctx.fillStyle = "#facc15";
  ctx.beginPath();
  ctx.moveTo(px, py);
  ctx.arc(px, py, raio, anguloBase + aberturaBoca, anguloBase + 2 * Math.PI - aberturaBoca);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "#854d0e";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Olho do personagem
  const olhoX = estado.jogador.direcao === "esquerda" ? px - 4 : px + 4;
  const olhoY = estado.jogador.direcao === "cima" ? py - 7 : py - 6;
  ctx.fillStyle = "#1f2937";
  ctx.beginPath();
  ctx.arc(olhoX, olhoY, 2.5, 0, Math.PI * 2);
  ctx.fill();
}

// Alterna entre tema claro e escuro
function aplicarTema(tema) {
  if (tema === "dark" || tema === "escuro") {
    document.documentElement.setAttribute("data-tema", "escuro");
    btnTema.textContent = "☀️ Tema";
  } else {
    document.documentElement.removeAttribute("data-tema");
    btnTema.textContent = "🌙 Tema";
  }
  desenharJogo();
}

// Envia a altura atual para o portal
function notificarAlturaPortal() {
  const altura = document.documentElement.scrollHeight;
  window.parent.postMessage({ type: "vrgame:resize", height: altura }, "*");
}

// Eventos de teclado (Setas e WASD)
window.addEventListener("keydown", (evento) => {
  const mapaTeclas = {
    ArrowUp: "cima",
    w: "cima",
    W: "cima",
    ArrowDown: "baixo",
    s: "baixo",
    S: "baixo",
    ArrowLeft: "esquerda",
    a: "esquerda",
    A: "esquerda",
    ArrowRight: "direita",
    d: "direita",
    D: "direita"
  };

  if (mapaTeclas[evento.key]) {
    evento.preventDefault();
    moverJogador(mapaTeclas[evento.key]);
  }
});

// Eventos dos botões na tela
botoesSeta.forEach((botao) => {
  botao.addEventListener("click", () => {
    moverJogador(botao.getAttribute("data-direcao"));
  });
});

btnIniciar.addEventListener("click", iniciarJogo);
btnReiniciar.addEventListener("click", iniciarJogo);

btnTema.addEventListener("click", () => {
  const ehEscuro = document.documentElement.getAttribute("data-tema") === "escuro";
  aplicarTema(ehEscuro ? "claro" : "escuro");
});

// Escuta mensagens vindas do portal (tema e tela cheia)
window.addEventListener("message", (evento) => {
  const dados = evento.data;
  if (!dados || typeof dados !== "object") return;

  if (dados.type === "vrgame:theme") {
    aplicarTema(dados.theme || dados.value);
  }

  if (dados.type === "vrgame:fullscreen") {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      document.documentElement.requestFullscreen().catch(() => {});
    }
    setTimeout(notificarAlturaPortal, 150);
  }
});

window.addEventListener("resize", notificarAlturaPortal);

// Inicialização ao abrir a página
desenharJogo();
window.parent.postMessage({ type: "vrgame:ready" }, "*");
notificarAlturaPortal();