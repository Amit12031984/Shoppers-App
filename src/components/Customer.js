import React from 'react'
import { useEffect } from 'react';
import { myDatabase } from '../firebase';

export default function Customer() {
    useEffect(()=>
    {
       let name = localStorage.getItem("name");
       let city = localStorage.getItem("city");
       let country = localStorage.getItem("country");
       let pincode = localStorage.getItem("pincode");
       let total = localStorage.getItem("total");
       console.log(name,city,country,pincode,total);

       myDatabase.collection("customers").add({
        name:name,
        city:city,
        country:country,
        pincode:pincode,
        total:total
       })
       localStorage.removeItem("name");
       localStorage.removeItem("city");
       localStorage.removeItem("country");
       localStorage.removeItem("pincode");
       localStorage.removeItem("total");
       localStorage.removeItem("cart");
    },[])
  return (
    <div>
        <h3>Data saved successfully</h3>
        <a class="btn btn-success" href="https://buy.stripe.com/test_6oE5mcfJl52mcDuaEE">Make Payment</a>
    </div>
  )
}
