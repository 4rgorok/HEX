class Hex3D {

    constructor(doors1, doors2,x,z){
    var a={x:x+Settings.radius,z:z+0}
    var b={x:x+Settings.radius/2,z:z+(Settings.radius*Math.sqrt(3))/2}
    var c={x:x+(-1*Settings.radius/2),z:z+(Settings.radius*Math.sqrt(3))/2}
    var d={x:x+(-1*Settings.radius),z:z+0}
    var e={x:x+(-1*Settings.radius/2),z:z+(-1*(Settings.radius*Math.sqrt(3))/2)}
    var f={x:x+(Settings.radius/2),z:z+(-1*(Settings.radius*Math.sqrt(3))/2)}
    
    var b1={x:(a.x+b.x)/2,z:(a.z+b.z)/2}
    var b2={x:(b.x+c.x)/2,z:(b.z+c.z)/2}
    var b3={x:(c.x+d.x)/2,z:(c.z+d.z)/2}
    var b4={x:(d.x+e.x)/2,z:(d.z+e.z)/2}
    var b5={x:(e.x+f.x)/2,z:(e.z+f.z)/2}
    var b6={x:(f.x+a.x)/2,z:(f.z+a.z)/2}
    var posit=[]
    posit.push(b1)
    posit.push(b2)
    posit.push(b3)
    posit.push(b4)
    posit.push(b5)
    posit.push(b6)
       var radius = Settings.radius

       var container = new THREE.Object3D() // kontener na obiekty 3D
       var geometry = new THREE.BoxGeometry(Settings.radius, 100, 10);
        

        for (var ii = 0; ii < 3; ii++) {
            geometry.faces[4 * ii].color = colors[ii];
            geometry.faces[4 * ii + 1].color = colors[ii];
            geometry.faces[4 * ii + 2].color = colors[ii];
            geometry.faces[4 * ii + 3].color = colors[ii];
        }
        
        var material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            vertexColors: THREE.FaceColors,
            specular: 0xffffff,
            shininess: 50,
            side: THREE.DoubleSide,
          });
       var wall = new THREE.Mesh(geometry, material); // prostopadłościan - ściana hex-a
  
       for (var i = 0; i < 6; i++) {
           if(i==doors1)
           {
                var side=new doors3D(i,x,z)
                container.add(side)
           }
           else if(i==doors2)
           {
            var side=new doors3D(i,x,z)
            container.add(side)
           }
           else
           {
            var side = wall.clone()            // klon ściany
            side.position.x = posit[i].x              // punkt na okręgu, do obliczenia
            side.position.z = posit[i].z              // punkt na okręgu, do obliczenia      
            side.rotation.y-=Math.PI/3*(i-1)    // nakierowanie ściany na środek kontenera 3D  
            container.add(side)                // dodanie ściany do kontenera
           }
       }   
       var geometry = new THREE.CylinderGeometry( 100, 100, 1, 6 );
    //var material = new THREE.MeshBasicMaterial( {color: green} );
    var material = new THREE.MeshPhongMaterial({
        // color: 0xff0000,
        specular: 0xffffff,
        shininess: 50,
        side: THREE.DoubleSide,
        color:green
        
    })
    var cylinder = new THREE.Mesh( geometry, material );
    cylinder.rotation.y+=Math.PI/2
    cylinder.position.y-=50
    cylinder.position.x=x
    cylinder.position.z=z
    container.add( cylinder );
       //container.rotation.y+= Math.PI / 6
       return container

    }
    
    
}

