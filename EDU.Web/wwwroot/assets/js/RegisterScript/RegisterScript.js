function getAllRegisterDT() {
    $("#registerDT").DataTable({
        ajax: {
            url: baseApiUrl + "register",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        },
        columns: [
            { data: "firstName" },
            { data: "lastName" },
            { data: "eMail" },
            {
                data: "advert",
                "render": function (data, type, full, meta) {
                    return full.advert.name
                }
            },
            { data: "createdOn" },
            {
                data: "process",
                "render": function (data, type, full, meta) {
                    return `<a data-toggle="tooltip" data-placement="top" title="Düzenle" href="javascript:void(0);" onclick="editRegisterRow(` + full.id + `)" class="btn btn-sm btn-primary"><i class="la la-pencil"></i></a>
                            <a data-toggle="tooltip" data-placement="top" title="Sil" href="javascript:void(0);" onclick="deleteRow(` + full.id + `,` + "'register'" + `,` + "'registerDT'" + `)" class="btn btn-sm btn-danger"><i class="la la-trash-o"></i></a>
                            <a data-toggle="tooltip" data-placement="top" title="Onayla" href="javascript:void(0);" onclick="acceptRegister(` + full.id + `)" class="btn btn-sm btn-success"><i class="la la-trash-o"></i></a>`;
                }
            }
        ]
    });
}

getAllRegisterDT();

function insertRegisterOpenModal() {
    fillAdvertDropdown();
    $("#insertRegisterModal").modal('toggle');
}

function acceptRegister(id) {
    $.ajax({
        url: baseApiUrl + "register/AcceptRegister/" + id,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            $("#registerDT").DataTable().ajax.reload();
            swal.fire("Onaylandı !!", "Başvuru onaylandı!!", "success")
        },
        error: function (error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", error);
        }
    });
}

function fillAdvertDropdown() {
    $("#advertId").empty();
    $.ajax({
        url: baseApiUrl + 'advert',
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            debugger
            for (var i = 0; i < data.data.length; i++) {
                $("#advertId").append('<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>');
            }
        },
        error: function (error) {

        }
    })
}

$("#insertRegisterForm").submit(function () {
    event.preventDefault();
    debugger
    let data = `{
                   "firstName": "` + $("#insertRegisterModal #insertRegisterForm #val-firstname").val() + `",
                   "lastName": "` + $("#insertRegisterModal #insertRegisterForm #val-lastname").val() + `",
                   "eMail": "` + $("#insertRegisterModal #insertRegisterForm #val-email").val() + `",
                   "advertId":  ` + $("#insertRegisterModal #insertRegisterForm #advertId").val() + `
                }`;
    $.ajax({
        url: baseApiUrl + "register",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: data,
        success: function () {
            $("#insertRegisterModal").modal('toggle');
            $("#registerDT").DataTable().ajax.reload();
        },
        error: function (error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", error);
        }
    });
});

function editRegisterRow(id) {

    $.ajax({
        url: baseApiUrl + "Register/" + id,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            debugger
            $("#editRegisterModal #editRegisterForm #val-id").val(data.data.id);
            $("#editRegisterModal #editRegisterForm #val-firstname").val(data.data.firstName);
            $("#editRegisterModal #editRegisterForm #val-email").val(data.data.eMail);
            $("#editRegisterModal #editRegisterForm #val-lastname").val(data.data.lastName);
            $("#editRegisterModal #editRegisterForm #advertId").val(data.data.advert);
            $("#editRegisterModal").modal('toggle');
        },
        error: function (error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", error);
        }
    });
}

$("#editRegisterForm").submit(function () {
    let data = `{
                   "id": "` + $("#editRegisterModal #editRegisterForm #val-id").val() + `",
                   "firstName": "` + $("#editRegisterModal #editRegisterForm #val-firstname").val() + `",
                   "lastName":  "` + $("#editRegisterModal #editRegisterForm #val-lastname").val() + `",
                   "eMail":     "` + $("#editRegisterModal #editRegisterForm #val-email").val() + `",
                   "advertId":  ` + $("#editRegisterModal #editRegisterForm #advertId").val() + `
                }`;
    $.ajax({
        url: baseApiUrl + "register",
        type: "PUT",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: data,
        success: function () {
            $("#registerDT").DataTable().ajax.reload();
            $("#editRegisterModal").modal('toggle');
        },
        error: function (error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", error);
        }
    });

    event.preventDefault();
});
