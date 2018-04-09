import React, { Component } from 'react';
import { Route, Redirect} from "react-router-dom";
import axios from 'axios';

import Main from "./components/Main";
import Category from "./components/Category";
import Product from "./components/Product";
import Detail from "./components/Detail";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";

class App extends Component 
{

  constructor() {
    super();
    this.state = {season: [],category: [], product: [], product_detail: [], color: [], size: [], nama_user: [], id_user: [], status_login: [], redirect_login: false, redirect_register: false, redirect_home: false, redirect_cart: false};
  }

  componentWillMount()
  {
    axios.get("http://localhost:3001/user_home")
    .then ((homeData) =>
    {
      this.setState({season: homeData.data})
    })
  }


  getseasonid = (id) => {

    axios.get("http://localhost:3001/user_category/"+id)
    .then ((homeCategory) =>
    {
      // console.log(homeCategory.data);
      this.setState({category: homeCategory.data.rows2})
      // console.log(this.state);
    })
  }

  getcategoryid = (id) => {

    axios.get("http://localhost:3001/user_product/"+id)
    .then ((homeProduct) =>
    {
      // console.log(homeProduct.data);
      this.setState({product: homeProduct.data.rows2})
      // console.log(this.state);
    })
  }

  getdetailid = (id) => {

      axios.get("http://localhost:3001/user_product_details/"+id)
      .then ((homeDetail) =>
      {
        this.setState({product_detail: homeDetail.data.rows1, color: homeDetail.data.rows2})
        // console.log(this.state);
      })

  }

  getcolorid = (id, name_id) => {

    var a = name_id + "?colorid=" + id;

    axios.get("http://localhost:3001/user_product_details/"+a)
    .then ((homeDetail) =>
      {
        this.setState({product_detail: homeDetail.data.rows1, color: homeDetail.data.rows2, size: homeDetail.data.rows3})
        // console.log(this.state);
      }) 
  }

  postlogin = (data_login) => {
    // console.log(data_login.username.value);
    // console.log(data_login.password.value);
    axios.post('http://localhost:3001/user_login', 
      { 
        username : data_login.username.value,
        password : data_login.password.value
      })
    .then((ambilDataLogin) => {
      // console.log(ambilDataLogin.data);
      if (ambilDataLogin.data.login_status === "true")
      {
        // console.log(ambilDataLogin.data);
        this.setState({nama_user:ambilDataLogin.data.nama, id_user:ambilDataLogin.data.id_user, status_login:ambilDataLogin.data.login_status});
        this.setState({redirect_home: true});
        // console.log(this.state);
      }
      else
      {
        this.setState({redirect_login: true});
      }
    })
  }

  postregis = (data_register) => {
    axios.post('http://localhost:3001/user_register', 
      { 
        username : data_register.username.value,
        password : data_register.password.value,
        name : data_register.name.value
      })
      .then((ambilStatusRegister) => {
        if (ambilStatusRegister.data === "OK")
        {
          this.setState({redirect_login: true});
          this.setState({redirect_register: false});
        }
        else
        {
          this.setState({redirect_login: false});
          this.setState({redirect_register: true});
        }
      })
  }

  // addtocart = (cart_data) => {
  //   axios.post('http://localhost:3001/cart',
  //   { 
  //     id : cart_data.id.value,
  //     qtybeli : cart_data.qtybeli.value
  //   })
  //   .then((ambilStatusCart) => {
  //     if (ambilStatusCart.data === "OK")
  //     {
  //       this.setState({redirect_cart: true});
  //     }
  //     else 
  //     {
  //       this.setState({redirect_login: true});
  //       this.setState({redirect_register: false});
  //     }
  //   })
  // }



    render() {

      const {redirect_login} = this.state;
      const {redirect_register} = this.state;
      const {redirect_home} = this.state;
      const {redirect_cart} = this.state;

      if (redirect_home) {
        this.setState({redirect_home: false});
        return (
        <Redirect to='/user_home'/>
        )
      }

      if (redirect_login) {
        this.setState({redirect_login: false});
        return (
        <Redirect to='/user_login'/>
        )
      }

      if (redirect_register) {
        this.setState({redirect_register: false});
        return (
        <Redirect to='/user_register'/>
        )
      }

      if (redirect_cart) {
        this.setState({redirect_cart: false});
        return (
        <Redirect to='/cart'/>
        )
      }
      
    return(
        <div className = "content">
            <Navbar nama_user={this.state.nama_user} id_user={this.state.id_user}/>
            <Route path = "/user_home" render = {() => <Main season={this.state.season} getSeasonID={this.getseasonid}/>}/>
            <Route path = "/user_category" render = {() => <Category category2={this.state.category} getCategoryID={this.getcategoryid}/>}/>
            <Route path = "/user_product" render = {() => <Product product2={this.state.product} getDetailID={this.getdetailid}/>}/>
            <Route path = "/user_product_details/:id" render = {() => <Detail product2={this.state.product_detail} color2={this.state.color} size2={this.state.size} getColorID={this.getcolorid}/>}/>
            <Route path = "/user_login" render = {() => <Login postLogin={this.postlogin}/>}/>
            <Route path = "/user_register" render = {() => <Register postRegis={this.postregis}/>}/>
            <Route path = "/cart" render ={() => <Cart/>}/>
        </div>
    )
  }
}

export default App;