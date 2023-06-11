
function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
    rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
    rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
    rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}




function determineWinner({ player, enemy }) {
  document.querySelector("#displayText").style.display = "flex";

  if (player.health === enemy.health) {
    document.querySelector("#displayText").textContent = "Tie";
    document.querySelector("#displayText").style.fontSize = "40px";
  } else if (player.health > enemy.health) {
    document.querySelector("#displayText").textContent = "Player 1 Wins";
    document.querySelector("#displayText").style.fontSize = "40px";
  } else if (enemy.health > player.health) {
    document.querySelector("#displayText").textContent = "Player 2 Wins";
    document.querySelector("#displayText").style.fontSize = "40px";
  }

  setTimeout(() => {
    document.querySelector("#displayText").textContent = "";
    resetGameState();
  }, 5000)

}

let timer = 60;
let timerId;
let isPaused = false; // Flag to indicate if the timer is paused

const playTimer = () => {
  timerId = setTimeout(() => {
    if (timer > 0 && !isPaused) {
      timer--;
      document.querySelector("#timer").textContent = timer;
      playTimer(); // Recursively call the function after a delay
    }
  }, 1000);
};


function resetGameState() {
    player.position.y = -40
    enemy.position.y = -40
    enemy.position.x = 1100;
    player.position.x = -70;
    enemy.health = 100;
    player.health = 100;
    player.dead = false;
    enemy.dead = false;
    player.image = player.sprites.idle.image;
    enemy.image = enemy.sprites.idle.image;
    enemy.switchSprite("idle");
    player.switchSprite("idle");
    gsap.to("#enemyHealth", {
      width: 100 + "%",
    });
    gsap.to("#playerHealth", {
      width: 100 + "%",
    });
    isPaused = false;
    timer = 60;
    playTimer();
    document.querySelector("#timer").textContent = timer;
    
}


//Select canvas & type & size
const canvas = document.querySelector("#pvp");
const c = canvas.getContext("2d");
canvas.width = 1280;
canvas.height = 720;

// Background fill
c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 1.5;

export class Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
    this.offset = offset;
  }

  draw() {
    c.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
  }

  animateFrames() {
    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }

  update() {
    this.draw();
    this.animateFrames();
  }
}

//Moving characters
export class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    color = "red",
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    sprites,
    attackBox = {
      offset: {},
      width: undefined,
      height: undefined,
    },
  }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      offset,
    });

    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    };
    this.color = color;
    this.isAttacking;
    this.health = 100;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 8;
    this.sprites = sprites;
    this.dead = false;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }

  }

  //Player movement
  update() {
    this.draw();
    if (!this.dead) this.animateFrames();

    //Attack Boxes
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

    // Draw Attackbox
    // c.fillRect(
    //   this.attackBox.position.x,
    //   this.attackBox.position.y,
    //   this.attackBox.width,
    //   this.attackBox.height
    // );

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    //Gravity Function
    if (
      this.position.y + this.height + this.velocity.y >=
      canvas.height - 100
    ) {
      this.velocity.y = 0;
      this.position.y = 472;
    } else {
      this.velocity.y += gravity;
    }
  }
  attack() {
    this.switchSprite("attack1");
    this.isAttacking = true;
  }

  takeHit() {
    this.health -= 10;

    if (this.health <= 0) {
      this.switchSprite("death");
    } else this.switchSprite("takeHit");
  }

  switchSprite(sprite) {
    if (this.image === this.sprites.death.image) {
      if (this.framesCurrent === this.sprites.death.framesMax - 1)
        this.dead = true;
      return;
    }

    //Overriding all others animations with the attack animation
    if (
      this.image === this.sprites.attack1.image &&
      this.framesCurrent < this.sprites.attack1.framesMax - 1
    )
      return;

    //Override when fighter gets hit
    if (
      this.image === this.sprites.takeHit.image &&
      this.framesCurrent < this.sprites.takeHit.framesMax - 1
    )
      return;

    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.framesMax = this.sprites.idle.framesMax;
          this.framesCurrent = 0;
        }
        break;

      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.framesMax = this.sprites.run.framesMax;
          this.framesCurrent = 0;
        }
        break;

      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.framesMax = this.sprites.jump.framesMax;
          this.framesCurrent = 0;
        }
        break;

      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.framesMax = this.sprites.fall.framesMax;
          this.framesCurrent = 0;
        }
        break;

      case "attack1":
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image;
          this.framesMax = this.sprites.attack1.framesMax;
          this.framesCurrent = 0;
        }
        break;

      case "takeHit":
        if (this.image !== this.sprites.takeHit.image) {
          this.image = this.sprites.takeHit.image;
          this.framesMax = this.sprites.takeHit.framesMax;
          this.framesCurrent = 0;
        }
        break;

      case "death":
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image;
          this.framesMax = this.sprites.death.framesMax;
          this.framesCurrent = 0;
        }
        break;
    }
  }
}


