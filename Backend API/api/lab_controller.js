const Lab = require('../data/lab');
const labInfoValidator = require('../validation/lab_validation_schema');

module.exports = {
//This function return all labs    
getAllLabs : async (_req,res) => {
    await Lab.find()
    .then((labs) => res.status(200).send(labs) 
    )
    .catch((err) => {
        res.status(400).send(err);
    }); 
},
//This function return a lab using id 
getLabById : async (req,res) => {

  await Lab.findById(req.params.id).
  then((lab) => res.status(200).send(lab)).
  catch((err) => res.status(400).send(err));
},
//This function create a new lab  
addNewLab : async (req,res) => {
      try
      {
        const value  = await labInfoValidator.validateAsync(req.body);//validate data of json body with our lab schema using (Joi) 
      }
      catch(err)
      {
        res.status(400).send(err);
        return;
      }
      req.body.start_date =  formateDate(req.body.start_date);//formate date to (en-US) format. 
      req.body.end_date =  formateDate(req.body.end_date);//formate date to (en-US) format. 

      const newLab = new Lab(req.body); 
      await newLab.save()
      .then((addedLab) => {
        res.status(201).send(addedLab);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
},
//This function update a lab using id  
updateLab : async (req,res) => {
  try
      {
        const value  = await labInfoValidator.validateAsync(req.body);//validate data of json body with our lab schema using (Joi) 
      }
      catch(err)
      {
        res.status(400).send(err);
        return;
      }
      req.body.start_date =  formateDate(req.body.start_date);//formate date to (en-US) format. 
      req.body.end_date =  formateDate(req.body.end_date);//formate date to (en-US) format. 

  await Lab.findByIdAndUpdate(req.params.id, req.body, { new: true }).
  then((updated) => res.status(202).send(updated)).
  catch((err)=> res.status(400).send(err));

},
//This function delete a lab using id  
deleteLab : async (req,res) => {
    await Lab.findByIdAndDelete(req.params.id).
    then((deletedLab) => res.status(202).send(deletedLab)).
    catch((err) => res.status(400).send(err));
}
}

//This function formate a date to (en-US) format
function formateDate(_date) {
  return (
    new Intl.DateTimeFormat("en-US").
    format(new Date(_date)
    )) ;
}