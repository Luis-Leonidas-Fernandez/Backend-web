const { Router } = require('express');
const { check } = require('express-validator');

const {crearExpediente, updatedmovimiento, updatedobservacion,
       updatedestado, 
       updatedfavorable,
       updatedagregado,
       updatedinternos,
       expedienteDelete,
       expteUpdate} = require('../controllers/expediente');

const {administradoExpedientes, todoExpedientes} = require('../controllers/administradoExpedientes');

//const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.post('/crearExpediente', [    
    check('expedientes', 'El expedientes es obligatorio').not().isEmpty(),    
    check('internos', 'El internos es obligatorio').not().isEmpty(),
    check('tipoTramite', 'El tipoTramite es obligatorio').not().isEmpty(),    
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    check('lugar', 'El lugar es obligatorio').not().isEmpty(),
    check('motivo', 'El motivo es obligatorio').not().isEmpty(),    
    //validarCampos,validarJWT,
], crearExpediente);  

router.delete('/delete/:_id', [validarJWT], expedienteDelete);

router.get('/todo', [ validarJWT] , todoExpedientes );
router.get('/:_id', [validarJWT], administradoExpedientes);

router.put('/update/:_id', [validarJWT], expteUpdate);

router.put('/updatedmovimiento/:_id', validarJWT, updatedmovimiento);
router.patch('/updatedobservacion/:_id', validarJWT, updatedobservacion);
router.patch('/updatedestado/:_id', validarJWT, updatedestado);
router.patch('/updatedfavorable/:_id', validarJWT, updatedfavorable);
router.patch('/updatedagregados/:_id', validarJWT, updatedagregado);
router.patch('/updatedinternos/:_id', validarJWT, updatedinternos);


module.exports = router;