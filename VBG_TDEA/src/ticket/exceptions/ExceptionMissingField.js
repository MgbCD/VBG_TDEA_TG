class ExceptionMissingField extends Error {
    constructor(field) {
        super(`Required fields missing: ${field}`);
        this.name = 'ExceptionMissingField'
    }
}

module.exports = { ExceptionMissingField };