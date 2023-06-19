import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import CircularProgress from '@mui/material/CircularProgress';
import apiService from '../service/api_service'

export default function AddNewLabPopup({refreshGrid,errorPageLaunch}) {
  const [open, setOpen] = React.useState(false);
  const[isLoading,setIsLoading] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setTechnology("");
  };
  const handleAddNewLabClick = async () => {
    setIsLoading(true);
    if(!_name || !_technology) {
        window.alert("Fields empty !!");
        setIsLoading(false);
        return;
    }
    const jsonData = {
        name : _name,
        technology : _technology,
        start_date : startDate,
        end_date : endDate
    }
    await apiService.addNewLab(jsonData)
    .then(async ()=>{
         setOpen(false);
        setName("");
        setTechnology("");
        await refreshGrid();
        setIsLoading(false);
        window.alert("Lab Added !!");
       
    }).catch(err => errorPageLaunch());
      
  }

  const [_name, setName] = React.useState("");
  const [_technology, setTechnology] = React.useState("");
  const [startDate, setStartDate] = React.useState(dayjs(new Date()));
  const [endDate, setEndDate] = React.useState(dayjs((new Date()).setDate(new Date().getDate()+7)));


  return (
    <div>
      <Button variant="contained" disableElevation onClick={handleClickOpen}>
        ADD NEW LAB
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new lab</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add to new lab, please enter the name, technology, start date and the end date.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            value={_name}
            type="text"
            onChange={(event) => setName(event.target.value)}
            fullWidth
            variant="standard"
            
          />
          <TextField
            autoFocus
            margin="dense"
            id="technology"
            label="Technology"
            value={_technology}
            type="text"
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
          format='YYYY-MM-DD'
          onChange={(newValue) => setStartDate(newValue)
        }
        />
        <DateField
          label="End Date"
          value={endDate}
          format='YYYY-MM-DD'
          onChange={(newValue) => setEndDate(newValue)
        }
        />
      </DemoContainer>
    </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={isLoading} variant="contained" disableElevation onClick={handleAddNewLabClick}>Create</Button>
          
          

        </DialogActions>
      </Dialog>
    </div>
    
  );
}


