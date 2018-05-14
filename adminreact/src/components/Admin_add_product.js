import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import FormData from 'form-data';
import dropzone from 'react-dropzone';
import axios from 'axios';

class Admin_add_product extends Component {

    state = {redirect_home : false, selectedFile: null};
    
    fileChangedHandler = (event) => {
        this.setState({selectedFile: event.target.files[0]})
    }

    addproduct = (x) => {
        // const formData = new FormData()
        // formData.append('myFile', this.state.selectedFile, this.state.selectedFile.name)
        // console.log(formData);

        // console.log(this.state.selectedFile);

        return (
            axios.post(`http://localhost:3001/add_product/${this.props.id}`,
            {
                new_product : x.new_product.value,
                new_price : x.new_price.value,
                new_description : x.new_description.value,
                // userfile : this.state.selectedFile

            })
            .then((ambilData) => {
                if (ambilData.data === "true")
                {
                    this.setState({redirect_home : true})
                }
            })
        )
        
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
                New Product Name :
                <input type = "text" ref = "new_product" />

                <br/><br/>

                Price:
                <input type = "text" ref = "new_price" />

                <br/><br/>

                Description:
                <input type = "text" ref = "new_description"/>

                <br/><br/>

                {/* <input type = "file" accept = ".jpg, .png, .jpeg, .bmp" onChange={this.fileChangedHandler} required/>

                <br/><br/> */}

                <input type = "submit" onClick={() => this.addproduct(this.refs)} value = "SUBMIT" />
            </div>
        )
    }
}

export default Admin_add_product;