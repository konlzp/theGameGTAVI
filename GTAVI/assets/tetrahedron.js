
function Tetrahedron (size) {

	this.name = "tetrahedron";

	// vertices definition
	////////////////////////////////////////////////////////////
	
	this.vertices = new Float32Array(3 * 4);
	
	// Vertices
	i = 0
	  while(i < 12){
		  this.vertices[i++] = (i - 1) % 4 == 0 ? size : 0;
		  this.vertices[i++] = (i - 1) % 4 == 0 ? size : 0;
		  this.vertices[i++] = (i - 1) % 4 == 0 ? size : 0;
	  }
	// triangles defition
	////////////////////////////////////////////////////////////
	
	this.triangleIndices = new Uint16Array(3 * 4);
	
	this.triangleIndices[0] = 0;
	this.triangleIndices[1] = 1;
	this.triangleIndices[2] = 2;
	this.triangleIndices[3] = 0;
	this.triangleIndices[4] = 2;
	this.triangleIndices[5] = 3;
	this.triangleIndices[6] = 0;
	this.triangleIndices[7] = 3;
	this.triangleIndices[8] = 1;
	this.triangleIndices[9] = 1;
	this.triangleIndices[10] = 2;
	this.triangleIndices[11] = 3;
	
	this.numVertices = this.vertices.length/3;
	this.numTriangles = this.triangleIndices.length/3;
}
