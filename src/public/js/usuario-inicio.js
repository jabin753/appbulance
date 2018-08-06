var socket = io();
var _seconds = 5; 
var _timer;
$(document).ready(function () {
    //DOM EVENT
    navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        var marker = new google.maps.Marker({
            position: pos,
            map: map,
            Title: 'Usted está aquí',
            draggable: false
        });
        map.setCenter(pos);
        map.setZoom(17);
        
        geocoder.geocode(
            {'latLng': marker.getPosition()},
            function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var direccion = results[0].formatted_address;
                    $('#direction').val(direccion);
                } else {
                    console.log(status, results);
                    alert('Se desconoce la dirección debido a : ' + status);
                }
            }
        );
        $('#lat').val(pos.lat);
        $('#lng').val(pos.lng);
        map.addListener('center_changed', function(){
            marker.setPosition(map.getCenter());
        });
        map.addListener('dragend', function() {
            $('#lat').val(marker.getPosition().lat());
            $('#lng').val(marker.getPosition().lng());
            geocoder.geocode(
                {'latLng': marker.getPosition()},
                function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var direccion = results[0].formatted_address;
                        $('#direction').val(direccion);
                    } else {
                        console.log(status, results);
                        alert('Se desconoce la dirección debido a : ' + status);
                    }
                }
            );
        });

        $("#btnSolicitud").on("click", function(){  
            $('#timerCancel').modal('show');
            _timer = setInterval(function() {
                _seconds--;
                $("#timer").html(_seconds);           
                if (_seconds <= 0) {
                    $("#Message").hide();
                    $("#btnCancelSolicitud").hide();
                    $("#Succeded").show();
                    clearInterval(_timer);
                    _seconds = 5;
                    $("#btnSolicitud").attr("disabled", "enabled");
                    post_pt();
                }
            }, 1000);
        });
        $("#btnCancelSolicitud").on("click", function(){
            $('#timerCancel').modal('hide');
            clearInterval(_timer);
            _seconds = 5;
            alert("Solicitud cancelada");
        });
    }, function () {
        alert('No cuenta con servicio de geolocalización. Intente recargando la página');
        $('button#btnSolicitud').text('Realizar llamada de emergencia(911)');
        $('button#btnSolicitud').click(function(){
            window.location.href='tel:911';
         })
    });
});


//FUNCTIONS
function post_pt(){
    var data = {
        ubicacion_pt_x:$("input[name=lat_pt]").val(),
        ubicacion_pt_y: $("input[name=lng_pt]").val(),
        direccion_pt: $("input[name=direccion_pt]").val(),
        id_p: $("#id_p").val(),
        id_cm: $("#id_cm").val()
    };
    $.ajax({
        url: '/api/pt',
        method: 'POST',
        data: data,
        success: function(res){
            console.log(res[0]);
            socket.emit('sendPetition',res[0]);
        },
        error: function(err){
            console.log(err);
        }
    });
function maps_api(){
    
}
    
}