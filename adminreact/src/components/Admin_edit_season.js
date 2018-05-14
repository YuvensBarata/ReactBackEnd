import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Admin_edit_season extends Component {

    state = {redirect_home : false};
    editseason = (x) => {
        axios.post(`http://localhost:3001/edit_season/${this.props.id}`,
        {
            edit_season : x.edit_season.value
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
                Edit Season :
                <input type = "text" ref = "edit_season" placeholder = "Edit Season" />

                <br/><br/>

                <input type = "submit" onClick={() => this.editseason(this.refs)} value = "SUBMIT" />
            </div>
        )
    }
}

export default Admin_edit_season;