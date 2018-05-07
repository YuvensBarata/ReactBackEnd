import React, {Component} from "react";
import { Link } from "react-router-dom";

import "../styles/Category.css";

class Category extends Component {

    getcategoryid = (id) => {
        this.props.getCategoryID(id);
    }

    render() {

        

        const category = this.props.category2.map((x) => {
            return (
                <li key = {x.id}>
                    <Link to = {`/user_product/${x.id}`} onClick={() => this.getcategoryid(x.id)}> {x.category} </Link>
                </li>
            )
        })

        
        return(
            <div className = "container">
                <div className = "panel panel-default col-md-offset-4 col-md-4 col-lg-offset-4 col-lg-4">

                    <div className = "panel-heading">
                        <h3 className = "panel-title">Season's Category</h3>
                    </div>
            
                    <div className = "panel-body">
                        <ul>
                            {category}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Category;