import appConfig from '../config/app_config.json';

const apiUrl = appConfig.api_url;

async function getAllLabs(){
    const response = await fetch(`${apiUrl}/labs`);
    return await response.json(); 
}

async function getLabById(id){
    const response = await fetch(`${apiUrl}/labs/${id}`);
    return await response.json(); 
}


async function  deleteLab(id){
    return await fetch(`${apiUrl}/labs/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        console.log('Data deleted successfully');
        // Handle success case
      } else {
        throw new Error('Delete request failed');
        // Handle error case
      }
    })
    .catch(error => {
      console.error(error);
      // Handle fetch error
    });    
}

async function addNewLab(newLabData){

    return await fetch(`${apiUrl}/labs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newLabData)
    });
}

async function updateLabById(id,LabData){

  return await fetch(`${apiUrl}/labs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(LabData)
  });
}

export default {
    getAllLabs,
    getLabById,
    deleteLab,
    addNewLab,
    updateLabById
}