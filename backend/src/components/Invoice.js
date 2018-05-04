import React, {Component} from "react";

import axios from 'axios';

class Invoice extends Component {

    constructor() {
        super();
        this.state = {data1: [], data2: []};
    }

    componentWillMount()
    {
        axios.get("http://localhost:3001/invoice_user/"+this.props.invoice_kode)
        .then ((invData) =>
        {
            // console.log(invData.data.rows1);
            this.setState({data1: invData.data.rows1});
            this.setState({data2: invData.data.rows2});
            // console.log(this.state.data1[0].nama_penerima);
            // console.log(this.state.data1[0].alamat_penerima);
            // console.log(this.state.data1[0].telp_penerima);
        })
    }

    render() {

        const data = this.state.data2.map((x,index) => {
            return(
                <tbody key ={index}>
                    <tr>
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
                <h2>Invoice</h2>
                <br/><br/>

                Kode Invoice : {this.props.invoice_kode}
                <br/><br/>

                {data_penerima}

                <br/>

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
            </div>
        )
    }

}

export default Invoice;