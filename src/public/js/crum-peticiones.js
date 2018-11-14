$(document).ready(function () {
    $.getJSON("/api/admin/pt", function(json){
        var tablePeticiones = $("#tablePeticiones").DataTable({
            select: true,
            data: json,
            rowId: 'id_pt',
            style: 'single',
            columns: [
                {
                    class: 'info-page',
                    orderable:      false,
                    data:           null,
                    defaultContent: ''
                },
                {
                    data: 'apellido_paterno_prs',
                    orderable: true
                },
                {   data: 'apellido_materno_prs'},
                {   data: 'nombre_prs'},
                {   data: 'timestamp_pt'}
            ]
        }); 
        tablePeticiones.on( 'select', function ( e, dt, type, indexes ) {
            var rowData = tablePeticiones.rows( indexes ).data().toArray();
            console.log('selected:',rowData);
        });
        tablePeticiones.on( 'deselect', function ( e, dt, type, indexes ) {
            var rowData = [];
            console.log('deselected:',rowData);
        });
    });  
});

function reload() {
	location.reload();
}