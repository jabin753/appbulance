function toolbarAdmon() {
    if(document.getElementById("selected").style.color == "red"){
        document.getElementById("selected").style.color = "black";
        document.getElementById("btnEliminar").disabled = true;
        document.getElementById("btnModificar").disabled = true;
    } else{
        document.getElementById("selected").style.color = "red";
        document.getElementById("btnEliminar").disabled = false;            
        document.getElementById("btnModificar").disabled = false;
    }        
}