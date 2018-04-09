import React, {Component} from "react";
import { Link } from "react-router-dom";


class Login extends Component {

    postlogin = (login_data) => {
        this.props.postLogin(login_data);
        // console.log(login_data.username.value);
        // console.log(login_data.password.value);
    }

    render() {

        return(
            <div>
                Username :
                <input type = "text" ref = "username" />

                <br/><br/>

                Password :
                <input type = "password" ref = "password" />

                <br/><br/>

                <input type = "submit" onClick={() => this.postlogin(this.refs)} value = "LOGIN"/>

                <br/><br/>

                <Link to = {"/user_register"}>Sign Up</Link>
            </div>
        )
    }
    
}

export default Login;