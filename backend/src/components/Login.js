import React, {Component} from "react";
import { Link } from "react-router-dom";

import "../styles/Login.css";

class Login extends Component {

    postlogin = (login_data) => {
        this.props.postLogin(login_data);
        // console.log(login_data.username.value);
        // console.log(login_data.password.value);
    }

    render() {

        return(
            <div className = "container">
        <div className = "panel panel-default col-md-offset-4 col-md-4 col-lg-offset-4 col-lg-4">
            <div className = "panel-heading">
                <h3 className = "panel-title">Log In</h3>
            </div>
            
            <div className = "panel-body">

            <div className = "form-horizontal">
                    <div className = "form-group">
                            <label htmlFor = "name" className = "control-label col-sm-3">Name</label> &nbsp;
                            <div className = "username col-sm-8">
                                <input type = "text" ref = "username" className = "form-control" placeholder = "Username" />
                            </div>
                    </div>

                    <div className = "form-group">
                            <label htmlFor = "password" className = "control-label col-sm-3">Password</label> &nbsp;
                            <div className = "password col-sm-8">
                                <input type = "password" ref = "password" className = "form-control" placeholder = "Password" />
                            </div>
                    </div>

                    <div>
                        <center>
                            <input className = "btn btn-login" type="submit" onClick={() => this.postlogin(this.refs)} value = "LOGIN"/>
                        </center>
                    </div>
                </div>

            </div>
        </div>
        </div>
        )
    }
    
}

export default Login;