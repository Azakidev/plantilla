const hButton = document.getElementById('h');
const sButton = document.getElementById('s');
const vButton = document.getElementById('v');

const imageClamp = document.getElementById('imageClamp');

hButton.addEventListener("click", (e) => { newRatio(e) })
sButton.addEventListener("click", (e) => { newRatio(e) })
vButton.addEventListener("click", (e) => { newRatio(e) })

function newRatio(event) {
    const active = document.querySelector('.combo .active');
    if (active !== null) {
        active.classList.remove('active');
    }

    imageClamp.style.translate = 'unset'

    switch (event.target) {
        case hButton:
            hButton.classList.add('active');
            imageClamp.style.aspectRatio = 4 / 3;
            break;
        case sButton:
            sButton.classList.add('active');
            imageClamp.style.aspectRatio = 1;
            imageClamp.style.translate = '0 5%'
            break;
        case vButton:
            vButton.classList.add('active');
            imageClamp.style.aspectRatio = 3 / 4;
            imageClamp.style.translate = '0 5%'
            break;
    }
}