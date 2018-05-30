var _id;
var _name;
var _ap_pat;
var _ap_mat;
var _tel;
var _ocupation;
var _sex;
var _grade;
var _date_birt;
var _date_enter;
var _experience;
var _email;

$(document).ready(function(){     
    $('#unitsTable').on("click", function(){
        $('td').click(function(){  
            _id = $(this).parents("tr").find("td").eq(0).html();
            _name = $(this).parents("tr").find("td").eq(1).html();
            _ap_pat = $(this).parents("tr").find("td").eq(2).html();
            _ap_mat = $(this).parents("tr").find("td").eq(3).html();
            _tel = $(this).parents("tr").find("td").eq(4).html();
            _sex = $(this).parents("tr").find("td").eq(5).html();
            _date_birt = $(this).parents("tr").find("td").eq(6).html();
            _date_enter = $(this).parents("tr").find("td").eq(7).html();
            _experience = $(this).parents("tr").find("td").eq(8).html();
            _grade = $(this).parents("tr").find("td").eq(9).html();
            _email = $(this).parents("tr").find("td").eq(10).html();
            $("button[name=btnDel]").attr("disabled", false); 
            $("button[name=btnMod]").attr("disabled", false);             
            loadValues();
            });
    }); 
}); 

function addTamp(){ 
    var _id = "DEFAULT";
    var _name = document.getElementById("InputName").value;
    var _ap_pat = document.getElementById("InputLastName").value;
    var _ap_mat = document.getElementById("InputLastName2").value;
    var _tel = document.getElementById("InputPhoneNumber").value;
    var _sex = document.getElementById("InputSex").value;
    var _blood = document.getElementById("InputBlood").value;
    var _date_birt = document.getElementById("InputDateBirth").value;
    var _date_enter = document.getElementById("InputDateEnter").value;
    var _experience = calcularEdad(_date_enter);
    var _grade = document.getElementById("InputGrade").value;
    var _email = document.getElementById("InputEmail1").value;

    var _fila = "<tr id='usr_"+ _id + "'>"+
                    "<td>"+ _id +"</td>"+    
                    "<td>"+ _name +"</td>"+    
                    "<td>"+ _ap_pat +"</td>"+    
                    "<td>"+ _ap_mat +"</td>"+    
                    "<td>"+ _tel +"</td>"+    
                    "<td>"+ _sex +"</td>"+ 
                    "<td>"+ _blood +"</td>"+ 
                    "<td>"+ _date_birt + " (" +calcularEdad(_date_birt) + " años)" + "</td>"+    
                    "<td>"+ _date_enter +"</td>"+  
                    "<td>"+ _experience +"</td>"+  
                    "<td>"+ _grade +"</td>"+ 
                    "<td>"+ _email +"</td>"+   
                "</tr>";
    if(_name=='' || _ap_pat=='' || _ap_mat=='' || _tel=='' || _ocupation=='' || _sex=='' || _blood==''  
        || _grade=='' || _date_birt=='' || _date_enter=='' || _email==''){
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
    document.getElementById("InputGrade").value = "";
    document.getElementById("InputSex").value = "";
    document.getElementById("InputBlood").value = "";
    document.getElementById("InputDateBirth").value = "";
    document.getElementById("InputDateEnter").value = "";
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
                            "<label for='InputGrade'>Grado</label>"+
                            "<input value='" + _grade + "' class='form-control' name='grado_tmp' id='InputGrade' type='text' aria-describedby='nameHelp' placeholder='Escribe tu grado'>"+
                        "</div>"+           
                    "</div>"+
                    "<br>"+
                    "<div class='form-group'>"+
                       "<div class='form-row'>"+
                            "<div class='col-md-6'>"+
                                "<label for='InputSex'>Sexo</label><br>"+
                                "<select class='form-control' required name='sexo_prs' id='InputSex'>"+
                                    "<option value='0'>Selecciona tu sexo</option> "+    
                                    "<option value='H'>Hombre</option> "+
                                    "<option value='M'>Mujer</option>"+
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
                    "</div>"+
                    "<div class='form-group'>"+
                              "<div class='form-row'>"+
                                "<div class='col-md-6'>"+
                                  "<label for='InputDateBirth'>Fecha de nacimiento</label>"+
                                  "<input value='" + _date_birt + "' class='form-control' required name='fecha_nacimiento_prs' id='InputDateBirth' type='date' min='1910-01-01' max='2000-03-01'>"+
                                "</div>"+
                                "<div class='col-md-6'>"+
                                  "<label for='InputDateEnter'>Fecha de ingreso</label>"+
                                  "<input value='" + _date_enter + "'  class='form-control' required name='fecha_ingreso_tmp' id='InputDateEnter' type='date' min='1910-01-01' max='2000-03-01'>"+
                                "</div>"+
                              "</div>"+                                   
                            "</div>"+     
                    "<hr>"+
                    "<div class='form-group'>"+
                        "<label for='InputEmail1'>Dirección de correo electrónico</label>"+
                        "<input value='" + _email + "' class='form-control' required name='email_usr' id='InputEmail1' type='email' aria-describedby='emailHelp' placeholder='Escribe tu email'>"+
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
    var _modal_del = "<div class='modal-body'>¿Está seguro que desea eliminar el TAMP '"+ _id +"' cuyo nombre es '"+ _name + " "+ _ap_pat + " "+ _ap_mat + "'?</div>"+
                    "<div style:'display:none'>"+
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
                            "<label for='InputGrade'>Grado</label>"+
                            "<input value='" + _grade + "' class='form-control' name='grado_tmp' id='InputGrade' type='text' aria-describedby='nameHelp' placeholder='Escribe tu grado'>"+
                        "</div>"+           
                    "</div>"+
                    "<br>"+
                    "<div class='form-group'>"+
                       "<div class='form-row'>"+
                            "<div class='col-md-6'>"+
                                "<label for='InputSex'>Sexo</label><br>"+
                                "<select class='form-control' required name='sexo_prs' id='InputSex'>"+
                                    "<option value='0'>Selecciona tu sexo</option> "+    
                                    "<option value='H'>Hombre</option> "+
                                    "<option value='M'>Mujer</option>"+
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
                    "</div>"+
                    "<div class='form-group'>"+
                              "<div class='form-row'>"+
                                "<div class='col-md-6'>"+
                                  "<label for='InputDateBirth'>Fecha de nacimiento</label>"+
                                  "<input value='" + _date_birt + "' class='form-control' required name='fecha_nacimiento_prs' id='InputDateBirth' type='date' min='1910-01-01' max='2000-03-01'>"+
                                "</div>"+
                                "<div class='col-md-6'>"+
                                  "<label for='InputDateEnter'>Fecha de ingreso</label>"+
                                  "<input value='" + _date_enter + "'  class='form-control' required name='fecha_ingreso_tmp' id='InputDateEnter' type='date' min='1910-01-01' max='2000-03-01'>"+
                                "</div>"+
                              "</div>"+                                   
                            "</div>"+     
                    "<hr>"+
                    "<div class='form-group'>"+
                        "<label for='InputEmail1'>Dirección de correo electrónico</label>"+
                        "<input value='" + _email + "' class='form-control' required name='email_usr' id='InputEmail1' type='email' aria-describedby='emailHelp' placeholder='Escribe tu email'>"+
                    "</div>"+
                    "</div>";
    document.getElementById('modal-modTamps').innerHTML = _modal_mod;
    document.getElementById('modal-delTamps').innerHTML = _modal_del;
}

function load(){
    location.reload();
  }
          