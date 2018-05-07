import React, {Component} from "react";
import { Link } from "react-router-dom";

import axios from 'axios';
import "../styles/Cart.css";

class Cart extends Component {

    constructor() {
        super()
        this.state = {isi_cart: []}
    }

    componentWillMount()
    {
        axios.get("http://localhost:3001/cart/"+this.props.id_user)
        .then ((cartData) =>
        {
        //   console.log(cartData.data);
          this.setState({isi_cart : cartData.data})
        })
    }

    getcartid = (id) => {
        this.props.getCartID(id);
    }

    deletecartid = (id) => {
        this.props.deleteCartID(id);
    }

    checkout = (data) => {
        this.props.checkOut(data);
    }

    render() {

        const data = this.state.isi_cart.map((x,index) => {
            return(
                <tbody key ={index}>
                    <tr>
                        <td>{index + 1}</td>
                        <td>{x.product_name}</td>
                        <td>{x.color}</td>
                        <td>{x.size}</td>
                        <td>{x.quantity}</td>
                        <td> Rp {x.price} </td>
                        <td> Rp {x.quantity * x.price}</td>
                        <td><Link to = {`/edit_cart/${x.id}`} onClick={() => this.getcartid(x.id)}> Edit </Link></td>
                        <td> <Link to = {`/delete_cart/${x.id}`} onClick={() => this.deletecartid(x.id)}>Delete </Link> </td>
                    </tr>
                </tbody>
            )
        })

        var a = 0;

        for (var i = 0; i < this.state.isi_cart.length; i++) {
            a = (this.state.isi_cart[i].quantity * this.state.isi_cart[i].price) + a;
        }

        return(
            <div className = "container">

                <div className = "panel panel-default col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">
                    <table className = "table">
                        <thead>
                            <tr>
                                <th> No. </th>
                                <th> Product Name </th>
                                <th> Color </th>
                                <th> Size </th>
                                <th> Quantity </th>
                                <th> Price </th>
                                <th> Total </th>
                            </tr>
                        </thead>
                        {data}
                        <tbody>
                            <tr>
                                <td colSpan = "7"><b>Grand Total : Rp {a} <input type = "number" ref = "grand_total" value = {a} hidden/></b></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <br/><br/>

                <div className = "panel panel-default col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">
                    <div className = "panel-heading">
                        <h3 className = "panel-title">Data Penerima</h3>
                    </div>

                    <div className = "panel-body">
                        <div className = "form-horizontal">

                            <div className = "form-group">
                                <label htmlFor = "name" className = "control-label col-sm-3">Nama</label> &nbsp;
                                <div className = "penerima col-sm-8">
                                    <input type = "text" ref = "nama_penerima" className = "form-control" placeholder = "Username" />
                                </div>
                            </div>

                            <div className = "form-group">
                                <label htmlFor = "telp" className = "control-label col-sm-3">No. Telp</label> &nbsp;
                                <div className = "telp col-sm-8">
                                    <input type = "text" ref = "telp_penerima" className = "form-control" placeholder = "Password" />
                                </div>
                            </div>

                            <div className = "form-group">
                                <label htmlFor = "alamat" className = "control-label col-sm-3">Alamat</label> &nbsp;
                                <div className = "alamat col-sm-8">
                                    <input type = "text" ref = "alamat_penerima" className = "form-control" placeholder = "Password" />
                                </div>
                            </div>

                            <div>
                                <center>
                                    <input className = "btn btn-checkout" type="submit" onClick={() => this.checkout(this.refs)} value = "CHECK OUT"/>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Penerima:
                <br/><br/>

                Nama : <input type = "text" ref = "nama_penerima" />

                <br/>

                No. Telp : <input type = "text" ref = "telp_penerima" />

                <br/>

                Alamat : <input type = "text" ref = "alamat_penerima" />

                <br/><br/>

                <input type = "submit" onClick={() => this.checkout(this.refs)} value = "CHECK OUT"/> */}
            </div>
        )
    }
    
}

export default Cart;