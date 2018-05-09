import React, {Component} from 'react';
import {WebView, View, Text} from 'react-native';

class App extends Component {
  render() {
    return (


        // <WebView source = {{uri : "https://www.tokopedia.com/"}} />
        <WebView source = {{uri: "192.168.56.1:8082/user_home"}} />

      
    )
  }
}

export default App;
