const { Schema, model } = require('mongoose');

const InstrumentoSchema = Schema({

    idExpediente: {
        type: Schema.Types.ObjectId,
        ref: 'Expediente',
        required: true
    },    
    numeroInstrumento: [{
        type: String,        
        required: true    

    }],    
    resolucion: {
        type: String,
        default: 'sin-resolucion'
    },

}, {
    timestamps: true
});

InstrumentoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})



module.exports = model('Instrumento', InstrumentoSchema);