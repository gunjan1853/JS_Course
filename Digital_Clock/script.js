const div=document.getElementById("clock");

setInterval(function(){
    const date=new Date();
    const hours=date.getHours();
    const minutes=date.getMinutes();
    const seconds=date.getSeconds();
    div.textContent = `${hours}:${minutes}:${seconds}`;
},1000);