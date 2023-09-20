import React, { useState } from "react";
import { myDatabase } from "../firebase.js";
import { useNavigate } from 'react-router-dom';

export default function AddProducts() {

  const navigate = useNavigate();

  const [productData,setProductData] = useState({
    productSno:"",
    productName:"",
    productImageUrl:"",
    productDescription:"",
    productOriginalPrice:"",
    productDiscountedPrice:""
  });

  const collectIt = (event)=>
  {
    setProductData({...productData,[event.target.name]:event.target.value})
  }
  
  const saveData = ()=>
  {
    myDatabase.collection("products").add({
      sn: productData.productSno,
      name: productData.productName,
      description: productData.productDescription,
      imageUrl: productData.productImageUrl,
      price: productData.productOriginalPrice,
      discountedPrice: productData.productDiscountedPrice
    })
    .then((data)=>{
      console.log(data)
      navigate("/home");
    })
    .catch((error)=>
    {
      console.log(error)
    })

  }

  return (
    <div className="row" style={{ margin: "10px" }}>
      <div className="col-3">
        <label>Product SNo</label>
        <input type="number" name="productSno" className="form-control" onChange={collectIt}/>
        <br />

        <label>Product Name</label>
        <input type="text" name="productName" className="form-control" onChange={collectIt}/>
        <br />

        <label>Product Image URL</label>
        <input type="text" name="productImageUrl" className="form-control" onChange={collectIt}/>
        <br />

        <label>Product Description</label>
        <textarea
          rows="4"
          cols="40"
          type="text"
          name="productDescription"
          className="form-control"
          onChange={collectIt}
        />
        <br />

        <label>Product Original Price</label>
        <input
          type="number"
          name="productOriginalPrice"
          className="form-control"
          onChange={collectIt}
        />
        <br />

        <label>Product Discounted Price</label>
        <input
          type="number"
          name="productDiscountedPrice"
          className="form-control"
          onChange={collectIt}
        />
        <br />

        <button className="btn btn-outline-success" onClick={saveData}>Add Product</button>
      </div>
    </div>
  );
}
