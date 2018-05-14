import React , {Component} from 'react';
import {Container, Text} from 'native-base';
import { createStackNavigator } from 'react-navigation';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import Main from './components/Main';
import Category from './components/Category';
import Product from './components/Product';
import Detail from './components/Detail';

const RootStack = createStackNavigator(
  {
    Main: {screen: Main},
    Category : {screen: Category},
    Product : {screen: Product},
    Detail : {screen: Detail}
  },
  {
    initialRouteName : "Main"
  }
)

class App extends Component {

  render() {

    return (
      <Container>
        <RootStack />
      </Container>
    )
  }
}

export default App;
