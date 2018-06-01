$(function() {
  //variables
  var pass1 = $('[name=contrasena_usr]');
  var pass2 = $('[name=contrasena_usr_conf]');
  var btn = $('[name=btnRegister]');
  var confirmacion = '<span class="badge badge-sucess">Las contraseñas si coindicen.</span>';
  var longitud = "La contraseña debe estar formada entre 6-10 carácteres (ambos inclusive)";
  var negacion = '<span class="badge badge-danger">Las contraseñas no coindicen.</span>';
  var vacio = "La contraseña no puede estar vacía";
  //oculto por defecto el elemento span
  var span = $('<span></span>').insertAfter(pass2);
  span.hide();
  //función que comprueba las dos contraseñas
  function coincidePassword(){
    var valor1 = pass1.val();
    var valor2 = pass2.val();

    //muestro el span
      span.show().removeClass();
    if(valor1.length!=0 && valor1==valor2){       
      btn.removeAttr("disabled");
    }
  }
  //ejecuto la función al soltar la tecla
  pass2.keyup(function(){
    coincidePassword();
  });
});