import React, {Component} from "react";
import { Link } from "react-router-dom";

import "../styles/Navbar.css";

class Navbar extends Component {

    constructor() {
        super();
        this.state = {searchbar : []}
    }

    logout = () => {
        this.props.logOut();
    }

    search = () => {
        // console.log(this.state.searchbar);
        this.props.Search(this.state.searchbar)
    }
    
    render() {

        let test;


        // if (this.props.nama_user.length > 0)
        // {
        //     test = (<div>Welcome, {this.props.nama_user}! &nbsp; &nbsp; <Link to = {`/user_home`}> Home </Link>&nbsp; &nbsp; <Link to = {`/invoice_history_user/${this.props.id_user}`}>Invoice History </Link>&nbsp; &nbsp; <Link to = {`/cart/${this.props.id_user}`}> Cart </Link> &nbsp; &nbsp;<Link to = {"/user_home"} onClick = {() => this.logout()}> Log Out </Link></div>)
        // }
        // else
        // {
        //     test = (<div><Link to = {"/user_login"}>Log In</Link> &nbsp; &nbsp; <Link to = {"/user_register"}>Sign Up </Link></div>)
        // }

        if (this.props.nama_user.length > 0)
        {
            test = (
                <div className = "bot-header">
                <center>
                    <Link to = "/user_home"><button className = "btn btn-header"><span className = "glyphicon glyphicon-home"></span> &nbsp;&nbsp; Home</button></Link>
                    <Link to = {`/invoice_history_user/${this.props.id_user}`}><button className = "btn btn-header"><span className = "glyphicon glyphicon-list-alt"></span> &nbsp;&nbsp; History</button></Link>
                    <Link to = {`/cart/${this.props.id_user}`}><button className = "btn btn-header"><span className = "glyphicon glyphicon-shopping-cart"></span> &nbsp;&nbsp; Cart</button></Link>
                    <Link to = {"/user_home"} onClick = {() => this.logout()}><button className = "btn btn-header"><span className = "glyphicon glyphicon-fire"></span> &nbsp;&nbsp; Log Out</button></Link>
                    <input type="text" className = "search-bar" ref = "search" onChange={()=> this.setState({searchbar: this.refs.search.value})} placeholder = "Search" />
                    <button className = "btn-search" onClick={() => this.search()}>
                        <span className="glyphicon glyphicon-search"></span>
                    </button>
                </center>
            </div>
            )
        }
        else
        {
            test = (
            <div className = "bot-header">
                <center>
                    <Link to = "/user_home"><button className = "btn btn-header"><span className = "glyphicon glyphicon-home"></span> &nbsp;&nbsp; Home</button></Link>
                    <Link to = "/user_login"><button className = "btn btn-header"><span className = "glyphicon glyphicon-user"></span> &nbsp;&nbsp; Log In</button></Link>
                    <Link to = "/user_register"><button className = "btn btn-header"><span className = "glyphicon glyphicon-pencil"></span> &nbsp;&nbsp; Register</button></Link>
                    <input type="text" className = "search-bar" ref = "search" onChange={()=> this.setState({searchbar: this.refs.search.value})} placeholder = "Search" />
                    <button className = "btn-search" onClick={() => this.search()}>
                        <span className="glyphicon glyphicon-search"></span>
                    </button>
                </center>
            </div>
            )
        }

        return (
            <div className = "header">
                <div className = "top-header">
                    <center>
                        Hubungi Kami di 14045!
                    </center>
                </div>

                <div className = "mid-header">
                    <center>
                        <h1 className = "logo">CelanaSobek</h1>
                    </center>
                </div>

                {test}
            </div>
        )
    }
    
}

export default Navbar;