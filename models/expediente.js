const { Schema, model } = require('mongoose');

const ExpedienteSchema = Schema({
    
    idAdministrado: {

        type: Schema.Types.ObjectId,         
        ref: 'Administrado',      
        required: true
    },
    idInstrumento: {
        type: Schema.Types.ObjectId,         
        ref: 'Instrumento'
              
        
    },    
    expedientes: [{
        type: String,
        required: true,
        
    }],
    agregados: [{
        type: String,
        required: false        
        
    }],    
    internos: [{
        type: String
        
    }],    
    tipoTramite: {
        type: String,
        required: true,
    },
    titulo: {
        type: String,
        required: false      
        
    },
    transferencia: {
        type: String,
        required: false
            
        
    },
    fecha: {
        type: String,
        required: true,
    },
    lugar: {
        type: String,
        required: true,
    },
    motivo: {
        type: String,
        required: true,
    },
    observacion: {
        type: String,
        required: false
        
    },
    
    estado: {
        type: String,
        enum: ['en-tramite', 'archivado'],
        default: 'en-tramite',
        
    },
    favorable: {
        type: Boolean,
        default: false
    },    
    
},  

   { 
    timestamps: true

});

ExpedienteSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})



module.exports = model('Expediente',
    ExpedienteSchema);