import React, {Component} from "react";
import { Link } from "react-router-dom";

import "../styles/Main.css";

class Main extends Component {

    getseasonid = (id) => {
        this.props.getSeasonID(id);
    }

    render() {

        const season = this.props.season.map((x) =>{
            return (
                <li key = {x.id}>
                    <Link to = {`/user_category/${x.id}`} onClick={() => this.getseasonid(x.id)}> {x.season} </Link>
                </li>
            )
        })

        return(
            <div className = "container">
                <div className = "panel panel-default col-md-offset-4 col-md-4 col-lg-offset-4 col-lg-4">

                    <div className = "panel-heading">
                        <h3 className = "panel-title">Choose Your Season</h3>
                    </div>
            
                    <div className = "panel-body">
                        <ul>
                            {season}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default Main;