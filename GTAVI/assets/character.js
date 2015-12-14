
NVMCClient.drawFingers = function(gl) {
  var stack = this.stack;

	stack.push();
	//fingers
	stack.multiply(SglMat4.translation([0, -1.5, -1.1]));
	stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(30),[1, 0, 0]));

	//leftmost one
	stack.push();
	stack.multiply(SglMat4.translation([0, 0.2, 0]));
	stack.multiply(SglMat4.scaling([0.05, 0.3, 0.05]));
	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.upperArm, [0.8, 0.2, 0.2, 1.0], [0, 0, 0, 1.0]);
	stack.pop();

	//second left
	stack.push();
	stack.multiply(SglMat4.translation([0, 0, 0.6]));
	stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(-15), [1, 0, 0]));
	stack.multiply(SglMat4.scaling([0.05, 0.6, 0.05]));
	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.upperArm, [0.8, 0.2, 0.2, 1.0], [0, 0, 0, 1.0]);
	stack.pop();

	//middle
	stack.push();
	stack.multiply(SglMat4.translation([0, 0, 1.2]));
	stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(-30), [1, 0, 0]));
	stack.multiply(SglMat4.scaling([0.05, 0.7, 0.05]));
	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.upperArm, [0.8, 0.2, 0.2, 1.0], [0, 0, 0, 1.0]);
	stack.pop();

	//second right
	stack.push()
	stack.multiply(SglMat4.translation([0, 0.5, 1.6]));
	stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(-45), [1, 0, 0]));
	stack.multiply(SglMat4.scaling([0.05, 0.6, 0.05]));
	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.upperArm, [0.8, 0.2, 0.2, 1.0], [0, 0, 0, 1.0]);
	stack.pop();

	//rightmost
	stack.push();
	stack.multiply(SglMat4.translation([0, 1.2, 1.6]));
	stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(-60), [1, 0, 0]));
	stack.multiply(SglMat4.scaling([0.05, 0.5, 0.05]));
	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.upperArm, [0.8, 0.2, 0.2, 1.0], [0, 0, 0, 1.0]);
	stack.pop();

	stack.pop();
}

NVMCClient.drawHand = function(gl) {
	var stack = this.stack;
	//upper hand
	stack.push();
	stack.multiply(SglMat4.scaling([0.4, 2.0, 0.8]));
	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.cone, [0.8, 0.2, 0.2, 1.0], [0, 0, 0, 1.0]);
	stack.pop();//{mV, mV * location}

	//lower hand
	stack.multiply(SglMat4.translation([0, -0.8, 0]));

	stack.push();
	stack.multiply(SglMat4.scaling([0.3, 0.8, 0.7]));
	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.cube, [0.8, 0.2, 0.2, 1.0], [0, 0, 0, 1.0]);
	stack.pop();//{mV, mV * location}

	this.drawFingers(gl);
}

NVMCClient.drawArm = function(gl, angle) {
	var stack = this.stack;


	stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(angle), [0, 0, 1]));
	stack.push();
	stack.multiply(SglMat4.translation([0, -4, 0]));
	stack.multiply(SglMat4.scaling([0.5,2,0.5]));
	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.upperArm, [0.8, 0.2, 0.2, 1.0], [0, 0, 0, 1.0]);
	stack.pop();

	stack.push();
	stack.multiply(SglMat4.translation([0, -4, 0]));
	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.sphere, [0.8, 0.2, 0.2, 1.0], [1.0, 0, 0, 1.0]);
	stack.pop();

	stack.multiply(SglMat4.translation([0, -4, 0]));
	if(angle < 0) {
		stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(1.6 * angle), [0, 0, 1]));
	}
	stack.push();
	stack.multiply(SglMat4.scaling([0.5,2,0.5]));
	stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(180), [0, 0, 1]));
	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.lowerArm, [0.8, 0.2, 0.2, 1.0], [0, 0, 0, 1.0]);
	stack.pop(); //{mv}

  stack.multiply(SglMat4.translation([0, -5, 0]));
	stack.push(); //{mV, mV}
	stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(90), [0, 1, 0]));
	this.drawHand(gl);
	stack.pop();

}

NVMCClient.drawHead = function(gl) {
  var stack = this.stack;

	stack.push();

	//Draw Neck
	stack.multiply(SglMat4.translation([0, 6.5, 0]));
	stack.push();
	stack.multiply(SglMat4.scaling([0.6, 1, 0.7]));
	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.upperArm, [0.8, 0.2, 0.2, 1.0], [0, 0, 0, 1.0]);
	stack.pop();

	//Draw Head
	stack.multiply(SglMat4.translation([0, 3.5, 0]));
	stack.push();
	stack.multiply(SglMat4.scaling([1.8, 2.3, 1.8]));
	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.sphere, [1.0, 0.86, 0.7, 1.0], [0.9, 0.8, 0.6, 1.0]);
	stack.pop();

	//Draw Eye
	stack.push();
	stack.multiply(SglMat4.translation([-1.1, 0.5, -0.6]));
	stack.multiply(SglMat4.scaling([0.6, 0.6, 0.6]));
	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.sphere, [0.2, 0.2, 0.2, 1.0], [0, 0, 0, 1.0]);
	stack.pop();
	stack.push();
	stack.multiply(SglMat4.translation([-1.1, 0.5, 0.6]));
	stack.multiply(SglMat4.scaling([0.6, 0.6, 0.6]));
	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.sphere, [0.2, 0.2, 0.2, 1.0], [0, 0, 0, 1.0]);
	stack.pop();

	//Draw Mouth
	stack.push();
	stack.multiply(SglMat4.translation([-1.2, -0.7, 0]));
	stack.multiply(SglMat4.scaling([0.6, 0.2, 1]));
	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.cube, [0.8, 0.8, 0.8, 1.0], [0, 0, 0, 1.0]);
	stack.pop();


	stack.pop();
}

