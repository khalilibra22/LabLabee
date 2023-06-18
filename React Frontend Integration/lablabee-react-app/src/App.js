import LabsHome from './lab_components/labs_home';
import LabUpdatePage from './lab_components/update_lab_form'
import LabViewPage from './lab_components/lab_details'
import PageHeader from './lab_components/header'
import './App.css';
import { BrowserRouter, Route, Routes , } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <PageHeader/>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<LabsHome/>} />
        <Route path="update/:id" element={<LabUpdatePage/>} />
        <Route path="view/:id" element={<LabViewPage/>} />
      </Routes>
    </BrowserRouter>

     </div>
    
  );
}

export default App;
