import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';

class Admin_invoice_history extends Component {

    state = {data: []}

    componentWillMount() {
        axios.get("http://localhost:3001/invoice_history_admin")
        .then((ambilData) => {
            this.setState({data : ambilData.data})
        })
    }

    getinvid = (id) => {
        this.props.getINVID(id);
    }

    render() {

        const data = this.state.data.map((x,index) => {
            return (
                <tbody key = {index}>
                    <tr>
                        <td>{index +1}</td>
                        <td><Link to = {`/invoice_admin/${x.kode_invoice}`} onClick={() => this.getinvid(x.kode_invoice)}>{x.kode_invoice}</Link></td>
                        <td>{x.total_price}</td>
                        <td>{x.time}</td>
                    </tr>
                </tbody>
            )
        })

        return(
            <div>
                Invoice History 
                <br/><br/>
                
                <table>
                    <thead>
                        <tr>
                            <th> No. </th>
                            <th> Kode Invoice </th>
                            <th> Total Harga </th>
                            <th> Waktu Transaksi </th>
                        </tr>
                    </thead>
                    {data}
                </table>
            </div>
        )
    }
}

export default Admin_invoice_history;