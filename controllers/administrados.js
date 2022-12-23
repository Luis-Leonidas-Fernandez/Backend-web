const { response } = require('express');
const Administrado = require('../models/administrado');

const crearAdministrado = async(req, res = response) => {

    const { apellidos, nombres, jerarquia, plaza, dni  } = req.body;
    
    try {

        const existeAdministrado = await Administrado.findOne({ dni });
        if (existeAdministrado) {
            return res.status(400).json({
                ok: false,
                msg: 'El administrado ya está registrado'
            });
        }

        const data = { apellidos, nombres, jerarquia, plaza, dni };

        const administrado = new Administrado(data);       
        await administrado.save();        

        res.json({            
            administrado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const administradosGet = async(req, res = response) => {
   
    try {

        const administrados = await Administrado.find();
        if (!administrados) {
            return res.status(400).json({
                ok: false,
                msg: 'Administrados no encontrados'
            });
        }
       
        res.json({            
            administrados
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const administradoDelete = async(req, res = response) => {
    
    const  _id   = req.params._id;
    console.log(_id);

    try {

        await Administrado.findByIdAndDelete( _id  );
        res.json({
            msg: 'Documento eliminado'
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al Eliminar el documento'
        });
    }
}
const administradoPut = async(req, res = response) => {
    
    const _id = req.params._id;
    const {dni, apellidos, nombres, jerarquia, plaza } = req.body;
    //    

    try {

        const document = await Administrado.findByIdAndUpdate({ _id }, {
            $set: {
                dni: dni,
                apellidos: apellidos, nombres: nombres, jerarquia: jerarquia, plaza: plaza
            }
        }, { multi: true });
        
        res.json({
            doc: document,
            msg: 'Documento actualizado'
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al Actualizar el documento'
        });
    }
}

module.exports = {
    crearAdministrado,
    administradosGet,
    administradoDelete,
    administradoPut
    
}