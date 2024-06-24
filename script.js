const colorPicker = document.getElementById('color-picker')
const colorSchemeSelector = document.getElementById('color-scheme-selector')
const getColorButton = document.getElementById('get-color-btn')
const colorsContainer = document.getElementById('colors-container')
const hexCodes = document.getElementsByClassName('hex-code')

addEventListeners()

getColorButton.addEventListener('click', () => {
    handleClick()
})

function addEventListeners() {

    const colorStrips = document.getElementsByClassName('color')

    for (let i = 0; i < colorStrips.length; i++) {
        if (!colorStrips[i].hasAttribute('onclick')) { // Check if event listener is already attached
            colorStrips[i].addEventListener('click', () => {
                navigator.clipboard.writeText(hexCodes[i].innerText);
                alert("Copied the text: " + hexCodes[i].innerText);
            });
        }
    }
}

function handleClick() {
    // Fetch user input color and scheme, then fetch palette from ColorAPI and render palette on DOM

    const hexNumber = colorPicker.value.substring(1) // ColorAPI query cannot include '#' character
    const colorScheme = colorSchemeSelector.value.toLowerCase() // ColorAPI query needs color scheme to be fully lowercase
    let html = ''

    fetch(`https://www.thecolorapi.com/scheme?hex=${hexNumber}&mode=${colorScheme}`)
        .then(response => response.json())
        .then(data => data.colors)
        .then(colors => {
            for (let color of colors) {
                html += `
                    <div class="color-hex-container">
                        <div class="color" style="background-color:${color.hex.value};"></div>
                        <p class="hex-code">${color.hex.value}</p>
                    </div>
                `
            }
            colorsContainer.innerHTML = html
            addEventListeners()
        })
}