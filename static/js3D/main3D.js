
var red = new THREE.Color(Math.random() * 0xffffff);
        var green = new THREE.Color("rgb(51, 153, 255)");
        var blue = new THREE.Color(Math.random() * 0xffffff);
        var colors = [red, green, blue];
$(document).ready(function(){
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
    45,    // kąt patrzenia kamery (FOV - field of view)
    window.innerWidth/window.innerHeight,    // proporcje widoku, powinny odpowiadać proporcjom naszego ekranu przeglądarki
    0.1,    // minimalna renderowana odległość
    10000    // maksymalna renderowana odległość od kamery
    );
    var renderer = new THREE.WebGLRenderer();
    var axes = new THREE.AxesHelper(1000)
    scene.add(axes)
    
    
    camera.position.set(0,1000,0)
    camera.lookAt(scene.position)
    //camera.rotation.y = Math.PI / 2
    renderer.setClearColor(0xFFFFFF);
    //camera.rotateY( 90 * THREE.Math.DEG2RAD)
    var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControl.addEventListener('change', function () {
        renderer.render(scene, camera)
    });
    camera.rotation.z -= Math.PI / 2
    renderer.setSize(window.innerWidth,window.innerHeight);

    var container = new THREE.Object3D()
    
    var hex=new Hex3D(0,1,0,0)
    
   
    container.add(hex)
 
    
    var light = new Light(0,0)
    light.inte(1)
    container.add(light.getLight());  // jest tutaj ze swiatlem poniewaz dopiero przy wysylaniu zorientowalem sie ze poprzez zmienienie matrialu w klasie hex3D w dalszych czesciach projektu to zostal on taki tez w tej pierwszej czesci
    
    scene.add(container)
   
    
    $("#root").append( renderer.domElement );

    
    function render() {


        requestAnimationFrame(render);
    
        console.log("render leci")
            
        renderer.render(scene, camera);
    }
    
    render();
    
})

