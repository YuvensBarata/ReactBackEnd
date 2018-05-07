import React, {Component} from "react";
import { Link } from "react-router-dom";

import "../styles/Product.css";

class Product extends Component {

    getdetailid = (id) => {
        this.props.getDetailID(id);
    }
    
    render() {

        // const product = this.props.product2.map((x) => {
        //     return (
        //         <div key = {x.id}>
        //             <li>
        //                 <Link to = {`/user_product_details/${x.id}`} onClick={() => this.getdetailid(x.id)}> {x.product_name} </Link>
        //             </li>
        //             <li>
        //                 {x.price}
        //             </li>
        //             <br/>
        //         </div>

        //     )
        // })

        const product = this.props.product2.map((x,index) => {
            return (
                <tbody key = {index}>
                    <tr>
                        <td rowSpan = "2"> 
                            <img src = "https://vignette.wikia.nocookie.net/janethevirgin/images/4/42/Image-not-available_1.jpg/revision/latest?cb=20150721102313" alt = "Image" className = "foto-produk" />
                        </td>
                        <td>Nama Produk : </td>
                        <td><Link to = {`/user_product_details/${x.id}`} onClick={() => this.getdetailid(x.id)}>{x.product_name} </Link></td>
                    </tr>
                    <tr>
                        <td>Harga : </td>
                        <td>Rp {x.price}</td>
                    </tr>
                </tbody>
            )
        })

        return(
            <div className = "container">
                <div className = "panel panel-default col-md-offset-3 col-md-6 col-lg-offset-3 col-lg-6">
                    <div className = "panel-heading">
                        <h3 className = "panel-title">Product List</h3>
                    </div>

                    <div className = "panel-body">
                        <center>
                            <table className = "table">
                                <thead />

                                {product}
                            </table>
                        </center>
                    </div>
                </div>
            </div>
        )
    }
}

export default Product;