NVMCClient.drawBody = function(gl, rank) {
  var stack = this.stack;

	stack.push();//{mV, mV}

	stack.multiply(SglMat4.translation([0, -0.8, 0]));

  stack.push();
  if(this.alive[rank - 1] == 0) {
    stack.multiply(SglMat4.translation([0, 2, 0]));
  }
	this.drawHead(gl);
  stack.pop();

	stack.push();//{mV, mV, mV * loc}
	stack.multiply(SglMat4.scaling([1, 7, 3.5]));
	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.cube, [0.3, 0.7, 0.7, 1.0], [0, 0, 0, 1.0]);
	stack.pop();

	stack.push();
	stack.multiply(SglMat4.translation([0, -6.6, 0]));
	stack.multiply(SglMat4.scaling([1.6, 5, 5]));
	stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(45), [0, 1, 0]));
	stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(90), [1, 0, 0]));
	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.penta, [0.8, 0.2, 0.2, 1.0], [0, 0, 0, 1.0]);
	stack.pop();

	stack.pop();
}

NVMCClient.drawFoot = function(gl) {
	var stack = this.stack;

	stack.push();

	stack.multiply(SglMat4.translation([-1, -8, 0]));
	stack.multiply(SglMat4.scaling([2, 0.3, 1]));
	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.cube, [0.8, 0.2, 0.2, 1.0], [0, 0, 0, 1.0]);

	stack.pop();
}

NVMCClient.drawLeg = function(gl, angle, rank) {
	var stack = this.stack;
	stack.push()
	// Draw upper leg
	stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(angle), [0, 0, 1]));
	stack.push();
	stack.multiply(SglMat4.scaling([0.8, 4, 0.8]));
	stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(180), [0, 0, 1]));
	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.upperArm, [0.8, 0.2, 0.2, 1.0], [0, 0, 0, 1.0]);
	stack.pop();

	// Draw lower leg
	stack.multiply(SglMat4.translation([0, -8, 0]));
	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.sphere, [0.8, 0.2, 0.2, 1.0], [1, 0, 0, 1.0]);

	if(angle < 0 && (((!this.game.playerBrake) && this.game.playerAccelerate) || rank != 0)) {
		stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(- 2 *angle), [0, 0, 1]));
	}

	stack.push()
	stack.multiply(SglMat4.scaling([0.8, 4, 0.8]));
	stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(180), [0, 0, 1]));
	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.lowerArm,[0.8, 0.2, 0.2, 1.0], [0, 0, 0, 1.0]);
	stack.pop();
	this.drawFoot(gl);
	stack.pop();
}

NVMCClient.drawLegs = function(gl, rank) {
  var stack = this.stack;


	stack.push();
	stack.multiply(SglMat4.translation([0, -0.5, -2]));
	this.drawLeg(gl, this.legAngle, rank);
	stack.pop();

	stack.push();
	stack.multiply(SglMat4.translation([0, -0.5, 2]));
	this.drawLeg(gl, - this.legAngle, rank);
	stack.pop();
}

NVMCClient.drawArms = function(gl) {

		var stack = this.stack;

		stack.push();
		stack.multiply(SglMat4.translation([0, 4, -5]));
			stack.push();
			stack.multiply(SglMat4.translation([0, 0, -1]));
			stack.multiply(SglMat4.scaling([0.5,0.5,1.5]));
			stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(90),[1,0,0]));
			gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
			this.drawObject(gl, this.upperArm, [0.8, 0.2, 0.2, 1.0], [0, 0, 0, 1.0]);
			stack.pop();
		this.drawArm(gl,this.armAngle);
		stack.pop();

		stack.push();
	  stack.multiply(SglMat4.translation([0, 4, 5]));
			stack.push();
			stack.multiply(SglMat4.translation([0, 0, -2]));
			stack.multiply(SglMat4.scaling([0.5,0.5,1.5]));
			stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(90),[1,0,0]));
			gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
			this.drawObject(gl, this.upperArm, [0.8, 0.2, 0.2, 1.0], [0, 0, 0, 1.0]);
			stack.pop();
		this.drawArm(gl,- this.armAngle);
		stack.pop();
}

