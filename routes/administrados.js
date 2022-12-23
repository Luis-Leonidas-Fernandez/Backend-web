const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const {crearAdministrado, administradosGet, administradoDelete, administradoPut}= require('../controllers/administrados');

const router = Router();

router.post('/nuevo', [
    check('apellidos', 'El apellidos es obligatorio').not().isEmpty(),
    check('nombres', 'El nombre es obligatoria').not().isEmpty(),
    check('jerarquia', 'La jerarquia es obligatoria').not().isEmpty(),    
    check('dni', 'El dni es obligatoria').not().isEmpty(),    
    validarCampos,
], crearAdministrado);

router.get('/todos', administradosGet);
router.delete('/:_id', administradoDelete);
router.put('/:_id', administradoPut);
    

module.exports = router;