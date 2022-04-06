var dane
var swiatla=[]
var red = new THREE.Color(Math.random() * 0xffffff);
        var green = new THREE.Color("rgb(51, 153, 255)");
        var blue = new THREE.Color(Math.random() * 0xffffff);
        var colors = [red, green, blue];

document.getElementById("wys").oninput=function()
{
    for(var i=0;i<swiatla.length;i++)
    {
        swiatla[i].wys(this.value)
        
    }
}
document.getElementById("int").oninput=function()
{
    for(var i=0;i<swiatla.length;i++)
    {
        swiatla[i].inte(this.value/100)
    }
}
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

    
    //console.log(light)

    
    //hex.rotation.y+= Math.PI / 6
    //scene.add(hex)
    //container.add(hex)
    //var hex=new Hex3D(0,2,200,0)
    

    //scene.add(container)
    /*var hex=new Hex3D(0,2,0,Settings.radius*Math.sqrt(3))
    container.add(hex)*/
    aja()
    function aja()
    {
        $.ajax({
            
            url: "/dajGre",
            data: {},
            type: "GET",
            success: function (data) {
                dane = JSON.parse(data)
                narysuj(dane.i,dane.s)
                //console.log(dane)
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
    function narysuj(ilo,plan)
    {
        var container = new THREE.Object3D()
    
        var sx=0
        var sz=-1*(Settings.radius*Math.sqrt(3))
        var licz=0
        //console.log(plan)
        for(var i=0;i<ilo;i++)
        {
            for(var ii=0;ii<ilo;ii++)
            {
                if(ii==0)
                    {
                            if(i%2==0)
                            {
                                sz+=Settings.radius*Math.sqrt(3)
                            }
                            else
                            {
                                sz+=Settings.radius*Math.sqrt(3)/2
                                sx-=Settings.radius/2*3
                            }
                    }
                console.log(i,ii)
                for(var i3=0;i3<plan.length;i3++)
                {
                    //console.log(plan[i3].id)
                    if(plan[i3].id==licz)
                    {
                        //console.log(plan[i3].id)
                        console.log(licz)
                        var hex
                        //,
                        hex=new Hex3D(plan[i3].dirIn,plan[i3].dirOut,sx-(Settings.radius/2*3)*ii,sz-(Settings.radius*Math.sqrt(3)/2)*ii)
                        container.add(hex)
                        if(plan[i3].type=="light")
                        {
                            console.log(sx-(Settings.radius/2*3)*ii,sz-(Settings.radius*Math.sqrt(3)/2)*ii)
                            var light = new Light(sx-(Settings.radius/2*3)*ii,sz-(Settings.radius*Math.sqrt(3)/2)*ii)
                            container.add(light.getLight());
                            swiatla.push(light)
                            light.wys(50)
                            light.inte(0.5)
                        }
                        if(plan[i3].type=="treasure")
                        {
                            var geometryy = new THREE.BoxGeometry(30, 30, 30);
                           
                            var material = new THREE.MeshPhongMaterial({
                                // color: 0xff0000,
                                specular: 0xffffff,
                                shininess: 50,
                                side: THREE.DoubleSide,
                                color:0xffffff
                            })

                            mesh = new THREE.Mesh(geometryy, material);
                            mesh.position.set(sx-(Settings.radius/2*3)*ii,-30,sz-(Settings.radius*Math.sqrt(3)/2)*ii)
                            container.add(mesh)
                            //container.add(this.mesh);
                        }
                        
                   }
                 }
                
                licz+=1
            }
        }
        container.rotation.y+= Math.PI / 6
        console.log(container)
        scene.add(container)
    }
    
    $("#root").append( renderer.domElement );

    
    function render() {


        requestAnimationFrame(render);
    
        console.log("render leci")
            
        renderer.render(scene, camera);
    }
    
    render();
    
})
