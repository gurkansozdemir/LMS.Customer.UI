function getAllClassroomDT() {
    $("#classroomDT").DataTable({
        ajax: {
            url: baseApiUrl + "classroom/GetAllWithEducation",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        },
        columns: [
            { data: "name" },
            {
                data: "education",
                "render": function (data, type, full, meta) {
                    return full.education.name;
                }
            },
            { data: "createdOn" },
            {
                data: "process",
                "render": function (data, type, full, meta) {
                    return `<a data-toggle="tooltip" data-placement="top" title="Düzenle" href="javascript:void(0);" onclick="editRow(` + full.id + `)" class="btn btn-sm btn-primary"><i class="la la-pencil"></i></a>
                            <a data-toggle="tooltip" data-placement="top" title="Sil" href="javascript:void(0);" onclick="deleteRow(` + full.id + `,` + "'classroom'" + `,` + "'classroomDT'" + `)" class="btn btn-sm btn-danger"><i class="la la-trash-o"></i></a>
                            <a data-toggle="tooltip" data-placement="top" title="Öğrenci Ata" href="javascript:void(0);" onclick="includeStudent(` + full.id + `)" class="btn btn-sm btn-success"><i class="la la-user"></i></a>
                            <a data-toggle="tooltip" data-placement="top" title="Öğrencileri Göster" href="javascript:void(0);" onclick="showStudents(` + full.id + `)" class="btn btn-sm btn-warning"><i class="la la-user"></i></a>
                            <a data-toggle="tooltip" data-placement="top" title="Sınıfa Git" href="/Classroom/Detail/` + full.id + `" class="btn btn-sm btn-warning"><i class="la la-user"></i></a>`;
                }
            }
        ]
    });
}

getAllClassroomDT();

function includeStudent(id) {
    $("#includeStudentModal #includeStudentForm #hiddenClassroomId").val(id);
    fillStudentDropdown();
    $("#includeStudentModal").modal('toggle');
}

$("#includeStudentForm").submit(function () {
    event.preventDefault();
    let data = `{
                   "studentId": ` + $("#includeStudentModal #includeStudentForm #studentId").val() + `,
                   "classroomId":  ` + $("#includeStudentModal #includeStudentForm #hiddenClassroomId").val() + `
                }`;
    $.ajax({
        url: baseApiUrl + "Classroom/IncludeStudent",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: data,
        success: function () {
            $("#includeStudentModal").modal('toggle');
        },
        error: function (error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", error);
        }
    });
});

function fillStudentDropdown() {
    $("#studentId").empty();
    $.ajax({
        url: baseApiUrl + 'user',
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            debugger
            for (var i = 0; i < data.data.length; i++) {
                $("#studentId").append('<option value="' + data.data[i].id + '">' + data.data[i].firstName + ' ' + data.data[i].lastName + '</option>');
            }
        },
        error: function (error) {

        }
    })
}

function insertClassroomOpenModal() {
    fillEducationDropdown();
    $("#insertClassroomModal").modal('toggle');
}

function fillEducationDropdown() {
    $("#educationId").empty();
    $.ajax({
        url: baseApiUrl + 'education',
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            debugger
            for (var i = 0; i < data.data.length; i++) {
                $("#educationId").append('<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>');
            }
        },
        error: function (error) {

        }
    })
}

$("#insertClassroomForm").submit(function () {
    event.preventDefault();
    let data = `{
                   "name": "` + $("#insertClassroomModal #insertClassroomForm #val-classroomname").val() + `",
                   "educationId":  ` + $("#insertClassroomModal #insertClassroomForm #educationId").val() + `
                }`;
    $.ajax({
        url: baseApiUrl + "Classroom/AddClassroom",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: data,
        success: function () {
            $("#insertClassroomModal").modal('toggle');
            $("#classroomDT").DataTable().ajax.reload();
        },
        error: function (error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", error);
        }
    });
});

