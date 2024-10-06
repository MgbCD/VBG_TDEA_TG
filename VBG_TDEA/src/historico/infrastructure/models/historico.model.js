const mongoose = require('mongoose');
const { historicoSchema } = require('../../domain/historico.schema');

const historicoModel = mongoose.model('HistoricoModel', historicoSchema);

module.exports = historicoModel;