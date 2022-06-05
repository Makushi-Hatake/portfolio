//Variables
const btnEnviar = document.querySelector('#enviarComm');
const btnReset = document.querySelector('resetForm');
const formulario = document.querySelector('#enviar-mail');


//Variables para campos

const email = document.querySelector('#email');
const textArea = document.querySelector('#textarea');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListernes();
function eventListernes() {
    //Cuando inicia la app
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Campos del formulario
    email.addEventListener('blur', validarFormulario);
    textArea.addEventListener('blur', validarFormulario);

    //Resetea el formulario
    btnReset.addEventListener('click', resetearFormulario);

    //Enviar email
    formulario.addEventListener('submit', enviarEmail);

    
}

//Funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('btn-outline-secondary');
}

//Valida el formulario

function validarFormulario(e) {

    if (e.target.value.length > 0) {

        //eliminar errores
        const error = document.querySelector('p.error');
        if (error) {
            error.remove();
        }

        e.target.classList.remove('border-danger');
        e.target.classList.add('border-success');
    } else {
        e.target.classList.remove('border-success');
        e.target.classList.add('border-danger');

        mostrarError('Todos los campos son obligatorios');
    }

    if (e.target.type === 'email') {
        
        if (er.test(e.target.value)) {
            //eliminar errores
            const error = document.querySelector('p.error');
            if (error) {
                error.remove();
            }

            e.target.classList.remove('border-danger');
            e.target.classList.add('border-success');
        } else {
            e.target.classList.remove('border-success');
            e.target.classList.add('border-danger');
            mostrarError('Email no válido');
        }
    }
    if ( er.test (email.value) !== '' && textArea.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('btn-outline-secondary');

    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('bg-danger', 'bg-gradient', 'text-white', 'text-center', 'fw-bold', 'border-start', 'border-end', 'error');

    const error = document.querySelectorAll('.error');
    if (error.length === 0) {
        formulario.appendChild(mensajeError);
    }

}

function enviarEmail(e) {
    e.preventDefault();

    //Mostrar spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    setTimeout(() => {
        spinner.style.display = 'none';

        //Mensaje de confirmación de envío
        const parrafo = document.createElement('p');
        parrafo.textContent = 'Mensaje enviado correctamente!';
        formulario.insertBefore(parrafo, spinner);
        
        setTimeout(() => {
            parrafo.remove(); //Elimina el mensaje

            resetearFormulario();
        }, 5000);
    }, 3000);
    
}

//Funcion para resetar el formulario
function resetearFormulario(){
    formulario.reset();
    iniciarApp();

}