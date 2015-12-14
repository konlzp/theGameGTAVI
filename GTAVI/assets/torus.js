function Torus(inRadius, outRadius, inResolution, outResolution) {
	this.name = "torus";
	this.vertices = new Float32Array(3 * inResolution * outResolution);
	verticeOffset = 0;
	outAngleStep = 2 * Math.PI / outResolution;
	inAngleStep = 2 * Math.PI / inResolution;
	for(i = 0; i < outResolution; i ++) {
		for(j = 0; j < inResolution; j ++) {
			vertice = [outRadius * Math.cos(outAngleStep * i) + inRadius * Math.cos(inAngleStep * j) * Math.cos(outAngleStep * i), outRadius * Math.sin(outAngleStep * i) + inRadius * Math.cos(inAngleStep * j) * Math.sin(outAngleStep * i), 0 + inRadius * Math.sin(inAngleStep * j)]
			this.vertices[verticeOffset++] = vertice[0] ;
			this.vertices[verticeOffset++] = vertice[1] ;
			this.vertices[verticeOffset++] = vertice[2] ;
		}
	}
	
	this.triangleIndices = new Uint16Array(3 * 2 * inResolution * outResolution);
	triangleOffset = 0;
	for(i = 0; i < outResolution; i ++) {
		for(j = 0; j < inResolution; j ++) {
			this.triangleIndices[triangleOffset++] = j + i * inResolution;
			this.triangleIndices[triangleOffset++] = (j + 1) % inResolution + i * inResolution;
			this.triangleIndices[triangleOffset++] = (j + inResolution + i * inResolution) % (outResolution * inResolution);
			
			this.triangleIndices[triangleOffset++] = (j + inResolution + i * inResolution) % (outResolution * inResolution);
			this.triangleIndices[triangleOffset++] = ((j + 1) % inResolution + inResolution + i * inResolution) % (outResolution * inResolution);
			this.triangleIndices[triangleOffset++] = ((j + 1) % inResolution + i * inResolution) % (outResolution * inResolution);
		}
	}
	
	this.numTriangles = this.triangleIndices.length / 3;
	this.numVertices = this.vertices.length / 3;
}