import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import ActionsCell from './actions_cell'
import AddNewLabPopup from './add_lab_from'
import LoadingPage from './loading';
import NetworkErrorPage from './network_errors';
import apiService from '../service/api_service'

const LabsDataGrid = () => {
    const[labs,setLabs] = useState([]);
    const[isLoading,setIsLoading] = useState(true);
    const[isNetworkError,setIsNetworkError] = useState(false);

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
            start_date : new Date(formateDate(lab.start_date)),
            end_date : new Date(formateDate(lab.end_date))
          }
        });
        setLabs(labs);
        setIsLoading(false);
        setIsNetworkError(false);
      }).catch((err) =>{
        setIsNetworkError(true);
        setIsLoading(false);
      } );
    }

    const displayErrorPage = () => setIsNetworkError(true);


    const columns = [
      { field: '_id', headerName: 'ID', width: 250,headerAlign: 'center',align: 'center' },
      { field: 'name', headerName: 'Name', width: 200 ,headerAlign: 'center',align: 'center' },
      { field: 'technology', headerName: 'Technology',width: 150,headerAlign: 'center' ,align: 'center' },
      { field: 'start_date', headerName: 'Start Date',type: 'date', width: 200,headerAlign: 'center',align: 'center'  },
      { field: 'end_date', headerName: 'End Date',type: 'date' ,width: 200,headerAlign: 'center',align: 'center'  },
      { field: 'actions', headerName: 'Actions',headerAlign: 'center', width: 250, sortable: false, renderCell:(args)=> ActionsCell({params: args , refreshGrid: refreshLabsGrid, errorPageLaunch : displayErrorPage }),align: 'center' },
    ];
    if(isLoading){
      return <LoadingPage/> ;
    }
    if(isNetworkError){
      return <NetworkErrorPage/>
    }
    return (
        <div>
        <div style={{ textAlign: 'left' ,paddingLeft : '12px',paddingBottom : '10px',marginTop : '20px'}}>
        <AddNewLabPopup refreshGrid={refreshLabsGrid} errorPageLaunch={displayErrorPage}/>
        </div>
  
        <div style={{ height:'100%', width: '100%' }}>
        <DataGrid rows={labs} columns={columns} loading={!labs.length} pageSizeOptions={[5, 10, 25]}  getRowId={(row) =>  row._id} pageSize={2} rowSelection />
        </div>
        </div>
    );
  };

  function formateDate(_date) {
    return (
      new Intl.DateTimeFormat("en-US").
      format(new Date(_date)
      )) ;
  }
  
export default LabsDataGrid;