var id_a;
var num_placa_a;
var num_economico_a;
var estado_a;

$(document).ready(function () {
	$('#unitsTable td').on("click", function(){
		id_a = $(this).parents("tr").find("td").eq(0).html();
		num_placa_a = $(this).parents("tr").find("td").eq(1).html();
		num_economico_a = $(this).parents("tr").find("td").eq(2).html();
		estado_a = $(this).parents("tr").find("td").eq(3).html();
		$("button[name='btnDel']").attr("disabled", false);
		$("button[name='btnMod']").attr("disabled", false);
    });
    $("button[name='btnMod']").on("click", function(){ 
        var $form = $('#modUnits');
		$form.find("input[name='id_a']").attr("value",id_a);
        $form.find("input[name='num_placa_a']").attr("value",num_placa_a);
        $form.find("input[name='num_economico_a']").attr("value",num_economico_a);
		$form.find("input[name='estado_a']").attr("value",estado_a);
	});
	$("button[name='btnDel']").on("click", function(){
		$("#delUnits input[name='id_a']").attr("value",id_a);
		$("#delUnits input[name='num_placa_a']").attr("value",num_placa_a);
	})
    
});

function addUnit() {
	var num_placa_a = document.getElementById("InputMatricula").value;
	var num_economico_a = document.getElementById("InputEconomicNumber").value;
	var _state = document.getElementById("InputState").value;
	if (num_placa_a.trim() == '' || num_economico_a.trim() == '' || _state.trim() == '') {
		alert("Operación fracasada. Ingrese los datos faltantes.");
	} else {
		clear();
	}
}
function clear() {
	document.getElementById("InputMatricula").value = "";
	document.getElementById("InputEconomicNumber").value = "";
	document.getElementById("InputState").value = "";
	document.getElementById("OutputIDUnit_modal").value = "";
	document.getElementById("OutputMatricula_modal").value = "";
	document.getElementById("OutputEconomicNumber_modal").value = "";
	document.getElementById("OutputState_modal").value = "";
}

function modifyUnit() {
    $('#modal-modUnits').on('submit',function(event){
        var $form = $(this);
        var term = $form.find("input[name='s']").val();
        var url = $form.attr('action'); 
	});
	
	var num_placa_a = document.getElementById("InputMatricula").value;
	var num_economico_a = document.getElementById("InputEconomicNumber").value;
	var _state = document.getElementById("InputState").value;

	var fila = "<tr id='unit_" + id_a + "'><td>" + id_a +
		"</td><td>" + num_placa_a + "</td><td>" + num_economico_a + "</td><td>" + _state + "</td></tr>";

	if (num_placa_a.trim() == '' || num_economico_a.trim() == '' || _state.trim() == '') {
		alert("Operación fracasada. Ingrese los datos faltantes.");
	} else {
		document.getElementById("unitsTable").innerHTML = fila;
		clear();
	}
}

function load() {
	location.reload();
}