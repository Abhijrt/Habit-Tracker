
const formId = document.getElementById('display-form');
formId.addEventListener('click',function(e){
    e.preventDefault();
    const mainForm = document.getElementById('main-form-container');
    mainForm.style.display = "inline";
});
