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
    speed: valueSpeed,
    traffic: 3
};

//колличество линий зависит от экрана +1
function getQuantityElements(heightElement){
    return document.documentElement.clientHeight / heightElement + 1;
}

function startgame () {
    menu.classList.add("hide");
    menu.style.position = 'absolute';
    document.querySelector('html').style.backgroundImage = 'none';
    game.style.height = '100%';

    // ЛИНИИ
    for(let i = 0; i < getQuantityElements(100); i++){
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 75) + 'px'; //расстояние между линиями 50 + 25
        line.y = i * 100; //движение линий
        gameArea.appendChild(line);
    }

    //АВТО
    for(let i = 0; i < getQuantityElements(100 * settings.traffic); i++){
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * settings.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50))  + 'px';
        enemy.style.top = enemy.y + 'px';
        gameArea.appendChild(enemy);
    }

    settings.start = true;
    gameArea.appendChild(car);
    settings.x = car.offsetLeft;
    settings.y = car.offsetTop;
    requestAnimationFrame(playGame); //анимация
}

function playGame(){
    if(settings.start){
        moveRoade();
        moveEnemy();
        if (keys.ArrowLeft && settings.x > 0){
            settings.x -= settings.speed;
        }
        if (keys.ArrowRight  && settings.x < (gameArea.offsetWidth - car.offsetWidth)){
            settings.x += settings.speed;
        }
        if (keys.ArrowUp && settings.y > 0){
            settings.y -= settings.speed;
        }
        if (keys.ArrowDown  && settings.y < (gameArea.offsetHeight - car.offsetHeight)){
            settings.y += settings.speed;
        }

        car.style.left = settings.x + 'px';
        car.style.top = settings.y + 'px';
        requestAnimationFrame(playGame); 
    }
}

function startRun(event){
    event.preventDefault(); //убираем дефолтный скролинг странцы стрелками
    keys[event.key] = true;
    console.log(keys);
}

function stopRun(event){
    event.preventDefault();
    keys[event.key] = false;
    console.log(keys);
}

function moveRoade(){
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(item){// Функция принимает: 1)сами элементы 2)индекс элемента 3)массив элементов
        item.y += settings.speed;
        item.style.top = item.y +  'px';
        if(item.y >= document.documentElement.clientHeight){
            item.y = -100;
        }
    });
}

function moveEnemy(){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(carItem){
        carItem.y += settings.speed/2;
        carItem.style.top = carItem.y + 'px';
        if(carItem.y >= document.documentElement.clientHeight){
            carItem.y = -100 * settings.traffic;
            carItem.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50))  + 'px';
        }
    });
    
}

function params(){
    menu.classList.add("hide");
    document.querySelector('body').appendChild(valSpeed);
    /*показать  */
}