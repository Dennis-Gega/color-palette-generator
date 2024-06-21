const colorPicker = document.getElementById('color-picker')
const colorSchemeSelector = document.getElementById('color-scheme-selector')
const getColorButton = document.getElementById('get-color-btn')

getColorButton.addEventListener('click', () => {
    getColorScheme()

})

function getColorScheme () {
    
    const hexNumber = colorPicker.value.substring(1) // ColorAPI query cannot include '#' character
    const colorScheme = colorSchemeSelector.value

    console.log(`https://www.thecolorapi.com/scheme?hex=${hexNumber}&value=${colorScheme}`)

    fetch(`https://www.thecolorapi.com/scheme?hex=${hexNumber}&value=${colorScheme}`)
        .then(response => response.json())
        .then(data => console.log(data))
}