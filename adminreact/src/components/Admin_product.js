import React, {Component} from "react";
import {Link} from "react-router-dom";

class Admin_product extends Component {

    getproductid = (id) => {
        this.props.getProductID(id);
    }

    editproductid = (id) => {
        this.props.editProductID(id);
    }

    deleteproductid = (id) => {
        this.props.deleteProductID(id);
    }

    render() {

        const foldergambar = "http://localhost:3001/images/"

        const product = this.props.product2.map((x,index) =>{
            return (
                <tbody key = {index}>
                    <tr>
                        <td> {index +1} </td>
                        <td><Link to = {`/admin_color/${x.id}`} onClick={() => this.getproductid(x.id)}>{x.product_name} </Link></td>
                        <td>Rp {x.price}</td>
                        <td>{x.description}</td>
                        <td> 
                            <img src = {`${foldergambar+x.product_image_name}`} alt = "Image" className = "foto-produk" style ={{width : 50, height : 50}} />
                        </td>
                        <td> <Link to = {`/edit_product/${x.id}`} onClick={() => this.editproductid(x.id)}> Edit </Link></td>
                        <td> <Link to = {`/delete_product/${x.id}`} onClick={() => this.deleteproductid(x.id)}> Delete </Link></td>
                    </tr>
                </tbody>
            )
        })
        return(
            <div>
                Product
                <br/><br/>
                <table>
                    <thead>
                        <tr>
                            <th> No. </th>
                            <th> Product Name </th>
                            <th> Price </th>
                            <th> Description </th>
                            <th> Image </th>
                        </tr>
                    </thead>

                    {product}
                </table>
                <br/><br/><br/>

                <Link to = {`/add_product/${this.props.product1}`}> Add Product </Link>
            </div>

        )
    }
}

export default Admin_product;