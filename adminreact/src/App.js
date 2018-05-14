import React, { Component } from 'react';
import {Route, Redirect} from "react-router-dom";
import axios from 'axios';

import Admin_navbar from './components/Admin_navbar';
import Admin_invoice_history from './components/Admin_invoice_history';
import Admin_invoice from './components/Admin_invoice';
import Admin_login from './components/Admin_login';
import Admin_home from './components/Admin_home';
import Admin_category from './components/Admin_category';
import Admin_product from './components/Admin_product';
import Admin_color from './components/Admin_color';
import Admin_size from './components/Admin_size';
import Admin_add_season from './components/Admin_add_season';
import Admin_add_category from './components/Admin_add_category';
import Admin_add_product from './components/Admin_add_product';
import Admin_add_color from './components/Admin_add_color';
import Admin_add_size from './components/Admin_add_size';
import Admin_edit_season from './components/Admin_edit_season';
import Admin_edit_category from './components/Admin_edit_category';
import Admin_edit_product from './components/Admin_edit_product';
import Admin_edit_color from './components/Admin_edit_color';
import Admin_edit_size from './components/Admin_edit_size';

class App extends Component {

  constructor(){
    super()
    this.state = {
      nama_admin : "",
      id_admin : "",
      status : "",
      redirect_home : false,
      redirect_login : false,
      category1 : [],
      category2 : [],
      product1 : [],
      product2: [],
      color1: [],
      color2: [],
      size1 : [],
      size2 : [],
      tempseasonid : [],
      tempcategoryid : [],
      tempproductid : [],
      tempcolorid: [],
      tempsizeid: [],
      tempinvid: [],
    }
  }

  postlogin = (data_login) => {
    axios.post('http://localhost:3001/admin_login', 
      { 
        admin_name : data_login.admin_username.value,
        admin_pass : data_login.admin_password.value
      })
    .then((ambilData) => {
      if (ambilData.data.login_status === "true")
      {
        this.setState({nama_admin:ambilData.data.nama, id_admin:ambilData.data.id_admin, status : "true"});
        this.setState({redirect_home: true});
      }
      else
      {
        this.setState({redirect_login: true});
      }
    })
  }

  getseasonid = (id) => {
    axios.get("http://localhost:3001/admin_category/"+id)
    .then((ambilData) =>{
        this.setState({category1 : ambilData.data.rows1[0].id})
        this.setState({category2 : ambilData.data.rows2})
    })
  }

  getcategoryid = (id) => {
    axios.get("http://localhost:3001/admin_product/"+id)
    .then((ambilData) => {
      this.setState({product1 : ambilData.data.rows1[0].id})
      this.setState({product2 : ambilData.data.rows2})
    })
  }

  getproductid = (id) => {
    axios.get("http://localhost:3001/admin_color/"+id)
    .then((ambilData) => {
      this.setState({color1 : ambilData.data.rows1[0].id})
      this.setState({color2 : ambilData.data.rows2})
    })
  }

  getcolorid = (id) => {
    axios.get("http://localhost:3001/admin_size/"+id)
    .then((ambilData) => {
      this.setState({size1 : ambilData.data.rows1[0].id})
      this.setState({size2 : ambilData.data.rows2})
    })
  }

  editseasonid = (id) => {
    this.setState({tempseasonid: id});
  }

  editcategoryid = (id) => {
    this.setState({tempcategoryid: id});
  }

  editproductid = (id) => {
    this.setState({tempproductid : id});
  }

  editcolorid = (id) => {
    this.setState({tempcolorid: id});
  }

  editsizeid = (id) => {
    this.setState({tempsizeid: id});
  }

  deleteseasonid = (id) => {
    axios.get("http://localhost:3001/delete_season/"+id)
    .then((ambilData) => {
      if (ambilData.data === "true")
        {
          this.setState({redirect_home : true});
        }
      })
  }

  deletecategoryid = (id) => {
    axios.get("http://localhost:3001/delete_category/"+id)
    .then((ambilData) => {
      if (ambilData.data === "true")
        {
          this.setState({redirect_home : true});
        }
      })
  }

