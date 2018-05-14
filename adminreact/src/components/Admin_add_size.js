import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Admin_add_size extends Component {

    state = {redirect_home : false};
    addsize = (x) => {
        axios.post(`http://localhost:3001/add_size/${this.props.id}`,
        {
            new_size : x.new_size.value,
            new_stock : x.new_stock.value
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
                New Size :
                <input type = "text" ref = "new_size" placeholder = "New Size" />

                <br/><br/>

                New Stock :
                <input type = "text" ref = "new_stock" placeholder = "New Stock" />

                <br/><br/>

                <input type = "submit" onClick={() => this.addsize(this.refs)} value = "SUBMIT" />
            </div>
        )
    }
}

export default Admin_add_size;