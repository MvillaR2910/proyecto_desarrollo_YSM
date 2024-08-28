class Auth {

    static login(event) {
        event.preventDefault();
        const form = event.target;
        const email = form.elements["email"].value.trim();
        const pwd = form.elements["password"].value.trim();

        try {
            if (!email || !pwd) {
                throw new Error("Todos los campos deben estar completos.");
            }

            const stringUsuario = localStorage.getItem(email);

            if (!stringUsuario) {
                throw new Error("Email o contraseña inválidos.");
            }

            const jsonUsuario = JSON.parse(stringUsuario);

            if (pwd !== jsonUsuario.password) {
                throw new Error("Email o contraseña inválidos.");
            }

            // Redirigir al home después de un inicio de sesión exitoso
            window.location.href = "../html/home.html";

        } catch (error) {
            alert(error.message);
        }
    }

    static signup(event) {
        event.preventDefault();
        const form = event.target;
        const nombre = form.elements["nombre"].value.trim();
        const email = form.elements["email"].value.trim();
        const pwd = form.elements["password"].value.trim();
        const confirmarPwd = form.elements["confirmarPassword"].value.trim();

        try {
            // Validar campos vacíos
            if (!nombre || !email || !pwd || !confirmarPwd) {
                throw new Error("Todos los campos deben estar completos.");
            }

            // Verificar si el email ya está registrado
            if (localStorage.getItem(email)) {
                throw new Error("Email no disponible.");
            }

            // Verificar que las contraseñas coincidan
            if (pwd !== confirmarPwd) {
                throw new Error("Las contraseñas deben coincidir.");
            }

            // Validar nombre de usuario
            const nombreRegex = /^[A-Za-z][A-Za-z0-9]{7,14}$/;
            if (!nombreRegex.test(nombre)) {
                throw new Error("El nombre de usuario debe tener entre 8 y 15 caracteres, comenzar con una letra, y solo puede contener letras y números sin espacios.");
            }

            // Validar contraseña
            const pwdRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,20}$/;
            if (!pwdRegex.test(pwd)) {
                throw new Error("La contraseña debe tener entre 12 y 20 caracteres, e incluir al menos una letra mayúscula, una letra minúscula, un número, y un carácter especial (ejemplo: @$!%*?&).");
            }

            // Guardar datos del usuario en localStorage
            const datosUsuario = {
                nombre,
                password: pwd
            };
            localStorage.setItem(email, JSON.stringify(datosUsuario));

            // Redirigir al home después de un registro exitoso
            window.location.href = "../html/home.html";

        } catch (error) {
            alert(error.message);
        }
    }

}
