
function Pentahedron (size) {

	this.name = "tetrahedron";

	// vertices definition
	////////////////////////////////////////////////////////////
	
	this.vertices = new Float32Array([
		0, 0, 1,
		1, 0, 0,
		0, 1, 0,
		-1,0, 0,
		0,-1, 0
	]);
	
	// triangles defition
	////////////////////////////////////////////////////////////
	
	this.triangleIndices = new Uint16Array(3 * 10);
	
	triangleOffset = 0;
	for(i = 0; i < 5 - 2; i ++) {
		for(j = i + 1; j < 5 - 1; j ++) {
			for(k = j + 1; k < 5; k ++) {
				this.triangleIndices[triangleOffset++] = i;
				this.triangleIndices[triangleOffset++] = j;
				this.triangleIndices[triangleOffset++] = k;
			}
		}
	}
	
	this.numVertices = this.vertices.length/3;
	this.numTriangles = this.triangleIndices.length/3;
}