  deleteproductid = (id) => {
    axios.get("http://localhost:3001/delete_product/"+id)
    .then((ambilData) => {
      if (ambilData.data === "true")
        {
          this.setState({redirect_home : true});
        }
      })
  }

  deletecolorid = (id) => {
    axios.get("http://localhost:3001/delete_color/"+id)
    .then((ambilData) => {
      if (ambilData.data === "true")
        {
          this.setState({redirect_home : true});
        }
      })
  }

  deletesizeid = (id) => {
    axios.get("http://localhost:3001/delete_size/"+id)
    .then((ambilData) => {
      if (ambilData.data === "true")
        {
          this.setState({redirect_home : true});
        }
      })
  }

  getinvid = (id) => {
    this.setState({tempinvid: id});
  }

  logOut = () => {
    this.setState({nama_admin : "", id_admin : "", status : ""})
  }

  render() {

    const {redirect_login} = this.state;
    const {redirect_home} = this.state;

    if (redirect_login) {
      this.setState({redirect_login: false});
      return (
      <Redirect to='/admin_login'/>
      )
    }

    if (redirect_home) {
      this.setState({redirect_home: false});
      return (
      <Redirect to='/admin_home'/>
      )
    }


    return (
      <div>
        <Admin_navbar status={this.state.status} logOut={this.logout}/>
        <Route path = "/invoice_history_admin" render = {() => <Admin_invoice_history getINVID={this.getinvid}/>}/>
        <Route path = {`/invoice_admin/${this.state.tempinvid}`} render = {() => <Admin_invoice id={this.state.tempinvid}/>}/>
        <Route path = "/admin_login" render = {() => <Admin_login postLogin={this.postlogin}/>} />
        <Route path = "/admin_home" render = {() => <Admin_home status = {this.state.status} getSeasonID = {this.getseasonid} editSeasonID = {this.editseasonid} deleteSeasonID={this.deleteseasonid}/>} />
        <Route path = "/admin_category/:id" render = {() => <Admin_category category1={this.state.category1} category2={this.state.category2} getCategoryID = {this.getcategoryid} editCategoryID={this.editcategoryid} deleteCategoryID={this.deletecategoryid}/>}/>
        <Route path = "/admin_product/:id" render = {() => <Admin_product product1={this.state.product1} product2={this.state.product2} getProductID = {this.getproductid} editProductID={this.editproductid} deleteProductID={this.deleteproductid}/>} />
        <Route path = "/admin_color/:id" render = {() => <Admin_color color1={this.state.color1} color2={this.state.color2} getColorID={this.getcolorid} editColorID = {this.editcolorid} deleteColorID={this.deletecolorid}/>} />
        <Route path = "/admin_size/:id" render = {() => <Admin_size size1={this.state.size1} size2={this.state.size2} editSizeID={this.editsizeid} deleteSizeID={this.deletesizeid}/>}/>
        <Route path = "/add_season" render = {() => <Admin_add_season />} />
        <Route path = "/add_category/:id" render = {() => <Admin_add_category id={this.state.category1}/>}/>
        <Route path = "/add_product/:id" render = {() => <Admin_add_product id={this.state.product1}/>}/>
        <Route path = "/add_color/:id" render = {() => <Admin_add_color id={this.state.color1}/>}/>
        <Route path = "/add_size/:id" render = {() => <Admin_add_size id={this.state.size1}/>}/>
        <Route path = "/edit_season/:id" render = {() => <Admin_edit_season id={this.state.tempseasonid}/>}/>
        <Route path = "/edit_category/:id" render = {() => <Admin_edit_category id= {this.state.tempcategoryid}/>}/>
        <Route path = "/edit_product/:id" render = {() => <Admin_edit_product id={this.state.tempproductid}/>}/>
        <Route path = "/edit_color/:id" render = {() => <Admin_edit_color id={this.state.tempcolorid}/>}/>
        <Route path = "/edit_size/:id" render = {() => <Admin_edit_size id={this.state.tempsizeid}/>}/>
      </div>
    );
  }
}

export default App;
