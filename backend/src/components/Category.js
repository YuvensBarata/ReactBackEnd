import React, {Component} from "react";
import { Link } from "react-router-dom";

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
            <div>
                <h2>My Category</h2>
                <br/>
                <ul>
                    {category}
                </ul>
            </div>
        )
    }
}

export default Category;