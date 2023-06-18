import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import ActionsCell from './actions_cell'
import AddNewLabPopup from './add_lab_from'
import apiService from '../service/api_service'





const LabsDataGrid = () => {
    const[labs,setLabs] = useState([]);

    useEffect (()=> { 
      refreshLabsGrid();
    },[]);

    const refreshLabsGrid = async () => {
      apiService.getAllLabs().then(json =>{            
        const labs = json.map((lab)=>{
        return {
            _id : lab._id,
            name : lab.name,
            technology : lab.technology,
            start_date : formateDate(lab.start_date),
            end_date : formateDate(lab.end_date)
          }
        });

        setLabs(labs);
      }).catch((err) => window.alert('Network issue, retry again !!'));
    }
    const columns = [
      { field: '_id', headerName: 'ID', width: 250,headerAlign: 'center',align: 'center' },
      { field: 'name', headerName: 'Name', width: 200 ,headerAlign: 'center',align: 'center' },
      { field: 'technology', headerName: 'Technology',width: 150,headerAlign: 'center' ,align: 'center' },
      { field: 'start_date', headerName: 'Start Date', width: 200,headerAlign: 'center',align: 'center'  },
      { field: 'end_date', headerName: 'End Date', width: 200,headerAlign: 'center',align: 'center'  },
      { field: 'actions', headerName: 'Actions',headerAlign: 'center', width: 250, sortable: false, renderCell:(args)=> ActionsCell({params: args , refreshGrid: refreshLabsGrid}),align: 'center' },
    ];
  
    return (
      

        <div>
        <div style={{ textAlign: 'left' ,paddingLeft : '12px',paddingBottom : '10px',marginTop : '20px'}}>
        <AddNewLabPopup refreshGrid={refreshLabsGrid}/>
        </div>
        
        <div style={{ height:'100%', width: '100%' }}>
        <DataGrid rows={labs} columns={columns} loading={!labs.length} pageSizeOptions={[5, 10, 25]}  getRowId={(row) =>  row._id} pageSize={2} rowSelection />
        </div>
        </div>
    );
  };

  function formateDate(_date) {
    return (
      new Intl.DateTimeFormat("fr-FR").
      format(new Date(_date)
      )) ;
  }
  
export default LabsDataGrid;