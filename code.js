
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const gameOver = document.querySelector('h1');
const altitude = document.querySelector('h3');
const title = document.getElementById('titleScreen');
const retryBtn = document.getElementById('retry');

canvas.width = innerWidth;
canvas.height = innerHeight + 100;

const player = new Player({

    position : {
        x : (canvas.width / 2) - 50,
        y : (canvas.height / 2) - 50,
    },
    resize : 0.25,
    imageSrc : 'Hot Air balloon.png',
});

let enmeyArray = [];

const keys = {
    a : false,
    d : false
}

const enemyImages = [
    'Droplet.png', 
    'Cloud1.png', 'Cloud2.png', 
    'Cloud3.png', 'Cloud4.png', 
    'Cloud5.png', 'Cloud6.png', 
    'Cloud7.png', 'Cloud8.png', 

];

let time = 0;
let height = Math.floor(Math.random() * 500 + 100);

function gameLoop() {

    let runner = requestAnimationFrame(gameLoop);
    time++
    c.clearRect(0, 0, canvas.width, canvas.height);

    player.update()

    height += -Math.floor(player.velcoity.y)

    player.velcoity.x = 0;

    altitude.style.display = 'block';
    altitude.textContent = height.toString().padStart(4, 0);

    if(keys.a) {
        player.velcoity.x = -1;
    } else if(keys.d) {
        player.velcoity.x = 1;
    }

    if(time % 22 === 0) {

        enmeyArray.push(new Enemy({
            position : {
                x : Math.random() * (canvas.width + 1000) + -1000,
                y : -40,
            },
            resize : 2,
            imageSrc : enemyImages[Math.round(Math.random() * (enemyImages.length - 1))],
        }))

    }

    enmeyArray.forEach(enmey => {
        enmey.update()

        enmey.velcoity.x = -player.velcoity.x;
        enmey.velcoity.y += -player.velcoity.y

        if(enmey.position.x + enmey.width > player.position.x &&
            enmey.position.x < player.position.x + player.width  &&
            enmey.position.y + enmey.height > player.position.y - 1 &&
            enmey.position.y < player.position.y + player.height) {

                gameOver.style.display = 'block';
                retryBtn.style.display = 'block';
                cancelAnimationFrame(runner);
            }
    })


}; 
function startGame() {

    title.style.display = 'none';
    gameLoop();
}

function retry() {

    location.reload();
}

addEventListener('keydown', e => {

    switch(e.code) {
        case 'KeyW': player.velcoity.y = -0.5;
            break;

        case 'KeyS': player.velcoity.y = 0.9
            break;

        case 'KeyA': keys.a = true;
            break;

        case 'KeyD': keys.d = true;
            break;

    }

})

addEventListener('keyup', e => {
    switch(e.code) {

        case 'KeyA': keys.a = false;
            break;

        case 'KeyD': keys.d = false;
            break;

    }
})

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight + 100;
    
})