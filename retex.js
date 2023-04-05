const body = document.querySelector('body')
const odomo = document.querySelector('#odomo');
const rtxOdomo = document.querySelector('#retex-odomo');
const biosphere = document.querySelector('#biosphere');
const rtxBiosphere = document.querySelector('#retex-biosphere')
const blogue = document.querySelector('#blogue');
const rtxBlogue = document.querySelector('#retex-blogue');
const infopany = document.querySelector('#infopany');
const rtxInfopany = document.querySelector('#retex-infopany');
const rtxAff = document.querySelector('.retex-aff');
const rtxFen = document.querySelectorAll('.retex-fen')
var openFen;

function overlay(element) {
    rtxAff.style.display = 'flex'
    element.style.display = 'flex'
    body.style.overflow = 'hidden'
};

function closeOverlay() {
    rtxFen.forEach((element) => {
        element.style.display = 'none'
    })
    rtxAff.style.display = 'none'
    body.style.overflow = 'visible'
};

rtxAff.addEventListener('click', (event) => {
    if (!openFen.contains(event.target)){
        closeOverlay();
    }
})

odomo.addEventListener('click', () => {
    overlay(rtxOdomo)
    openFen = rtxOdomo
});

biosphere.addEventListener('click', () => {
    overlay(rtxBiosphere)
    openFen = rtxBiosphere
});

blogue.addEventListener('click', () => {
    overlay(rtxBlogue)
    openFen = rtxBlogue
});

infopany.addEventListener('click', () => {
    overlay(rtxInfopany)
    openFen = rtxInfopany
});