import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Admin_edit_size extends Component {

    state = {redirect_home : false};

    editsize = (x) => {
        axios.post(`http://localhost:3001/edit_size/${this.props.id}`,
        {
            edit_size : x.edit_size.value,
            edit_stock : x.edit_stock.value
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
                Edit Size :
                <input type = "text" ref = "edit_size" placeholder = "Edit Size" />

                <br/><br/>

                Edit Stock :
                <input type = "text" ref = "edit_stock" placeholder = "Edit Stock" />

                <br/><br/>

                <input type = "submit" onClick={() => this.editsize(this.refs)} value = "SUBMIT" />
            </div>
        )
    }
}

export default Admin_edit_size;