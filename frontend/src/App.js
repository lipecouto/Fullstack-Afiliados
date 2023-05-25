import {Route, Routes, BrowserRouter } from 'react-router-dom';
import FileSender from './Pages/FileSender';
import NavBar from './Components/navbar';
import DataViewer from './Pages/DataViewer';
import { DataProvider } from './Components/dataContext'
function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path='/' element={<DataProvider> <FileSender /></DataProvider>} />
        <Route path='/report' element={<DataProvider><DataViewer /></DataProvider>} />        
      </Routes>
    </BrowserRouter>  
  );
}

export default App;