import React, {Component} from "react";

class EditCart extends Component {

    postedit = (edit_qty) => {
        this.props.postEdit(edit_qty);
    }

    render() {
        return(
            <div>
                Quantity :
                <input type = "text" ref = "quantity" />

                <br/><br/>

                <input type = "submit" onClick={() => this.postedit(this.refs)} value = "EDIT"/>
            </div>
        )
    }
}

export default EditCart;