function getAllEducationDT() {
    $("#educationDT").DataTable({
        ajax: {
            url: baseApiUrl + "education",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        },
        columns: [
            { data: "name" },
            { data: "hour" },
            {
                data: "isCertificate",
                "render": function (data, type, full, meta) {
                    var html = "";
                    if (full.isCertificate) {
                        html = `<span class="badge badge-rounded badge-success">Var</span>`;
                    }
                    else {
                        html = `<span class="badge badge-rounded badge-warning">Yok</span>`;
                    }
                    return html;
                }
            },
            { data: "createdOn" },
            {
                data: "process",
                "render": function (data, type, full, meta) {
                    return `<a data-toggle="tooltip" data-placement="top" title="Düzenle" href="javascript:void(0);" onclick="editEducationRow(` + full.id + `)" class="btn btn-sm btn-primary"><i class="la la-pencil"></i></a>
                            <a data-toggle="tooltip" data-placement="top" title="Sil" href="javascript:void(0);" onclick="deleteRow(` + full.id + `,` + "'classroom'" + `,` + "'educationDT'" + `)" class="btn btn-sm btn-danger"><i class="la la-trash-o"></i></a>`;
                }
            }
        ]
    });
}

getAllEducationDT();