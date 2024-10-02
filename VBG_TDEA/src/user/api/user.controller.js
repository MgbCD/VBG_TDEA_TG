const { createUserUseCase } = require('../application/create-user');
const { ExceptionMissingField } = require('../exceptions/ExceptionMissingField');
const { userModel } = require('../infrastructure/models/user.model'); 

// Guardar o actualizar usuario
// Guardar o actualizar usuario
async function saveUser(req, res) {
    try {
        const { email, username, roleId, program } = req.body;

        // Log para ver qué datos se reciben en la solicitud
        console.log('Datos recibidos:', req.body);

        // Verificar si los campos obligatorios están presentes
        if (!email || !username || !roleId) {
            throw new ExceptionMissingField('email, username, roleId');
        }

        
        // Verificar si el usuario ya existe por su email
        const existingUser = await userModel.findOne({ email });

        // Log para ver si se encuentra un usuario existente
        console.log('Usuario existente:', existingUser);
         
        if (existingUser) {
            // Si el usuario ya existe, actualiza sus datos
            existingUser.username = username;
            existingUser.roleId = roleId;

            // Solo actualiza el programa si el rol es 'student' y hay un programa
            if (roleId === 'student' && program) {
                existingUser.program = program;
            }

            existingUser.lastLogin = new Date(); // Actualiza la última fecha de inicio de sesión

            // Guardar el usuario actualizado
            await existingUser.save();

            // Responder con el usuario actualizado
            return res.status(200).json({ message: 'Usuario actualizado correctamente', user: existingUser });
        }

        // Si el usuario no existe, crea un nuevo usuario utilizando el caso de uso
        //const newUser = await createUserUseCase(req.body);
        const newUser = await createUserUseCase({ email, username, roleId, program });

        // Responder con el nuevo usuario creado
        return res.status(201).json({ user: newUser });

    } catch (error) {
        // Diferenciar entre errores personalizados y errores generales
        if (error instanceof ExceptionMissingField) {
            return res.status(400).json({ message: error.message });
        }

        // Error general del servidor
        console.error('Error interno del servidor:', error); // Log para error
        return res.status(500).json({ message: 'Error interno del servidor: ' + error.message });
    }
}

// Verificar si es el primer inicio de sesión
async function checkFirstLogin(req, res) {
    try {
        const { email } = req.query;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Si el usuario no tiene un programa, es su primer inicio
        const firstLogin = !user.program; 
        return res.json({ firstLogin });
    } catch (error) {
        console.error("Error al verificar el primer inicio de sesión:", error); // Log para error
        return res.status(500).json({ message: 'Error en el servidor' });
    }
}
async function updateProgram(req, res) {
    try {
        const { email, program } = req.body;

        // Verificar que se haya proporcionado el email y el programa
        if (!email || !program) {
            return res.status(400).json({ message: 'Faltan campos requeridos: email y program.' });
        }

        // Buscar al usuario por su email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Actualizar el programa del usuario
        user.program = program;
        await user.save();

        return res.status(200).json({ message: 'Programa actualizado correctamente', user });
    } catch (error) {
        console.error('Error al actualizar el programa:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
}
module.exports = { saveUser, checkFirstLogin, updateProgram };
