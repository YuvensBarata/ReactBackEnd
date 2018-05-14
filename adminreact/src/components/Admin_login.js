import React, {Component} from 'react';

class Admin_login extends Component {

    postlogin = (login_data) =>
    {
        this.props.postLogin(login_data);
    }

    render() {
        return (
            <div>
                Username :
                <input type = "text" ref = "admin_username" placeholder = "Admin Username" />

                <br/><br/>

                Password :
                <input type = "password" ref = "admin_password" placeholder = "Password" />
                <br/><br/>

                <input type = "submit" onClick={() => this.postlogin(this.refs)} value = "LOGIN"/>
            </div>
        )
    }
}

export default Admin_login;