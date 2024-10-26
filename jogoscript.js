var vidas = 3;
var altura = 0;
var largura = 0;
var tempo = 60; 
var criaMosquitoTempo = 1500;

var cronometro;
var criaMosquito;


var backgroundMusic;


function initAudio() {
    backgroundMusic = new Audio('videoplayback.m4a'); 
    backgroundMusic.loop = true; 
    backgroundMusic.volume = 0.1; 
}


function toggleAudio() {
    if (!backgroundMusic) {
        initAudio();
    }
    
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        document.getElementById('audioControl').textContent = '🔊';
    } else {
        backgroundMusic.pause();
        document.getElementById('audioControl').textContent = '🔇';
    }
}

function ajustaTamanho() {
    altura = window.innerHeight;
    largura = window.innerWidth;
    console.log(altura, largura);
}

ajustaTamanho();

function posicaoRandomica() {
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove();

        if(vidas > 0) {
            document.getElementById('v' + vidas).src = 'imagens/coracao_vazio.png';
            vidas--;
        }

        if(vidas == 0) {
            clearInterval(cronometro);
            clearInterval(criaMosquito);
            mostrarGameOver();
        }
    }       

    var posicaoX = Math.floor(Math.random() * largura) - 90;
    var posicaoY = Math.floor(Math.random() * altura) - 90;

    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;

    var mosquito = document.createElement('img');
    mosquito.src = 'imagens/mosca.png';
    mosquito.className = tamanhoRandomico() + ' ' + ladoRandomico();
    mosquito.style.left = posicaoX + 'px';
    mosquito.style.top = posicaoY + 'px';
    mosquito.style.position = 'absolute';
    mosquito.id = 'mosquito';
    mosquito.onclick = function() {
        this.remove();
    }
    document.body.appendChild(mosquito);
}   

function tamanhoRandomico() {
    var classe = Math.floor(Math.random() * 3);
    switch(classe) {
        case 0:
            return 'mosquito1';
        case 1:
            return 'mosquito2';
        case 2:
            return 'mosquito3';
    }
}

function ladoRandomico() {
    var lado = Math.floor(Math.random() * 2);
    return lado === 0 ? 'esquerda' : 'direita';
}

function iniciarJogo(dificuldade) {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('jogo').style.display = 'block';

    switch(dificuldade) {
        case 'facil':
            criaMosquitoTempo = 1500;
            break;
        case 'medio':
            criaMosquitoTempo = 1000;
            break;
        case 'dificil':
            criaMosquitoTempo = 750;
            break;
    }

    cronometro = setInterval(function() {
        tempo--;
        if(tempo < 0) {
            clearInterval(cronometro);
            clearInterval(criaMosquito);
            mostrarVitoria();
        } else {
            document.getElementById('cronometro').innerHTML = tempo;
        }
    }, 1000);

    criaMosquito = setInterval(posicaoRandomica, criaMosquitoTempo);
    
    initAudio(); 
    toggleAudio(); 
}

function mostrarVitoria() {
    pararJogo();
    document.body.innerHTML = `
        <div class="fim-jogo">
            <img src="imagens/vitoria.png" alt="Vitória">
            <button onclick="reiniciarJogo()">Jogar Novamente</button>
        </div>
    `;
}

function mostrarGameOver() {
    pararJogo();
    document.body.innerHTML = `
        <div class="fim-jogo">
            <img src="imagens/game_over.png" alt="Game Over">
            <button onclick="reiniciarJogo()">Jogar Novamente</button>
        </div>
    `;
}

function pararJogo() {
    clearInterval(cronometro);
    clearInterval(criaMosquito);
    var mosquitos = document.querySelectorAll('#mosquito');
    mosquitos.forEach(function(mosquito) {
        mosquito.remove();
    });
    
    if (backgroundMusic) {
        backgroundMusic.pause();
        document.getElementById('audioControl').textContent = '🔇';
    }
}

function reiniciarJogo() {
    window.location.reload();
}
