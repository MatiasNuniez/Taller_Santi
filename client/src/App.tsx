import './App.css';
import Login from './components/Login/Login';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Register from './components/Register/Register';
import Index from './components/Index';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">

      <Router>
      <Header/>
        <Routes>
          <Route path="/login" Component={ Login }/>
          
          <Route path="/register" Component={ Register } />

          <Route path='/' Component={Index}/>

          <Route path='/details/:id' Component={ProductDetails}/>

        </Routes>
  
      </Router> 
    </div>
  );
}

export default App;
