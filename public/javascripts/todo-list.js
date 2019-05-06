$(document).ready(function () {

    $('#select-tasks').on('change', function () {

        let valueSelected = this.value;

        location = "/todo/?state="+valueSelected;
        $('#select-tasks').selectedIndex = "2";

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
        //let id = this.cells[2].innerHTML;

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

    });

});
