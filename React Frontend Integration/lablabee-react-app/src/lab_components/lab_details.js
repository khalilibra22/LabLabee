import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { useNavigate,useParams } from 'react-router-dom';
import LoadingPage from './loading';
import NetworkErrorPage from './network_errors';
import apiService from '../service/api_service'

export default function LabDetailsPage() {

  const [_name, setName] = React.useState("");
  const [_technology, setTechnology] = React.useState("");
  const [startDate, setStartDate] = React.useState(dayjs(new Date()));
  const [endDate, setEndDate] = React.useState(dayjs((new Date()).setDate(new Date().getDate()+7)));
  const [_id, setId] = React.useState("");
  
  const[isLoading,setIsLoading] = React.useState(true);
  const[isNetworkError,setIsNetworkError] = React.useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  
  React.useEffect (()=> { 
    apiService.getLabById(id).then(json =>{  
      console.log(json._id)          
      setId(json._id);
      setName(json.name);
      setTechnology(json.technology);
      setStartDate(dayjs(new Date(formateDate(json.start_date))));
      setEndDate(dayjs(new Date(formateDate(json.end_date))));

      setIsLoading(false);
      setIsNetworkError(false);

    }).catch((err)=> {
      setIsNetworkError(true);
      setIsLoading(false);
    });
},[]);


  const HandleBackToHome = () =>{
    navigate('/');
  }
  if(isLoading){
    return <LoadingPage/> ;
  }
  if(isNetworkError){
    return <NetworkErrorPage/>
  }
  return (
    <div style={{width : '100vw',height:'80vh',display: 'flex',justifyContent:'center'}}>
      <div style={{height :'100%',width:'40%',paddingTop: 40}}>
      <h2>Lab Details</h2>
        <TextField
            margin="dense"
            id="id"
            label="Id"
            value={_id}
            type="text"
            inputProps={{ readOnly: true, }}
            onChange={(event) => setId(event.target.value)}
            fullWidth
            variant="standard"
            
          />
          <TextField
            margin="dense"
            id="name"
            label="Name"
            value={_name}
            type="text"
            inputProps={{ readOnly: true, }}
            onChange={(event) => setName(event.target.value)}
            fullWidth
            variant="standard"
            
          />
          <TextField
            margin="dense"
            id="technology"
            label="Technology"
            value={_technology}
            type="text"
            inputProps={{ readOnly: true, }}
            onChange={(event) => setTechnology(event.target.value)}
            fullWidth
            variant="standard"
          />
          <div style={{marginBottom: '20px'}}></div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateField', 'DateField']}>
        <DateField
          label="Start Date"
          value={startDate}
          disabled={true}
          format='YYYY-MM-DD'
          onChange={(newValue) => setStartDate(newValue)
        }
        />
        <DateField
          disabled={true}
          label="End Date"
          value={endDate}
          format='YYYY-MM-DD'
          onChange={(newValue) => setEndDate(newValue)
        }
        />
      </DemoContainer>
    </LocalizationProvider>
    <div style={{marginBottom: '30px'}}></div>
    <Button variant="contained" disableElevation onClick={HandleBackToHome}>Back to Home</Button>
    </div>   
    </div>
    
  );
}
function formateDate(_date) {
    return (
      new Intl.DateTimeFormat("en-US").
      format(new Date(_date)
      )) ;
  }
