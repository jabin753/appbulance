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
    $('p#modal_id_p').text(data.id_p);
    $('p#modal_direccion_pt').text(data.direccion_pt);
    $('p#modal_ubicacion_pt_x').text(data.ubicacion_pt.x);
    $('p#modal_ubicacion_pt_y').text(data.ubicacion_pt.y);
    $('#incoming_petition').modal('show');
});