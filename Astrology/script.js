const predictions = [

"Today is lucky for new beginnings. ✨",

"You will receive good news very soon. 😊",

"A surprise opportunity is waiting for you. 🚀",

"Success will come through hard work. 💪",

"Someone special is thinking about you. ❤️",

"Financial growth is on the way. 💰",

"Trust your instincts today. 🔮",

"A new friendship will brighten your life. 🤝",

"Your confidence will impress everyone. 🌟",

"Big achievements are closer than you think. 🏆",

"A wonderful journey is coming soon. ✈️",

"Stay positive and miracles will happen. 🌈"

];

function predict(){

let name=document.getElementById("name").value;
let zodiac=document.getElementById("zodiac").value;

if(name==="" || zodiac===""){
    alert("Please fill all details.");
    return;
}

let random=Math.floor(Math.random()*predictions.length);

document.getElementById("result").innerHTML=`

<h2>Hello ${name}!</h2>

<p><strong>Your Zodiac:</strong> ${zodiac}</p>

<br>

<p>${predictions[random]}</p>

`;

}