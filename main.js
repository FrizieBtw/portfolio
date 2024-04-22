const loader = document.querySelector('.loader');
const buttonContact = document.querySelector('#contact');
const card = document.querySelector('#contact-card');
const buttonCloseContact = document.querySelector('#contact-card button');

document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        loader.classList.add('fondu-out');
    }
};

buttonContact.addEventListener('click', event => {
    card.style.display = 'block'
});

buttonCloseContact.addEventListener('click', event => {
    card.style.display = 'none'
});