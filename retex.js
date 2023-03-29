const body = document.querySelector('body')
const odomo = document.querySelector('#odomo');
const rtxOdomo = document.querySelector('#retex-odomo');
const biosphere = document.querySelector('#biosphere');
const rtxBiosphere = document.querySelector('#retex-biosphere')
const blogue = document.querySelector('#blogue');
const rtxBlogue = document.querySelector('#retex-blogue');
const infopany = document.querySelector('#infopany');
const rtxInfopany = document.querySelector('#retex-infopany');
const rtxAff = document.querySelectorAll('.retex-aff');
const rtxClose = document.querySelectorAll('.retex-close');

function overlay(element) {
    element.style.display = 'flex'
    body.style.overflow = 'hidden'
};

rtxClose.forEach((monElement) => {
    monElement.addEventListener('click', () => {
        rtxAff.forEach((Element) => {
            Element.style.display = 'none'
            body.style.overflow = 'scroll'
        })
    });
})

odomo.addEventListener('click', () => {
    overlay(rtxOdomo)
});

biosphere.addEventListener('click', () => {
    overlay(rtxBiosphere)
});

blogue.addEventListener('click', () => {
    overlay(rtxBlogue)
});

infopany.addEventListener('click', () => {
    overlay(rtxInfopany)
});