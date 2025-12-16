const general = document.querySelectorAll('.column'), individual = document.querySelectorAll('.individual'), checkBtn = document.getElementById('individual-border')
/* Verifica si los valores de la propiedad serán generales o individuales */
const generalOrIndividual = () => {
    general.forEach(el => el.style.display = checkBtn.checked ? 'none' : '')
    individual.forEach(el => el.style.display = checkBtn.checked ? 'flex' : 'none')
}

/* Resetea los valores al activar/desactivar el 'switch' */
checkBtn.addEventListener('change', () => {
    generalOrIndividual()
    borderPreview.style.border = ''
    cardTitle.innerHTML = checkBtn.checked ? "Personaliza los valores individuales de la propiedad border:" 
        : "Personaliza el valor de la propiedad border:"
})

const borderWidth = document.getElementById('bWidth'), borderWidthValue = document.getElementById('bRange'), bgColor = document.getElementById('bg-color'),
    borderStyle = document.getElementById('border-style'), borderColor = document.getElementById('border-color')     
const btWidthValue = document.getElementById('btRange'), brWidthValue = document.getElementById('brRange'), bbWidthValue = document.getElementById('bbRange'), 
    blWidthValue = document.getElementById('blRange'), btSelect = document.getElementById('bt-style'), btColor = document.getElementById('bt-color'), 
    brSelect = document.getElementById('br-style'), brColor = document.getElementById('br-color'), bbSelect = document.getElementById('bb-style'), 
    bbColor = document.getElementById('bb-color'), blSelect = document.getElementById('bl-style'), blColor = document.getElementById('bl-color'), 
    bgColorIndividual = document.getElementById('bg-color-individual')
const  borderPreview = document.querySelector('.preview')
let cardTitle = document.querySelector('.title')

window.onload = () => {
    checkBtn.checked = false
    cardTitle.innerHTML = "Personaliza el valor de la propiedad border:"

    const selectElement = document.querySelectorAll('select')
    const options = ['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'none', 'hidden']
    selectElement.forEach(element => {
        for (let i = 0; i < options.length; i++) {
            var optionValue = options[i]
            const option = document.createElement('option')
            option.textContent = optionValue
            option.value = optionValue
            element.appendChild(option)
        }
    });
    resetElements()
    generalOrIndividual()
    generateGeneralBorder()
}

/* Se llama a la función cada que el valor de los input o del select cambian */
const borderProperties = document.querySelectorAll('.border-properties input')
borderProperties.forEach(element => {
    element.addEventListener('input', () => {
        checkBtn.checked ? generateIndividualBorder() : generateGeneralBorder()
    })
});
borderStyle.addEventListener('change', () => {
    checkBtn.checked ? generateIndividualBorder() : generateGeneralBorder()
})

/* Se llama a la función cada que el valor de alguno de los select individuales cambia */
const individualSelects = document.querySelectorAll('.individual select')
individualSelects.forEach(element => {
    element.addEventListener('change', () => {
        generateIndividualBorder()
    })
});

const cssCodeText = document.getElementById('CSS-code'), copyBtn = document.querySelector('.copy-btn')

/* Función que genera el estilo y el código del borde general */
const generateGeneralBorder = () => { 
    var code = `${borderWidth.value}px ${borderStyle.options[borderStyle.selectedIndex].text} ${borderColor.value.toUpperCase()}`   
    borderPreview.style.border = code
    borderPreview.style.background = bgColor.value
    cssCodeText.value = `border: ${code};\n\nbackground-color: ${bgColor.value.toUpperCase()}; //opcional`
}

/* Función que genera el estilo y el código de los bordes individuales */
const generateIndividualBorder = () => {
    var top = `${btWidthValue.value}px ${btSelect.options[btSelect.selectedIndex].text} ${btColor.value.toUpperCase()}`,
        right = `${brWidthValue.value}px ${brSelect.options[brSelect.selectedIndex].text} ${brColor.value.toUpperCase()}`,
        bottom = `${bbWidthValue.value}px ${bbSelect.options[bbSelect.selectedIndex].text} ${bbColor.value.toUpperCase()}`,
        left = `${blWidthValue.value}px ${blSelect.options[blSelect.selectedIndex].text} ${blColor.value.toUpperCase()}`
    borderPreview.style.borderTop = top, borderPreview.style.borderRight = right, borderPreview.style.borderBottom = bottom, borderPreview.style.borderLeft = left
    borderPreview.style.background = bgColorIndividual.value    
    let individualCode
    individualCode = top >= '1' ? `border-top: ${top};` : '', individualCode += right >= '1' ? ` border-right: ${right};\n` : '',
        individualCode += bottom >= '1' ? `border-bottom: ${bottom};` : '', individualCode += left >= '1' ? ` border-left: ${left};` : ''
    cssCodeText.value = `${individualCode}\n\nbackground-color: ${bgColorIndividual.value.toUpperCase()}; //opcional`
}

copyBtn.addEventListener('click', () => {
    cssCodeText.select()
    cssCodeText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(cssCodeText.value)
})

const resetElements = () => {
    borderProperties.forEach(element => { element.value = 0 });
    borderWidth.value = borderWidthValue.value = 2
    borderStyle.value = brSelect.value = blSelect.value = 'solid', btSelect.value = bbSelect.value = 'double'
    borderColor.value = btColor.value = brColor.value = bbColor.value = blColor.value = '#000000', bgColor.value = bgColorIndividual.value = '#F9DC5C'
    checkBtn.checked = false, generalOrIndividual(), generateGeneralBorder()
}