class hex
{
    constructor(top, left,id) {
        this.top=top
        this.left=left
        this.id=id
        this.stworz()
    };
    stworz()
    {
        var that=this
        var div=document.createElement("div")
        div.className="hex"
        div.id=this.id
        div.style.top=this.top+"px"
        div.style.left=this.left+"px"
        div.innerHtml="lol"
        div.onclick=function()
        {
            that.num(this)
        }
        document.getElementById("main").appendChild(div)
    }
    num(obj)
    {
        if(tab.level[obj.id].dir=="q")
        {
            var nobj={id:tab.level[obj.id].id,x:tab.level[obj.id].x,y:tab.level[obj.id].y,dirOut:0,dirIn:3,type:type}
            tab.final.push(nobj)
            var chld=document.createElement("div")
            chld.className="chld"
            chld.innerHTML="<br><br>0"
            obj.appendChild(chld)
            tab.level[obj.id].dir=0
        }
        else if(tab.level[obj.id].dir==5)
        {
            obj.children[0].innerHTML="<br><br>0"
            tab.level[obj.id].dir=0
            for(var i=0;i<tab.final.length;i++)
            {
                if(tab.final[i].id==tab.level[obj.id].id)
                {
                    tab.final[i].dirIn=3
                    tab.final[i].dirOut=0
                    tab.final[i].type=type
                }
            }
        }
        else
        {
            tab.level[obj.id].dir++
            obj.children[0].innerHTML="<br><br>"+tab.level[obj.id].dir
            for(var i=0;i<tab.final.length;i++)
            {
                if(tab.final[i].id==tab.level[obj.id].id)
                {
                    tab.final[i].dirIn=(tab.level[obj.id].dir+3)%6
                    tab.final[i].dirOut=tab.level[obj.id].dir
                    tab.final[i].type=type
                }
            }
        }
        obj.children[0].style.transform="rotate("+60*tab.level[obj.id].dir+"deg)"
        
        var results = JSON.stringify(tab.final, undefined, 2)
        var results2 = results.replace(/\n/g, "<br>").replace(/[ ]/g, "&nbsp;");
        document.getElementById("jso").innerHTML=results2
        
    }
}