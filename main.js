const loader = document.querySelector('.loader');

window.addEventListener('load', () => {
    loader.classList.add('fondu-out');
})

const buttonContact = document.querySelector('#contact');
const card = document.querySelector('#contact-card');
const buttonCloseContact = document.querySelector('#contact-card button');

buttonContact.addEventListener('click', event => {
    card.style.display = 'block'
});

buttonCloseContact.addEventListener('click', event => {
    card.style.display = 'none'
});