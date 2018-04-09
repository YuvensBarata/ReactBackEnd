import React, {Component} from "react";
import { Link } from "react-router-dom";


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
            <div>
                <h2>My Season</h2>
                <br/>
                <ul>
                    {season}
                </ul>
            </div>
        )
    }
    
}

export default Main;