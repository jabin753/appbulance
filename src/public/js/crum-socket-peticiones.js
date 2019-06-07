var socket = io();
socket.on('receivePetition',function(data){
    console.log(data);
    var pos = {
        lat: data.ubicacion_pt.x,
        lng: data.ubicacion_pt.y
    }
    var marker = new google.maps.Marker({
        position: pos,
        map: map,
        Title: 'Emergencia',
        draggable: false
    });
    map.setCenter(pos);
    map.setZoom(17);    

    if(Push.Permission.has()) {
        Push.create("Petición entrante!", {
            body: "data.direccion_pt",
            icon: '/favicon.ico',
            timeout: 4000,
            onClick: function () {
                window.focus();
                this.close();
            }
        });
    }

    function sexo(s){
        if(s=="M")
            return "Hombre";
        else 
            return "Mujer";
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

    $('#modal-body-petition').html(function(){
        return "<h3>Datos del paciente</h3>\
        <hr>\
        <table class=\"table\">\
            <tbody>\
                <tr>\
                    <th scope=\"row\">Nombre:</th>\
                    <td>"+ data.nombre_prs + "</td>\
                </tr>\
                <tr>\
                    <th scope=\"row\">Edad:</th>\
                    <td>"+ calcularEdad(data.fecha_nacimiento_prs) + " años</td>\
                </tr>\
                <tr>\
                    <th scope=\"row\">Teléfono:</th>\
                    <td>"+ data.telefono_usr + "</td>\
                </tr>\
                <tr>\
                    <th scope=\"row\">Sexo:</th>\
                    <td>"+ sexo(data.sexo_prs) + "</td>\
                </tr>\
                <tr>\
                    <th scope=\"row\">Tipo de Sangre:</th>\
                    <td>"+ data.tipo_sangre_p + "</td>\
                </tr>\
                <tr>\
                    <th scope=\"row\">NSS:</th>\
                    <td>"+ data.nss_p + "</td>\
                </tr>\
                <tr>\
                    <th scope=\"row\">Dirección:</th>\
                    <td>"+ data.direccion_pt + "</td>\
                </tr>\
            </tbody>\
        </table>"        
    });
    $('#incoming_petition').modal('show');   
    playSound();
    
    
});

// Función de reproducción de notificación
function playSound(){
	$(".audio")[0].play();
}

/*
<p>Dirección:</p>\
<p id=\"modal_direccion_pt\">"+data.direccion_pt+"</p>\
<p>Latitud:</p>\
<p id=\"modal_ubicacion_pt_x\">"+data.ubicacion_pt.x+"</p>\
<p>Longitud:</p>\
<p id=\"modal_ubicacion_pt_y\">"+data.ubicacion_pt.y+"</p>"
*/