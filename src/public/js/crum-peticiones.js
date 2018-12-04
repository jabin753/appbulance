$(document).ready(function () {
    $.getJSON("/api/admin/pt", function (json) {
        var tablePeticiones = $("#tablePeticiones").DataTable(Object.assign(tableDefaultConfig,
            {
                data: json,
                rowId: 'id_pt',
                style: 'single',
                columns: [
                    {
                        class: 'details',
                        orderable: false,
                        data: null,
                        defaultContent: '<i class="fa fa-plus-circle"></i>'
                    },
                    {
                        data: 'fecha_pt',
                        orderable: true
                    },
                    { data: 'hora_pt' },
                    { data: 'nombre_prs' },
                    { data: 'direccion_pt' }
                ]
            }
        ));
        tablePeticiones.on('click', 'td.details', function () {
            var tr = $(this).closest('tr');
            var row = tablePeticiones.row(tr);

            if (row.child.isShown()) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            }
            else {
                // Open this row
                row.child('\
                <div id="pt_detalles">\
                    <h5>Estado de la petición: '+ row.data().resuelto + '</h5>\
                    <h4>Ubicación:</h4><hr>\
                    <a href="https://www.google.com/maps/@'+ row.data().ubicacion_pt.x + ',' + row.data().ubicacion_pt.y + ',18z" ><br>\
                    <img width="600" src="https://maps.googleapis.com/maps/api/staticmap?autoscale=false&size=600x300&maptype=roadmap&key=AIzaSyDa56T84jpoLhurxSlOf9lou21Xj0jAl90&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:%7C'+ row.data().ubicacion_pt.x + ',' + row.data().ubicacion_pt.y + '" alt="Mapa de '+ row.data().ubicacion_pt.x + ','+ row.data().ubicacion_pt.y + '">\
                </div>\
                ' ).show();
                tr.addClass('shown');
            }
        });
    });
});

function reload() {
    location.reload();
}
