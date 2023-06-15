const router = require('express').Router();

const {
    getAllLabs,
    addNewLab,
    getLabById,
    updateLab,
    deleteLab
} = require('./lab_controller');


router.get('/',getAllLabs);
router.post('/',addNewLab);
router.get('/:id',getLabById);
router.put('/:id',updateLab);
router.delete('/:id',deleteLab);

module.exports = router;