import Button from '@mui/material/Button';
import apiService from '../service/api_service'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function ActionsCell({params,refreshGrid}) {

    const navigate = useNavigate();  
  
    const handleDelete = async () => {
      
      const isDeletable = window.confirm('Are you sure you want to delete this lab?')
      if(!isDeletable) return;
      const id = params.row._id;
      try
      {
        const response = await apiService.deleteLab(id);
        window.alert('Lab deleted !!');
        refreshGrid();

      }catch{
        window.alert('Network issue, retry again !!');
        return;
      }        
    };

    const handleView =  () => {
      const id = params.row._id;
      navigate(`/view/${id}`);
    };
    const handleUpdate =  () => {
      const id = params.row._id;
      navigate(`/update/${id}`);      
    };
 
   
    return (
      <div style={{ display: 'flex' }}>
        <Button  onClick={handleView}>View</Button>
        <Button style={{ color: 'yellowgreen' }} onClick={handleUpdate}>Update</Button>
        <Button style={{ color: 'red' }} onClick={handleDelete}>Delete</Button>
        
      </div>
    );
  }