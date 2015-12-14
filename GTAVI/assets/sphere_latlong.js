function Sphere_latlong(verNum, horNum, radius) {
	this.name = "sphere";
	
	this.vertices = new Float32Array(3 * (verNum * horNum + 2));
	this.radius = radius;
	this.vertices[0] = 0;
	this.vertices[1] = 0;
	this.vertices[2] = this.radius;
	verticesOffset = 3;
	verAngleStep = Math.PI / (verNum + 1);
	horAngleStep = 2 * Math.PI / horNum;
	for(i = 1; i < verNum + 1; i ++){
		for(j = 0; j < horNum; j ++){
			this.vertices[verticesOffset++] = this.radius * Math.sin(i * verAngleStep) * Math.sin(j * horAngleStep);
			this.vertices[verticesOffset++] = this.radius * Math.sin(i * verAngleStep) * Math.cos(j * horAngleStep);
			this.vertices[verticesOffset++] = this.radius * Math.cos(i * verAngleStep) ;
		}
	}
	this.vertices[verticesOffset++] = 0;
	this.vertices[verticesOffset++] = 0;
	this.vertices[verticesOffset++] = -this.radius;
	
	this.triangleIndices = new Uint16Array(3 * 2 * horNum * verNum);
	triangleOffset = 0;
	
	/* Paint the top layer*/
	for(i = 0; i < horNum; i ++) {
		this.triangleIndices[triangleOffset++] = 0;
		this.triangleIndices[triangleOffset++] = 1 + (i + 1) % horNum;
		this.triangleIndices[triangleOffset++] = 1 + i % horNum;
	}
	
	/* Paint the main layers*/
	for(i = 0; i < verNum - 1; i ++){
		for(j = 0; j < horNum; j ++){
			this.triangleIndices[triangleOffset++] = i * horNum + 1 + j;
			this.triangleIndices[triangleOffset++] = i * horNum + 1 + (j + 1) % horNum;
			this.triangleIndices[triangleOffset++] = (i + 1) * horNum + 1 + j;
			
			this.triangleIndices[triangleOffset++] = i * horNum + 1 + (j + 1) % horNum;
			this.triangleIndices[triangleOffset++] = (i + 1) * horNum + 1 + (j + 1) % horNum;
			this.triangleIndices[triangleOffset++] = (i + 1) * horNum + 1 + j;
		}
	}
	
	for(i = 0; i < horNum; i ++){
		this.triangleIndices[triangleOffset++] = verNum * horNum + 1;
		this.triangleIndices[triangleOffset++] = i + (verNum - 1) * horNum + 1;
		this.triangleIndices[triangleOffset++] = (i + 1) % horNum + (verNum - 1) * horNum + 1;
	}
	
	this.numVertices = this.vertices.length / 3;
	this.numTriangles = this.triangleIndices.length / 3;
}