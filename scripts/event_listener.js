document.addEventListener('DOMContentLoaded', () => {

    const verPwdBtn = document.getElementById('verPwd');
    const confirmarVerPwdBtn = document.getElementById('confirmarVerPwd');

    function alternarType(inputId, btn) {
        const input = document.getElementById(inputId);
        // Verifica el tipo actual del campo de contraseña
        if (input.type === 'password') {
            // Cambia a tipo texto
            input.type = 'text';
            btn.textContent = 'Ocultar Contraseña';
        } else {
            // Cambia a tipo contraseña
            input.type = 'password';
            btn.textContent = 'Ver Contraseña';
        }
    }

    verPwdBtn.addEventListener('click', () => {
        alternarType("password", verPwdBtn)
    });

    if (confirmarVerPwdBtn) {
        // si se encuentra el elemento con id confirmarVerPwd
        confirmarVerPwdBtn.addEventListener('click', () => {
            alternarType("confirmarPassword", confirmarVerPwdBtn)
        });
    }


});
