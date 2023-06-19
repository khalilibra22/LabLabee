import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingPage() {
  return (
    <Box sx={{ display: 'flex' ,height: '80vh',alignItems : 'center',justifyContent:'center'}}>
      <CircularProgress />
    </Box>
  );
}