const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    menu = document.querySelector('.menu'),
    game = document.querySelector('.game'),
    gameArea = document.querySelector('.gameArea'),
    sett = document.querySelector('.settings'),
    LocalStorage = document.querySelector('.LocalStorage'),
        valSpeed = document.createElement('input'),
        car = document.createElement('div'),
        music = new Audio('./audio.mp3');
    
    let allow = false;
    music.addEventListener('loadeddata', () => {
        allow = true;
    });

    let topScore = localStorage.getItem('bestScore');
    if(topScore > 0){
        LocalStorage.innerHTML = 'Best Score: ' + topScore;
    }

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



const settings = {
    start: false,
    score: 0,
    bestScore: 0,
    speed: 4,
    traffic: 3
};

//колличество линий зависит от экрана 
function getQuantityElements(heightElement){
    return Math.ceil(gameArea.offsetHeight / heightElement);
}

function startgame () {
    if(allow){
        music.play();
    }
    menu.classList.add("hide");
    game.classList.remove('hide');
    LocalStorage.classList.add('hide');
    menu.style.position = 'absolute';
    document.querySelector('html').style.backgroundImage = 'none';
    gameArea.innerHTML = '';


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
        let enemyImg = Math.floor(Math.random() * 6) + 1;
        enemy.classList.add('enemy');
        enemy.y = -100 * settings.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50))  + 'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = (`transparent url(./image/enemy${enemyImg}.png) center/cover no-repeat`);
        gameArea.appendChild(enemy);
    }

    settings.start = true;
    gameArea.appendChild(car);

    car.style.left = '125px';
    car.style.top = 'auto';
    car.style.bottom = '10px';

    music.autoplay = 'true';

    settings.x = car.offsetLeft;
    settings.y = car.offsetTop;
    requestAnimationFrame(playGame); //анимация
}

function playGame(){
    if(settings.start){
        

        settings.score += settings.speed;
        score.textContent = 'Score: ' + settings.score;
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
    }else{
        music.pause();
        if(settings.score > topScore){
            topScore = localStorage.setItem('bestScore', settings.score);
            settings.bestScore = settings.score;
            LocalStorage.innerHTML = 'Best Score: ' + settings.bestScore;
        }

        settings.score = 0;
    }
}

function startRun(event){
    event.preventDefault(); //убираем дефолтный скролинг странцы стрелками
    if(keys.hasOwnProperty(event.key)){
        keys[event.key] = true;
    }
}

function stopRun(event){
    event.preventDefault();
    if(keys.hasOwnProperty(event.key)){
        keys[event.key] = false;
    }
}

function moveRoade(){
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(item){// Функция принимает: 1)сами элементы 2)индекс элемента 3)массив элементов
        item.y += settings.speed;
        item.style.top = item.y +  'px';
        if(item.y >= gameArea.offsetHeight){
            item.y = -100;
        }
    });
}

function moveEnemy(){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(carItem){
        //столкновения
        let carRect = car.getBoundingClientRect();
        let enemyRect = carItem.getBoundingClientRect();
        if (carRect.top <= enemyRect.bottom &&
            carRect.right >= enemyRect.left &&
            carRect.left <= enemyRect.right &&
            carRect.bottom >= enemyRect.top){
                showMain();
                
        }
        
        carItem.y += settings.speed / 2;
        carItem.style.top = carItem.y + 'px';
        if(carItem.y >= gameArea.offsetHeight){
            carItem.y = -100 * settings.traffic;
            carItem.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50))  + 'px';
        }
    });
    
}

function showMain(){
    settings.start = false;
    menu.classList.remove('hide');
    LocalStorage.classList.remove('hide');
    document.querySelector('html').style.backgroundImage = '';
    game.classList.add('hide');
    menu.style.position = '';
}

function params(){
    menu.classList.add("hide"); 
    document.querySelector('body').appendChild(valSpeed);
    /*показать  */
}