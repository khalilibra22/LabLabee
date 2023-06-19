import * as React from 'react';
import Button from '@mui/material/Button';
import apiService from '../service/api_service'
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

export default function ActionsCell({params,refreshGrid,errorPageLaunch}) {

    const navigate = useNavigate();
    const[isLoading,setIsLoading] = React.useState(false);
  
    const handleDelete = async () => {
      
      const isDeletable = window.confirm('Are you sure you want to delete this lab?')
      if(!isDeletable) return;
      setIsLoading(true);
      const id = params.row._id;
      try
      {
        const response = await apiService.deleteLab(id);
        window.alert('Lab deleted !!');
        refreshGrid();
        setIsLoading(false);
      }catch{
        errorPageLaunch();
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
        {/* <Button disabled={isLoading} style={{ color: 'red' }} onClick={handleDelete}>Delete</Button>  */}
        {
          isLoading ? 
          (<CircularProgress size="20px" color='error' style={{ marginTop: 8 }}  />) :
          <Button style={{ color: 'red' }} onClick={handleDelete}>Delete</Button> 
        }        
      </div>
    );
  }