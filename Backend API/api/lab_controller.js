const Lab = require('../data/lab');
const labInfoValidator = require('../validation/lab_validation_schema');

module.exports = {
    
getAllLabs : async (_req,res) => {
    await Lab.find()
    .then((labs) => res.send(labs) 
    )
    .catch((err) => {
        res.send(err);
    }); 
},

getLabById : async (req,res) => {

  await Lab.findById(req.params.id).
  then((lab) => res.send(lab)).
  catch((err) => res.status(404).send(err));
},

addNewLab : async (req,res) => {
      try
      {
        const value  = await labInfoValidator.validateAsync(req.body);
      }
      catch(err)
      {
        res.send(err);
        return;
      }
      req.body.start_date =  formateDate(req.body.start_date);
      req.body.end_date =  formateDate(req.body.end_date);

      const newLab = new Lab(req.body); 
      await newLab.save()
      .then((addedLab) => {
        res.send(addedLab);
      })
      .catch((err) => {
        res.send(err);
      });
},

updateLab : async (req,res) => {
  try
      {
        const value  = await labInfoValidator.validateAsync(req.body);
      }
      catch(err)
      {
        res.status(404).send(err);
        return;
      }
      req.body.start_date =  formateDate(req.body.start_date);
      req.body.end_date =  formateDate(req.body.end_date);

  await Lab.findByIdAndUpdate(req.params.id, req.body, { new: true }).
  then((updated) => res.send(updated)).
  catch((err)=> res.status(404).send(err));

},

deleteLab : async (req,res) => {
    await Lab.findByIdAndDelete(req.params.id).
    then((deletedLab) => res.send(deletedLab)).
    catch((err) => res.status(404).send(err));
}
}


function formateDate(_date) {
  return (
    new Intl.DateTimeFormat("en-US").
    format(new Date(_date)
    )) ;
}