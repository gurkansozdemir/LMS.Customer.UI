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
                    debugger
                    return '<p>' + full.education.name + '</p>';
                }
            },
            { data: "createdOn" },
            {
                data: "process",
                "render": function (data, type, full, meta) {
                    return `<a data-toggle="tooltip" data-placement="top" title="Düzenle" href="javascript:void(0);" onclick="editRow(` + full.id + `)" class="btn btn-sm btn-primary"><i class="la la-pencil"></i></a>
                            <a data-toggle="tooltip" data-placement="top" title="Sil" href="javascript:void(0);" onclick="deleteRow(` + full.id + `)" class="btn btn-sm btn-danger"><i class="la la-trash-o"></i></a>
                            <a data-toggle="tooltip" data-placement="top" title="Öğrenci Ata" href="javascript:void(0);" onclick="includeStudent(` + full.id + `)" class="btn btn-sm btn-success"><i class="la la-user"></i></a>`;
                }
            }
        ]
    });
}

getAllClassroomDT();

function includeStudent(id) {
    $("#includeStudentModal #includeStudentForm #hiddenClassroomId").val(id);
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