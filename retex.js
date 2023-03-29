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

rtxClose.forEach((monElement) => {
    monElement.addEventListener('click', () => {
        rtxAff.forEach((Element) => {
            Element.style.display = 'none'
        })
    });
})

odomo.addEventListener('click', () => {
    rtxOdomo.style.display = 'flex'
});

biosphere.addEventListener('click', () => {
    rtxBiosphere.style.display = 'flex'
});

blogue.addEventListener('click', () => {
    rtxBlogue.style.display = 'flex'
});

infopany.addEventListener('click', () => {
    rtxInfopany.style.display = 'flex'
});