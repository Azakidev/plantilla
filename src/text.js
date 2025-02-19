const toggle = document.getElementById('toggleCustom');
const bottomTray = document.getElementById('bottomTray');

const leftTextField = document.getElementById('leftTextField');
const rightTextField = document.getElementById('rightTextField');

//Ensure they're empty on load because browsers are weird
leftTextField.value = "";
rightTextField.value = "";

const leftText = document.getElementById('leftText');
const rightText = document.getElementById('rightText');

toggle.addEventListener('click', onToggle)

const events = ['keypress', 'change', 'paste', 'input']

events.forEach((event) => {
    leftTextField.addEventListener(event, e => textSync(e))
    rightTextField.addEventListener(event, e => textSync(e))
})

function onToggle() {
    if (!toggle.classList.contains('active')) {
        bottomTray.classList.replace('bottomHidden', 'bottom')
        toggle.innerText = "Custom";
        toggle.classList.add('active');
    } else {
        bottomTray.classList.replace('bottom', 'bottomHidden')
        toggle.innerText = "Socials";
        toggle.classList.remove('active');

        leftText.innerText = "@fatdawlf.bsky.social";
        rightText.innerText = "~Akira_Noguichi";

        leftTextField.value = "";
        rightTextField.value = "";
    }
}

function textSync(event) {
    if (toggle.classList.contains('active')) {
        if (event.target == leftTextField) { leftText.innerText = event.target.value }
        else { rightText.innerText = event.target.value }
    }
}
