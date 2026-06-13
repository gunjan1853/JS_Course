// const element=document.getElementById("heading");
// element.addEventListener("mouseover",function(){
//      element.textContent="Welcome to coder army";
//      element.style.color="red";
// })

const parent=document.getElementById("Parent");
// parent.addEventListener("click",function(){
//         parent.textContent="Welcome to coder army";
//         parent.style.color="red";
// })
for(let child of parent.children){
    child.addEventListener("click",function(){
        child.textContent="Welcome to coder army";
        child.style.color="black";
    })
}