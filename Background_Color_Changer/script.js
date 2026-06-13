const container = document.querySelector('.container');

container.addEventListener('click', (e) => {
    const body = document.body;
    body.style.backgroundColor = e.target.id;
});