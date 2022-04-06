class doors3D {

    constructor(w,x,z){
    var a={x:x+Settings.radius,z:z+0}
    var b={x:x+Settings.radius/2,z:z+(Settings.radius*Math.sqrt(3))/2}
    var c={x:x+(-1*Settings.radius/2),z:z+(Settings.radius*Math.sqrt(3))/2}
    var d={x:x+(-1*Settings.radius),z:z+0}
    var e={x:x+(-1*Settings.radius/2),z:z+(-1*(Settings.radius*Math.sqrt(3))/2)}
    var f={x:x+(Settings.radius/2),z:z+(-1*(Settings.radius*Math.sqrt(3))/2)}
    var po2=[]
    po2.push(a)
    po2.push(b)
    po2.push(c)
    po2.push(d)
    po2.push(e)
    po2.push(f)
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
       var geometry = new THREE.BoxGeometry(Settings.radius/4, 100, 10);
        

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
  
            var dod=w+1
            if(dod==6)dod=0;
    
            var side = wall.clone()            // klon ściany
            side.position.x = ((posit[w].x+po2[dod].x)/2+po2[dod].x)/2            // punkt na okręgu, do obliczenia
            side.position.z = ((posit[w].z+po2[dod].z)/2+po2[dod].z)/2                // punkt na okręgu, do obliczenia      
            side.rotation.y-=Math.PI/3*(w-1)    // nakierowanie ściany na środek kontenera 3D  
            container.add(side) 
                                                 // dodanie ściany do kontenera
            var side = wall.clone()            // klon ściany
            side.position.x = ((posit[w].x+po2[w].x)/2 +po2[w].x)/2             // punkt na okręgu, do obliczenia
            side.position.z = ((posit[w].z+po2[w].z)/2 +po2[w].z)/2  
            side.rotation.y-=Math.PI/3*(w-1)             // punkt na okręgu, do obliczenia      
           // side.lookAt(container.position)    // nakierowanie ściany na środek kontenera 3D  
            //console.log(w)
            container.add(side)
         

       return container

    }
    
    
}
