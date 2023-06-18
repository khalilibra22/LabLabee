import LabsHome from './lab_components/labs_home';
import LabUpdatePage from './lab_components/update_lab_form'
import LabViewPage from './lab_components/lab_details'
import NetworkErrorPage from './lab_components/network_error_page'
import './App.css';
import { BrowserRouter, Route, Routes , } from 'react-router-dom';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<LabsHome/>} />
        <Route path="update/:id" element={<LabUpdatePage/>} />
        <Route path="view/:id" element={<LabViewPage/>} />
        <Route path="network_error" element={<NetworkErrorPage/>} />
      </Routes>
    </BrowserRouter>

     </div>
    
  );
}

export default App;
