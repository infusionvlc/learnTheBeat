var loader = new THREE.STLLoader();
var group = new THREE.Object3D();

loader.load("./models/1la_chang.stl", function (geometry) {
    var mat = new THREE.MeshStandardMaterial({color: 0x7777ff});
    group = new THREE.Mesh(geometry, mat);
    group.position.set(0, 0, 0);
    document.getElementsByClassName('note')[0].setObject3D("mesh", group);
});