const form=document.querySelector("form")
const value=document.querySelector("input")
const ul=document.querySelector("ul")
const show=document.getElementById("result")
var target;
//localStorage.clear()
var count=0;
var countelement=-1;
var object=JSON.parse(localStorage.getItem("user"))
var objectmid={}
var current=-1;
var pen=document.querySelectorAll("a span:last-child")
if (object==null)
object={}
else{
    for (i in object){
        const li=document.createElement("li");
        countelement+=1
        li.innerHTML=`<a data-type="${object[i][1]}" data-n=${countelement} href="javascript:void(0)">${object[i][0]}
          <span><i class="fa-thin fa-trash-can" ></i></span>
          <span><i class="fa-solid fa-pencil"></i></span>
        </a> 
        <hr />`
          if (object[i][1]=="off")  {li.children[0].style.textDecoration="line-through 1.5px red" ;count+=1}
        objectmid[countelement]=object[i]
       ul.appendChild(li)
       addevent();
       updateshow();
    }
    object=objectmid
    update()
}
function checkcount(a){
    if (a=="off") count-=1
    updateshow();
}
function update(){
    localStorage.setItem("user",JSON.stringify(object))
}
function write(){
    const li=document.createElement("li");
    countelement+=1
    li.innerHTML=`<a data-type="on" data-n=${countelement} href="javascript:void(0)">${value.value}
      <span><i class="fa-thin fa-trash-can" ></i></span>
      <span><i class="fa-solid fa-pencil"></i></span>
    </a> 
    <hr />`
    object[countelement]=[value.value,"on"]
    update();
   ul.appendChild(li)
   value.value="";
}


function edit(){
    target.innerHTML=`${value.value}<span><i class="fa-thin fa-trash-can" ></i></span>
    <span><i class="fa-solid fa-pencil"></i></span>`
    object[target.dataset.n][0]=value.value
    update()
    value.nextElementSibling.value="ADD TASK";
    form.dataset.type="add";
    value.value=""
    target.children[0].addEventListener("click",function(){
        this.parentElement.removeEventListener("click",change);
        const g=this.parentElement.dataset.n
        delete(object[g])
        update();
        checkcount(this.parentElement.dataset.type)
        this.parentElement.parentElement.remove()
        })
        target.children[1].addEventListener("click",function(){
            this.parentElement.removeEventListener("click",change);
            value.value=this.parentElement.innerText
            value.nextElementSibling.value="EDIT TASK"
            form.dataset.type="edit";
            target=this.parentElement
            this.previousElementSibling.style.display="none"
        pen=document.querySelectorAll("a span:last-child")
        for (i in pen) {
            if (i=="entries") break
        if (i==this.parentElement.dataset.n) continue
        pen[i].style.display="none"    }
            })
            for (i in pen) {
                if (i=="entries") break
            pen[i].style.display="block"    }    

}
form.addEventListener("submit",function (e){
    e.preventDefault(); 
    if (value.value=="") {return};
    if (form.dataset.type=="edit") {
        return edit()}
    write();
   addevent();
})
function updateshow(){
    if (count>0)
    show.innerHTML=`Yeah, ${count} task completed!`
else show.innerHTML=``;
}
function change(){
    if (this.dataset.type=="off"){
    this.style.textDecoration="none";
    count-=1;
    this.dataset.type="on"
    }
else
{
    this.style.textDecoration="line-through 1.5px red";
    count+=1;
    this.dataset.type="off"}
    updateshow();
    object[this.dataset.n][1]=this.dataset.type
    update();
}

function check(){
    this.addEventListener("click",change)
}
function addevent(){
    const a=document.querySelector("#list li:last-child a");
    a.addEventListener("click",change)
    a.addEventListener("click",check)
    let [b,c]=a.children
    b.addEventListener("click",function(){
        a.removeEventListener("click",change);
        const g=this.parentElement.dataset.n
        delete(object[g])
        update();
        checkcount(this.parentElement.dataset.type);
    this.parentElement.parentElement.remove()
    })
    c.addEventListener("click",function(){
        current=this.parentElement.dataset.n;
        this.parentElement.removeEventListener("click",change);
        value.value=this.parentElement.innerText;
        value.nextElementSibling.value="EDIT TASK";
        form.dataset.type="edit";
        target=this.parentElement
        this.previousElementSibling.style.display="none"
        pen=document.querySelectorAll("a span:last-child")
        for (i in pen) {
            if (i=="entries") break
        if (i==this.parentElement.dataset.n) continue
        pen[i].style.display="none"    }
        })
 }