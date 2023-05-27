//lets go Time 101 sam
let input = prompt("enter your name")

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let rightPressed = false;
let leftPressed = false;

//please i highly recommend using multiple folders for image and sound effects 

let bounce = new Audio('bounce.mp3')
let gameOver = new Audio('gameOver.mp3')
let background = new Audio('background.mp3')
let upgrade = new Audio('upgrade.wav')

let start = document.querySelector('#gameStart')
let apple = document.getElementById('apple')
let image = document.getElementById('background')
let magnet = document.getElementById('magnet')


let Paddle = {
    color: 'Grey',
    x: (canvas.width - 300) / 2,
    y: (canvas.height - 20),
    width: 300,
    height: 20,
}

let Ball = {
    color: 'Yellow',
    x: Math.round(Math.random() * 500),
    y: Math.round(Math.random() * 100),
    dx: 3,
    dy: -4,
    radius: 10
}



function upgradeAudio() {
    upgrade.play()
}

function gameOverAudio() {
    setTimeout(function () {
        gameOver.play();

        setTimeout(function () {
            gameOver.pause();
            gameOver.currentTime = 0;
        }, 1000);
    }, 10);
}
function bounceAudio() {
    bounce.play()
}
function backgroundAudio() {
    background.play()
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(Ball.x, Ball.y, Ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = Ball.color
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(Paddle.x, Paddle.y, Paddle.width, Paddle.height);
    ctx.fillStyle = Paddle.color
    ctx.fill();
    ctx.closePath();
}

let hp = 20

let points = 0;
function increasePoints() {
    points += 1
    
    if (points===10) {
        canvas.style.backgroundColor = 'White'
        Paddle.color = 'Black'
        Ball.color = 'Orange'
    }
    if (points === 100) {
        canvas.style.backgroundColor = 'Grey'
        Paddle.color = 'orange'
        Ball.color = 'black'
    }
    if(points>100){
        canvas.style.backgroundColor = 'White'
        Paddle.color = 'Black'
        Ball.color = 'Orange'
    }

}
let text = document.getElementById('name').innerHTML='SAMIP:1000'

//START BUTTON
function startBtn() {
    start.addEventListener('click', gameStart)
}
startBtn()
ctx.drawImage(image, 0, 0, 600, 400)
ctx.fillStyle = 'wheat'
ctx.font = '40px sans-serif'
ctx.fillText("SAMIP", 230, 200)
//GAME START
function gameStart() {

    backgroundAudio()
    start.style.display = 'none'
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = true;
        }
        else if (e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = false;
        }
        else if (e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = false;
        }
    }


    let upgrade = {
        x: Math.round(Math.random() * 500),
        y: 335,
        width: 50,
        height: 50,
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (Paddle.width === 100) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = 'Red'
            ctx.fillRect(upgrade.x, upgrade.y, upgrade.width, upgrade.height)
            
            if (Paddle.x < upgrade.x + upgrade.width &&
                Paddle.x + Paddle.width > upgrade.x &&
                Paddle.y < upgrade.y + upgrade.height &&
                Paddle.height + Paddle.y > upgrade.y) {
                    
                    
                points += 10
                
                hp += hp
                
                
                Ball.dx += 2
                
                Ball.dy += -0.5
                
                upgradeAudio()

                
                Paddle.width = 280
                
                Paddle.height = 20
            }
        }
        drawBall();
        drawPaddle();
        //right wall of canvas
        if (Ball.x + Ball.dx > canvas.width - Ball.radius) {
            Ball.dx = -Ball.dx;
        }
        //left wall of canvas
        if (Ball.x + Ball.dx < Ball.radius) {
            Ball.dx = -Ball.dx;
        }
        //upper wall of canvas
        if (Ball.y + Ball.dy < Ball.radius) {
            Ball.dy = -Ball.dy;
        }
        //lower wall of canvas
        if (Ball.y + Ball.dy > canvas.height - Ball.radius) {



            function gameOver() {

                document.getElementById('hp').textContent = "HP:" + '0'

                let text = document.getElementById('name').innerHTML='SAMIP:1000<br>'+input+":"+points
                

                background.pause()

                gameOverAudio()

                rightPressed = false

                leftPressed = false

                ctx.fillStyle = 'Red'

                ctx.font = '40px sans-serif'

                ctx.fillText("YOU LOST", 200, 150)

                ctx.fillStyle = 'Red'

                ctx.fillText('PRESS ENTER', 170, 200)

            }
            gameOver()
        }

        if (Ball.y > Paddle.y - Paddle.height * 0.5 - Ball.radius * 0.5
            && Ball.y < Paddle.y
            && Ball.x > Paddle.x - Paddle.width - Ball.radius
            && Ball.x < Paddle.x + Paddle.width + Ball.radius) {

            increasePoints()
            document.getElementById('score').textContent = "Score:" + points

            hp -= 1
            document.getElementById('hp').innerHTML = "HP:" + hp


            bounceAudio()
            Paddle.width -= 20

            if (Paddle.width === 0) {
                gameOver()
            }
            Ball.y = Paddle.y - Paddle.height - Ball.radius
            Ball.dy = -Ball.dy

        }


        if (rightPressed) {
            Paddle.x += 7;
            if (Paddle.x + Paddle.width > canvas.width) {
                Paddle.x = canvas.width - Paddle.width;
            }
        }
        else if (leftPressed) {
            Paddle.x -= 7;
            if (Paddle.x < 0) {
                Paddle.x = 0;
            }
        }

        Ball.x += Ball.dx;
        Ball.y += Ball.dy;
    }



    setInterval(draw, 10);
}
window.document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case "Enter":
            window.location.href = 'game.html'
            break;
        default:
            break;

    }
})

