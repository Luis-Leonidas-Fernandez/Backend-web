const { Router } = require('express');
const { check } = require('express-validator');

const {crearInstrumento, instrumentosGet, instrumentoPut, instrumentoDelete }= require('../controllers/instrumentos');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.post('/nuevo', [    
    check('idExpediente', 'El idExpediente es obligatorio').not().isEmpty(),    
    check('numeroInstrumento', 'El numeroInstrumento es obligatorio').not().isEmpty(),
    check('resolucion', 'La resolucion es obligatorio').not().isEmpty(),     
    validarCampos,validarJWT,
], crearInstrumento );  
 

router.get('/todos', [validarJWT], instrumentosGet);
router.put('/update/:_id', [validarJWT], instrumentoPut);
router.delete('/delete/:_id', [ validarJWT] , instrumentoDelete  );
module.exports = router;