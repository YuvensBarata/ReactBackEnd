import React, {Component} from "react";
import { Link, Redirect} from "react-router-dom";
import axios from 'axios';

class Admin_home extends Component {

    state = {season : [], redirect_login : false, redirect_home : false}

    componentWillMount() {
        if (this.props.status === "true") {
            axios.get("http://localhost:3001/admin_home")
            .then((ambilData) =>{
                this.setState({season : ambilData.data})
            })
        }
        else
        {
            this.setState({redirect_login : true})
        }

    }

    getseasonid = (id) => {
        this.props.getSeasonID(id);
    }

    editseasonid = (id) => {
        this.props.editSeasonID(id);
    }

    deleteseasonid = (id) => {
        this.props.deleteSeasonID(id);
    }

    render() {

        const {redirect_login} = this.state;

        if (redirect_login) {
            this.setState({redirect_login: false});
            return (
            <Redirect to='/admin_login'/>
            )
          }

        const season = this.state.season.map((x,index) =>{
            return (
                <tbody key = {index}>
                    <tr>
                        <td> {index +1} </td>
                        <td> <Link to = {`/admin_category/${x.id}`} onClick={() => this.getseasonid(x.id)}> {x.season} </Link></td>
                        <td> <Link to = {`/edit_season/${x.id}`} onClick={() => this.editseasonid(x.id)}> Edit </Link></td>
                        <td> <Link to = {`/delete_season/${x.id}`} onClick={() => this.deleteseasonid(x.id)}> Delete </Link></td>
                    </tr>
                </tbody>
            )
        })

        return(
            <div>
                Season 
                <br/><br/>
                <table>
                    <thead>
                        <tr>
                            <th> No. </th>
                            <th> Season Name </th>
                        </tr>
                    </thead>
                    {season}
                </table>
                <br/><br/><br/>
                <Link to ={`/add_season`}> Add Season </Link>
            </div>
        )
    }
}

export default Admin_home;