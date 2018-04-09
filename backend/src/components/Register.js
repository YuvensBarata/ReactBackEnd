import React, {Component} from "react";
import { Link } from "react-router-dom";


class Register extends Component {

    postregis = (register_data) => {
        this.props.postRegis(register_data);
        
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

                Nama :
                <input type = "text" ref = "name" />

                <br/><br/>

                <input type="submit" onClick={() => this.postregis(this.refs)} value="REGISTER"/>
            </div>
        )
    }
    
}

export default Register;