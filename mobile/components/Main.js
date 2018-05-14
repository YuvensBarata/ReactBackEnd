import React, {Component} from 'react';
import { Container, Text, Button } from 'native-base';

import axios from 'axios';

class Main extends Component {

    constructor(){
        super()
        this.state = {data: []}
      }
    
      componentWillMount() {
        axios.get("http://192.168.1.5:3001/user_home")
        .then((ambilData) => {
          this.setState({data: ambilData.data})
        })
      }

    render () {

        const datafinal = this.state.data.map((item, index) => {
            var id = item.id;

            return (
                <Button block light onPress={() => this.props.navigation.navigate("Category",{seasonID: id})} key = {index}><Text> {item.season} </Text></Button>
            )
          })

        return(
            <Container>
                {datafinal}
            </Container>
        )
    }
}

export default Main;