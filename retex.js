const body = document.querySelector('body')
const odomo = document.querySelector('#odomo');
const rtxOdomo = document.querySelector('#retex-odomo');
const biosphere = document.querySelector('#biosphere');
const rtxBiosphere = document.querySelector('#retex-biosphere')
const blogue = document.querySelector('#blogue');
const rtxBlogue = document.querySelector('#retex-blogue');
const infopany = document.querySelector('#infopany');
const rtxInfopany = document.querySelector('#retex-infopany');
const computr = document.querySelector('#computr');
const rtxComputr = document.querySelector('#retex-computr');
const rtxAff = document.querySelector('.retex-aff');
const rtxFen = document.querySelectorAll('.retex-fen');
const rtx = document.querySelectorAll('.retex');
const filtre = document.querySelectorAll('.filtre');
const wrapperOne = document.querySelectorAll('.wrapper-1');
const leftButton = document.querySelectorAll('.carousel-left');
const rightButton = document.querySelectorAll('.carousel-right')
const imageContainer = document.querySelector('.rtx-image-container');
var openFen;
var leFiltre;
let track = 0;
let counter = 1;

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
    wrapperOne.forEach(element => {
        element.style.marginLeft = 0;
    });
    track = 0;
    counter = 1;
};

filtre.forEach((element) => {
    element.addEventListener('click', () => {
        filtre.forEach((fil) => {
            fil.style.textDecoration = 'none'  
        })
        leFiltre = element.className.substring(7)
            rtx.forEach((fen) => {
                if (!fen.className.includes(leFiltre)) {
                    fen.style.display = 'none'
                } else {
                    fen.style.display = 'flex'
                }
            })
        element.style.textDecoration = 'underline'
    })
})

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

computr.addEventListener('click', () => {
    overlay(rtxComputr)
    openFen = rtxComputr
});

const moveImagesLeft = function () {
    if (counter < imageContainer.childElementCount) {
        counter++;
        track = track - 100;
        wrapperOne.forEach(element => {
            element.style.marginLeft = `${track}%`;
        });
    }
}

const moveImagesRight = function () {
    if (counter > 1) {
        counter--;
        track = track + 100;
        wrapperOne.forEach(element => {
            element.style.marginLeft = `${track}%`;
        });
    }
}

rightButton.forEach((element) => {
    element.addEventListener('click', () => {
        moveImagesLeft();
    })
})

leftButton.forEach((element) => {
    element.addEventListener('click', () => {
        moveImagesRight();
    })
})

document.addEventListener('keydown', (event) => {
    const nomTouche = event.key;
    if (nomTouche === 'Escape') {
        closeOverlay();
    }
});