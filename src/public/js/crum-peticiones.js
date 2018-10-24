$(document).ready(function () {
    $.getJSON("/api/admin/pt", function(json){
         var peticiones = $("#tablePeticiones").DataTable({
            select: true,
            data: json,
            rowId: 'id_pt',
            columns: [
                {
                    "class":          "info-page",
                    "orderable":      false,
                    "data":           null,
                    "defaultContent": ""
								},
								{ data: 'apellido_paterno_prs'},
								{ data: 'apellido_materno_prs'},
								{ data: 'nombre_prs'},
                { data: 'timestamp_pt' }
            ]
				});
				$('#tablePeticiones tbody').on( 'mouseenter', 'tr', function () {
					var colIdx = peticiones.cell(this).index().colum;
					console.log(colIdx);
					$(peticiones.cells().nodes() ).removeClass( 'highlight' );
					$(peticiones.column( colIdx ).nodes() ).addClass( 'highlight' );
			} );

		});
    //DOM EVENTS
    
    

});




//FUNCTIONS

function post_a(){
    $.ajax({
        url: '/api/a',
        method: 'POST',
        data: {
            num_placa_a: $('#INnum_placa_a').val(),
            num_economico_a: $('#INnum_economico_a').val(),
            estado_a: parseInt($('#INestado_a').val()) 
        },
        success: function(response){
            console.log(response);
        },
        error: function(err){
            console.log(err);
        }
    });
}
function put_a(){
    var $form = $('#FRMput_a');
    $.ajax({
        url: '/api/a/'+ ambulancia.id_a,
        method: 'PUT',
        data:{
            num_placa_a: $form.find("input[name='INnum_placa_a']").val(),
            num_economico_a: $form.find("input[name='INnum_economico_a']").val(),
            estado_a: parseInt($form.find("input[name='INestado_a']").val())
        },
        success: function(response){
            console.log(response);
        },
        error: function(err){
            console.log(err);
        }
    });
}
function delete_a(){
    $.ajax({
        url: '/api/a/'+ ambulancia.id_a,
        method: 'DELETE',
        success: function(response){
            console.log(response);
        },
        error: function(err){
            console.log(err);
        }
    });
}
function reload() {
	location.reload();
}