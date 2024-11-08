import './App.css';
import Login from './components/Login/Login';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Register from './components/Register/Register';
import Index from './components/Index';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import AddProduct from './components/Product/AddProduct';
import Cart from './components/Cart/Cart'
import SalesHistory from './components/Ventas/SalesHistory';
import ListaProveedores from './components/Provider/ProviderList';
import ListaCategorias from './components/Category/ListCategory';

function App() {
  return (
    <div className="App">

      <Router>
      <Header/>
        <Routes>
          <Route path="/login" Component={ Login }/>
          
          <Route path="/register" Component={ Register } />

          <Route path='/' Component={Index}/>

          <Route path='/dashboard' Component={Dashboard}/>

          <Route path='/dashboard/add-product' Component={AddProduct}/>

          <Route path='/dashboard/providers' Component={ListaProveedores}/>

          <Route path='/dashboard/categories' Component={ListaCategorias}/>

          <Route path='/cart' Component={Cart}/>

          <Route path='/SalesHistory' Component={SalesHistory}/>

        </Routes>
  
      </Router> 
    </div>
  );
}

export default App;
