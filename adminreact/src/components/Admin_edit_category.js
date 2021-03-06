import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Admin_edit_category extends Component {

    state = {redirect_home : false};
    editcategory = (x) => {
        axios.post(`http://localhost:3001/edit_category/${this.props.id}`,
        {
            edit_category : x.edit_category.value
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
                Edit Category :
                <input type = "text" ref = "edit_category" placeholder = "Edit Category" />

                <br/><br/>

                <input type = "submit" onClick={() => this.editcategory(this.refs)} value = "SUBMIT" />
            </div>
        )
    }
}

export default Admin_edit_category;