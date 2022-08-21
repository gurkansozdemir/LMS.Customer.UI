﻿function getAllUserDT() {
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
                    return `<a data-toggle="tooltip" data-placement="top" title="Düzenle" href="javascript:void(0);" onclick="editUserRow(` + full.id + `)" class="btn btn-sm btn-primary"><i class="la la-pencil"></i></a>
                            <a data-toggle="tooltip" data-placement="top" title="Sil" href="javascript:void(0);" onclick="deleteRow(` + full.id + `,` + "'user'" + `,` + "'userDT'" + `)" class="btn btn-sm btn-danger"><i class="la la-trash-o"></i></a>`;
                }
            }
        ]
    });
}

function getAllStudentDT() {
    $("#studentDT").DataTable({
        ajax: {
            url: baseApiUrl + "user/AllStudnets",
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
                    return `<a data-toggle="tooltip" data-placement="top" title="Düzenle" href="javascript:void(0);" onclick="editUserRow(` + full.id + `)" class="btn btn-sm btn-primary"><i class="la la-pencil"></i></a>
                            <a data-toggle="tooltip" data-placement="top" title="Sil" href="javascript:void(0);" onclick="deleteRow(` + full.id + `,` + "'user'" + `,` + "'userDT'" + `)" class="btn btn-sm btn-danger"><i class="la la-trash-o"></i></a>`;
                }
            }
        ]
    });
}

function getAllTeacherDT() {
    $("#teacherDT").DataTable({
        ajax: {
            url: baseApiUrl + "user/AllTeachers",
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
                    return `<a data-toggle="tooltip" data-placement="top" title="Düzenle" href="javascript:void(0);" onclick="editUserRow(` + full.id + `)" class="btn btn-sm btn-primary"><i class="la la-pencil"></i></a>
                            <a data-toggle="tooltip" data-placement="top" title="Sil" href="javascript:void(0);" onclick="deleteRow(` + full.id + `,` + "'user'" + `,` + "'userDT'" + `)" class="btn btn-sm btn-danger"><i class="la la-trash-o"></i></a>`;
                }
            }
        ]
    });
}

function editUserRow(id) {
    $.ajax({
        url: baseApiUrl + "User/" + id,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            debugger
            $("#editUserModal #editUserForm #val-id").val(data.data.id);
            $("#editUserModal #editUserForm #val-firstname").val(data.data.firstName);
            $("#editUserModal #editUserForm #val-email").val(data.data.eMail);
            $("#editUserModal #editUserForm #val-lastname").val(data.data.lastName);
            $("#editUserModal #editUserForm #val-password").val(data.data.password);
            $("#editUserModal #editUserForm #val-username").val(data.data.userName);
            $("#editUserModal #editUserForm #val-repassword").val(data.data.password);
            $("#editUserModal").modal('toggle');
        },
        error: function () {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", error);
        }
    });
}

$("#editUserForm").submit(function () {
    debugger
    let data = `{
                   "id": "` + $("#editUserModal #editUserForm #val-id").val() + `",
                   "userName":  "` + $("#editUserModal #editUserForm #val-username").val() + `",
                   "firstName": "` + $("#editUserModal #editUserForm #val-firstname").val() + `",
                   "lastName":  "` + $("#editUserModal #editUserForm #val-lastname").val() + `",
                   "eMail":     "` + $("#editUserModal #editUserForm #val-email").val() + `",
                   "password":  "` + $("#editUserModal #editUserForm #val-password").val() + `"
                }`;
    $.ajax({
        url: baseApiUrl + "user",
        type: "PUT",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: data,
        success: function () {
            $("#userDT").DataTable().ajax.reload();
            $("#editUserModal").modal('toggle');
        },
        error: function (error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", error);
        }
    });

    event.preventDefault();
});

$("#insertUserForm").submit(function () {
    debugger
    let data = `{
                   "userName":  "` + $("#val-username").val() + `",
                   "firstName": "` + $("#val-firstname").val() + `",
                   "lastName":  "` + $("#val-lastname").val() + `",
                   "eMail":     "` + $("#val-email").val() + `",
                   "password":  "` + $("#val-password").val() + `"
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