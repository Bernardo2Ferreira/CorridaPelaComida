document.addEventListener('DOMContentLoaded', function () {
  const player = document.getElementById('player');
  const scoreDisplay = document.getElementById('score');
  const livesDisplay = document.getElementById('lives');
  const gameOverDisplay = document.getElementById('gameOver');
  const background = document.getElementById('background');

  let score = 0;
  let lives = 3;
  let isGameOver = false;
  let jumpCount = 0;

  function updateScore() {
    scoreDisplay.textContent = 'Pontuação: ' + score;
  }

  function updateLives() {
    livesDisplay.innerHTML = '';
    for (let i = 0; i < lives; i++) {
      livesDisplay.innerHTML += '<img src="vida.png" alt="vida">';
    }
  }

  function gameOver() {
    isGameOver = true;
    gameOverDisplay.style.display = 'block';
    background.style.animationPlayState = 'paused'; // Pausa a animação do fundo
  }

  function resetGame() {
    isGameOver = false;
    score = 0;
    lives = 3;
    updateScore();
    updateLives();
    gameOverDisplay.style.display = 'none';
    background.style.animationPlayState = 'running'; 
  }

  document.addEventListener('keydown', function (event) {
    if (event.code === 'Space' && !isGameOver) {
      if (jumpCount < 2) { 
        jump();
        jumpCount++;
      }
    } else if (event.code === 'Space' && isGameOver) {
      resetGame();
    }
  });

  function jump() {
    let jumpHeight = 300; 
    let totalTime = 1500; 
    let jumpTime = 0.6 * totalTime; 
    let fallTime = 0.4 * totalTime; 

    player.style.transition = `bottom ${jumpTime}ms ease-out`;
    player.style.bottom = (jumpHeight + parseInt(player.style.bottom || '11%')) + 'px';

    setTimeout(function () {
      player.style.transition = `bottom ${fallTime}ms ease-in`;
      player.style.bottom = '11%'; 
    }, jumpTime);

    setTimeout(function () {
      jumpCount--; 
    }, totalTime);
  }

  function createObstacle() {
      const obstacle = document.createElement('div');
      obstacle.className = 'obstacle';
      obstacle.style.width = Math.floor(Math.random() * 50 + 20) + 'px';
      obstacle.style.height = Math.floor(Math.random() * 50 + 20) + 'px';
      obstacle.style.right = '0';
      document.getElementById('game').appendChild(obstacle);

      const obstacleTypes = ['carne', 'peixe', 'maca', 'cenoura'];
const randomType = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];

obstacle.classList.add(randomType); 

obstacle.style.width = '50px'; 
obstacle.style.height = '50px'; 
obstacle.style.position = 'absolute';
obstacle.style.bottom = '15%'; 
obstacle.style.right = '0';

document.getElementById('game').appendChild(obstacle);

      let obstacleSpeed = 8; 
      let obstacleInterval = setInterval(function () {
        if (!isGameOver) {
          obstacle.style.right = (parseInt(obstacle.style.right) + obstacleSpeed) + 'px';
          if (checkCollision(player, obstacle)) {
            clearInterval(obstacleInterval);
            obstacle.remove();
            lives--;
            updateLives();
            if (lives === 0) {
              gameOver();
            }
          } else {
            if (parseInt(obstacle.style.right) > document.getElementById('game').offsetWidth) {
              clearInterval(obstacleInterval);
              obstacle.remove();
              score += 10; 
              updateScore();
            }
          }
        }
      }, 50);
  }

  function checkCollision(player, obstacle) {
      let playerRect = player.getBoundingClientRect();
      let obstacleRect = obstacle.getBoundingClientRect();
    
      
      let playerWidth = playerRect.width * 0.7; 
      let playerHeight = playerRect.height * 0.7; 
      let obstacleWidth = obstacleRect.width * 0.7; 
      let obstacleHeight = obstacleRect.height * 0.7; 
    
      
      let playerLeft = playerRect.left + (playerRect.width - playerWidth) / 2;
      let playerTop = playerRect.top + (playerRect.height - playerHeight) / 2;
      let playerRight = playerLeft + playerWidth;
      let playerBottom = playerTop + playerHeight;
    
      let obstacleLeft = obstacleRect.left + (obstacleRect.width - obstacleWidth) / 2;
      let obstacleTop = obstacleRect.top + (obstacleRect.height - obstacleHeight) / 2;
      let obstacleRight = obstacleLeft + obstacleWidth;
      let obstacleBottom = obstacleTop + obstacleHeight;
    
      
      return !(
        playerBottom < obstacleTop ||
        playerTop > obstacleBottom ||
        playerRight < obstacleLeft ||
        playerLeft > obstacleRight
      );
    }
    

  setInterval(createObstacle, 2500); 
});


