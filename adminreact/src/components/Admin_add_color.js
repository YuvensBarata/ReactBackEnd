import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Admin_add_color extends Component {

    state = {redirect_home : false};
    addcolor = (x) => {
        axios.post(`http://localhost:3001/add_color/${this.props.id}`,
        {
            new_color : x.new_color.value
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
                New Color :
                <input type = "text" ref = "new_color" placeholder = "New Color" />

                <br/><br/>

                <input type = "submit" onClick={() => this.addcolor(this.refs)} value = "SUBMIT" />
            </div>
        )
    }
}

export default Admin_add_color;