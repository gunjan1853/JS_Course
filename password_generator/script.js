let password=document.getElementById("password");

let copyBtn=document.getElementById("copyBtn");

let generateBtn=document.getElementById("generateBtn");

let length=document.getElementById("length");

let lengthValue=document.getElementById("lengthValue");

let fill=document.getElementById("fill");

let status=document.getElementById("status");

length.addEventListener("input",function(){

lengthValue.innerText=length.value;

});

function upper(){

return String.fromCharCode(Math.floor(Math.random()*26)+65);

}

function lower(){

return String.fromCharCode(Math.floor(Math.random()*26)+97);

}

function number(){

return Math.floor(Math.random()*10);

}

function symbol(){

let sym="@#$%&*!?";

return sym[Math.floor(Math.random()*sym.length)];

}

function generatePassword(){

let pass="";

let arr=[];

if(document.getElementById("upper").checked){

arr.push(upper);

}

if(document.getElementById("lower").checked){

arr.push(lower);

}

if(document.getElementById("number").checked){

arr.push(number);

}

if(document.getElementById("symbol").checked){

arr.push(symbol);

}

if(arr.length==0){

alert("Select at least one option");

return;

}

for(let i=0;i<length.value;i++){

let random=Math.floor(Math.random()*arr.length);

pass+=arr[random]();

}

password.value=pass;

checkStrength(pass);

}

generateBtn.addEventListener("click",generatePassword);

copyBtn.addEventListener("click",function(){

navigator.clipboard.writeText(password.value);

alert("Password Copied");

});

function checkStrength(pass){

let score=0;

if(pass.length>=12){

score++;

}

if(/[A-Z]/.test(pass)){

score++;

}

if(/[a-z]/.test(pass)){

score++;

}

if(/[0-9]/.test(pass)){

score++;

}

if(/[@#$%&*!?]/.test(pass)){

score++;

}

if(score<=2){

fill.style.width="30%";

fill.style.background="red";

status.innerText="Weak";

}

else if(score<=4){

fill.style.width="70%";

fill.style.background="orange";

status.innerText="Medium";

}

else{

fill.style.width="100%";

fill.style.background="green";

status.innerText="Strong";

}

}

generatePassword();
let themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click",function(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        themeBtn.innerHTML="☀️";

    }

    else{

        themeBtn.innerHTML="🌙";

    }

});