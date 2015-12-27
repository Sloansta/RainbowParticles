window.onload = function() {
  var canvas = document.getElementById('canvas'),
    c = canvas.getContext('2d'),
    particles = [],
    particleNum = 0,
    maxP = 10,
    mouseX,
    mouseY,
    mouseDown = false;

  canvas.width = this.innerWidth - 30;
  canvas.height = this.innerHeight - 35;

  ClearCanvas();

  function Particle() {
    this.x = mouseX;
    this.y = mouseY;
    this.gravity = 1;
    this.vx = Math.random() * 10 - 5;
    this.vy = Math.random() * 10 - 5;
    particleNum++;
    particles[particleNum] = this;
    this.id = particleNum;
    this.age = 0;
    this.maxAge = Math.random() * 50 - 1;
  }

  Particle.prototype.draw = function() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy *= Math.random() * 2.20;
    this.vx *= Math.random() * 2.20;

    if(Math.random() >= 0.47)
      this.vy -= this.gravity;
    else
      this.vy += this.gravity;
    if(Math.random() >= 0.47)
      this.vx -= this.gravity;
    else
      this.vx += this.gravity;

    this.age++;
    if (this.age >= this.maxAge)
      delete particles[this.id];

    c.fillStyle = RandomColor("0.5");
    DrawRect(this.x, this.y, 10, 10);
  };

  document.onmousemove = function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
  };

  document.body.onmousedown = function() {
    mouseDown = true;
  };

  document.body.onmouseup = function() {
    mouseDown = false;
  };

  setInterval(Update, 20);

  function Update() {
    ClearCanvas();
    for (var i in particles) {
      particles[i].draw();
    }
    if(mouseDown) {
      for (var i = 0; i < maxP; i++) {
        new Particle();
      }
    }
  }
  ///Helper functions\\\
  function DrawRect(x, y, w, h) {
    return c.fillRect(x, y, w, h);
  }

  function RandomColor(percentage) {
    var r1 = Math.floor(Math.random() * 255 + 0),
      r2 = Math.floor(Math.random() * 255 + 0),
      r3 = Math.floor(Math.random() * 255 + 0);
    return 'rgb(' + r1 + ',' + r2 + ',' + r3 + ')';
  }

  function ClearCanvas() {
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
  }
};
