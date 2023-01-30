import React, { useState } from "react";
import { IProduct } from "./models/IProduct";
import axios from "axios";
import { Navigate } from "react-router-dom";

interface IProps {}

interface IState {
  createProduct: IProduct;
  isSubmited:boolean;
}

let CreateProduct = () => {
  let [productState, setProductState] = useState({
    CreateProduct: {} as IProduct,
    isSubmited:false
  });
  let updateInput = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setProductState({
      ...productState,
      CreateProduct: {
        ...productState.CreateProduct,
        [event.target.name]: event.target.value,
      },
    });
  };

  let convertBase64String = (imageFile:Blob):Promise<string | ArrayBuffer> => {
    return new Promise((resolve, reject) => {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(imageFile);
        fileReader.addEventListener('load', () => {
            if(fileReader.result){
                resolve(fileReader.result);
            }
            else {
                reject('Error Occurred');
            }
        })
    });
};

let updateImg =  async(event:React.ChangeEvent<HTMLInputElement | any>) =>{
    let imageFile:Blob= event.target.files[0];
    let base64Img:string | ArrayBuffer  = await convertBase64String (imageFile);
    setProductState({
        ...productState,
        CreateProduct:{
            ...productState.CreateProduct,
            image: base64Img.toString()
        }
    })

}
let createProduct= (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    let dataURL:string=`http://127.0.0.1:8000/api/products/`;
    axios.post(dataURL, productState.CreateProduct).then((response)=>{
       setProductState({
        ...productState,
        isSubmited:true
       })
    }).catch(
        (error)=>{
            console.log(error.message)
        }
    )
}


  let { CreateProduct } = productState;
  return (
    <React.Fragment>
        {
            productState.isSubmited ? <Navigate to="/products" />:
            <React.Fragment>
                    <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-secondary">Update Product</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
                impedit, incidunt ipsum nulla sapiente sint suscipit? A animi,
                error et fuga ipsum minus, nam officia praesentium quisquam,
                recusandae soluta voluptate?
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-header bg-secondary text-white">
                  <p className="h4">Update Product</p>
                </div>
                <div className="card-body rgba-green-light">
                  <form onSubmit={createProduct}>
                    <div className="form-group">
                      <input
                        required
                        name="name"
                        onChange={updateInput}
                        value={CreateProduct.name}
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <div className="form-group mt-2">
                      <input
                        name="image"
                        className="form-control"
                        onChange={updateImg}
                        type="file"
                        id="formFile"
                      />
                    </div>
                    <div className="form-group mt-2">
                      <input
                        required
                        name="price"
                        onChange={updateInput}
                        value={CreateProduct.price}
                        type="number"
                        className="form-control"
                        placeholder="Price"
                      />
                    </div>
                    <div className="form-group mt-2">
                      <input
                        required
                        name="qty"
                        onChange={updateInput}
                        value={CreateProduct.qty}
                        type="number"
                        className="form-control"
                        placeholder="Qty"
                      />
                    </div>
                    <div className="form-group mt-2">
                      <textarea
                        required
                        name="info"
                        onChange={updateInput}
                        value={CreateProduct.info}
                        rows={3}
                        className="form-control"
                        placeholder="Information"
                      />
                    </div>
                    <div className="form-group mt-2">
                      <input
                        type="submit"
                        className="btn btn-secondary btn-sm"
                        value="Update"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
            </React.Fragment>
        }
  
    </React.Fragment>
  );
};

export default CreateProduct;