const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./PVP/Sicarius.png",
});


//Initialize player
const player = new Fighter({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
  imageSrc: "./PVP/Sprites/IdleS.png",
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 105,
    y: 65,
  },
  sprites: {
    idle: {
      imageSrc: "./PVP/Sprites/IdleS.png",
      framesMax: 8,
    },
    run: {
      imageSrc: "./PVP/Sprites/RunS.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./PVP/Sprites/JumpS.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./PVP/Sprites/FallS.png",
      framesMax: 2,
    },
    attack1: {
      imageSrc: "./PVP/Sprites/Attack1S.png",
      framesMax: 6,
    },
    takeHit: {
      imageSrc: "./PVP/Sprites/Take Hit - S.png",
      framesMax: 4,
    },
    death: {
      imageSrc: "./PVP/Sprites/DeathS.png",
      framesMax: 6,
    },
  },
  attackBox: {
    offset: {
      x: 120,
      y: 150,
    },
    width: 140,
    height: 50,
  },
});

//Initialize enemy
const enemy = new Fighter({
  position: {
    x: 1000,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "blue",
  offset: {
    x: -50,
    y: 0,
  },
  imageSrc: "./PVP/SpritesV2/IdleS.png",
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 115,
    y: 80,
  },
  sprites: {
    idle: {
      imageSrc: "./PVP/SpritesV2/IdleS.png",
      framesMax: 4,
    },
    run: {
      imageSrc: "./PVP/SpritesV2/RunS.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./PVP/SpritesV2/JumpS.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./PVP/SpritesV2/FallS.png",
      framesMax: 2,
    },
    attack1: {
      imageSrc: "./PVP/SpritesV2/Attack1S.png",
      framesMax: 4,
    },
    takeHit: {
      imageSrc: "./PVP/SpritesV2/Take hitS.png",
      framesMax: 3,
    },
    death: {
      imageSrc: "./PVP/SpritesV2/DeathS.png",
      framesMax: 7,
    },
  },
  attackBox: {
    offset: {
      x: -175,
      y: 150,
    },
    width: 140,
    height: 50,
  },
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
};


//Animation loop
const animate = (e) => {
  window.requestAnimationFrame(animate);
  // c.fillStyle = "red";
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  //Player movement
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -3;
    player.switchSprite("run");
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 3;
    player.switchSprite("run");
  } else {
    player.switchSprite("idle");
  }

  //Jumping
  if (player.velocity.y < 0) {
    player.switchSprite("jump");
  } else if (player.velocity.y > 0) {
    player.switchSprite("fall");
  }

  //Enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -2.5;
    enemy.switchSprite("run");
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.switchSprite("run");
    enemy.velocity.x = 2.5;
  } else {
    enemy.switchSprite("idle");
  }

  //Jumping
  if (enemy.velocity.y < 0) {
    enemy.switchSprite("jump");
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite("fall");
  }

  //Detect for collision & enemy gets hit
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy,
    }) &&
    player.isAttacking &&
    player.framesCurrent === 4
  ) {
    enemy.takeHit();
    player.isAttacking = false;
    gsap.to("#enemyHealth", {
      width: enemy.health + "%",
    });
  }

  //If player misses
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false;
  }

  //Detect for collision & player gets hit
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player,
    }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 2
  ) {
    player.takeHit();
    enemy.isAttacking = false;

    gsap.to('#playerHealth', {
      width: player.health + "%"
    })
  }

  // If Enemy misses
  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false;
  }

  // End game based on health
  if (enemy.health <= 0 || player.health <= 0) {

  }
};
animate();

