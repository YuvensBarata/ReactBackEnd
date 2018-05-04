import React, {Component} from "react";
import { Link } from "react-router-dom";


class Register extends Component {

    postregis = (register_data) => {
        this.props.postRegis(register_data);
        
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
                            <label htmlFor = "name" className = "control-label col-sm-3">Username</label> &nbsp;
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

                    <div className = "form-group">
                            <label htmlFor = "nama" className = "control-label col-sm-3">Nama</label> &nbsp;
                            <div className = "password col-sm-8">
                                <input type = "text" ref = "name" className = "form-control" placeholder = "Nama Pribadi" />
                            </div>
                    </div>

                    <div>
                        <center>
                            <input className = "btn btn-login" type="submit" onClick={() => this.postregis(this.refs)} value = "REGISTER"/>
                        </center>
                    </div>
                </div>
            </div>
        </div>
        </div>
        )
    }
    
}

export default Register;