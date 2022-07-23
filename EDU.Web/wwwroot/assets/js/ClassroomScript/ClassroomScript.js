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
                "render": function (a, b, c, d) {
                    debugger
                    return '<p>' + c.education.name + '</p>';
                }
            },
            { data: "createdOn" },
            {
                data: "process",
                "render": function (data, type, full, meta) {
                    return `<a href="javascript:void(0);" onclick="editRow(` + full.id + `)" class="btn btn-sm btn-primary"><i class="la la-pencil"></i></a>
                            <a href="javascript:void(0);" onclick="deleteRow(` + full.id + `)" class="btn btn-sm btn-danger"><i class="la la-trash-o"></i></a>
                            <a href="javascript:void(0);" onclick="includeStudent(` + full.id + `)" class="btn btn-sm btn-danger"><i class="la la-arrow"></i></a>`;
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
    debugger
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
            debugger
            $("#includeStudentModal").modal('toggle');
        },
        error: function (error) {
            debugger
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", error);
        }
    });
});