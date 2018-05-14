import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Admin_edit_product extends Component {

    state = {redirect_home : false};
    
    editproduct = (x) => {
        axios.post(`http://localhost:3001/edit_product/${this.props.id}`,
        {
            edit_product : x.edit_product.value,
            edit_price : x.edit_price.value,
            edit_description : x.edit_description.value
        })
        .then((ambilData) => {
            if (ambilData.data === "true")
            {
                this.setState({redirect_home : true})
            }
        })
    } 

    render() {

        const {redirect_home} = this.state;

        if (redirect_home) {
            this.setState({redirect_home: false});
            return (
                <Redirect to='/admin_home'/>
            )
        }

        return(
            <div>
                Edit Product Name :
                <input type = "text" ref = "edit_product" />

                <br/><br/>

                Edit Price:
                <input type = "text" ref = "edit_price" />

                <br/><br/>

                Edit Description:
                <input type = "text" ref = "edit_description"/>

                <br/><br/>

                {/* <input type = "file" accept = ".jpg, .png, .jpeg, .bmp" onChange={this.fileChangedHandler} required/>

                <br/><br/> */}

                <input type = "submit" onClick={() => this.editproduct(this.refs)} value = "SUBMIT" />
            </div>
        )
    }
}

export default Admin_edit_product;