import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';

class Admin_invoice extends Component {

    state = {data1: [], data2: []}

    componentWillMount() {
        axios.get(`http://localhost:3001/invoice_admin/${this.props.id}`)
        .then((ambilData) => {
            this.setState({data1: ambilData.data.rows1});
            this.setState({data2: ambilData.data.rows2});
        })
    }

    render() {

        const data = this.state.data2.map((x,index) => {
            return(
                <tbody key ={index}>
                    <tr>
                        <td> {index +1} </td>
                        <td>{x.product_name}</td>
                        <td>{x.color}</td>
                        <td>{x.size}</td>
                        <td>{x.quantity}</td>
                        <td> Rp {x.price} </td>
                        <td> Rp {x.quantity * x.price}</td>
                    </tr>
                </tbody>
            )
        })

        const data_penerima = this.state.data1.map((x,index)=> {
            return(
                <div key = {index}>
                    Nama Penerima : {x.nama_penerima} <br/>
                    Alamat Penerima : {x.alamat_penerima} <br/>
                    Telepon Penerima : {x.telp_penerima} <br/>
                </div>
            )
        })

        var a = 0;

        for (var i = 0; i < this.state.data2.length; i++) {
            a = (this.state.data2[i].quantity * this.state.data2[i].price) + a;
        }

        return(
            <div>
                Kode Invoice : {this.props.id}

                <br/><br/>
                {data_penerima}

                <br/><br/>

                <table>
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
                            <td colSpan = "7"> <b>Grand Total : Rp {a}</b></td>
                        </tr>
                    </tbody>
                </table>

                <center><Link to = "/admin_home">Back To Home</Link> </center>
            
            </div>
        )
    }
}

export default Admin_invoice;