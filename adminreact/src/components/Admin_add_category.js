import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Admin_add_category extends Component {

    state = {redirect_home : false};
    
    addcategory = (x) => {
        axios.post(`http://localhost:3001/add_category/${this.props.id}`,
        {
            new_category : x.new_category.value
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
                New Category :
                <input type = "text" ref = "new_category" placeholder = "New Category" />

                <br/><br/>

                <input type = "submit" onClick={() => this.addcategory(this.refs)} value = "SUBMIT" />
            </div>
        )
    }
}

export default Admin_add_category;