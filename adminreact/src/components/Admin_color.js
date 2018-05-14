import React, {Component} from "react";
import {Link} from "react-router-dom";

class Admin_color extends Component {

    getcolorid = (id) => {
        this.props.getColorID(id);
    }

    editcolorid = (id) => {
        this.props.editColorID(id);
    }

    deletecolorid = (id) => {
        this.props.deleteColorID(id);
    }
    
    render() {

        const color = this.props.color2.map((x, index) =>{
            return (
                <tbody key = {index}>
                    <tr>
                        <td> {index +1} </td>
                        <td> <Link to = {`/admin_size/${x.id}`} onClick={() => this.getcolorid(x.id)}> {x.color} </Link></td>
                        <td> <Link to = {`/edit_color/${x.id}`} onClick={() => this.editcolorid(x.id)}> Edit </Link></td>
                        <td> <Link to = {`/delete_color/${x.id}`} onClick={() => this.deletecolorid(x.id)}> Delete </Link></td>
                    </tr>
                </tbody>
            )
        })
        return(
            <div>
                Color
                <br/><br/>
                <table>
                    <thead>
                        <tr>
                            <th> No. </th>
                            <th> Color </th>
                            <th/>
                            <th/>
                        </tr>
                    </thead>
                    {color}
                </table>
                
                <br/><br/><br/>
                
                <Link to = {`/add_color/${this.props.color1}`}> Add Color </Link>
            </div>
        )
    }
}

export default Admin_color;