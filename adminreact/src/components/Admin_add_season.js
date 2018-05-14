import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Admin_add_season extends Component {

    state = {redirect_home : false};
    addseason = (x) => {
        axios.post("http://localhost:3001/add_season",
        {
            new_season : x.new_season.value
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
                New Season :
                <input type = "text" ref = "new_season" placeholder = "New Season" />

                <br/><br/>

                <input type = "submit" onClick={() => this.addseason(this.refs)} value = "SUBMIT" />
            </div>
        )
    }
}

export default Admin_add_season;