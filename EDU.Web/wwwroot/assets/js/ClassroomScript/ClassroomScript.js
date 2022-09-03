var educationId = 0;

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
                    return `<a data-toggle="tooltip" data-placement="top" title="Düzenle" href="javascript:void(0);" onclick="editClassroomRow(` + full.id + `)" class="btn btn-sm btn-primary"><i class="la la-pencil"></i></a>
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
            educationId = data.data.educationId;
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
                                            <button type="button" class="btn btn btn-outline-primary" onclick="showInspection(` + data.data[i].id + `)" style="margin-right: 20px;">Yoklama Al</button>
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
                   "classroomId":`+ classroomId + `,
                   "lessonId":` + $("#insertActivityModal #insertActivityForm #lessonId").val() + `
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

function showInspection(activityId) {
    $("#studentList").empty();
    var htmlContent = "";
    $.ajax({
        url: baseApiUrl + 'inspection/' + activityId,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            debugger
            for (var i = 0; i < data.data.length; i++) {
                htmlContent += `<li class="list-group-item d-flex justify-content-between align-items-center">` + data.data[i].student.firstName + ` ` + data.data[i].student.lastName +
                    `<div class="form-check mb-2">
                                        <input type="checkbox"` + (data.data[i].isCome ? "checked" : "") + ` data-inspectionId="` + data.data[i].id + `" data-activityId="` + activityId + `" value="` + data.data[i].student.id + `" class="form-check-input">
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
    const objectData = [];
    $('.form-check-input').each(function () {
        const dataItem = {
            id: $(this).attr("data-inspectionId"),
            activityId: $(this).attr("data-activityId"),
            isCome: $(this).is(":checked"),
            studentId: parseInt($(this).val())
        };
        objectData.push(dataItem);
    });
    var jsonData = JSON.stringify(objectData);

    $.ajax({
        url: baseApiUrl + "inspection/save",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function () {
            $("#showInspectionModal").modal("toggle");
            swal("Kaydedildi !!", "Yoklama kaydedildi !!", "success")
        },
        error: function (error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", error);
        }
    });
}

function fillLessonDropdown(id) {
    $("#lessonId").empty();
    $.ajax({
        url: baseApiUrl + 'lesson/getByEducationId/' + id,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            debugger
            for (var i = 0; i < data.data.length; i++) {
                $("#lessonId").append('<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>');
            }
        },
        error: function (error) {

        }
    })
}

function showInsertActivityModal() {
    fillLessonDropdown(educationId);
    $("#insertActivityModal").modal('toggle');
}

function getClassroomByTeacherId() {
    debugger
    var htmlContent = "";
    $("#teachersClassrooms").empty();
    $.ajax({
        url: baseApiUrl + "Classroom/GetByTeacherId/" + sessionUserId,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < data.data.length; i++) {
                htmlContent += `<div class="col-xl-3 col-xxl-4 col-lg-4 col-md-6 col-sm-6">
                                        <div class="card">
                                            <img class="img-fluid" src="https://picsum.photos/200/200" alt="">
                                            <div class="card-body">
                                                <h4>` + data.data[i].name + `</h4>
                                                <ul class="list-group mb-3 list-group-flush">
                                                    <li class="list-group-item px-0 border-top-0 d-flex justify-content-between">
                                                        <span class="mb-0 text-muted">` + data.data[i].createdOn + `</span>
                                                    </li>
                                                    <li class="list-group-item px-0 d-flex justify-content-between">
                                                        <span class="mb-0">Eğitim Saati :</span><strong>` + data.data[i].educationHour + ` Saat</strong>
                                                    </li>
                                                    <li class="list-group-item px-0 d-flex justify-content-between">
                                                        <span class="mb-0">Eğitim :</span><strong>` + data.data[i].educationName + `</strong>
                                                    </li>
                                                    <li class="list-group-item px-0 d-flex justify-content-between">
                                                        <span class="mb-0">Eğitmen :</span><strong>` + data.data[i].teacherName + `</strong>
                                                    </li>
                                                    <li class="list-group-item px-0 d-flex justify-content-between">
                                                        <span><i class="fa fa-graduation-cap text-primary mr-2"></i>Öğrenci</span><strong>` + data.data[i].studentCount + `</strong>
                                                    </li>
                                                    <li class="list-group-item px-0 d-flex justify-content-between">
                                                        <span><i class="fa fa-book text-primary mr-2"></i>Yapılan Ders</span><strong>` + data.data[i].activityCount + `</strong>
                                                    </li>
                                                </ul>
                                                <a href="/Classroom/Detail/` + data.data[i].educationId + `" class="btn btn-primary">Sınıfa Git</a>
                                            </div>
                                        </div>
                                    </div>`;
            }
            $("#teachersClassrooms").append(htmlContent);
        },
        error: function () {

        }
    });
}


