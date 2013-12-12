(function() {

var camera, scene, renderer;
var geometry, material, meshes;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 300;

    scene = new THREE.Scene();

    geometry = new THREE.CubeGeometry(200, 200, 200);
    material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    });
    meshes = [];
    meshes.push(new THREE.Mesh(geometry, material));
    scene.add(meshes[0]);

    renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    document.getElementsByTagName('body')[0].onclick = function(event){
        var temp = new THREE.Mesh(geometry, material);
        meshes.push(temp);
        console.log(event.x, event.y);
        temp.position = new THREE.Vector3(event.x - (window.innerWidth / 2), (window.innerHeight / 2) - event.y, 100);
        scene.add(temp);
    };

}

function animate() {

    // note: three.js includes requestAnimationFrame shim
    requestAnimationFrame(animate);

    for(var i = 0; i < meshes.length; i++) {
        var mesh = meshes[i];
        mesh.rotation.x += getRandomArbitary(-0.02,0.02);
        mesh.rotation.y += getRandomArbitary(-0.02,0.02);
        mesh.translateZ(-10);
    }


    renderer.render(scene, camera);

}

function getRandomArbitary (min, max) {
    return Math.random() * (max - min) + min;
}

})();
