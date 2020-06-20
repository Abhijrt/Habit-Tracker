let lastDate = [];
let currentDate = new Date();

// finding the last dates
for(var i=6;i>=0;i--){
    lastDate.push(new Date(currentDate.getTime() - (i * 24 * 60 * 60 * 1000)));
}

// console.log("All dartes",lastDate);


// get all the habit id
let habits = document.querySelectorAll('.day-status');
let habitId = [] ;
for(ele of habits){
    habitId.push(ele.id.slice(4));
}

//function to changes status for the particular habit Id and date in status table
function changeStatusCall(id,status,date){
    $.ajax({
            type:'get',
            url:'changeStatus',
            data:{id:id,status:status,date:date},
            error:function(err){
                console.log(`Error in ajax Call ${status}`);
            }
        }
    );
}

//getting icons for status and updating them in view
function getStatusHTML(status){
    let rightHtml = '<i class="fa fa-check" aria-hidden="true"></i>';
    let crossHtml = '<i class="fa fa-times" aria-hidden="true"></i>';
    if(status === 'done'){
        return rightHtml;
    }
    else if(status === 'not-done'){
        return crossHtml;
    }
    else{
        return "";
    }
}

for(id of habitId){
    for(date of lastDate){
        $.ajax({
            type:'get',
            url : 'dayStatus',
            data:{id:id,date:date},
            success:function(data){
                let getStatusHtml = getStatusHTML(data.data.habitData);
                let newDate = new Date(data.data.date).getDate();
                let dateDOM = $(`<div class="item-container" id="item-${data.data.habit_id}">
                <div class="date-container">
                    ${newDate}
                </div>
                <div class="status-container" id="${new Date(data.data.date).getDate()}-${data.data.habit_id}" >
                    <div id="status-${new Date(data.data.date).getDate()}-${data.data.habit_id}" class="status-value">${getStatusHtml}</div>
                    <ul class="option-list" id="list-${new Date(data.data.date).getDate()}-${data.data.habit_id}">
                        <li><button id="done-${new Date(data.data.date).getDate()}-${data.data.habit_id}" data-habit="${data.data.habit_id}" data-date="${data.data.date}" class="done"><i class="fa fa-check" aria-hidden="true"></i></button></li>
                        <li><button id="not-done-${new Date(data.data.date).getDate()}-${data.data.habit_id}" data-habit="${data.data.habit_id}" data-date="${data.data.date}" class="not-done"><i class="fa fa-times" aria-hidden="true"></i></button></li>
                        <li><button id="null-${new Date(data.data.date).getDate()}-${data.data.habit_id}" data-habit="${data.data.habit_id}" data-date="${data.data.date}" class="null-status"><i class="fa fa-trash" aria-hidden="true"></i></button></li>
                    </ul>
                </div>
            </div>`);
            $(`#day-${data.data.habit_id}`).append(dateDOM);
                    //adding listener to update the status
                    $(`#done-${new Date(data.data.date).getDate()}-${data.data.habit_id}`).click(function(){
                        let date = $(this).attr('data-date');
                        let id = $(this).attr('data-habit');
                        changeStatusCall(id,'done',date);
                        let newDate = new Date(date).getDate();
                        let statusId = `status-${newDate}-${id}`;
                        $(`#${statusId}`).html('<i class="fa fa-check" aria-hidden="true"></i>');
                    });
                    $(`#not-done-${new Date(data.data.date).getDate()}-${data.data.habit_id}`).click(function()
                    {
                        let date = $(this).attr('data-date');
                        let id = $(this).attr('data-habit');
                        changeStatusCall(id,'not-done',date);
                        let newDate = new Date(date).getDate();
                        let statusId = `status-${newDate}-${id}`;
                        $(`#${statusId}`).html('<i class="fa fa-times" aria-hidden="true"></i>');
                    });
                    $(`#null-${new Date(data.data.date).getDate()}-${data.data.habit_id}`).click(function()
                    {
                        let date = $(this).attr('data-date');
                        let id = $(this).attr('data-habit');
                        changeStatusCall(id,'null',date);
                        let newDate = new Date(date).getDate();
                        let statusId = `status-${newDate}-${id}`;
                        $(`#${statusId}`).html('');
                    });

                    //for showing the list and hidding again of button to update status
                    $(`#${new Date(data.data.date).getDate()}-${data.data.habit_id}`).click(function()
                    {
                        let id = `#list-${this.id}`;
                        let listItem = $(id);
                        listItem.css('display','block');
                        setTimeout(function()
                        {
                            listItem.css('display','none');
                        },2000);
                    });
            },
            error:function(err){
                console.log(`Error in you ajax call`);
            }
            
        })
    }
}



