import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { IProduct } from "./models/IProduct";

interface IProps {}

interface IState {
  getProducts: IProduct;
  isSubmited: boolean;
}


let UpdateProduct:React.FC<IProps> = () => {
  let { productID } = useParams();

  let [productState, setProductState] = useState({
    getProducts: {} as IProduct,
    isSubmited: false,
  });


  let updateProduct = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setProductState({
      ...productState,
      getProducts: {
        ...productState.getProducts,
        [event.target.name]: event.target.value,
      },
    });
  };
  let convertBase64String = (
    imageFile: Blob
  ): Promise<string | ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(imageFile);
      fileReader.addEventListener("load", () => {
        if (fileReader.result) {
          resolve(fileReader.result);
        } else {
          reject("Error Occurred");
        }
      });
    });
  };

  let updateImg = async (event: React.ChangeEvent<HTMLInputElement | any>) => {
    let imageFile: Blob = event.target.files[0];
    let base64Img: string | ArrayBuffer = await convertBase64String(imageFile);
    setProductState({
      ...productState,
      getProducts: {
        ...productState.getProducts,
        image: base64Img.toString(),
      },
    });
  };
  let updateForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let dataURL: string = `http://127.0.0.1:8000/api/products/${productID}`;
    axios
      .put(dataURL, productState.getProducts)
      .then((response) => {
        setProductState({
          ...productState,
          isSubmited: true,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    let dataUrl: string = `http://127.0.0.1:8000/api/products/${productID}`;
    axios
      .get(dataUrl)
      .then((response) => {
        setProductState({
          ...productState,
          getProducts: response.data,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [productID]);

  let { getProducts } = productState;
  return (
    <React.Fragment>
      {productState.isSubmited ? (
        <Navigate to="/products" />
      ) : (
        <React.Fragment>
          <section className="mt-3">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="h3 text-secondary">Update Product</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
                    impedit, incidunt ipsum nulla sapiente sint suscipit? A
                    animi, error et fuga ipsum minus, nam officia praesentium
                    quisquam, recusandae soluta voluptate?
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
                      <form onSubmit={updateForm}>
                        <div className="form-group">
                          <input
                            required
                            name="name"
                            onChange={updateProduct}
                            value={getProducts.name}
                            type="text"
                            className="form-control"
                            placeholder="Name"
                          />
                        </div>
                        <div className="form-group mt-2">
                          <input
                            name="image"
                            onChange={updateImg}
                            className="form-control"
                            type="file"
                            id="formFile"
                          />
                          <img
                            src={getProducts.image}
                            alt=""
                            width="25"
                            height="25"
                          />
                        </div>
                        <div className="form-group mt-2">
                          <input
                            required
                            name="price"
                            onChange={updateProduct}
                            value={getProducts.price}
                            type="number"
                            className="form-control"
                            placeholder="Price"
                          />
                        </div>
                        <div className="form-group mt-2">
                          <input
                            required
                            name="qty"
                            onChange={updateProduct}
                            value={getProducts.qty}
                            type="number"
                            className="form-control"
                            placeholder="Qty"
                          />
                        </div>
                        <div className="form-group mt-2">
                          <textarea
                            required
                            name="info"
                            onChange={updateProduct}
                            value={getProducts.info}
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
      )}
    </React.Fragment>
  );
};

export default UpdateProduct;
