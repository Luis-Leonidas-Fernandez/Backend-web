const { response } = require('express');
const Administrado = require('../models/administrado');
const Expediente = require('../models/expediente');


const crearExpediente = async(req, res = response) => {

const { idAdministrado, expedientes,  agregados, internos, tipoTramite,
 titulo, transferencia, fecha, lugar, motivo,observacion } = req.body;
    console.log(idAdministrado);
try {

        const existeExpediente = await Expediente.findOne({ expedientes });
        if (existeExpediente) {
        return res.status(400).json({
                ok: false,
                msg: 'El expediente ya está registrado'
        });
     }
const data = { idAdministrado, expedientes, agregados, internos, tipoTramite, 
 titulo, transferencia, fecha, lugar, motivo, observacion };


const expediente = new Expediente(data);
await expediente.save();

res.json({
  
  expediente
            
 });

} catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const expedienteDelete = async(req, res = response) => {
    
    const  _id   = req.params._id;
    console.log(_id);

    try {

        await Expediente.findByIdAndDelete( _id  );
        res.json({
            msg: 'Expediente eliminado'
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al Eliminar el documento'
        });
    }
}
const expteUpdate = async(req, res = response) => {
    
    const _id = req.params._id;
    const { expedientes, internos, agregados, tipoTramite, titulo, transferencia,
        fecha, lugar, motivo, observacion} = req.body;
    
    
    try {

        const document = await Expediente.findByIdAndUpdate({ _id }, {
            $set: {
                expedientes: expedientes,
                internos: internos, agregados: agregados, tipoTramite: tipoTramite,
                titulo: titulo, transferencia: transferencia, fecha: fecha, lugar: lugar,
                motivo:  motivo, observacion: observacion
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


const updatedagregado = async(req, res = response) => {

    const { agregados } = req.body;
    const   {_id}    = req.params;
    try {

        const existeExpediente = await Expediente.findByIdAndUpdate({ _id },
             {$addToSet: {agregados: agregados}});
        
        if (!existeExpediente) {
            return res.status(400).json({
                ok: false,
                msg: 'El administrado no está registrado'
            });
        }

        const data = { administrado };        

        res.json({
            ok: true,
            data
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const updatedinternos = async(req, res = response) => {

    const { internos } = req.body;
    const   {_id}    = req.params;
    try {

        const existeExpediente = await Expediente.findByIdAndUpdate({ _id },
             {$addToSet: {internos: internos}});
        
        if (!existeExpediente) {
            return res.status(400).json({
                ok: false,
                msg: 'El administrado no está registrado'
            });
        }

        const data = { administrado };        

        res.json({
            ok: true,
            data
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const updatedmovimiento = async(req, res = response) => {

    const { fecha, lugar, motivo } = req.body;
    const   {_id}    = req.params;
    try {

        const existeExpediente = await Expediente.findByIdAndUpdate({ _id },
             {$set: {fecha: fecha, lugar: lugar, motivo: motivo}}, { new: true });
        
        if (!existeExpediente) {
            return res.status(400).json({
                ok: false,
                msg: 'El administrado no está registrado'
            });
        }

        const data = { administrado };        

        res.json({
            ok: true,
            data
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const updatedobservacion = async(req, res = response) => {

    const { observacion } = req.body;
    const   {_id}    = req.params;
    try {

        const existeExpediente = await Expediente.findByIdAndUpdate({ _id },
             {$set: {observacion: observacion}}, { new: true });
        
        if (!existeExpediente) {
            return res.status(400).json({
                ok: false,
                msg: 'El administrado no está registrado'
            });
        }

        const data = { administrado };        

        res.json({
            ok: true,
            data
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const updatedestado = async(req, res = response) => {

    const { estado, favorable } = req.body;
    const   {_id}    = req.params;
    try {

        const existeExpediente = await Expediente.findByIdAndUpdate({ _id },
             {$set: {estado: estado, favorable: favorable}}, { new: true });
        
        if (!existeExpediente) {
            return res.status(400).json({
                ok: false,
                msg: 'El administrado no está registrado'
            });
        }

        const data = { administrado };        

        res.json({
            ok: true,
            data
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const updatedfavorable = async(req, res = response) => {

    const { favorable } = req.body;
    const   {_id}    = req.params;
    try {

        const existeExpediente = await Expediente.findByIdAndUpdate({ _id },
             {$set: {favorable: favorable}}, { new: true });
        
        if (!existeExpediente) {
            return res.status(400).json({
                ok: false,
                msg: 'El administrado no está registrado'
            });
        }

        const data = { administrado };        

        res.json({
            ok: true,
            data
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
    crearExpediente,
    expteUpdate,
    updatedmovimiento,
    updatedobservacion,
    updatedestado,
    updatedfavorable,
    updatedagregado,
    updatedinternos,
    expedienteDelete
    
}