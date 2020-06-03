var btnContact = document.getElementById('sendContact');
var btnLogin = document.getElementById('sendLogin');

var camposLogin = [
    {id:'login-email', valido:false},
    {id:'login-password', valido:false},
];

var campos = [
    {id:'fullname', valido:false},
    {id:'email', valido:false},
    {id:'subject', valido:false},
    {id:'comment', valido:false},
];

if(btnContact) {
    btnContact.addEventListener("click", function(e){ 

        let correo = {
            id: campos[1].id,
            value: document.getElementById('email').value
        }

        let result = [];

        for (let i = 0; i<campos.length; i++) {
            campos[i].valido = validarCampoVacio(campos[i].id);
            if(campos[i].id == 'email') { campos[i].valido = validarCorreo(correo); }
            result[i] = campos[i].valido;
        }

        //console.log(result);

        if(!result.includes(false)) {
            $('#contact-msg').removeClass('msg-hidden');
            $('#contact-msg').addClass('msg-show');
            setTimeout(function(){
                $('#contact-msg').addClass('msg-hidden');
                $('#contact-msg').removeClass('msg-show');
                location.reload();
            }, 5000);
        }

        e.preventDefault();
    });
}

if(btnLogin) {
    btnLogin.addEventListener("click", function(e){ 

        let correo = {
            id: camposLogin[0].id,
            value: document.getElementById('login-email').value
        }

        let result = [];

        for (let i = 0; i<camposLogin.length; i++) {
            camposLogin[i].valido = validarCampoVacio(camposLogin[i].id);
            if(camposLogin[i].id == 'login-email') { camposLogin[i].valido = validarCorreo(correo); }
            result[i] = camposLogin[i].valido;
        }

        //console.log(result);

        if(!result.includes(false)) {
            if($('#login-email').val() == 'test@test.com' || $('#login-password').val() == '123456') {
                window.location.pathname = '/admin';
            }
            else {
                $('#login-msg').removeClass('msg-hidden');
                $('#login-msg').addClass('msg-show');
                setTimeout(function(){
                    $('#login-msg').addClass('msg-hidden');
                    $('#login-msg').removeClass('msg-show');
                }, 5000);
            }
        }

        e.preventDefault();
    });
}

function validarCampoVacio(id){
    let resultado = (document.getElementById(id).value=="") ? false : true;
    marcarInput(id,resultado);
    return resultado; 
}

function validarCorreo(correo) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let resultado = re.test(correo.value);
    marcarInput(correo.id, resultado);
    return resultado;
}

function marcarInput(id, valido){
    if (valido){
        document.getElementById(id).classList.remove('is-invalid');
        document.getElementById(id).classList.add('is-valid');
    }else{
        document.getElementById(id).classList.remove('is-valid');
        document.getElementById(id).classList.add('is-invalid');
    }
}

function cleanForm(id) {

}