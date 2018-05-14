import React, {Component} from 'react';
import { Container, Text, Button } from 'native-base';

import axios from 'axios';

class Category extends Component {

    constructor(){
        super();
        this.state = {category: []}
      }
    
      componentWillMount() {
        axios.get(`http://192.168.1.5:3001/user_category/${this.props.navigation.state.params.seasonID}`)
        .then((ambilData) => {
          this.setState({category: ambilData.data.rows2});
        })
      }

    render() {

        const datafinal = this.state.category.map((item, index) => {
            var id = item.id;

            return (
                <Button block light onPress={() => this.props.navigation.navigate("Product",{categoryID: id})} key = {index}><Text> {item.category} </Text></Button>
            )
          })

        return(
            <Container>
                {datafinal}
                {/* <Text>{this.props.navigation.state.params.seasonID}</Text> */}
            </Container>
        )
    }
}

export default Category;