function getAllUser() {
    var content = "";
    $.ajax({
        type: "GET",
        url: baseApiUrl + "user",
        dataType: "json",
        success: function (response) {
            debugger
            content = `<ul><li>` + response.data[0].firstName + ` ` + response.data[0].lastName + `</li></ul>`;
            $("#userList").append(content);
        },
        error: function (error) {

        }
    });
}