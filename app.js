// funcão para exibir texto nos seletores (função com parâmetro)
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.3});
}
// verifica se o usuário acertou o número secreto.
function verificarChute() {
    let chute = document.querySelector('input').value;
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Parabéns você acertou!');
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O Número Secreto é menor.');
        } else {
            exibirTextoNaTela('p', 'O Número Secreto é maior.');
        }
        limpaCampo();
        tentativas++;
    }
}

// função com retorno
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * limiteNumeros) + 1;
    let tamanhoLista = listaDeNumerosSorteados.length;

    // limpa a lista de números
    if (tamanhoLista == limiteNumeros) {
        listaDeNumerosSorteados = [];
    }

    // checa se o número sorteado já esta na lista.
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); // add numero sorteado ao final da lista
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
    
}

// limpa campo do chute
function limpaCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

// reinicia o jogo
function exibirMensagemInicial() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    textoInicial();
    limpaCampo();
    document.getElementById('reiniciar').setAttribute('disabled', true);

}

// exibi texto inicial na tela.
function textoInicial() {
    exibirTextoNaTela('h1', 'Descubra o Número Secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${limiteNumeros}: `);
}

let listaDeNumerosSorteados = [];
let limiteNumeros = 50;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
textoInicial();
