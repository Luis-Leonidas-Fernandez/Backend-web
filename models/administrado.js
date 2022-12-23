const { Schema, model } = require('mongoose');

const AdministradoSchema = Schema({

    apellidos: {
        type: String,
        required: true
    },
    nombres: {
        type: String,
        required: true,
        
    },
    jerarquia: {
        type: String,
        required: true
    },    
    plaza: {
        type: Number,
        default: 0 
    },
    dni: {
        type: Number,
        required: true,
        unique: true
    },    
    

});

AdministradoSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Administrado',
 AdministradoSchema);