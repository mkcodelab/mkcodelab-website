const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
let CW, CH;
let rainQuantity = window.innerWidth;
const circleArray = [];
const mouse = {
  x: null,
  y: null,
  size: 50,
  
}

function resize() {
  CW = canvas.width = rainQuantity = window.innerWidth;
  CH = canvas.height = window.innerHeight;
  if (CW <= 500) {
    mouse.size = 1;
    console.log('mouse size decreased')
  } else mouse.size = 50;
  
}
resize();

addEventListener('resize', ()=> {
  resize();
  populate(rainQuantity);
});




addEventListener('mousemove', e => {
  mouse.x = e.x;
  mouse.y = e.y;

  
})

class Circle {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.baseSize = Math.random() * 2 + 1;
    this.size = this.baseSize;
    this.angle = 0;
    this.baseSpeedY = (Math.random() * 5+1) /2;
    this.speedY = this.baseSpeedY;
    this.speedX = 0;
    this.col = col;
    this.frame = 0;
    this.maxStep = 20;
    this.step = 0;
    this.shadow = false;
  }
  update() {
    
    if (this.y > canvas.height) {
      this.y = 0 - this.size
      this.speedY = this.baseSpeedY;
    };
    if (this.x > canvas.width) this.x = 0 - this.size;
    this.y += this.speedY;
    this.angle += 1
    this.frame += Math.floor(Math.random()* 5);
    if (this.frame % 5 == 0){
      this.x += this.speedX;
      this.speedX = Math.random() * 2 * Math.cos(this.angle/10);
    }
    
    this.speedY += 0.02;

  }
  draw() {
    if (this.shadow) {
      ctx.shadowColor = 'white';
      ctx.shadowBlur = 105;
    }
    ctx.fillStyle = this.col;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.shadowBlur = 0;
  }
  isColliding() {
    let dx = this.x - mouse.x;
    let dy = this.y - mouse.y;
    let dist = Math.sqrt(dx*dx + dy*dy);
    let sumOfRadii = this.size + mouse.size;

    if (dist < sumOfRadii) {
      let sign = Math.random() > .5 ? 1 : -1;
      this.x += 2 * sign;
      this.speedY = this.baseSpeedY;
      this.y -= this.speedY;
      
      // this.size += 0.01;
      this.shadow = true;
    } else {
      this.size = this.baseSize;
      this.shadow = false;
    }
  }
}



function populate(q) {
  circleArray.length = 0;
  for (let i = 0; i < q; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    
    let hue = Math.random() * 50 + 120;
    let col = `hsla(${hue}, 100%, 50%, 0.2)`
    circleArray.push( new Circle(x, y, col))
  }
}
populate(rainQuantity);


function loop() {
  ctx.fillStyle = 'rgba(0,0,0,.1)';
  ctx.fillRect(0, 0, CW, CH);
  for (circ of circleArray) {
    circ.update();
    circ.draw();
    circ.isColliding();
  }
  requestAnimationFrame(loop)
}
loop();