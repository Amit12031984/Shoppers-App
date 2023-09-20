import React from "react";
import '../App.css';
import * as bootstrap from 'bootstrap';

export default function Card(props) {

  const collectData = (event)=>
  {
    if(localStorage.getItem("cart")==null)
    {
      var cart = {}
    }
    else
    {
      cart = JSON.parse(localStorage.getItem("cart"))
    }
    let myId = event.target.id;
    if(cart[myId]===undefined)
    {
      let name = document.getElementById("myname"+myId).innerText;
      let price = Number(document.getElementById("myprice"+myId).innerText);
      let quantity = 1;
      cart[myId] = [quantity,name,price];
    }
    else
    {
      cart[myId][0] = cart[myId][0] + 1;
      let quantity = cart[myId][0];
      let price = Number(document.getElementById("myprice"+myId).innerText) * quantity;
      cart[myId][2] = price;
    }
    localStorage.setItem("cart",JSON.stringify(cart));

    const displayCart = (myCart)=>
  {
    let myCartData = ""
    for(let i in myCart)
    {
      myCartData = myCartData + "<b>NAME: </b>" + myCart[i][1] + "<b> QTY: </b>" + myCart[i][0] + "<b> PRICE: </b>" + myCart[i][2] + "<br/>";
    }
    myCartData = myCartData + "<a href=productsData.html className=btn btn-success>Continue</a>"
    document.getElementById("mypopover").setAttribute("data-bs-content",myCartData);
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
      var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl)
      })
  }
  displayCart(JSON.parse(localStorage.getItem("cart")));
  }

  return (
    <div className="container-fluid">
      <div className="productscontainer">
      {props.productsData.map((i) => {
        return (
          <div key={i.sn} className="card cardproduct">
            <h2>{i.sn}</h2>
            <img src={i.imageUrl} className="card-img-top carimg" alt="..." />
            <div className="card-body">
              <h5 className="card-title" id={"myname"+i.sn}>{i.name}</h5>
              <del><h5 className="card-title">{i.price}</h5></del>
              <h5 className="card-title" id={"myprice"+i.sn}>{i.discountedPrice}</h5>
              <p className="card-text">{i.description}</p>
              <a href="#" className="btn btn-success" onClick={collectData} id={i.sn}>
                Add to cart
              </a>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
}
