import React, {Component} from "react";
import { Link } from "react-router-dom";

import axios from 'axios';

class Invoice_history extends Component {

    constructor() {
        super();
        this.state = {history: []}
    }

    componentWillMount() {
        axios.get("http://localhost:3001/invoice_history_user/"+this.props.id_user)
        .then((getData) => {
            this.setState({history: getData.data})
        })
    }

    getinvid = (id) => {
        this.props.getInvID(id);
    }

    render() {

        const data = this.state.history.map((x,index) => {
            return(
                <tbody key = {index}>
                    <tr>
                        <td> <Link to = {`/invoice_user/${x.kode_invoice}`} onClick={() => this.getinvid(x.kode_invoice)}> {x.kode_invoice} </Link> </td>
                        <td> {x.total_price} </td>
                        <td> {x.time} </td>
                    </tr>
                </tbody>
            )
        })

        return(
            <div>
                <h2> Invoice History </h2>

                <table>
                    <thead>
                        <tr>
                            <th> Kode Invoice </th>
                            <th> Grand Total Price </th>
                            <th> Time and Date </th>
                        </tr>
                    </thead>

                    {data}
                </table>
            </div>
        )
    }
}

export default Invoice_history;