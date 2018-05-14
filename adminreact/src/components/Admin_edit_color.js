import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Admin_edit_color extends Component {

    state = {redirect_home : false};
    editcolor = (x) => {
        axios.post(`http://localhost:3001/edit_color/${this.props.id}`,
        {
            edit_color : x.edit_color.value
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
                Edit Color :
                <input type = "text" ref = "edit_color" placeholder = "Edit Color" />

                <br/><br/>

                <input type = "submit" onClick={() => this.editcolor(this.refs)} value = "SUBMIT" />
            </div>
        )
    }
}

export default Admin_edit_color;