import React, {Component} from "react";
import { Link } from "react-router-dom";

class Detail extends Component {

    getcolorid = (id, name_id) => {
        this.props.getColorID(id, name_id);
    }

    // addtocart = (cart_data) => {
    //     this.props.addToCart(cart_data);
        
    // }

    render() {
        const color = this.props.color2.map((x) => {
            return (
                <div key = {x.id}>
                    <li>
                        <Link to = {`/user_product_details/${x.product_name_id}?colorid=${x.id}`} onClick={() => this.getcolorid(x.id, x.product_name_id)}> {x.color} </Link>
                    </li>
                    <br/>
                </div>
            )
        })

        let size;
        if (this.props.size2.length > 0)
        {
            size = this.props.size2.map((x) => {
                return (
                        <option value = {x.id} key = {x.id}>Size {x.size} and stock {x.stock} </option>
                )
            })
        }
        else
        {
            size = null;
        }

        let name;
        let price;
        let description;
        if (this.props.product2.length > 0)
        {
            name = this.props.product2[0].product_name;
            price = this.props.product2[0].price;
            description = this.props.product2[0].description;
        }
        else
        {
            name = "ERROR";
            price = "ERROR";
            description = "ERROR";
        }

        return(
            
            <div>
                <div>
                    <h2>Name : {name}</h2>
                    <h2>Price : {price}</h2>
                    <h2>Description : {description}</h2>
                </div>

                <br/><br/>

                <div>
                    <ul>
                        {color}
                    </ul>
                </div>

                <div>
                    <select ref = "id">
                        {size}
                    </select>
                </div>
                <br/> <br/>
                <div>
                    <input type = "number" ref = "qtybeli" placeholder = "Jumlah Pembelian" />
                </div>

                <br/><br/>

                <Link to = {"/cart"}><input type = "submit" value = "Add to Cart" /></Link>
            </div>
        )
    }
}

export default Detail;