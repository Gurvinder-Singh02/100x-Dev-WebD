// script.js


//select the inputs
const addFieldButton = document.getElementById('addField');
const fieldTypeSelect = document.getElementById('fieldType');
const fieldLabelInput = document.getElementById('fieldLabel');

//select the output locations
const formPreview = document.getElementById('formPreview');
const codePreview = document.getElementById('codePreview');

//copy code button
const copyCodeButton = document.getElementById('copyCode');

//after click on add field
addFieldButton.addEventListener('click', () => {

    //fetch the value 
    const fieldType = fieldTypeSelect.value;
    const fieldLabel = fieldLabelInput.value.trim();

    if (fieldType && fieldLabel) {

        createPreview(fieldType, fieldLabel);

        fieldTypeSelect.value = '';
        fieldLabelInput.value = '';
    } else {
        alert('Please select a field type and enter a label.');
    }
});

copyCodeButton.addEventListener('click', () => {
    const code = codePreview.innerText;
    navigator.clipboard.writeText(code).then(() => {
        alert('Code copied to clipboard!');
    }, () => {
        alert('Failed to copy code.');
    });
});

function createPreview(type, label) {
    const fieldContainer = document.createElement('div');
    const code = document.createElement('pre');
    let fieldElement;

    const div = `
    <input type=${type} id="${label}"> <label for="${label}">${label}</label> `

    fieldContainer.innerHTML = div

    code.innerText = div

    formPreview.appendChild(fieldContainer);
    codePreview.appendChild(code)

    return fieldContainer;
}