function showStudents(id) {
    $("#showStudentModal").modal('toggle');
    $("#studentDT").DataTable({
        ajax: {
            url: baseApiUrl + "user/getStudentsByClassroomId/" + id,
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
                    return `<a data-toggle="tooltip" data-placement="top" title="Sınıftan Çıkar" href="javascript:void(0);" class="btn btn-sm btn-danger"><i class="la la-trash-o"></i></a>`;
                }
            }
        ]
    });
}

function GetDetailByClassroomId(id) {
    debugger
    $.ajax({
        url: baseApiUrl + "Classroom/GetDetailById/" + id,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            debugger
            $("#classroomName").text(data.data.name);
            $("#teacherName").text(data.data.teacherName);
            $("#educationName").text(data.data.educationName);
            $("#createdOn").text(data.data.createdOn);
            $("#studentCount").text(data.data.studentCount);
            $("#activityCount").text(data.data.activityCount);
        },
        error: function (error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", error);
        }
    });
}

function GetActivitiesByClassroomId(id) {
    $("#activityListAccordion").empty();
    var accordionHtml = "";
    $.ajax({
        url: baseApiUrl + "Activity/GetByClassroomId/" + id,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            debugger
            for (let i = (data.data.length - 1); i >= 0; i--) {
                accordionHtml += `<div class="accordion__item">
                                    <div class="accordion__header" data-toggle="collapse" data-target="#accordion` + data.data[i].id + `">                                  
                                        <span class="accordion__header--text">` + data.data[i].date + `</span>
                                        <span class="accordion__header--indicator"></span>
                                    </div>
                                    <div id="accordion` + data.data[i].id + `" class="collapse accordion__body" data-parent="#activityListAccordion">
                                        <div class="accordion__body--text">
                                            <button type="button" class="btn btn btn-outline-primary" onclick="showInspection(` + data.data[i].id + `,` + id + `)" style="margin-right: 20px;">Yoklama Al</button>
                                            ` + data.data[i].description + `
                                        </div>
                                    </div>
                                </div>`;
            }
            $("#activityListAccordion").append(accordionHtml);
        },
        error: function (error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", error);
        }
    });
}

$("#insertActivityForm").submit(function () {
    event.preventDefault();
    var classroomId = $("#insertActivityModal #insertActivityForm #classroomId").val();
    let data = `{
                   "date": "` + $("#insertActivityModal #insertActivityForm #val-activityDate").val() + `",
                   "description": "` + $("#insertActivityModal #insertActivityForm #val-activityContent").val() + `",
                   "classroomId":`+ classroomId + `
                }`;
    $.ajax({
        url: baseApiUrl + "activity",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: data,
        success: function () {
            $("#insertActivityModal").modal('toggle');
            GetActivitiesByClassroomId(classroomId);
        },
        error: function (error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", error);
        }
    });
});

function showInspection(activityId, classroomId) {
    debugger
    /*$("#showInspectionModal #insertInspectionForm #activityId").val(activityId);*/
    $("#studentList").empty();
    var htmlContent = "";
    $.ajax({
        url: baseApiUrl + 'user/getStudentsByClassroomId/' + classroomId,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            debugger
            for (var i = 0; i < data.data.length; i++) {
                htmlContent += `<li class="list-group-item d-flex justify-content-between align-items-center">` + data.data[i].firstName + ` ` + data.data[i].lastName +
                    `<div class="form-check mb-2">
                              <input type="checkbox" data-id="` + activityId + `" value="` + data.data[i].id + `" class="form-check-input">
                         </div>
                    </li>`;
            }
            $("#studentList").append(htmlContent);
        },
        error: function (error) {

        }
    })

    $("#showInspectionModal").modal("toggle");
}

function saveInspections() {
    var data = "[";

    $('.form-check-input').each(function () {
        debugger
        data += `{
                   "activityId": ` + $(this).data("id") + `,
                   "isCome": ` + $(this).is(":checked") + `,
                   "studentId":`+ $(this).val() +`
                },`; 
    });

    data += "]";

    console.log(data);
}

