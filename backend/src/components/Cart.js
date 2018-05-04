import React, {Component} from "react";
import { Link } from "react-router-dom";

import axios from 'axios';


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
            <div>
                <table>
                    <thead>
                        <tr>
                            <th> Product Name </th>
                            <th> Color </th>
                            <th> Size </th>
                            <th> Quantity </th>
                            <th> Price </th>
                            <th> Total </th>
                        </tr>
                    </thead>
                    {data}
                </table>

                <br/><br/>

                Grand Total : Rp {a}
                <input type = "number" ref = "grand_total" value = {a} hidden/>

                <br/><br/>
                Data Penerima:
                <br/><br/>

                Nama : <input type = "text" ref = "nama_penerima" />

                <br/>

                No. Telp : <input type = "text" ref = "telp_penerima" />

                <br/>

                Alamat : <input type = "text" ref = "alamat_penerima" />

                <br/><br/>

                <input type = "submit" onClick={() => this.checkout(this.refs)} value = "CHECK OUT"/>
            </div>
        )
    }
    
}

export default Cart;