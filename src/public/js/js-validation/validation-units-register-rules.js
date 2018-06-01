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
  
  });