window.addEventListener("keydown", (e) => {
  if (!player.dead) {

    //Canvas border
    if (keys.a.pressed && keys.ArrowRight.pressed) {
      if (player.position.x < -80 && enemy.position.x > 1075) {
        keys.a.pressed = false;
        player.velocity.x = 100;
        keys.ArrowRight.pressed = false;
        enemy.velocity.x = -100;
      }
      return;
    }
    switch (e.key) {
      case "d":
        keys.d.pressed = true;
        player.lastKey = "d";
        break;
      case "D":
        keys.d.pressed = true;
        player.lastKey = "d";
        break;
      case "a":
        keys.a.pressed = true;
        player.lastKey = "a";
        if (player.position.x < -80) {
          keys.a.pressed = false;
          player.velocity.x = 3;
          return;
        }
        break;
      case "A":
        keys.a.pressed = true;
        player.lastKey = "a";
        if (player.position.x < -80) {
          keys.a.pressed = false;
          player.velocity.x = 3;
          return;
        }
        break;
      case "w":
        player.velocity.y = -20;
        break;
      case "W":
        player.velocity.y = -20;
        break;
      case " ":
        player.attack();
        break;
    }
  }
  if (!enemy.dead) {
    switch (e.key) {
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        enemy.lastKey = "ArrowRight";
        if (enemy.position.x > 1075) {
          keys.ArrowRight.pressed = false;
          enemy.velocity.x = -3;
          return;
        }
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        enemy.lastKey = "ArrowLeft";
        break;
      case "ArrowUp":
        enemy.velocity.y = -20;
        break;
      case "Enter":
        enemy.attack();
        break;
    }
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      if (player.position.x < -80) {
        keys.a.pressed = false;
        player.velocity.x = 3;
        return;
      }
      break;
  }

  //Enemy keys
  switch (e.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      if (enemy.position.x > 1075) {
        keys.ArrowRight.pressed = false;
        enemy.velocity.x = -3;
        return;
      }
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
});


const restartButton = document.querySelector(".restart-btn");
restartButton.blur();

window.addEventListener("keydown", (e) => {
  if (e.key === 'r') {
    timer = 60;
    document.querySelector("#timer").textContent = timer;
    enemy.position.x = 1100;
    player.position.x = -70;
    player.position.y = -50;
    enemy.position.y = -50;
    gsap.to("#enemyHealth", {
      width: 100 + "%",
    });
    gsap.to("#playerHealth", {
      width: 100 + "%",
    });
  }
})


const keyboardButton = document.querySelector(".keyboard-btn");
const keyboardImage = document.querySelector(".keyboard");
let keyActive = false;
keyboardButton.blur();
keyboardButton.addEventListener("click", () => {
  if(!keyActive) {
    keyboardImage.style.display = "none";
    keyActive = true; 
    keyboardButton.blur();
    return;
  }
  keyActive = false;
  keyboardImage.style.display = "block";
})
keyboardButton.addEventListener("mouseleave", () => {
})



restartButton.addEventListener("click", () => {
  resetGameState();
});

playTimer();

const gameTimer = document.querySelector("#timer");
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    // Check if the content of the target element has changed
    if (mutation.type === "childList" || mutation.type === "characterData") {
      // Content has changed
      if (player.health <= 0) {
        isPaused = true;
        determineWinner({player,enemy});
        return;
        // resetGameState();
      }
      if (enemy.health <= 0) {
        isPaused = true;
        determineWinner({player,enemy});
        // resetGameState();
        return;
      }
      if(+mutation.target.textContent === 0) {
        isPaused = true;
        determineWinner({player,enemy});
        // resetGameState();
      }
    }
  });
});

// Configure the observer to watch for specific types of mutations
const config = {
  childList: true, // Watch for changes to the element's child nodes
  characterData: true, // Watch for changes to the element's text content
};

// Start observing the target element with the configured options
observer.observe(gameTimer, config);