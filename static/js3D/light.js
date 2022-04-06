class Light {

    constructor(parametrA, parametrB) {

	// przykładowe, nieobowiązkowe parametry konstruktora 
	// przekazane podczas tworzenia obiektu klasy Light
	// np scena, kolor światła, wielkość bryły

        this.parametrA = parametrA
        this.parametrB = parametrB

	//dodatkowe zmienne tworzone w konstruktorze
	//widoczne w dalszych funkcjach
	
        this.zmienna = 0

        //pusty kontener na inne obiekty 3D

        this.container = new THREE.Object3D();
        this.container.position.set(parametrA,0,parametrB)
        //wywołanie funkcji init()

        this.init()
    }

    init() {

        // utworzenie i spozycjonowanie światła

        //this.light = new THREE.SpotLight(0xffffff, 2, 500, Math.PI / 8);
        this.light=new THREE.PointLight(0xFFFFFF, 0.05);
        this.light.position.set(0, 0, 0); // ma być w pozycji 0,0,0 kontenera - nie zmieniamy 

	// dodanie światła do kontenera

        this.container.add(this.light);

        //utworzenie widzialnego elementu reprezentującego światło (mały sześcian, kula, czworościan foremny, do wyboru)
        var geometry = new THREE.BoxGeometry(15, 15, 15);
        var materials = new THREE.MeshBasicMaterial({
            color: 0x8888ff,
            side: THREE.DoubleSide,
            wireframe: true,
            transparent: false, 
            opacity: 0.5
        });
        this.mesh = new THREE.Mesh(geometry, materials);
        
        

        this.container.add(this.mesh);
    }


    // funkcja zwracająca obiekt kontenera
    // czyli nasze światło wraz z bryłą

    getLight() {
        return this.container;
    }

    // przykład innej funkcji, np do zmiany koloru bryły, zmiany koloru światła, etc

    changeColor (color) {
        console.log("zmiana koloru na " + color)
    }  
    wys(x)
    {
        this.container.position.y=x
    } 
    inte(x)
    {
        this.light.intensity=x
    }

}