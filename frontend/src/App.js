import logo from './logo.svg';
import ReactDOM from 'react-dom';
import {Route, Routes, BrowserRouter } from 'react-router-dom';
import FileSender from './Pages/FileSender';
import NavBar from './Components/navbar';
function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path='/' element={<FileSender />} />
        
      </Routes>
    </BrowserRouter>  
  );
}

export default App;