import express, { response } from "express";
import { IProduct } from "../models/IProduct";
import ProductTable from "../models/product";

const productRouter: express.Router = express.Router();

/*
    1. INFO : READ all the Products Info
       URL : http://127.0.0.1:8000/api/products
       METHOD : GET
       FIELDS : no-fields
 */
productRouter.get('/products', async(request:express.Request,response:express.Response)=>{
   try{
        let products= await ProductTable.find();
        response.status(200).json(products);
   }
   catch(error){
        response.status(500).json({error:error.message});
   }
})  

 
// 2. INFO : READ a single Product Info 
//    URL : http://127.0.0.1:8000/api/products/:productId
//    METHOD : GET
//    FIELDS : no-fields
productRouter.get('/products/:productId', async(request:express.Request, response:express.Response)=>{
    let productId:string= request.params.productId
       
    try{
            let product= await ProductTable.findById(productId);
            response.status(200).json(product)
        }
        catch(error){
            response.status(500).json({error:error.message});
        }    
})

// 3. INFO : CREATE a Product
//    URL : http://127.0.0.1:8000/api/products/
//    METHOD : POST
//    FIELDS : name , image , price , qty , info
productRouter.post('/products', async(request:express.Request, response:express.Response)=>{
    let newProduct:IProduct={
        name:request.body.name,
        image:request.body.image,
        price:request.body.price,
        qty:request.body.qty,
        info:request.body.info
    }
    try{
        let product= await ProductTable.findOne({name:newProduct.name})
        if(product){
           return response.status(401).json({msg: 'product is already exits'});
        }
        // insert
      product= new ProductTable(newProduct);
      product= await product.save();
      response.status(200).json(product);
     }
    catch(error){
        response.status(500).json({error:error.message});
    }
    
})

// 4. INFO : UPDATE a Product
//    URL : http://127.0.0.1:8000/api/products/:productId
//    METHOD : PUT
//    FIELDS : name , image , price , qty , info
productRouter.put('/products/:productId',async(request:express.Request,response:express.Response)=>{
    let productId:string= request.params.productId;
    let updateProduct:IProduct={
        _id:productId,
        name:request.body.name,
        image:request.body.image,
        price:request.body.price,
        qty:request.body.qty,
        info:request.body.info
    };
    try{
        let product = await ProductTable.findById(productId);
        if(!product){
            return response.status(401).json({msg: 'product is not availble'});
        }
        product= await ProductTable.findByIdAndUpdate(productId, {
            $set: updateProduct
        }, {new: true})
        response.status(200).json({msg: 'product is Updated'});
    }
    catch(error){
        response.status(500).json({error:error.message});
    }


    // response.status(200).json({msg:'Update a product', id:productId, updateProduct: updateProduct})
})

// 5. INFO : DELETE a Product
//    URL : http://127.0.0.1:8000/api/products/:productId
//    METHOD : DELETE
//    FIELDS : no-fields
productRouter.delete('/products/:productId',async(request:express.Request,response:express.Response)=>{
    let productId= request.params.productId;
    try{
        let product = await ProductTable.findById(productId);
        if(!product){
            return response.status(401).json({msg: 'product is not availble'});
        }
        product= await ProductTable.findByIdAndDelete(productId);
        response.status(200).json({msg: 'product is deleted'});
    }
    catch(error){
        response.status(500).json({error:error.message});
    }
})

export default productRouter;