$(document).ready(function () {
    $.getJSON("/api/admin/pt", function(json){
        var tablePeticiones = $("#tablePeticiones").DataTable(Object.assign(tableDefaultConfig,
            {
                data: json,
                rowId: 'id_pt',
                style: 'single',
                columns: [
                    {
                        class: 'details',
                        orderable:      false,
                        data:           null,
                        defaultContent: '<i class="fa fa-plus-circle"></i>'
                    },
                    {
                        data: 'apellido_paterno_prs',
                        orderable: true
                    },
                    {   data: 'apellido_materno_prs'},
                    {   data: 'nombre_prs'},
                    {   data: 'timestamp_pt'}
                ]
            }
            )); 
        tablePeticiones.on('click','td.details',function(){
            var tr = $(this).closest('tr');
            var row = tablePeticiones.row(tr);
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( '<a href="/api/admin/pt/'+row.data().id_pt+'" >Más detalles</h1>' ).show();
            tr.addClass('shown');
        }
        });
    });  
});

function reload() {
	location.reload();
}
