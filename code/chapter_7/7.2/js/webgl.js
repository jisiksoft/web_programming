var camera, mesh, scene, renderer;

function initialize( container, size ) {
	
	camera = new THREE.PerspectiveCamera( 70, size/size, 1, 1000 );
	camera.position.z = size;

	var geometry = new THREE.CubeGeometry( 250, 250, 250 );
	var material = new THREE.MeshFaceMaterial([
					    new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( './img/1.jpg' ) } ),
					    new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( './img/2.jpg' ) } ),
					    new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( './img/3.jpg' ) } ),
					    new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( './img/4.jpg' ) } ),
					    new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( './img/5.jpg' ) } ),
					    new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( './img/6.jpg' ) } )
					]);

	mesh = new THREE.Mesh( geometry, material );
	
	scene = new THREE.Scene();
	scene.add( mesh );
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( size, size );
	renderer.setClearColor( 0xffffff, 1);
	$('#'+container).html( renderer.domElement );
}

function animate() {
	requestAnimationFrame( animate );
	mesh.rotation.x += 0.005;
	mesh.rotation.y += 0.01;
	renderer.render( scene, camera );
}
