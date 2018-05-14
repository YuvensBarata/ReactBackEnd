import React, {Component} from 'react';
import {Image} from 'react-native';
import { Container, Text, Button, Content, Card, CardItem, Left, Body} from 'native-base';

import axios from 'axios';

class Product extends Component {

    constructor(){
        super();
        this.state = {product: []}
      }
    
      componentWillMount() {
        axios.get(`http://192.168.1.5:3001/user_product/${this.props.navigation.state.params.categoryID}`)
        .then((ambilData) => {
          this.setState({product: ambilData.data.rows2});
        })
      }

    render() {

        const foldergambar = "http://192.168.1.5:3001/images/"

        const datafinal = this.state.product.map((item, index) => {
            var id = item.id;
            var price = item.price;
            var desc = item.description;
            var image = item.product_image_name;
            var name = item.product_name;

            return (
                    <Card key = {index} style = {{flex : 0}}>

                        <CardItem>
                            <Left>
                                <Body>
                                    <Text> {name} </Text>
                                    <Text note> Rp {price} </Text>
                                </Body>
                            </Left>
                        </CardItem>

                        <CardItem>
                            <Body>
                                <Image source = {{uri: `${foldergambar+image}`}} style = {{height: 200, width : 320, flex: 1}} />
                            </Body>
                        </CardItem>
                        
                        <CardItem>
                            <Button block primary onPress={() => this.props.navigation.navigate("Detail",{
                                productID: id,
                                productPrice: price,
                                productDesc: desc,
                                productImage : image,
                                productName : name})}>
                                <Text> Buy Now </Text>
                            </Button>
                        </CardItem>
                    </Card>
            )
          })

        return(
            <Container>
                <Content>
                    {datafinal}
                </Content>
            </Container>
        )
    }
}

export default Product;