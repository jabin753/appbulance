<?php 
    $destino = "luizalcantara59@gmail.com";
    $asunto = $_POST['contact-category'];

    $comentario = "
        Nombre: $_POST[contact-name];
        Email: $_POST[contact-email];
        Comentario: $_POST[contact-message];
    ";

    $headers = 'From: '.$destino."\r\n".
    'Reply-To:'.$destino."\r\n".
    'X-Mailer: PHP/'.phpversion();

    mail($destino,$asunto,$comentario,$headers);

    echo "Ok";
?>
