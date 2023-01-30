import axios from "axios";
import React, { useEffect, useState } from "react";
import { IProduct } from "./models/IProduct";

interface IProps {}

interface IState {
  selectedProduct: IProduct[];
}

let ProductList: React.FC<IProps> = () => {
  let [productState, setProductState] = useState({
    selectedProducts: [] as IProduct[],
  });

  useEffect(()=>{
    let dataURL=`http://127.0.0.1:8000/api/products`;
    axios.get(dataURL).then(
        (response)=>{
            setProductState({
                selectedProducts:response.data
            })
        }
    ).catch((error)=>{
            console.log(error.message)
    })
  })

  let{selectedProducts}=productState;
  return (
    <React.Fragment>
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-success">Product List</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
                impedit, incidunt ipsum nulla sapiente sint suscipit? A animi,
                error et fuga ipsum minus, nam officia praesentium quisquam,
                recusandae soluta voluptate?
              </p>
            </div>
          </div>
        </div>
      </section>

        <section>
        <div className="container">
        {
        selectedProducts.length >=1 &&
          <div className="row">
            {
                selectedProducts.slice(0).reverse().map(selectedProduct=>{
                    return(
                        <div className="col-md-3" key={selectedProduct._id}>
                        <div className="card">
                          <div className="card-header text-center bg-white">
                            <img src={selectedProduct.image} alt="" width="150" height="150" />
                          </div>
                          <div className="card-body rgba-light-green-light">
                            <ul className="list-group">
                              <li className="list-group-item">NAME : {selectedProduct.name}</li>
                              <li className="list-group-item">PRICE : &#8377; {selectedProduct.price}</li>
                              <li className="list-group-item">QTY : {selectedProduct.qty}Kgs</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )
                })
            }
         
          </div>
      }
     {
        selectedProducts.length ==0 &&
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

export default ProductList;
