import React, {Component} from 'react';
import { Container, Text, Button } from 'native-base';

import axios from 'axios';

class Detail extends Component {

    constructor(){
        super();
        this.state = {detail: []}
      }
    
      componentWillMount() {
        axios.get(`http://192.168.1.5:3001/user_product_details/${this.props.navigation.state.params.productID}`)
        .then((ambilData) => {
        //   this.setState({detail: ambilData.data.rows2});
          console.log(ambilData.data.rows2);
        })
      }

    render() {
        return(
            <Container>
                <Content>
                    
                </Content>

                <Text>{this.props.navigation.state.params.productName}</Text>
                <Text>{this.props.navigation.state.params.productDesc}</Text>
                <Text>{this.props.navigation.state.params.productPrice}</Text>
                <Text>{this.props.navigation.state.params.productImage}</Text>
            </Container>
        )
    }
}

export default Detail;