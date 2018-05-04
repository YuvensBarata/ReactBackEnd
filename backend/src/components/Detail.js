import React, {Component} from "react";
import { Link } from "react-router-dom";

class Detail extends Component {

    constructor() {
        super();
        this.state = {
          value: "",
          qty: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeQty = this.handleChangeQty.bind(this);
      }

    getcolorid = (id, name_id) => {
        this.props.getColorID(id, name_id);
    }

    addtocart = (cart_data) => {
        this.props.addToCart(cart_data);
        // console.log(cart_data)
        
    }

    handleChange(e) {
        this.setState({value : e.target.value})
    }
    handleChangeQty(e) {
        this.setState({qty: e.target.value})
    }

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
                    <div  key = {x.id}>
                        <li>
                        {/* <option value = {x.id} key = {x.id}>Size {x.size} and stock {x.stock} and ID {x.id} </option> */}
                        <input type = "radio" name = "sizeid" value = {x.id}/> <label htmlFor = "sizeid"> Size {x.size} dan Stock {x.stock} dan ID {x.id} </label>
                        </li>
                    </div>
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
                    {/* <select onChange = {this.handleChange}> */}
                    <ul onChange = {this.handleChange}>
                        {size}
                    </ul>
                    {/* </select> */}
                </div>
                <br/> <br/>
                <div>
                    <input type = "number" ref = "qtybeli" placeholder = "Jumlah Pembelian" onInput = {this.handleChangeQty}/>
                </div>

                <br/><br/>

                <input type = "submit" onClick={() => this.addtocart(this.state)} value = "ADD TO CART" />
            </div>
        )
    }
}

export default Detail;