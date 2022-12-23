const Expediente = require('../models/expediente');

const administradoExpedientes = async(req, res) => {

    const {_id} = req.params;    

    const expedientes = await Expediente.find({_id})
    .populate('idAdministrado', { _id: 0, __v: 0 })   
    .populate('idInstrumento', {_id: 0, __v: 0});
    
    res.json({ expedientes })

}

const todoExpedientes = async(req, res) => {    

const expediente = await Expediente.aggregate([

   {
     $lookup:
     {
        from:'instrumentos',
        localField: 'idInstrumento',
        foreignField: '_id',
        as: 'instrumento'
      }
    },
    {
    $replaceRoot: {newRoot: {$mergeObjects:[{$arrayElemAt: ['$instrumento', 0]},
    "$$ROOT"]}}
     }, 
  {
     $lookup:
      {
        from:'administrados',
        localField: 'idAdministrado',
        foreignField: '_id',
        as: 'user'
       }
   },
    {
    $replaceRoot: {newRoot: {$mergeObjects:[{$arrayElemAt: ['$user', 0]},
    "$$ROOT"]}}
    },
  {
     $project: {
                dni: 1,
                apellidos: 1,
                nombres: 1,
                jerarquia: 1,
                plaza: 1,
                expedientes: 1,
                internos: 1,
                agregados: 1,
                tipoTramite: 1,
                titulo: 1,
                transferencia: 1,
                fecha: 1,
                lugar: 1,
                motivo: 1,
                observacion: 1,
                numeroInstrumento: 1,
                resolucion: 1,
                estado: 1,
                favorable: 1
                
            }}
        
  ])
    console.log(expediente)
    
    res.json({expediente})

}
module.exports = {
    administradoExpedientes,
    todoExpedientes   
    
}