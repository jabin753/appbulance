var usuario;
var tableUsuarios;
$(document).ready(function () {
    $.getJSON("/api/admin/u", function (json) {
        tableUsuarios = $("#usuarios").DataTable(Object.assign(tableDefaultConfig,
            {
                data: json,
                rowId: 'id_p',
                columns: [
                    { data: 'nombre_prs' },
                    { data: 'apellido_paterno_prs' },
                    { data: 'apellido_materno_prs' },
                    { data: 'telefono_usr' },
                    { data: 'sexo_prs' },
                    { data: 'email_usr' },
                    { data: 'valido_usr' },               
                ]
            }));
        //DOM EVENTS
        tableUsuarios.on('select',function (e, dt, type, indexes) {
            $("button[name='btnDel']").attr("disabled", false);
            $("button[name='btnMod']").attr("disabled", false);
            $("button[name='btnInfo']").attr("disabled", false);
            usuario = tableUsuarios.row(indexes).data();
            console.log(usuario);
        });
        tableUsuarios.on('deselect', function(e, dt, type, indexes) {
            $("button[name='btnDel']").attr("disabled", true);
            $("button[name='btnMod']").attr("disabled", true);
            $("button[name='btnInfo']").attr("disabled", true);
            usuario = {};
        });
    });

    $("button[name='btnMod']").on("click", function () {
        var $form = $('#FRMput_u');
        $form.find("input[name='nombre_prs']").attr("value", usuario.nombre_prs);
        $form.find("input[name='apellido_paterno_prs']").attr("value", usuario.apellido_paterno_prs);
        $form.find("input[name='apellido_materno_prs']").attr("value", usuario.apellido_materno_prs);
        $form.find("input[name='telefono_usr']").attr("value", usuario.telefono_usr);
        $form.find("input[name='fecha_nacimiento_prs']").attr("value", usuario.fecha_nacimiento_prs.substr(0, 10) );
        $form.find("input[name='ocupacion_prs']").attr("value", usuario.ocupacion_prs);
        $form.find("input[name='nss_p']").attr("value", usuario.nss_p);
        $form.find("input[name='email_usr']").attr("value", usuario.email_usr);
        $form.find("select[name='sexo_prs']").val(usuario.sexo_prs);
        $form.find("select[name='tipo_sangre_p']").val(usuario.tipo_sangre_p);
        $form.find("select[name='valido_usr']").val(usuario.valido_usr);
    });
    $("button[name='btnInfo']").on("click", function () {
        var $form = $('#FRMinfo_u');
        $form.find("input[name='nombre_prs']").attr("value", usuario.nombre_prs);
        $form.find("input[name='apellido_paterno_prs']").attr("value", usuario.apellido_paterno_prs);
        $form.find("input[name='apellido_materno_prs']").attr("value", usuario.apellido_materno_prs);
        $form.find("input[name='telefono_usr']").attr("value", usuario.telefono_usr);
        $form.find("input[name='fecha_nacimiento_prs']").attr("value", usuario.fecha_nacimiento_prs.substr(0, 10) );
        $form.find("input[name='ocupacion_prs']").attr("value", usuario.ocupacion_prs);
        $form.find("input[name='nss_p']").attr("value", usuario.nss_p);
        $form.find("input[name='email_usr']").attr("value", usuario.email_usr);
        $form.find("input[name='sexo_prs']").val(usuario.sexo_prs);
        $form.find("input[name='tipo_sangre_p']").val(usuario.tipo_sangre_p);
        $form.find("input[name='valido_usr']").val(usuario.valido_usr);
    });
    $('#FRMpost_u').on('submit', function (e) {
        e.preventDefault();
        post_u();
        reload();
    });
    $('#FRMdelete_u').on('submit', function (e) {
        e.preventDefault();
        delete_u();
        reload();
    });
    $('#FRMput_u').on('submit', function (e) {
        e.preventDefault();
        put_u();
        reload();
    });
});

//FUNCTIONS

function post_u() { //Agregar
    $.ajax({
        url: '/api/admin/u',
        method: 'POST',
        data: {
            email_usr: $('#InputEmail1').val(),
            telefono_usr: $('#InputPhoneNumber').val(),
            contrasena_usr: $('#InputPassword1').val(),
            //tipo_usr
            //fecha_registro_usr
            //fecha_ultimo_acceso_usr
            valido_usr: $("select[name='valido_usr']").val(),
            nombre_prs: $('#InputName').val(),
            apellido_paterno_prs: $('#InputLastName').val(),
            apellido_materno_prs: $('#InputLastName2').val(),            
            fecha_nacimiento_prs: $('#InputDateBirthday').val(),
            sexo_prs: $('#Sex').val(),
            ocupacion_prs: $('#InputOccupation').val(),
            tipo_sangre_p: $('#bloodType').val(),
            nss_p: $('#InputNSS').val()           
        },
        success: function (response) {
            console.log(response);
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function put_u() { //Obtener
    var $form = $('#FRMput_u');
    $.ajax({
        url: '/api/admin/u/' + usuario.id_p,
        method: 'PUT',
        data: {
            nombre_prs: $form.find("input[name='nombre_prs']").val(),
            apellido_paterno_prs: $form.find("input[name='apellido_paterno_prs']").val(),
            apellido_materno_prs: $form.find("input[name='apellido_materno_prs']").val(),
            telefono_usr: $form.find("input[name='telefono_usr']").val(),
            fecha_nacimiento_prs: $form.find("input[name='fecha_nacimiento_prs']").val(),
            sexo_prs: $form.find("select[name='sexo_prs']").val(),
            tipo_sangre_p: $form.find("select[name='tipo_sangre_p']").val(),
            ocupacion_prs: $form.find("input[name='ocupacion_prs']").val(),
            nss_p: $form.find("input[name='nss_p']").val(),
            email_usr: $form.find("input[name='email_usr']").val(),
            contrasena_usr: $form.find("input[name='contrasena_usr']").val(),
            valido_usr: $form.find("select[name='valido_usr']").val().toString() //No muestra el estado de la cuenta.
        },
        success: function (response) {
            console.log(response);
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function info_u() { //Info usuario
    var $form = $('#FRMinfo_u');
    $.ajax({
        url: '/api/admin/u/' + usuario.id_p,
        method: 'PUT',
        data: {
            nombre_prs: $form.find("input[name='nombre_prs']").val(),
            apellido_paterno_prs: $form.find("input[name='apellido_paterno_prs']").val(),
            apellido_materno_prs: $form.find("input[name='apellido_materno_prs']").val(),
            telefono_usr: $form.find("input[name='telefono_usr']").val(),
            fecha_nacimiento_prs: $form.find("input[name='fecha_nacimiento_prs']").val(),
            sexo_prs: $form.find("input[name='sexo_prs']").val(),
            tipo_sangre_p: $form.find("input[name='tipo_sangre_p']").val(),
            ocupacion_prs: $form.find("input[name='ocupacion_prs']").val(),
            nss_p: $form.find("input[name='nss_p']").val(),
            email_usr: $form.find("input[name='email_usr']").val(),
            valido_usr: $form.find("input[name='valido_usr']").val()
        },
        success: function (response) {            
            console.log(response);
        },
        error: function (err) {
            console.log(err);
        }
    });
    
}

function delete_u() {
    $.ajax({
        url: '/api/admin/u/' + usuario.id_p,
        method: 'DELETE',
        success: function (response) {
            console.log(response);
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function calcularEdad(fecha) {
    fecha = fecha.substring(0,10);
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();    
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }    
    return edad;
}

function reload() {
    location.reload();
}