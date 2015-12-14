function Sphere_subd(layer) {
	this.name = "sphere";
	
	this.radius = 1;
	this.vertices = [
		0, 0, this.radius,
		this.radius * Math.cos(2 / 4 * Math.PI), this.radius * Math.sin(2 / 4 * Math.PI), 0,
		this.radius * Math.cos(4 / 4 * Math.PI), this.radius * Math.sin(4 / 4 * Math.PI), 0,
		this.radius * Math.cos(6 / 4 * Math.PI), this.radius * Math.sin(6 / 4 * Math.PI), 0,
		this.radius * Math.cos(8 / 4 * Math.PI), this.radius * Math.sin(8 / 4 * Math.PI), 0,
		0, 0, -this.radius
	];
	this.triangleIndices = [
		0, 2, 1,
		0, 3, 2,
		0, 4, 3,
		0, 1, 4,
		5, 1, 2,
		5, 2, 3,
		5, 3, 4,
		5, 4, 1
	];
	
	/* Consider it as a queue*/
	while(this.triangleIndices.length < 3 * 8 * Math.pow(4, layer)) {
		var oldPointIndices = [];
		oldPointIndices.push(this.triangleIndices.shift() );
		oldPointIndices.push(this.triangleIndices.shift());
		oldPointIndices.push(this.triangleIndices.shift());
		
		newPoint1 = lengthMod(arrayPlusMean(this.vertices.slice(oldPointIndices[0] * 3, oldPointIndices[0] * 3 + 3), this.vertices.slice(oldPointIndices[1] * 3, oldPointIndices[1] * 3 + 3)), this.radius);
		newPoint2 = lengthMod(arrayPlusMean(this.vertices.slice(oldPointIndices[1] * 3, oldPointIndices[1] * 3 + 3), this.vertices.slice(oldPointIndices[2] * 3, oldPointIndices[2] * 3 + 3)), this.radius);
		newPoint3 = lengthMod(arrayPlusMean(this.vertices.slice(oldPointIndices[0] * 3, oldPointIndices[0] * 3 + 3), this.vertices.slice(oldPointIndices[2] * 3, oldPointIndices[2] * 3 + 3)), this.radius);
		
		curVertLen = this.vertices.length / 3;
		this.vertices.push(newPoint1[0], newPoint1[1], newPoint1[2]);
		this.vertices.push(newPoint2[0], newPoint2[1], newPoint2[2]);
		this.vertices.push(newPoint3[0], newPoint3[1], newPoint3[2]);
		this.triangleIndices.push(oldPointIndices[0], curVertLen + 0, curVertLen + 2);
		this.triangleIndices.push(oldPointIndices[1], curVertLen + 1, curVertLen + 0);
		this.triangleIndices.push(oldPointIndices[2], curVertLen + 1, curVertLen + 2);
		this.triangleIndices.push(curVertLen + 0, curVertLen + 2, curVertLen + 1);
	}
	this.vertices = new Float32Array(this.vertices);
	this.triangleIndices = new Uint16Array(this.triangleIndices);
	
	this.numVertices = this.vertices.length / 3;
	this.numTriangles = this.triangleIndices.length / 3;
}

function arrayPlusMean(array1, array2) {
	len = Math.min(array1.length, array2.length);
	
	var returnArr = new Array();
	for(i = 0; i < len; i ++) {
		returnArr.push((array1[i] + array2[i]) / 2);
	}
	
	return returnArr;
}

function lengthMod(array, radius) {
	var sum = 0;
	
	for(i = 0; i < array.length; i++) {
		sum += array[i] * array[i];
	}
	
	sum = Math.sqrt(sum);
	return array.map(function(num){
		return num * radius / sum;
	}
	)
}