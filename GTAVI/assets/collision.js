vectorScale = function(vector, scale) {
  return [vector[0] * scale, vector[1] * scale, vector[2] * scale];
}

vectorAdd = function(vector1, vector2) {
  return [vector1[0] + vector2[0], vector1[1] + vector2[1], vector1[2] + vector2[2]];
}

vectorNorm = function(vector) {
  var tempNorm = vector[0] * vector[0] + vector[1] * vector[1] + vector[2] * vector[2];
  return tempNorm == 0 ? 1 : Math.sqrt(tempNorm);
}

vectorNormalize = function(vector) {
  return vectorScale(vector, 1.0 / vectorNorm(vector));
}

calcRect = function(position, dir, rank) {
  // *input: a vector with three elements, X coordinate, Y coordinate and Z coordinate
  // *output: a vector with two 2-D points, top left point
  // and bottom right point of the rectangle respectively
  // ----------------------------------------------------------
  // Hard-coded rectangle calculation, if the scale has changed
  // you should change the calculation here
  var rect = []
  if(rank <= NVMCClient.NPCnum) {
    var topOffset = 0.08 * 3.5 / 2;
    var rightOffset = 0.08 * 1 / 2;
  }
  else {
    var topOffset = 1 / 2;
    var rightOffset = 1 / 2;
  }
  var verticalDir = [- dir[2], 0, dir[0]];

  rect.push(vectorAdd( vectorAdd( position, vectorScale( dir, rightOffset)), vectorScale(verticalDir, topOffset)));
  rect.push(vectorAdd( vectorAdd( position, vectorScale( dir, rightOffset)), vectorScale(verticalDir, -topOffset)));
  rect.push(vectorAdd( vectorAdd( position, vectorScale( dir, -rightOffset)), vectorScale(verticalDir, -topOffset)));
  rect.push(vectorAdd( vectorAdd( position, vectorScale( dir, -rightOffset)), vectorScale(verticalDir, topOffset)));

  // rect = new SAT.Polygon(new SAT.Vector(), [
  //   new SAT.Vector(rect[0][0], rect[0][2]),
  //     new SAT.Vector(rect[1][0], rect[1][2]),
  //       new SAT.Vector(rect[2][0], rect[3][2]),
  //         new SAT.Vector(rect[3][0], rect[3][2])
  // ]);

  var newRect = []

  for(var i = 0; i < 4; i ++) {
    newRect.push(rect[i][0]);
    newRect.push(rect[i][2]);
  }

  return newRect;
}

inRect = function(rect, point) {
  var angle = 0;
  for(var i = 0; i < 4; i ++) {
    var p1 = rect[2 * i + 0] - point[0];
    var p2 = rect[2 * i + 1] - point[1];
    var p3 = rect[2 * ((i + 1) % 4) + 0] - point[0];
    var p4 = rect[2 * ((i + 1) % 4) + 1] - point[1];
    angle += angle2D(p1, p2, p3, p4);
  }

  if(Math.abs(angle) < Math.PI) {
    return false;
  }
  else {
    return true;
  }
}

angle2D = function(p1, p2, p3, p4) {
  var theta1 = Math.atan2(p2, p1);
  var theta2 = Math.atan2(p4, p3);
  var dTheta = theta2 - theta1;

  while(dTheta > Math.PI) {
    dTheta -= 2 * Math.PI;
  }
  while(dTheta < -Math.PI) {
    dTheta += 2 * Math.PI;
  }

  return dTheta;
}

rectInt = function(rect1, rect2) {
  // *input: two vectors with two 2-D points, top left point
  // and bottom right point of the rectangle respectively
  // ------------------------------------------------------
  // Check if two rectangles intersect with each other
  for(var i = 0; i < 4; i ++) {
    if(inRect(rect1, [rect2[i * 2 + 0], rect2[i * 2 + 1]])) {
      return true;
    }
    if(inRect(rect2, [rect1[i * 2 + 0], rect1[i * 2 + 1]])) {
      return true;
    }
  }

  return false;
}

collisonDetect = function(position, dir, rank) {
  // *input: position: a 3-D coordinate, rank: the rank of the element
  // *output: bool value, true means collision, false means no collision
  // ---------------------------------------------------------
  // Check if the rectangle constructed by current position intersect with others
  var rect = calcRect(position, dir, rank);
  var targetRect;

  // if(rank != 0) {
  //   targetRect = calcRect(NVMCClient.myPos(), dir, 0);
  //   if(rectInt(rect, targetRect)) {
  //     return 0;
  //   }
  // }

  for(var i = 0; i < NVMCClient.NPCnum; i ++) {
    if(i != rank - 1) {
      var coords = [NVMCClient.NPCOffset[3 * i + 0], NVMCClient.NPCOffset[3 * i + 1], NVMCClient.NPCOffset[3 * i + 2]];
      targetRect = calcRect(coords, dir, i + 1);
      if(rectInt(rect, targetRect)) {
        return i + 1;
      }
    }
  }

  var buildings = NVMCClient.game.race.buildings;
  for(var i = 0; i < buildings.length; i ++) {
    var building = buildings[i];
    targetRect = [];
    // var xCoords = [];
    // var zCoords = [];
    // for(var j = 0; j < 4; j ++) {
    //   xCoords.push(building._outline[4 * j + 0]);
    //   zCoords.push(building._outline[4 * j + 2]);
    // }
    // targetRect.push([Math.min(...xCoords), Math.max(...zCoords)]);
    // targetRect.push([Math.max(...xCoords), Math.min(...zCoords)]);
    // targetRect = new SAT.Polygon(new SAT.Vector(), [
    //   new SAT.Vector(xCoords[0], zCoords[0]),
    //     new SAT.Vector(xCoords[1], zCoords[1]),
    //       new SAT.Vector(xCoords[2], zCoords[3]),
    //         new SAT.Vector(xCoords[2], zCoords[3])
    // ])
    // var collideResponse = new SAT.Response();
    // var collide = SAT.testPolygonPolygon(rect, targetRect, collideResponse);
    // if((collideResponse.a != null && (collideResponse.aInB || collideResponse.bInA)) || collide) {
    //   return NVMCClient.NPCnum;
    // }

    for(var j = 0; j < 4; j ++) {
      targetRect.push(building._outline[4 * j + 0], building._outline[4 * j + 2]);
    }

    if(rectInt(rect, targetRect)) {
      return this.NPCnum + 1;
    }
  }

  return -1;
}
