import React, {Component} from "react";
import { Link } from "react-router-dom";

class Admin_navbar extends Component {

    logout = () => {
        this.props.logOut();
    }

    render() {

        let navbar;

        if (this.props.status === "true")
        {
            navbar = (
                <div>
                    <Link to = "/admin_home"> Home </Link>
                    <Link to = "/invoice_history_admin"> Invoice History </Link>
                    <Link to = "/admin_login" onClick={() => this.logout()}> Log Out </Link>
                </div>
            )
            
        }
        else
        {
            navbar = null;
        }

        return(
            <div>
                {navbar}
            </div>
        )
    }
}

export default Admin_navbar;