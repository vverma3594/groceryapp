import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './component/layout/Navbar';
import Home from './component/layout/Home';
import ProductAdmin from './component/products/ProductAdmin';
import ProductList from './component/products/ProductList';
import CreateProduct from './component/products/CreateProduct';
import UpdateProduct from './component/products/UpdateProduct';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
      <NavBar/>
        <Routes>
            <Route path="" element={<Home />}/>
            <Route path="/products" element={<ProductList/>}/>
            <Route path="/products/admin" element={<ProductAdmin />}/>
            <Route path="/products/create" element={<CreateProduct />}/>
            <Route path="/products/:productID" element={<UpdateProduct />}/>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
