function deleteRow(id, endpoint, datatable) {
    debugger
    swal({
        title: "Silmek istediğinize emin misiniz?",
        text: "Bu işlemi geri alamazsınız!",
        type: "warning",
        showCancelButton: !0,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Evet, Sil",
        cancelButtonText: "Hayır, İptal Et",
        closeOnConfirm: !1,
        closeOnCancel: !1
    }).then(function (result) {
        if (result.value) {
            $.ajax({
                url: baseApiUrl + endpoint + "/" + id,
                type: "DELETE",
                success: function () {
                    swal("Silindi !!", "Kayıt Silindi !!", "success");
                    $("#" + datatable).DataTable().ajax.reload();
                },
                error: function (error) {
                    swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", error);
                }
            });
        }
    });
}