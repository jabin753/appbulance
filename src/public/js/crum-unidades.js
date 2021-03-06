var ambulancia;
var tableAmbulancias;
$(document).ready(function () {
    $.getJSON("/api/admin/a", function (json) {
        tableAmbulancias = $("#ambulancias").DataTable(Object.assign(tableDefaultConfig,
            {
                data: json,
                rowId: 'id_a',
                columns: [
                    { data: 'num_placa_a' },
                    { data: 'num_economico_a' },
                    { data: 'estado_a' }
                ]
            }));
        //DOM EVENTS
        tableAmbulancias.on('select',function (e, dt, type, indexes) {
            $("button[name='btnDel']").attr("disabled", false);
            $("button[name='btnMod']").attr("disabled", false);
            ambulancia = tableAmbulancias.row(indexes).data();
            console.log(ambulancia);
        });
        tableAmbulancias.on('deselect', function(e, dt, type, indexes) {
            $("button[name='btnDel']").attr("disabled", true);
            $("button[name='btnMod']").attr("disabled", true);
            ambulancia = {};
        });
    });

    $("button[name='btnMod']").on("click", function () {
        var $form = $('#FRMput_a');
        $form.find("input[name='INnum_placa_a']").attr("value", ambulancia.num_placa_a);
        $form.find("input[name='INnum_economico_a']").attr("value", ambulancia.num_economico_a);
        $form.find("input[name='INestado_a']").attr("value", ambulancia.estado_a);
    });
    $('#FRMpost_a').on('submit', function (e) {
        e.preventDefault();
        post_a();
        reload();
    });
    $('#FRMdelete_a').on('submit', function (e) {
        e.preventDefault();
        delete_a();
        reload();
    });
    $('#FRMput_a').on('submit', function (e) {
        e.preventDefault();
        put_a();
        reload();
    });
});

//FUNCTIONS

function post_a() {
    $.ajax({
        url: '/api/admin/a',
        method: 'POST',
        data: {
            num_placa_a: $('#INnum_placa_a').val(),
            num_economico_a: $('#INnum_economico_a').val(),
            estado_a: parseInt($('#INestado_a').val())
        },
        success: function (response) {
            console.log(response);
        },
        error: function (err) {
            console.log(err);
        }
    });
}
function put_a() {
    var $form = $('#FRMput_a');
    $.ajax({
        url: '/api/admin/a/' + ambulancia.id_a,
        method: 'PUT',
        data: {
            num_placa_a: $form.find("input[name='INnum_placa_a']").val(),
            num_economico_a: $form.find("input[name='INnum_economico_a']").val(),
            estado_a: parseInt($form.find("input[name='INestado_a']").val())
        },
        success: function (response) {
            console.log(response);
        },
        error: function (err) {
            console.log(err);
        }
    });
}
function delete_a() {
    $.ajax({
        url: '/api/admin/a/' + ambulancia.id_a,
        method: 'DELETE',
        success: function (response) {
            console.log(response);
        },
        error: function (err) {
            console.log(err);
        }
    });
}
function reload() {
    location.reload();
}