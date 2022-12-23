const { response } = require('express');
const Instrumento = require('../models/instrumento');
const Expediente = require('../models/expediente');

const crearInstrumento = async(req, res = response) => {

    const { idExpediente, numeroInstrumento, resolucion } = req.body;
    const idExpte = req.body.idExpediente;
    
    try {

        const existeInstrumento = await Instrumento.findOne({ numeroInstrumento: numeroInstrumento });
        
        
        if (existeInstrumento) {
            return res.status(400).json({
                ok: false,
                msg: 'El instrumento ya está registrado'
            });
        }

        const data = {idExpediente, numeroInstrumento, resolucion };
        
        const instrumento = new Instrumento(data);
        const idInstrumento = instrumento._id;

        await Expediente.findByIdAndUpdate({ _id: idExpte },
            { $set: { idInstrumento: idInstrumento } });
        
        instrumento.save();
        

        res.json({
            
            instrumento
            
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


const instrumentosGet = async(req, res = response) => {
   
    try {

        const instrumentos = await Instrumento.find();
        if (!instrumentos) {
            return res.status(400).json({
                ok: false,
                msg: 'Instrumentos no encontrados'
            });
        }
       
        res.json({            
            instrumentos
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const instrumentoDelete = async(req, res = response) => {
    
    const  _id   = req.params._id;
    console.log(_id);

    try {

        await Instrumento.findByIdAndDelete( _id  );
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

const instrumentoPut = async(req, res = response) => {
    
    const _id = req.params._id;
    const {numeroInstrumento, resolucion } = req.body;
    //    

    try {

        const document = await Instrumento.findByIdAndUpdate({ _id }, {
            //
            $set: {
                numeroInstrumento: numeroInstrumento,
                resolucion: resolucion 
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

const obtenerinstrumento = async(req, res) => {

   
    const {numeroInstrumento} = req.body; 
    try {

        const instrumento = await Instrumento.find({numeroInstrumento});
        

        if (!instrumento) {
            return res.status(400).json({
                ok: false,
                msg: 'El instrumento no fue hallado'
            });
    }             

        res.json({
            ok: true,
            instrumento
            
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

    

module.exports = {
    crearInstrumento,
    obtenerinstrumento,
    instrumentosGet,
    instrumentoPut,
    instrumentoDelete,
    
}