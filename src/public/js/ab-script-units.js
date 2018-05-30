var _operation;
var _id;
var _mat;
var _num_e;
var _estado;

$(document).ready(function(){     
$('#unitsTable').on("click", function(){
    $('td').click(function(){          
    _id = $(this).parents("tr").find("td").eq(0).html();
    _mat = $(this).parents("tr").find("td").eq(1).html();
    _num_e = $(this).parents("tr").find("td").eq(2).html();
    _estado = $(this).parents("tr").find("td").eq(3).html();
    $("button[name=btnDel]").attr("disabled", false); 
    $("button[name=btnMod]").attr("disabled", false); 
    loadValues();
    });
}); 
}); 

function addUnit(){ 
var _id = Math.floor((Math.random() * 100) + 1);
var _mat = document.getElementById("InputMatricula").value;
var _num_economic = document.getElementById("InputEconomicNumber").value;
var _state = document.getElementById("InputState").value;
var fila="<tr id='unit_"+ _id + "'><td>"+ _id
        +"</td><td>"+_mat+"</td><td>"+_num_economic+"</td><td>"+_state+"</td></tr>"; 
if(_mat.trim()=='' || _num_economic.trim()=='' || _state.trim()==''){
    alert("Operación fracasada. Ingrese los datos faltantes.");          
} else {
    document.getElementById("unitsTable").innerHTML = fila;
    clear();                    
}          
}

function clear(){
document.getElementById("InputMatricula").value = "";
document.getElementById("InputEconomicNumber").value = "";
document.getElementById("InputState").value = "";
document.getElementById("OutputIDUnit_modal").value = "";
document.getElementById("OutputMatricula_modal").value = "";
document.getElementById("OutputEconomicNumber_modal").value = "";
document.getElementById("OutputState_modal").value = "";        
}

function loadValues(){
var _modal_mod = "<div class='form-group'>"+
                    "<label for='OutputIDUnit'>ID Ambulancia</label>"+
                    "<input class='form-control' id='OutputIDUnit_modal' type='text' value='"+ _id +"' disabled>"+
                "</div> "+
                "<div class='form-group'>"+
                    "<label for='OutputMatricula'>Matrícula</label>"+
                    "<input class='form-control' id='OutputMatricula_modal' type='text' value='"+ _mat +"'>"+
                "</div>"+
                "<div class='form-group'>"+
                    "<label for='OutputEconomicNumber'>Número Económico</label>"+
                    "<input class='form-control' id='OutputEconomicNumber_modal' type='text' value='"+ _num_e +"'>"+
                "</div>"+   
                "<div class='form-group'>"+
                    "<label for='OutputState'>Estado</label>"+
                    "<input class='form-control' id='OutputState_modal' type='text' value='"+ _estado +"'>"+
                "</div>";
var _modal_del = "<div class='modal-body'>¿Está seguro que desea eliminar la unidad '"+ _id +"' con la matricula '"+ _mat + "'?</div>"+
                "<div style='display: none;'>"+
                    "<div class='form-group'>"+
                        "<label for='OutputIDUnit'>ID Ambulancia</label>"+
                        "<input class='form-control' id='OutputIDUnit_modal' type='text' value='"+ _id +"' disabled>"+
                    "</div> "+
                    "<div class='form-group'>"+
                        "<label for='OutputMatricula'>Matrícula</label>"+
                        "<input class='form-control' id='OutputMatricula_modal' type='text' value='"+ _mat +"'>"+
                    "</div>"+
                    "<div class='form-group'>"+
                        "<label for='OutputEconomicNumber'>Número Económico</label>"+
                        "<input class='form-control' id='OutputEconomicNumber_modal' type='number' value='"+ _num_e +"'>"+
                    "</div>"+   
                    "<div class='form-group'>"+
                        "<label for='OutputState'>Estado</label>"+
                        "<select class='form-control' required name='estado_a'> id='OutputState_modal'"+
                          "<option value='0'>Selecciona el estado</option>"+
                          "<option value='0'>Mantenimiento</option> "+
                          "<option value='1'>Activo</option>"+
                          "<option value='2'>Fuera de servicio</option>"+
                        "</select>"+
                        //"<input class='form-control' id='OutputState_modal' type='number' value='"+ _estado +"'>"+
                    "</div>"+
                "</div>";
document.getElementById('modal-modUnits').innerHTML = _modal_mod;
document.getElementById('modal-delUnits').innerHTML = _modal_del;
}

function load(){
    location.reload();
  }
          