var _id;
var _name;
var _ap_pat;
var _ap_mat;
var _tel;
var _ocupation;
var _sex;
var _blood;
var _date_birt;
var _sm;
var _nss;
var _email;

$(document).ready(function(){     
    $('#unitsTable td').on("click", function(){
        _id = $(this).parents("tr").find("td").eq(0).html();
        _name = $(this).parents("tr").find("td").eq(1).html();
        _ap_pat = $(this).parents("tr").find("td").eq(2).html();
        _ap_mat = $(this).parents("tr").find("td").eq(3).html();
        _tel = $(this).parents("tr").find("td").eq(4).html();
        _ocupation = $(this).parents("tr").find("td").eq(5).html();
        _sex = $(this).parents("tr").find("td").eq(6).html();
        _blood = $(this).parents("tr").find("td").eq(7).html();
        _date_birt = $(this).parents("tr").find("td").eq(8).html();
        _sm = $(this).parents("tr").find("td").eq(9).html();
        _nss = $(this).parents("tr").find("td").eq(10).html();
        _email = $(this).parents("tr").find("td").eq(11).html();
        $("button[name=btnDel]").attr("disabled", false); 
        $("button[name=btnMod]").attr("disabled", false);
    }); 
    $("button[name='btnMod']").on("click", function(){ 
        var $form = $('#modUsers');
        $form.find("input[name='nombre_prs']").attr("value",_name);
        $form.find("input[name='apellido_paterno_prs']").attr("value",_ap_pat);
        $form.find("input[name='apellido_materno_prs']").attr("value",_ap_mat);
        $form.find("input[name='telefono_usr']").attr("value",_tel);
        $form.find("select[name='sexo_prs']").attr("value",_sex);
        $form.find("select[name='tipo_sangre_p']").attr("value",_blood);
        $form.find("input[name='fecha_nacimiento_prs']").attr("value",_date_birt);
        $form.find("input[name='ocupacion_prs']").attr("value",_ocupation);
        $form.find("select[name='id_sm']").attr("value",_sm);
        $form.find("input[name='nss_p']").attr("value",_nss);
        $form.find("input[name='email_usr']").attr("value",_email);
	});
	$("button[name='btnDel']").on("click", function(){
		$("#delUsers input[name='id_p']").attr("value",id_p);
	})
    }); 

function addUser(){ 
    var _name = document.getElementById("InputName").value;
    var _ap_pat = document.getElementById("InputLastName").value;
    var _ap_mat = document.getElementById("InputLastName2").value;
    var _tel = document.getElementById("InputPhoneNumber").value;
    var _ocupation = document.getElementById("InputOccupation").value;
    var _sex = document.getElementById("InputSex").value;
    var _blood = document.getElementById("InputBlood").value;
    var _date_birt = document.getElementById("InputDateBirth").value;
    var _sm = document.getElementById("InputSecure").value;
    var _nss = document.getElementById("InputNSS").value;
    var _email = document.getElementById("InputEmail1").value;    
     
    if(_name.trim()=='' || _ap_pat.trim()=='' || _ap_mat.trim()=='' || _tel.trim()=='' || _ocupation.trim()=='' || _sex.trim()=='' 
        || _blood.trim()=='' || _date_birt.trim()=='' || _sm.trim()=='' || _email.trim()==''){
        alert("Operación fracasada. Ingrese los datos faltantes.");          
    } else {
        clear();                    
    }          
}

function calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad;
}

function clear(){
    document.getElementById("InputName").value = "";
    document.getElementById("InputLastName").value = "";
    document.getElementById("InputLastName2").value = "";
    document.getElementById("InputPhoneNumber").value = "";
    document.getElementById("InputOccupation").value = "";
    document.getElementById("InputSex").value = "";
    document.getElementById("InputBlood").value = "";
    document.getElementById("InputDateBirth").value = "";
    document.getElementById("InputSecure").value = "";
    document.getElementById("InputNSS").value = "";
    document.getElementById("InputEmail1").value = "";    
}

function modifyUser(){
    $('#modal-modUsers').on('submit',function(event){
        /**Aqui no modifique nada, lo copie tal cual dell script de unidades */
        var $form = $(this);
        var term = $form.find("input[name='s']").val();
        var url = $form.attr('action'); 
        /**--------- */
	});

    var _name = document.getElementById("InputName").value;
    var _ap_pat = document.getElementById("InputLastName").value;
    var _ap_mat = document.getElementById("InputLastName2").value;
    var _tel = document.getElementById("InputPhoneNumber").value;
    var _ocupation = document.getElementById("InputOccupation").value;
    var _sex = document.getElementById("InputSex").value;
    var _blood = document.getElementById("InputBlood").value;
    var _date_birt = document.getElementById("InputDateBirth").value;
    var _sm = document.getElementById("InputSecure").value;
    var _nss = document.getElementById("InputNSS").value;
    var _email = document.getElementById("InputEmail1").value;

    var _fila = "<tr id='usr_"+ _id + "'>"+
                    "<td>"+ _id +"</td>"+    
                    "<td>"+ _name +"</td>"+    
                    "<td>"+ _ap_pat +"</td>"+    
                    "<td>"+ _ap_mat +"</td>"+    
                    "<td>"+ _tel +"</td>"+    
                    "<td>"+ _ocupation +"</td>"+    
                    "<td>"+ _sex +"</td>"+    
                    "<td>"+ _blood +"</td>"+ 
                    "<td>"+ _date_birt + "</td>"+    
                    "<td>"+ _sm +"</td>"+  
                    "<td>"+ _nss +"</td>"+  
                    "<td>"+ _email +"</td>"+   
                "</tr>";
     
    if(_name.trim()=='' || _ap_pat.trim()=='' || _ap_mat.trim()=='' || _tel.trim()=='' || _ocupation.trim()=='' || _sex.trim()=='' 
        || _blood.trim()=='' || _date_birt.trim()=='' || _sm.trim()=='' || _email.trim()==''){
        alert("Operación fracasada. Ingrese los datos faltantes.");          
    } else {
        document.getElementById("unitsTable").innerHTML = _fila;
        clear();                    
    }          
}

function load(){
    location.reload();
  }
          