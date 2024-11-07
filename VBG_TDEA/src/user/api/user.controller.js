const { createUserUseCase } = require('../application/create-user');
const { ExceptionMissingField } = require('../exceptions/ExceptionMissingField');
const { userModel } = require('../infrastructure/models/user.model');
const { findUserUseCase } = require('../application/get-user');


async function saveUser(req, res) {
    try {
        const { identityId, email, username, roleId, program } = req.body;

        console.log('Datos recibidos:', req.body);

        if (!identityId || !email || !username || !roleId) {
            throw new ExceptionMissingField('identityId, email, username, roleId');
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            existingUser.username = username;
            existingUser.roleId = roleId;

            if (roleId === 'student' && program) {
                existingUser.program = program;
            }

            existingUser.lastLogin = new Date();

            await existingUser.save();

            return res.status(200).json({ message: 'Usuario actualizado correctamente', user: existingUser });
        } else {

            const newUser = await createUserUseCase({ identityId, email, username, roleId, program: roleId === 'student' ? program : null });

            return res.status(201).json({ message: 'Usuario creado correctamente', user: newUser });
        }

    } catch (error) {
        if (error instanceof ExceptionMissingField) {
            return res.status(400).json({ message: error.message });
        }
        console.error('Error interno del servidor:', error);
        return res.status(500).json({ message: 'Error interno del servidor: ' + error.message });
    }
}

async function checkFirstLogin(req, res) {
    try {
        const { email } = req.query;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const firstLogin = (!user.program && user.roleId === 'student') || user.roleId === 'other';
        return res.json({ firstLogin });
    } catch (error) {
        console.error("Error al verificar el primer inicio de sesión:", error); // Log para error
        return res.status(500).json({ message: 'Error en el servidor' });
    }
}

async function updateProgram(req, res) {
    try {
        const { email, program } = req.body;

        if (!email || !program) {
            return res.status(400).json({ message: 'Faltan campos requeridos: email y program.' });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        user.program = program;
        await user.save();

        return res.status(200).json({ message: 'Programa actualizado correctamente', user });
    } catch (error) {
        console.error('Error al actualizar el programa:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
}

async function getUserByEmail(req, res) {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: 'Falta el campo email.' });
        }

        const user = await findUserUseCase(email);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        return res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
}

async function getRoleByEmail(req, res) {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: 'Falta el campo email.' });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(200).json({ roleId: user.roleId });
    } catch (error) {
        console.error('Error al obtener el rol del usuario:', error);
        return res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
}

module.exports = { saveUser, checkFirstLogin, updateProgram, getUserByEmail, getRoleByEmail };
