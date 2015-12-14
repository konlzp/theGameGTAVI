function Bullet(offset, dir) {
// Class Bullet
// *input: offset, vector of 3 elements, represents the bullet's location
//         dir, vector of 3 elements, represents the bullets's moving direction

  this.name = "bullet";
  this.moving = 1;
  this.pos = offset;
  this.dir = dir;
}

NVMCClient.shootBullet = function() {
  var pos = this.myPos();
  var newBullet = new Bullet([pos[0], 2, pos[2]], vectorNormalize(this.myVel()));

  this.bullets.push(newBullet);
  if(this.bullets.length > 10) {
    this.bullets.shift();
  }
  this.bulletLeft --;
  document.getElementById("bulletLeft").innerHTML = "Bullets Left: " + this.bulletLeft;
  if(this.bulletLeft == 0 && this.enemiesLeft != 0) {
    this.lostSound.play();
    this.carMotionKey = [];
  }
}

NVMCClient.drawBullet = function(gl, ind) {
  var stack = this.stack;

  stack.push();

  if(this.bullets[ind].moving) {
    this.bullets[ind].pos = vectorAdd(this.bullets[ind].pos, this.bullets[ind].dir);
    var collide = collisonDetect(this.bullets[ind].pos, this.bullets[ind].dir, this.NPCnum + 1);
    if(collide != -1) {
      if(collide <= this.NPCnum && this.alive[collide - 1] == 1) {
        this.alive[collide - 1] = 0;
        this.bullets[ind].pos[1] = 0;
        this.bullets[ind].moving = 0;
        this.enemiesLeft --;
        document.getElementById("enemyLeft").innerHTML = "Enemies Left: " + this.enemiesLeft;
        if(this.enemiesLeft == 0) {
          this.mainTheme.pause();
          this.winSound.play();
        }
      }
      else if(collide == this.NPCnum) {
        this.bullets[ind.moving] = 0;
      }
    }
  }
  stack.multiply(SglMat4.translation(this.bullets[ind].pos));
  stack.multiply(SglMat4.scaling([0.2, 0.2, 0.2]));
	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
  this.drawObject(gl, this.sphere, [0, 0, 0, 1.0], [0, 0, 0, 1.0]);
  stack.pop();
}
