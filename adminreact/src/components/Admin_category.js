import React, {Component} from "react";
import {Link} from "react-router-dom";

class Admin_category extends Component {

    state = {redirect_home : false}

    getcategoryid = (id) => {
        this.props.getCategoryID(id);
    }

    editcategoryid = (id) => {
        this.props.editCategoryID(id);
    }

    deletecategoryid = (id) => {
          this.props.deleteCategoryID(id);
    }

    render() {
        
        const category = this.props.category2.map((x,index) =>{
            return (
                <tbody key = {index}>
                    <tr>
                        <td> {index +1} </td>
                        <td> <Link to = {`/admin_product/${x.id}`} onClick={() => this.getcategoryid(x.id)}> {x.category} </Link> </td>
                        <td> <Link to = {`/edit_category/${x.id}`} onClick={() => this.editcategoryid(x.id)}> Edit </Link></td>
                        <td> <Link to = {`/delete_category/${x.id}`} onClick={() => this.deletecategoryid(x.id)}> Delete </Link></td>
                    </tr>
                </tbody>
            )
        })

        return(
            <div>
                Category
                <br/><br/>
                <table>
                    <thead>
                        <tr>
                            <th> No. </th>
                            <th> Category Name </th>
                            <th> </th>
                            <th> </th>
                        </tr>
                    </thead>
                    {category}
                </table>

                <br/><br/><br/>
                
                <Link to = {`/add_category/${this.props.category1}`}> Add Category </Link>
            </div>
        )
    }
}

export default Admin_category;