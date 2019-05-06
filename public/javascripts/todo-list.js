$(document).ready(function () {

    $(document).on("click", "#add-task-btn", function () {


        let data = $('#my-form').serialize();
        console.log(data);

        let task = data[0].value;
        let deadline = data[1].value;

        if(data[0].value !== "" && data[1].value !== ""){
            let todo = {
                task: task,
                deadline: deadline,
            };
            $.ajax({
                type: 'POST',
                url: '/todo/createTask/',
                data: todo,
                success: function () {
                    location.reload();
                }
            });

        }
    });


    $('#select-tasks').on('change', function () {
        // let optionSelected = $("option:selected", this);

        let valueSelected = this.value;
        let selectedIndex = this.selectedIndex;
        //console.log(selectedIndex);

        location = "/todo/?state="+valueSelected;
        $('#select-tasks').selectedIndex = "2";
        //   if(valueSelected === "TODO" || valueSelected === "COMPLETED" )
        //   {
        //       state = {
        //           state: valueSelected
        //       };
        //       $.ajax({
        //           type: 'GET',
        //           dataType: 'json',
        //           url: '/todo/getTasksByState/',
        //           data: state,
        //           success: function () {
        //               location.reload();
        //           }
        //       });
        //   }
        // else{
        //       $.ajax({
        //           type: 'GET',
        //           dataType: 'json',
        //           url: '/todo/getTasks/',
        //           success: function () {
        //               location.reload();
        //           }
        //       });
        //   }

    });




    $(document).on('click', '#delete-task-btn', function () {
        let tr = document.getElementsByClassName('selected');
        let id = tr[0].cells[2].innerHTML;

        $.ajax({
            type: 'POST',
            url: '/todo/deleteTask/' + id,
            success: function () {
                location.reload();
            }
        });

    });

    $(document).on('click', '#complete-state-item-btn', function () {
        let tr = document.getElementsByClassName('selected');
        let id = tr[0].cells[2].innerHTML;

        $.ajax({
            type: 'POST',
            url: '/todo/setCompleteState/' + id,
            dataType: 'text',
            success: function () {
                location.reload();
            },
            error : function(request, status, error) {
                console.log(status + " " + error);
            }

        });
    });

    $(document).on('click', '#todo-state-item-btn', function () {
        let tr = document.getElementsByClassName('selected');
        let id = tr[0].cells[2].innerHTML;

        $.ajax({
            type: 'POST',
            url: '/todo/setTodoState/' + id,
            dataType: 'text',
            success: function () {
                location.reload();
            },
            error : function(request, status, error) {
                console.log(status + " " + error);
            }
        });
    });



    $('tr').click(function () {
        let table = document.getElementById("todo-table");
        let id = this.cells[2].innerHTML;

        if (this.classList.contains('selected')) {
            this.cells[0].querySelector('img').src = '/images/check-square.svg';
            this.classList.remove('selected');
        } else {
            this.cells[0].querySelector('img').src = '/images/check-square-full.svg';
            this.classList.add('selected');
        }

        for (let r = 1; r < table.rows.length; r++) {
            if (r !== this.rowIndex) {
                table.rows[r].cells[0].querySelector('img').src = '/images/check-square.svg';
                table.rows[r].classList.remove('selected');
            }
        }

        //this.classList.add("completedTask");
        //updateState(id);
    });

//table-success
    //table-danger

    // $('.classChanger').click(function (e) {
    //     if(e.currentTarget.id) {
    //     if (this.classList.contains('todoButton')) {
    //         this.classList.remove('todoButton');
    //         this.classList.add('completedButton');
    //         this.classList.remove('btn-danger');
    //         this.classList.add('btn-success');
    //         this.innerText = 'Completed';
    //         updateState(e.currentTarget.id, 'COMPLETED');
    //
    //     } else {
    //         $(this).addClass('todoButton');
    //         $(this).removeClass('completeButton');
    //         $(this).removeClass('btn-success');
    //         $(this).addClass('btn-danger');
    //         this.innerText = 'TODO';
    //         updateState(e.currentTarget.id, 'TODO');
    //
    //     }
    //     }
    // });
  //  $('tr').click(rowClicked);

});


// function rowClicked() {
//     let table = document.getElementById("todo-table");
//     if (this.classList.toString() === 'selected') {
//         table.rows[this.rowIndex].cells[0].querySelector('img').src = '/images/check-square.svg';
//         this.classList.remove('selected');
//     } else {
//         table.rows[this.rowIndex].cells[0].querySelector('img').src = '/images/check-square-full.svg';
//         this.classList.add('selected');
//     }
//     for (let r = 1; r < table.rows.length; r++) {
//         if (r !== this.rowIndex) {
//             table.rows[r].cells[0].querySelector('img').src = '/images/check-square.svg';
//             table.rows[r].classList.remove('selected');
//         }
//     }
// }
//
// function updateState(id, state){
//     $.ajax({
//         url: '/todo/updateState/' + id,
//         method: 'POST',
//         data : {state: state},
//         success: function(response) {
//             location.reload()
//         }
//     });
// }