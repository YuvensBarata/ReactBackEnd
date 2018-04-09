import React, {Component} from "react";
import { Link } from "react-router-dom";


class Navbar extends Component {

    render() {

        let test;


        if (this.props.nama_user.length > 0)
        {
            test = (<div><h2>Welcome, {this.props.nama_user}! Invoice History Cart <Link to = {"/logout"}> Log Out </Link></h2></div>)
        }
        else
        {
            test = <h2> <Link to = {"/user_login"}>Log In</Link> <Link to = {"/user_register"}>Sign Up </Link> </h2>
        }

        return test
    }
    
}

export default Navbar;