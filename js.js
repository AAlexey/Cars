const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    menu = document.querySelector('.menu'),
    game = document.querySelector('.game'),
    gameArea = document.querySelector('.gameArea'),
    sett = document.querySelector('.settings'),
    valSpeed = document.createElement('input'),
    car = document.createElement('div');

    car.classList.add('car');
    valSpeed.setAttribute('type', 'range');
    valSpeed.setAttribute('min', '1');
    valSpeed.setAttribute('max', '5');
    valSpeed.setAttribute('value', '3');
    valSpeed.classList.add('slider');

start.addEventListener('click', startgame);
sett.addEventListener('click', params);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

let valueSpeed = 3;

const settings = {
    start: false,
    score: 0,
    speed: valueSpeed
};

function startgame () {
    menu.classList.add("hide");
    settings.start = true;
    gameArea.appendChild(car);
    requestAnimationFrame(playGame); //анимация
}

function playGame(){
    if(settings.start){
        requestAnimationFrame(playGame); 
    }
}

function startRun(event){
    event.preventDefault(); //убираем дефолтный скролинг странцы стрелками
    keys[event.key] = true;
}

function stopRun(event){
    event.preventDefault();
    keys[event.key] = false;
}

function params(){
    menu.classList.add("hide");
    game.appendChild(valSpeed);
    /*показать  */
}