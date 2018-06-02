$(function() {

    $.validator.setDefaults({
      errorClass: 'help-block',
      highlight: function(element) {
        $(element)
          .closest('.form-group')
          .addClass('has-error');
      },
      unhighlight: function(element) {
        $(element)
          .closest('.form-group')
          .removeClass('has-error');
      }
    });
  
    $.validator.addMethod('strongPassword', function(value, element) {
      return this.optional(element) 
        || value.length >= 6
        && /\d/.test(value)
        && /[a-z]/i.test(value);
    }, 'Your password must be at least 6 characters long and contain at least one number and one char\'.')

    $("#userRegister").validate({
      rules: {
        nombre_prs:{
            required: true,
            lettersonly: true
        },  
        apellido_paterno_prs: {
            required: true,
            lettersonly: true
        },
        apellido_materno_prs: {
            required: true,
            lettersonly: true
        },
        telefono_usr:{
            required: true,
            //number: true
            digits: true            
        },
        ocupacion_prs:{
            lettersonly: true
        },
        sexo_psr:{
            required: true
        },
        tipo_sangre_p:{
            required: true
        },
        fecha_nacimiento_prs:{
            required: true
        },
        nss_p:{
            digits: true
        },
        email_usr: {
            required: true,
            email: true
        },
        contrasena_usr: {
            required: true,
            maxlength: 15,
            strongPassword: true
        },
        contrasena_usr_conf: {
            required: true,
            equalTo: '#InputPassword1'
        }
        
      },
      messages: {
        nombre_prs:{
            required: "<span class='badge badge-danger'>Este campo es requerido.</span>",
            lettersonly: '<span class="badge badge-danger">Solo texto, por favor.</span>'
        },  
        apellido_paterno_prs: {
            required: '<span class="badge badge-danger">Campo requerido, por favor.</span>',
            lettersonly: '<span class="badge badge-danger">Solo letras, por favor.</span>'
        },
        apellido_materno_prs: {
            required: '<span class="badge badge-danger">Campo requerido, por favor.</span>',
            lettersonly: '<span class="badge badge-danger">Solo texto, por favor.</span>'
        },
        telefono_usr:{
            required: '<span class="badge badge-danger">Campo requerido, por favor.</span>',
            digits: '<span class="badge badge-danger">Solo dígitos, por favor.</span>',
            min: $.validator.format( "<span class='badge badge-danger'>Ingrese un valor mayor o igual a {0}.</span>" ),
            max: $.validator.format( "<span class='badge badge-danger'>Ingrese un valor menor o igual a {0}.</span>" )
        },
        ocupacion_prs:{
            lettersonly: '<span class="badge badge-danger">Solo texto, por favor.</span>'
        },        
        sexo_prs:{
            required: '<span class="badge badge-danger">Campo requerido, por favor.</span>'       
        },
        tipo_sangre_p:{
            required: '<span class="badge badge-danger">Campo requerido, por favor.</span>'        
        },
        fecha_nacimiento_prs:{
            required: '<span class="badge badge-danger">Campo requerido, por favor.</span>',
            min: $.validator.format( "<span class='badge badge-danger'>Ingrese un valor mayor o igual a {0}.</span>" ),
            max: $.validator.format( "<span class='badge badge-danger'>Ingrese un valor menor o igual a {0}.</span>" )
        },
        nss_p:{
            digits: '<span class="badge badge-danger">Solo dígitos, por favor.</span>'
        },
        email_usr: {
          required: '<span class="badge badge-danger">Campo requerido, por favor.</span>',
          email: '<span class="badge badge-danger">Dirección de e-mail no válida.</span>',
          remote: $.validator.format("{0} es una dirección asociada a una cuenta existente.")
        },
        contrasena_usr: {
          required: '<span class="badge badge-danger">Campo requerido, por favor.</span>',
          maxlength: '<span class="badge badge-danger">Su contraseña debe tener como máximo 15 caracteres.</span>',
          strongPassword: '<span class="badge badge-danger">Su contraseña debe tener al menos 6 caracteres y contener al menos un número y un carácter.</span>',
        },
        contrasena_usr_conf: {
          required: '<span class="badge badge-danger">Campo requerido, por favor.</span>',
          equalTo: '<span class="badge badge-danger">Las contraseñas no coindicen</span>'
        }
  
      },
      submitHandler: function() {
        $successMsg.show();
      }
    });

     $("#unitRegister").validate({
      rules: {
        num_placa_a:{
            required: true,
            alphanumeric: true
        },  
        num_economico_a: {
            required: true,
            nowhitespace: true,
            digits: true
        },
        estado_a: {
            required: true
        }
      },
      messages: {
        num_placa_a:{
            required: "<span class='badge badge-danger'>Este campo es requerido.</span>"
        },  
        num_economico_a: {
            required: "<span class='badge badge-danger'>Este campo es requerido.</span>",
            nowhitespace: "<span class='badge badge-danger'>Espacio intermedio no válido.</span>",
            digits: '<span class="badge badge-danger">Solo dígitos, por favor.</span>',
            min: $.validator.format( "<span class='badge badge-danger'>Ingrese un valor mayor o igual a {0}.</span>" ),
            max: $.validator.format( "<span class='badge badge-danger'>Ingrese un valor menor o igual a {0}.</span>" )
        },
        estado_a: {
            required: "<span class='badge badge-danger'>Este campo es requerido.</span>",
        }
      }
    });

    $("#tampRegister").validate({
        rules: {
          nombre_prs:{
              required: true,
              lettersonly: true
          },  
          apellido_paterno_prs: {
              required: true,
              lettersonly: true
          },
          apellido_materno_prs: {
              required: true,
              lettersonly: true
          },
          telefono_usr:{
              required: true,
              digits: true            
          },
          grado_tmp:{
              required: true,
              number: true
          },
          sexo_psr:{
              required: true
          },
          tipo_sangre_p:{
              required: true
          },
          fecha_nacimiento_prs:{
              required: true
          },
          fecha_ingreso_tmp:{
            required: true
          },
          email_usr: {
              required: true,
              email: true
          },
          contrasena_usr: {
              required: true,
              maxlength: 15,
              strongPassword: true
          },
          contrasena_usr_conf: {
              required: true,
              equalTo: '#InputPassword1'
          }
          
        },
        messages: {
          nombre_prs:{
              required: "<span class='badge badge-danger'>Este campo es requerido.</span>",
              lettersonly: '<span class="badge badge-danger">Solo texto, por favor.</span>'
          },  
          apellido_paterno_prs: {
              required: '<span class="badge badge-danger">Campo requerido, por favor.</span>',
              lettersonly: '<span class="badge badge-danger">Solo letras, por favor.</span>'
          },
          apellido_materno_prs: {
              required: '<span class="badge badge-danger">Campo requerido, por favor.</span>',
              lettersonly: '<span class="badge badge-danger">Solo texto, por favor.</span>'
          },
          telefono_usr:{
              required: '<span class="badge badge-danger">Campo requerido, por favor.</span>',
              digits: '<span class="badge badge-danger">Solo dígitos, por favor.</span>',
              min: $.validator.format( "<span class='badge badge-danger'>Ingrese un valor mayor o igual a {0}.</span>" ),
              max: $.validator.format( "<span class='badge badge-danger'>Ingrese un valor menor o igual a {0}.</span>" )
          },
          grado_tmp:{
              required: '<span class="badge badge-danger">Campo requerido, por favor.</span>',
              number: '<span class="badge badge-danger">Solo números, por favor.</span>'
          },       
          sexo_prs:{
              required: '<span class="badge badge-danger">Campo requerido, por favor.</span>'       
          },
          tipo_sangre_p:{
              required: '<span class="badge badge-danger">Campo requerido, por favor.</span>'        
          },
          fecha_nacimiento_prs:{
              required: '<span class="badge badge-danger">Campo requerido, por favor.</span>',
              min: $.validator.format( "<span class='badge badge-danger'>Ingrese un valor mayor o igual a {0}.</span>" ),
              max: $.validator.format( "<span class='badge badge-danger'>Ingrese un valor menor o igual a {0}.</span>" )
          },
          fecha_ingreso_prs:{
              required: '<span class="badge badge-danger">Campo requerido, por favor.</span>',
              min: $.validator.format( "<span class='badge badge-danger'>Ingrese un valor mayor o igual a {0}.</span>" ),
              max: $.validator.format( "<span class='badge badge-danger'>Ingrese un valor menor o igual a {0}.</span>" )
          },
          email_usr: {
            required: '<span class="badge badge-danger">Campo requerido, por favor.</span>',
            email: '<span class="badge badge-danger">Dirección de e-mail no válida.</span>',
            remote: $.validator.format("{0} es una dirección asociada a una cuenta existente.")
          },
          contrasena_usr: {
            required: '<span class="badge badge-danger">Campo requerido, por favor.</span>',
            maxlength: '<span class="badge badge-danger">Su contraseña debe tener como máximo 15 caracteres.</span>',
            strongPassword: '<span class="badge badge-danger">Su contraseña debe tener al menos 6 caracteres y contener al menos un número y un carácter.</span>',
          },
          contrasena_usr_conf: {
            required: '<span class="badge badge-danger">Campo requerido, por favor.</span>',
            equalTo: '<span class="badge badge-danger">Las contraseñas no coindicen</span>'
          }    
        }
      });



      
  

    
  
  });
