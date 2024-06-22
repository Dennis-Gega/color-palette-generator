const colorPicker = document.getElementById('color-picker')
const colorSchemeSelector = document.getElementById('color-scheme-selector')
const getColorButton = document.getElementById('get-color-btn')
const colorsContainer = document.getElementById('colors-container')

getColorButton.addEventListener('click', () => {
    handleClick()
})

function handleClick () {
    // Fetch user input color and scheme, then fetch palette from ColorAPI and render palette on DOM

    const hexNumber = colorPicker.value.substring(1) // ColorAPI query cannot include '#' character
    const colorScheme = colorSchemeSelector.value.toLowerCase() // ColorAPI query needs color scheme to be fully lowercase
    let html = ''

    console.log(`https://www.thecolorapi.com/scheme?hex=${hexNumber}&mode=${colorScheme}`)
    fetch(`https://www.thecolorapi.com/scheme?hex=${hexNumber}&mode=${colorScheme}`)
        .then(response => response.json())
        .then(data => data.colors)
        .then(colors => {
            for (let color of colors) {
                html += `
                    <div class="color-hex-container">
                        <div class="color" style="background-color:${color.hex.value};"></div>
                        <p>${color.hex.value}</p>
                    </div>
                `
            }
            colorsContainer.innerHTML = html
        })
}