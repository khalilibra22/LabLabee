const router = require('express').Router();

const {
    getAllLabs,
    addNewLab,
    getLabById,
    updateLab,
    deleteLab
} = require('./lab_controller');


router.get('/',getAllLabs); //Get all labs route
router.post('/',addNewLab); //Create new lab route
router.get('/:id',getLabById); //Get lab by id route
router.put('/:id',updateLab); //Update lab by id route
router.delete('/:id',deleteLab); //Delete lab by id route

module.exports = router;