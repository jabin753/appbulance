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
    $('#unitsTable').on("click", function(){
        $('td').click(function(){  
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
            loadValues();
            });
    }); 
}); 

function addUser(){ 
    var _id = "DEFAULT";
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
                    "<td>"+ _date_birt + " (" +calcularEdad(_date_birt) + " años)" + "</td>"+    
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

function loadValues(){
    var _modal_mod = "<div class='form-group'>"+
                        "<div class='form-row'>"+
                            "<div class='col-md-6'>"+
                                "<label for='InputID'>ID</label>"+
                                "<input value='" + _id + "' disabled class='form-control'required name='id_usr'id='InputID' type='text' aria-describedby='nameHelp'>"+
                            "</div>"+
                            "<div class='col-md-6'>"+
                                "<label for='InputName'>Nombre</label>"+
                                "<input value='" + _name + "' class='form-control'required name='nombre_prs'id='InputName' type='text' aria-describedby='nameHelp' placeholder='Escribe tu nombre' maxLength='30'>"+
                            "</div>"+
                        "</div>"+
                    "</div>"+
                    "<div class='form-group'>"+
                        "<div class='form-row'>"+
                            "<div class='col-md-6'>"+
                                "<label for='InputLastName'>Apellido Paterno</label>"+
                                "<input value='" + _ap_pat + "' class='form-control' required name='apellido_paterno_prs'id='InputLastName' type='text' aria-describedby='nameHelp' placeholder='Escribe tu apellido paterno' maxLength='30'>"+
                            "</div>"+
                            "<div class='col-md-6'>"+
                                "<label for='InputLastName2'>Apellido Materno</label>"+
                                "<input value='" + _ap_mat + "' class='form-control' required name='apellido_materno_prs'id='InputLastName2' type='text' aria-describedby='nameHelp' placeholder='Escribe tu apellido materno' maxLength='30'>"+
                            "</div>"+
                        "</div>"+
                   "</div>"+
                   "<div class='form-row'>"+
                        "<div class='col-md-6'>"+
                            "<label for='InputPhoneNumber'>Teléfono</label>"+
                            "<input value='" + _tel + "' class='form-control' required name='telefono_usr'id='InputPhoneNumber' type='tel' placeholder='Escribe tu número telefónico' maxLength='10'>"+
                        "</div>"+
                        "<div class='col-md-6'>"+
                            "<label for='InputOccupation'>Ocupación</label>"+
                            "<input value='" + _ocupation + "' class='form-control' name='ocupacion_prs' id='InputOccupation' type='text' aria-describedby='nameHelp' placeholder='Escribe tu ocupación'>"+
                        "</div>"+           
                    "</div>"+
                    "<br>"+
                    "<div class='form-group'>"+
                       "<div class='form-row'>"+
                            "<div class='col-md-6'>"+
                                "<label for='InputSex'>Sexo</label><br>"+
                                "<select class='form-control' required name='sexo_prs' id='InputSex'>"+
                                    "<option value='0'>Selecciona tu sexo</option> "+    
                                    "<option value='M'>Hombre</option> "+
                                    "<option value='F'>Mujer</option>"+
                                "</select>"+
                            "</div>"+
                            "<div class='col-md-6'>"+
                                "<label for='InputBlood'>Tipo de sangre</label>"+
                                "<select class='form-control' required name='tipo_sangre_p' id='InputBlood'>"+
                                    "<option value='0'>Selecciona tu tipo de sangre</option>"+ 
                                    "<option value='O+'>O+</option>"+
                                    "<option value='O-'>O-</option>"+
                                    "<option value='A+'>A+</option>"+
                                    "<option value='A-'>A-</option>"+
                                    "<option value='B+'>B+</option>"+
                                    "<option value='B-'>B-</option>"+
                                    "<option value='AB+'>AB+</option> "+
                                    "<option value='AB-'>AB-</option>"+
                                "</select>"+
                            "</div>"+
                        "</div>"+
                        "<div class='form-group'>"+
                            "<label for='InputDateBirth'>Fecha de nacimiento</label>"+
                            "<input value='" + _date_birt + "' class='form-control' required name='fecha_nacimiento_prs' id='InputDateBirth' type='date' min='1910-01-01' max='2000-03-01'>"+
                        "</div>"+
                    "</div>"+
                    "<div class='form-group'>"+
                        "<div class='form-row'>"+
                            "<div class='col-md-6'>"+
                                "<label for='InputSecure'>Derechohabiente a</label>"+
                                "<select class='form-control' name='smed_p' id='InputSecure'>"+
                                    "<option value='0'>Selecciona</option>"+
                                    "<option value='1'>IMSS</option>"+
                                    "<option value='2'>ISSSTE</option>"+
                                    "<option value='3'>SEDENA</option>"+
                                    "<option value='4'>PEMEX</option>"+
                                    "<option value='5'>Seguro Popular</option>"+
                                "</select>"+
                            "</div>"+
                            "<div class='col-md-6'>"+
                                "<label for='InputNSS'>NSS</label>"+
                                "<input value='" + _nss + "' class='form-control' name='nss_p' id='InputNSS' type='text' aria-describedby='nameHelp' placeholder='Escribe tu NSS' maxLength='12'>"+
                            "</div>"+
                        "</div>"+
                    "</div> "+             
                    "<hr>"+
                    "<div class='form-group'>"+
                        "<label for='InputEmail1'>Dirección de correo electrónico</label>"+
                        "<input  value='" + _email + "' class='form-control' required name='email_usr' id='InputEmail1' type='email' aria-describedby='emailHelp' placeholder='Escribe tu email'>"+
                    "</div>";
                    /*"<div class='form-group'>"+
                        "<div class='form-row'>"+
                            "<div class='col-md-6'>"+
                                "<label for='InputPassword1'>Contraseña</label>"+
                                "<input class='form-control' required name='contrasena_usr' id='InputPassword1' type='password' placeholder='Escribe una contraseña'>"+
                            "</div>"+
                            "<div class='col-md-6'>"+
                                "<label for='ConfirmPassword'>Confirma la contraseña</label>"+
                                "<input class='form-control' required name='contrasena_usr_conf' id='ConfirmPassword' type='password' placeholder='Confirma la contraseña'>"+
                            "</div>"+
                        "</div>"+
                    "</div>";*/
    var _modal_del = "<div class='modal-body'>¿Está seguro que desea eliminar el usuario '"+ _id +"' cuyo nombre es '"+ _name + " "+ _ap_pat + " "+ _ap_mat + "'?</div>"+
                    "<div >"+
                    "<div class='form-group'>"+
                        "<div class='form-row'>"+
                            "<div class='col-md-6'>"+
                                "<label for='InputID'>ID</label>"+
                                "<input value='" + _id + "' disabled class='form-control'required name='id_usr'id='InputID' type='text' aria-describedby='nameHelp'>"+
                            "</div>"+
                            "<div class='col-md-6'>"+
                                "<label for='InputName'>Nombre</label>"+
                                "<input value='" + _name + "' class='form-control'required name='nombre_prs'id='InputName' type='text' aria-describedby='nameHelp' placeholder='Escribe tu nombre' maxLength='30'>"+
                            "</div>"+
                        "</div>"+
                    "</div>"+
                    "<div class='form-group'>"+
                        "<div class='form-row'>"+
                            "<div class='col-md-6'>"+
                                "<label for='InputLastName'>Apellido Paterno</label>"+
                                "<input value='" + _ap_pat + "' class='form-control' required name='apellido_paterno_prs'id='InputLastName' type='text' aria-describedby='nameHelp' placeholder='Escribe tu apellido paterno' maxLength='30'>"+
                            "</div>"+
                            "<div class='col-md-6'>"+
                                "<label for='InputLastName2'>Apellido Materno</label>"+
                                "<input value='" + _ap_mat + "' class='form-control' required name='apellido_materno_prs'id='InputLastName2' type='text' aria-describedby='nameHelp' placeholder='Escribe tu apellido materno' maxLength='30'>"+
                            "</div>"+
                        "</div>"+
                   "</div>"+
                   "<div class='form-row'>"+
                        "<div class='col-md-6'>"+
                            "<label for='InputPhoneNumber'>Teléfono</label>"+
                            "<input value='" + _tel + "' class='form-control' required name='telefono_usr'id='InputPhoneNumber' type='tel' placeholder='Escribe tu número telefónico' maxLength='10'>"+
                        "</div>"+
                        "<div class='col-md-6'>"+
                            "<label for='InputOccupation'>Ocupación</label>"+
                            "<input value='" + _ocupation + "' class='form-control' name='ocupacion_prs' id='InputOccupation' type='text' aria-describedby='nameHelp' placeholder='Escribe tu ocupación'>"+
                        "</div>"+           
                    "</div>"+
                    "<br>"+
                    "<div class='form-group'>"+
                       "<div class='form-row'>"+
                            "<div class='col-md-6'>"+
                                "<label for='InputSex'>Sexo</label><br>"+
                                "<select class='form-control' required name='sexo_prs' id='InputSex'>"+
                                    "<option value='0'>Selecciona tu sexo</option> "+    
                                    "<option value='M'>Hombre</option> "+
                                    "<option value='F'>Mujer</option>"+
                                "</select>"+
                            "</div>"+
                            "<div class='col-md-6'>"+
                                "<label for='InputBlood'>Tipo de sangre</label>"+
                                "<select class='form-control' required name='tipo_sangre_p' id='InputBlood'>"+
                                    "<option value='0'>Selecciona tu tipo de sangre</option>"+ 
                                    "<option value='O+'>O+</option>"+
                                    "<option value='O-'>O-</option>"+
                                    "<option value='A+'>A+</option>"+
                                    "<option value='A-'>A-</option>"+
                                    "<option value='B+'>B+</option>"+
                                    "<option value='B-'>B-</option>"+
                                    "<option value='AB+'>AB+</option> "+
                                    "<option value='AB-'>AB-</option>"+
                                "</select>"+
                            "</div>"+
                        "</div>"+
                        "<div class='form-group'>"+
                            "<label for='InputDateBirth'>Fecha de nacimiento</label>"+
                            "<input value='" + _date_birt + "' class='form-control' required name='fecha_nacimiento_prs' id='InputDateBirth' type='date' min='1910-01-01' max='2000-03-01'>"+
                        "</div>"+
                    "</div>"+
                    "<div class='form-group'>"+
                        "<div class='form-row'>"+
                            "<div class='col-md-6'>"+
                                "<label for='InputSecure'>Derechohabiente a</label>"+
                                "<select class='form-control' name='smed_p' id='InputSecure'>"+
                                    "<option value='0'>Selecciona</option>"+
                                    "<option value='1'>IMSS</option>"+
                                    "<option value='2'>ISSSTE</option>"+
                                    "<option value='3'>SEDENA</option>"+
                                    "<option value='4'>PEMEX</option>"+
                                    "<option value='5'>Seguro Popular</option>"+
                                "</select>"+
                            "</div>"+
                            "<div class='col-md-6'>"+
                                "<label for='InputNSS'>NSS</label>"+
                                "<input value='" + _nss + "' class='form-control' name='nss_p' id='InputNSS' type='text' aria-describedby='nameHelp' placeholder='Escribe tu NSS' maxLength='12'>"+
                            "</div>"+
                        "</div>"+
                    "</div> "+             
                    "<hr>"+
                    "<div class='form-group'>"+
                        "<label for='InputEmail1'>Dirección de correo electrónico</label>"+
                        "<input  value='" + _email + "' class='form-control' required name='email_usr' id='InputEmail1' type='email' aria-describedby='emailHelp' placeholder='Escribe tu email'>"+
                    "</div>" + "</div>";
    document.getElementById('modal-modUsers').innerHTML = _modal_mod;
    document.getElementById('modal-delUsers').innerHTML = _modal_del;
}

function load(){
    location.reload();
  }
          