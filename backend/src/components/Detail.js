import React, {Component} from "react";
import { Link } from "react-router-dom";

import "../styles/Detail.css";

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

        const foldergambar = "http://localhost:3001/images/";
        
        const color = this.props.color2.map((x) => {
            return (
                <div key = {x.id}>
                    <li className = "list_warna">
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
                        <li className = "list_ukuran">
                        {/* <option value = {x.id} key = {x.id}>Size {x.size} and stock {x.stock} and ID {x.id} </option> */}
                        <input type = "radio" name = "sizeid" value = {x.id}/> <label htmlFor = "sizeid"> Size {x.size} dan Stock {x.stock}</label>
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
        let image;

        if (this.props.product2.length > 0)
        {
            name = this.props.product2[0].product_name;
            price = this.props.product2[0].price;
            description = this.props.product2[0].description;
            image = this.props.product2[0].product_image_name;
        }
        else
        {
            name = "ERROR";
            price = "ERROR";
            description = "ERROR";
            image = "ERROR";
        }

        return(

            <div className = "container">
                <div className = "panel panel-default col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">
                    <div className = "panel-heading">
                        <h3 className = "panel-title">{name}</h3>
                    </div>

                    <div className = "panel-body">
                        <b>Description :</b> <br/>{description}
                        <br/><br/>
                        <b>Price : Rp {price}</b>
                        <br/><br/><br/>

                        <table className = "table">
                            <tbody>
                                <tr>
                                    <td rowSpan = "3"> 
                                        <img src = {`${foldergambar}`+image} alt = "Image" className = "foto-produk" />
                                    </td>
                                    <td><ul>{color}</ul></td>
                                </tr>
                                <tr>
                                    <td><ul onChange = {this.handleChange}>{size}</ul></td>
                                </tr>
                                <tr>
                                    <td><input type = "number" ref = "qtybeli" placeholder = "Jumlah Pembelian" className = "form-control" onInput = {this.handleChangeQty}/><br/></td>
                                </tr>
                                <tr>
                                    <td colSpan = "4">
                                    <center>
                                        <input className = "btn btn-cart" type = "submit" onClick={() => this.addtocart(this.state)} value = "ADD TO CART" />
                                    </center>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            // <div>
            //     <div>
            //         <h2>Name : {name}</h2>
            //         <h2>Price : {price}</h2>
            //         <h2>Description : {description}</h2>
            //     </div>

            //     <br/><br/>

            //     <div>
            //         <ul>
            //             {color}
            //         </ul>
            //     </div>

            //     <div>
            //         {/* <select onChange = {this.handleChange}> */}
            //         <ul onChange = {this.handleChange}>
            //             {size}
            //         </ul>
            //         {/* </select> */}
            //     </div>
            //     <br/> <br/>
            //     <div>
            //         <input type = "number" ref = "qtybeli" placeholder = "Jumlah Pembelian" onInput = {this.handleChangeQty}/>
            //     </div>

            //     <br/><br/>

            //     <input type = "submit" onClick={() => this.addtocart(this.state)} value = "ADD TO CART" />
            // </div>
        )
    }
}

export default Detail;