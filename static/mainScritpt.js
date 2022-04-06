var hexes=[]
var tab={hexes:hexes,level:[]}
var type="wall"
var ilosc=3
window.addEventListener('DOMContentLoaded', (event) => {
    prepare()
    
});

function prepare()
{
    var left = document.createElement("div")
    left.id="lft"       
    var main=document.createElement("div")
    main.id="main"
    var sel=document.createElement("select")
    sel.id="sel"
    for(var i=3;i<15;i++)
    {
        var opt=document.createElement("option")
        opt.text=i
        opt.className="opt"
        sel.appendChild(opt)
    }
    sel.onchange=function()
    {
        createHexes(this.value)
        ilosc=this.value
    }
    left.appendChild(sel)
    var zapisBtn = document.createElement("button")
    zapisBtn.id="zapiszBtn"
    zapisBtn.innerHTML="ZAPISZ LEVEL NA SERWERZE"
    zapisBtn.onclick=function()
    {
        zapisz()
    }
    left.appendChild(zapisBtn)

    var wczy = document.createElement("button")
    wczy.id="wczytaj"
    wczy.innerHTML="WCZYTAJ LEVEL"
    wczy.onclick=function()
    {
        wczytaj()
    }
    left.appendChild(wczy)

    var walls = document.createElement("button")
    walls.id="wall"
    walls.innerHTML="WALLS"
    walls.style.border="1px solid red"
    walls.onclick=function()
    {
        document.getElementById("wall").style.border="solid 1px red"
        document.getElementById("enemy").style.border=""
        document.getElementById("treasure").style.border=""
        document.getElementById("light").style.border=""
        type="wall"
    }
    left.appendChild(walls)

    var enemy = document.createElement("button")
    enemy.id="enemy"
    enemy.innerHTML="ENEMY"
    enemy.onclick=function()
    {
        document.getElementById("wall").style.border=""
        document.getElementById("enemy").style.border="solid 1px red"
        document.getElementById("treasure").style.border=""
        document.getElementById("light").style.border=""
        type="enemy"
    }
    left.appendChild(enemy)

    var treas = document.createElement("button")
    treas.id="treasure"
    treas.innerHTML="TREASURE"
    treas.onclick=function()
    {
        document.getElementById("wall").style.border=""
        document.getElementById("enemy").style.border=""
        document.getElementById("treasure").style.border="solid 1px red"
        document.getElementById("light").style.border=""
        type="treasure"
    }
    left.appendChild(treas)

    var light = document.createElement("button")
    light.id="light"
    light.innerHTML="LIGHT"
    light.onclick=function()
    {
        document.getElementById("wall").style.border=""
        document.getElementById("enemy").style.border=""
        document.getElementById("treasure").style.border=""
        document.getElementById("light").style.border="solid 1px red"
        type="light"
    }
    left.appendChild(light)

    var goto = document.createElement("button")
    goto.id="goto"
    goto.innerHTML="GO TO HEX!"
    goto.onclick=function()
    {
        var p=document.createElement("form")
        p.action="/hex"
        p.method="GET"
        p.hidden="true"
        var b=document.createElement("input")
        b.type="submit"
        p.appendChild(b)
        document.body.appendChild(p)
        b.click()
    }
    left.appendChild(goto)

    var game = document.createElement("button")
    game.id="game"
    game.innerHTML="GO TO GAME!"
    game.onclick=function()
    {
        gra()
    }
    left.appendChild(game)

    var jso=document.createElement("div")
    jso.id="jso"
    document.body.appendChild(jso)
    document.body.appendChild(left)
    document.body.appendChild(main)
    createHexes(3)
}
function createHexes(val)
{
    document.getElementById("main").innerHTML=""
    tab.hexes=[]
    tab.level=[]
    tab.final=[]
    var licz=0
    for(var i=0;i<val;i++)
    {
        for(var ii=0;ii<val;ii++)
        {
            var obj={id:licz,x:i,y:ii,dir:"q"}
            var dod=0;
            if(i%2==1)dod=50
            var newHex = new hex(104*ii+dod,90*i,licz);
            tab.hexes.push(newHex)
            tab.level.push(obj)
            licz++
        }
    }
}
function zapisz()
{
    var wysl=tab.final
    $.ajax({
        
        url: "/zapisz",
        //dataType: "json",
        data: {objectData: wysl, b:ilosc},
        //contentType: "application/json",
        type: "POST",
        success: function (data) {
            
            var dane = JSON.parse(data)
            
        },
        error: function (xhr, status, error) {
            console.log(xhr);
        },
    });
}
function gra()
{
    var wysl=tab.final
    $.ajax({
        
        url: "/gra",
        data: {objectData: wysl, b:ilosc},
        type: "POST",
        success: function (data) {
            var p=document.createElement("form")
            p.action="/game"
            p.method="GET"
            p.hidden="true"
            var b=document.createElement("input")
            b.type="submit"
            p.appendChild(b)
            document.body.appendChild(p)
            b.click()
            
            
        },
        error: function (xhr, status, error) {
            console.log(xhr);
        },
    });
}

function wczytaj()
{
    var wysl=tab.final
    $.ajax({
        
        url: "/wczytaj",
        //dataType: "json",
        data: {objectData: wysl},
        //contentType: "application/json",
        type: "GET",
        success: function (data) {
            var dane = JSON.parse(data)
            if(dane.i!=0)
            {

                odtworz(dane.s,dane.i)
            }
            else
            {
                window.alert("brak poziomu do wczytania")
            }
            
        },
        error: function (xhr, status, error) {
            console.log(xhr);
        },
    });
}

function odtworz(dane,s)
{
    document.getElementById("main").innerHTML=""
    tab.hexes=[]
    tab.level=[]
    tab.final=[]
    var licz=0
    for(var i=0;i<s;i++)
    {
        for(var ii=0;ii<s;ii++)
        {
            var obj={id:licz,x:i,y:ii,dir:"q"}
            var dod=0;
            if(i%2==1)dod=50
            var newHex = new hex(104*ii+dod,90*i,licz);
            tab.hexes.push(newHex)
            tab.level.push(obj)
            for(var i3=0;i3<dane.length;i3++)
            {
                if(dane[i3].id==licz)
                {
                    for(var i4=0;i4<=dane[i3].dirOut;i4++)document.getElementById(licz).click()

                }
            }
            licz++
        }
    }
    
    tab.final=dane
    var results = JSON.stringify(tab.final, undefined, 2)
    var results2 = results.replace(/\n/g, "<br>").replace(/[ ]/g, "&nbsp;");
    document.getElementById("jso").innerHTML=results2
 document.getElementById("sel").selectedIndex=s-3
 ilosc=s
}