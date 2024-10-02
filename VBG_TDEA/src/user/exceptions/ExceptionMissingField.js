class ExceptionMissingField extends Error {
    constructor(field) {
        super(`El campo ${field} es obligatorio.`);
        this.name = 'ExceptionMissingField';
    }
}

module.exports = { ExceptionMissingField };
