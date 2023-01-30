import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IProduct } from "./models/IProduct";

interface IProps {
}

interface IState {
    products: IProduct[]
}

let ProductAdmin:React.FC<IProps> = () => {
    let [productState, setProductState]= useState({
        products: [] as IProduct[]
    })
    useEffect(()=>{
        allProducts();
    },[])

    let allProducts= ()=>{
        let dataURL:string='http://127.0.0.1:8000/api/products';
        axios.get(dataURL).then(
            (response)=>{
                setProductState({
                    products:response.data
                })
            }
        ).catch(
            (error)=>{
                console.log(error.message)
            }
        )
    }

    let deleteProduct = (productID:string)=>{
        let dataURL=`http://127.0.0.1:8000/api/products/${productID}`;
        axios.delete(dataURL).then(
            (response)=>{
                allProducts();
            }
        ).catch((error)=>{
            console.log(error.mesaage)
        })
    }

    let {products}= productState
  return (
    <React.Fragment>
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-success">Product Admin</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
                impedit, incidunt ipsum nulla sapiente sint suscipit? A animi,
                error et fuga ipsum minus, nam officia praesentium quisquam,
                recusandae soluta voluptate?
              </p>
              <Link to="/products/create" className="btn btn-success btn-sm">Create Product</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-5">
        <div className="container">
            {
                products.length >= 1 &&
                <div className="row">
                <div className="col">
                  <table className="table table-hover text-center table-striped">
                    <thead className="bg-dark text-success">
                      <tr>
                        <th>SNO</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Qty</th>
                        <th>Info</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(product=>{
                                return(
                                    <tr key={product._id}>
                                    <td>{product._id?.substr(product._id.length - 5)}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td><img src={product.image} width="50" height="50"/></td>
                                    <td>{product.qty}</td>
                                    <td>{product.info}</td>
                                    <td>
                                        <Link to={`/products/${product._id}`} className="btn btn-warning">Edit</Link>
                                     &nbsp;
                                        <button className="btn btn-danger" onClick={deleteProduct.bind(this, product._id as string)}>Delete</button>
                                    </td>
                                </tr>
                                )
                            })
                        }
                    
                    </tbody>
                  </table>
                </div>
              </div>
            }
       
            {
                products.length == 0 &&
                <div className="row">
                <p className="font-weight-bold text-success text-center">
                  NO Records Found in Database
                </p>
              </div>  
            }
          
        </div>
      </section>
    </React.Fragment>
  );
};

export default ProductAdmin;
