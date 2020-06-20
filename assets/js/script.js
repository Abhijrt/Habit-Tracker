// When we click on the add habit button form appear
const formId = document.getElementById('display-form');
formId.addEventListener('click',function(e){
    e.preventDefault();
    const mainForm = document.getElementById('form-detail');
    mainForm.style.display = "inline";
});

// hide the form when add habit button press
const btn = document.getElementById('add-habit-btn');
btn.addEventListener('click',function(){
    const mainForm = document.getElementById('form-detail');
    mainForm.style.display = "none";
})

// star icon color change
const icon = document.getElementById('start-icon');
icon.addEventListener('click',function(){
    // console.log(icon);
    icon.style.color = "red";
});

const dateSelect = document.getElementById('dates');
dateSelect.addEventListener('click',function(){
    const allBtns = document.getElementsByClassName('btns');
    
});



// adding the habit by ajax
function createHabit(){
    let listform=$(`#form-container`);
    listform.submit(function(e){
        console.log("###########IN create Function");
        e.preventDefault();
        console.log("we are in the js file")
        $.ajax({
            type:"post",
            url:"/create",
            data:listform.serialize(),
            success:function(data){
                console.log(data.data.newHabit,"it you want to show the data");
                let newHabit=newDOMHabit(data.data.newHabit);
                $(".list-details").append(newHabit);
                console.log("hii abhay you are in create of ajax");
                swal({
                    title: "Added Successfully!",
                    text: "The new Habit is added!",
                    icon: "success",
                });
            },
            error:function(err){
                console.log("error in creating a list using ajax ",err);
            }
        })
    })
}
createHabit();

let newDOMHabit = function(habit){
    return $(` <li class="detail">
    <input id="habit-checkbox" type="checkbox">
    <div id="habit-name">      
        ${habit.habit}
    </div>
    <div id="habit-start">
        ${habit.startTime}
    </div>
    <div id="habit-end">
        ${habit.endTime}
    </div>
    <div id='habit-routine'>
        ${habit.routine}
    </div>
    <div >
        <i id="start-icon" class="fas fa-star"></i>
    </div>
</li>`)
}
