import React, {Component} from "react";
import {Link} from "react-router-dom";

class Admin_size extends Component {
    
    editsizeid = (id) => {
        this.props.editSizeID(id);
    }

    deletesizeid = (id) => {
        this.props.deleteSizeID(id);
    }
    
    render() {

        const size = this.props.size2.map((x, index) =>{
            return (
                <tbody key = {index}>
                    <tr>
                        <td> {index +1} </td>
                        <td> {x.size} </td>
                        <td> {x.stock} </td>
                        <td> <Link to = {`/edit_size/${x.id}`} onClick={() => this.editsizeid(x.id)}> Edit </Link></td>
                        <td> <Link to = {`/delete_size/${x.id}`} onClick={() => this.deletesizeid(x.id)}> Delete </Link></td>
                    </tr>
                </tbody>
            )
        })
        return(
            <div>
                Size and Stock
                <br/><br/>
                <table>
                    <thead>
                        <tr>
                            <th> No. </th>
                            <th> Size </th>
                            <th> Stock </th>
                            <th/>
                            <th/>
                        </tr>
                    </thead>
                    {size}
                </table>

                <br/><br/><br/>
                
                <Link to = {`/add_size/${this.props.size1}`}> Add Size & Stock </Link>
            </div>
        )
    }
}

export default Admin_size;