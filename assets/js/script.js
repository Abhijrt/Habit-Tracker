// When we click on the add habit button form appear
const formId = document.getElementById('display-form');
formId.addEventListener('click',function(e){
    e.preventDefault();
    const mainForm = document.getElementById('form-detail');
    mainForm.style.display = "inline";
});
