import React, {Component} from "react";

import "../styles/EditCart.css";

class EditCart extends Component {

    postedit = (edit_qty) => {
        this.props.postEdit(edit_qty);
    }

    render() {
        return(
            <div className = "container">
        <div className = "panel panel-default col-md-offset-4 col-md-4 col-lg-offset-4 col-lg-4">
            <div className = "panel-heading">
                <h3 className = "panel-title">Edit Cart</h3>
            </div>
            
            <div className = "panel-body">

            <div className = "form-horizontal">
                    <div className = "form-group">
                            <label htmlFor = "name" className = "control-label col-sm-3">Quantity</label> &nbsp;
                            <div className = "username col-sm-8">
                                <input type = "number" ref = "quantity" className = "form-control" placeholder = "Username" />
                            </div>
                    </div>
                    <div>
                        <center>
                            <input className = "btn btn-edit" type="submit" onClick={() => this.postedit(this.refs)} value = "EDIT"/>
                        </center>
                    </div>
                </div>

            </div>
        </div>
        </div>
        )
    }
}

export default EditCart;