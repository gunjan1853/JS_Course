const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const boy = document.getElementById("Boy").value;
    const girl = document.getElementById("Girl").value;

    const result = Math.pow(boy.length + girl.length, 3) % 101;

    document.querySelector("h2").textContent = `Result: ${result}%`;
});