NVMCClient.drawThePrimitive = function(gl, rank) { //If rank == 0, then character, else, NPC

  var stack = this.stack;

	stack.push();

	if(rank == 0){ // If is character, then check if jump
		if(this.carMotionKey.jumpFlag != 0) {
			if(this.carMotionKey.jumpFlag > 25) {
				this.charHeight += 0.05;
			}
			else {
				this.charHeight -= 0.05;
			}
      this.carMotionKey.jumpFlag --;
		}

		if(this.game.playerAccelerate || this.game.playerBrake) {
			this.footstep.play();
		}
		else {
			this.footstep.pause();
		}
		stack.multiply(SglMat4.translation([0, this.charHeight, 0]));
    // if(collisonDetect(this.myPos(), 0) != -1) {
    //   // var tempVel = this.myVel();
    //   // stack.multiply(SglMat4.translation([-tempVel[0], -tempVel[1], -tempVel[2]]));
    // }
    // this.charPreviousPosition = this.myPos();
	}
	else { // Other characters
		var ind = rank - 1;
    if(this.alive[ind]){
  		if(this.OriCount[ind] == 0) {
  			var moveFlag = Math.random();
  			this.OriCount[ind] = 180;
  			if(moveFlag > 0.3) {
  				this.NPCOri[3 * ind + 0] = (Math.random() - 0.5) * 0.2;
  				this.NPCOri[3 * ind + 1] = 0;
  				this.NPCOri[3 * ind + 2] = (Math.random() - 0.5) * 0.2;
          this.moving[ind] = 1
  			}
  			else {
  				this.NPCOri[3 * ind + 0] = 0;
  				this.NPCOri[3 * ind + 1] = 0;
  				this.NPCOri[3 * ind + 2] = 0;
  				this.moving[ind] = 0;
  			}
  		}
  		else {
  			this.OriCount[ind] -- ;
  			for(var j = 0; j < 3; j ++) {
  				this.NPCOffset[ind * 3 + j] += this.NPCOri[3 * ind + j];
  			}

        var pos = [this.NPCOffset[ind * 3 + 0], this.NPCOffset[ind * 3 + 1], this.NPCOffset[ind * 3 + 2]];
        var dir = vectorNormalize([this.NPCOri[3 * ind + 0], this.NPCOri[3 * ind + 1], this.NPCOri[3 * ind + 2]]);
        if(collisonDetect(pos, dir, rank) != -1) {
    			for(var j = 0; j < 3; j ++) {
            this.NPCOri[3 * ind + j] = - this.NPCOri[3 * ind + j];
    				this.NPCOffset[ind * 3 + j] += 2 * this.NPCOri[3 * ind + j];
    			}
        }
  		}
    }
    var normalized = vectorNormalize([this.NPCOri[3 * ind + 0], this.NPCOri[3 * ind + 1], this.NPCOri[3 * ind + 2]]);
    this.NPCAngle[ind] = 180 + ((Math.acos(normalized[2])) * 180 / Math.PI * (normalized[0] < 0 ? -1 : 1));
		stack.multiply(SglMat4.translation([this.NPCOffset[ind * 3 + 0], this.NPCOffset[ind * 3 + 1], this.NPCOffset[ind * 3 + 2]]));
		stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(this.NPCAngle[ind]), [0, 1, 0]));
    if(this.alive[ind] == 0) {
      this.moving[ind] = 0;
      stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(-90), [1, 0, 0]));
    }
  }

	stack.multiply(SglMat4.translation([0,1.9,0]));

	stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(-90), [0, 1, 0]));

	stack.multiply(SglMat4.scaling([0.08, 0.08, 0.08]));

	this.armAngle = 0;
	if(this.forwardFlag[rank] != 0) {
		this.armAngle = 30 * Math.sin(2 * Math.PI * this.forwardFlag[rank] / 200);
	}

	this.drawArms(gl);

	this.drawBody(gl, rank);

	stack.multiply(SglMat4.translation([0, -7.5, 0]));


	stack.push();

	if((rank == 0 && (this.game.playerAccelerate || this.game.playerBrake)) || (rank != 0 && this.moving[rank - 1] == 1)) {
		// If it is the character, check if acclerating or braking; if NPC, check if moving

		this.forwardFlag[rank] = this.forwardFlag[rank] == 0 ? 200 : this.forwardFlag[rank];
		// If condition passes, set the current forwardFlag;
	}

	this.legAngle = 0;
	if(this.forwardFlag[rank] != 0) { // Use forwardFlag to calculate rotating angle, note that forwardFlag has NPCnum + 1 entries
		this.legAngle = 30 * Math.sin(2 * Math.PI * this.forwardFlag[rank] / 200)
		this.forwardFlag[rank] --;
	}

	this.drawLegs(gl, rank);
	stack.pop();

	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.cube, [0.8, 0.2, 0.2, 1.0], [0.8, 0.2, 0.2, 1.0]);
	stack.multiply(SglMat4.translation([0,1,0]));
	stack.multiply(SglMat4.scaling([Math.sqrt(2),1,Math.sqrt(2)]));
	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.cone, [0.8, 0.8, 0.2, 1.0], [0.2, 0.8, 0.2, 1.0]);

	stack.pop();
}

NVMCClient.drawCharacter = function(gl, offset) {
	this.drawThePrimitive(gl, offset);
}
