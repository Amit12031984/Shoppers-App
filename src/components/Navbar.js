import React, {useEffect, useState} from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import AddProducts from "./AddProducts";
import Login from "./Login";
import Card from "./Card";
import Customer from "./Customer";
import { myDatabase } from "../firebase";
import * as bootstrap from 'bootstrap';

export default function Navbar(props) {

  const [productsData, setProductsData] = useState([]);
  const [searchtext,setSearchText] = useState("");

  const [ProductId,setProductId] = useState(0);
  
  const calcProductId = (productData)=>
  {
    const maxValue = productData.reduce((max,item)=>{
      return Math.max(max,Number(item.sn))
    },0)
  }

  useEffect(() => {
    myDatabase.collection("products").onSnapshot(async (snapshot) => {
      await setProductsData(
          snapshot.docs.map((item) => {
              return item.data();
          })
        );
    });
    console.log("effect 1")
  },[]);

  useEffect(()=>
  {
    setProductId(calcProductId(productsData) + 1);
    console.log("effect 2")
  },[productsData])

  const pleaseLogout = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("total");
    props.data(false);
    window.location.pathname = "/login";
  };

  const search = (event)=>
  {
    setSearchText(event.target.value);
  }

  const searchProducts =async (event)=>
  {
    event.preventDefault();
      myDatabase.collection("products").onSnapshot((snapshot) => {
        if(searchtext==="")
        {
          setProductsData(
            snapshot.docs.map((item) => {
                return item.data();
            })
          );
      }
      else
      {
        let filteredData = productsData.filter((item)=>
        {
          if(item.name.toLowerCase().includes(searchtext.toLowerCase()))
          {
            return item;
          }
        })
        setProductsData(filteredData);
      }
    });
  }

  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand text-white" href="#">
              Shoppers App
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {props.initial ? (
                  <>
                    <li className="nav-item active">
                      <Link to="/home" className="nav-link text-white">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/add" className="nav-link text-white">
                        Add Product
                      </Link>
                    </li>
                    <li className="nav-item">
                    <button type="button" className="nav-link text-white btn btn-secondary me-2" tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-html="true" data-bs-content="" data-bs-trigger="focus" id="mypopover">
                    Cart
                    </button>
                    </li>
                    <li className="nav-item">
                      <button type="button"
                        className="nav-link text-white btn btn-secondary"
                        onClick={pleaseLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <Link to="/login" className="nav-link text-white">
                      Login
                    </Link>
                  </li>
                )}
              </ul>
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={search}
                />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={searchProducts}>
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>
      <Routes>
        <Route path="/home" element={props.initial ? <Card productsData = {productsData}/> : ""}></Route>
        <Route
          path="/add"
          element={props.initial ? <AddProducts id={ProductId}/> : ""}
        ></Route>
        <Route
          path="/login"
          element={<Login info={props.data} initial={props.initial} />}
        ></Route>
         <Route
          path="/customer"
          element={<Customer/>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
