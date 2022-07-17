function getAllUserDT() {
    $("#userDT").DataTable({
        ajax: {
            url: baseApiUrl + "user",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        },
        columns: [
            { data: "userName" },
            { data: "firstName" },
            { data: "lastName" },
            { data: "eMail" },
            { data: "password" },
            { data: "createdOn" },
            {
                data: "process",
                "render": function (data, type, full, meta) {
                    return `<a href="javascript:void(0);" onclick="editRow(` + full + `)" class="btn btn-sm btn-primary"><i class="la la-pencil"></i></a>
                            <a href="javascript:void(0);" onclick="deleteRow(` + full.id + `)" class="btn btn-sm btn-danger"><i class="la la-trash-o"></i></a>`;
                }
            }
        ]
    });
}

getAllUserDT();

function deleteRow(id) {
    debugger
    $.ajax({
        url: baseApiUrl + "user/" + id,
        type: "DELETE",
        success: function () {
            $("#userDT").DataTable().ajax.reload();
        },
        error: function () {
            alert("Bir Hata ile Karşılaşıldı!");
        }
    });
}

function editRow(data) {
    debugger

}


$("#insertUserForm").submit(function () {
    let data = `{
                   "userName":  " ` + $("#val-username").val() + ` ",
                   "firstName": " ` + $("#val-firstname").val() + ` ",
                   "lastName":  " ` + $("#val-lastname").val() + ` ",
                   "eMail":     " ` + $("#val-email").val() + ` ",
                   "password":  " ` + $("#val-password").val() + ` "
                }`;
    $.ajax({
        url: baseApiUrl + "user",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: data,
        success: function () {
            $("#userDT").DataTable().ajax.reload();
            $("#insertUserModal").modal('toggle');
        },
        error: function (error) {
            debugger
        }
    });

    event.preventDefault();
});