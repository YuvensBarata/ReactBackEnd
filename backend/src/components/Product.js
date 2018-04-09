import React, {Component} from "react";
import { Link } from "react-router-dom";

class Product extends Component {

    getdetailid = (id) => {
        this.props.getDetailID(id);
    }
    
    render() {

        const product = this.props.product2.map((x) => {
            return (
                <div key = {x.id}>
                    <li>
                        <Link to = {`/user_product_details/${x.id}`} onClick={() => this.getdetailid(x.id)}> {x.product_name} </Link>
                    </li>
                    <li>
                        {x.price}
                    </li>
                    <br/>
                </div>

            )
        })
        return(
            <div>
                <h2>My Product</h2>
                <br/>
                <ul>
                    {product}
                </ul>
            </div>
        )
    }
}

export default Product;