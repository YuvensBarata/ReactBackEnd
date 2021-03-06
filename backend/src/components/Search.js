import React, {Component} from "react";
import { Link } from "react-router-dom";

import "../styles/Product.css";

class Search extends Component {

    getdetailid = (id) => {
        this.props.getDetailID(id);
    }

    render() {

        const foldergambar = "http://localhost:3001/images/";

        const product = this.props.hasil_search.map((x,index) => {
            return (
                <tbody key = {index}>
                    <tr>
                        <td rowSpan = "2"> 
                            <img src = {`${foldergambar+x.product_image_name}`} alt = "Image" className = "foto-produk" />
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

export default Search;