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

    $('#modal-body-petition').html(function(){
        return "<h2>Datos del paciente</h2>\
        <hr>\
        <p>Usuario:</p>\
        <p id=\"modal_id_p\">"+data.nombre_prs+"</p>\
        <hr>\
        <h2>Ubicación</h2>\
        <hr>\
        <p>Dirección:</p>\
        <p id=\"modal_direccion_pt\">"+data.direccion_pt+"</p>\
        <p>Latitud:</p>\
        <p id=\"modal_ubicacion_pt_x\">"+data.ubicacion_pt.x+"</p>\
        <p>Longitud:</p>\
        <p id=\"modal_ubicacion_pt_y\">"+data.ubicacion_pt.y+"</p>"
    });
    $('#incoming_petition').modal('show');
});