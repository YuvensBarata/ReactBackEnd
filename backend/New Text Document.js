import React, { Component } from 'react';
import axios from 'axios';

class App extends Component 
{

    post(obj) 
    {
      axios.post('http://localhost:3001/post', 
      { 
        name: obj.name.value, 
        phonenumber: obj.phonenumber.value
      })
      .then(function(response){
        console.log('saved successfully')
      });
    }

    render()
    {
      axios.get('http://localhost:3001/')
      .then((ambilData) =>
      {
        console.log(ambilData);
        console.log(ambilData.data[0].name);
      })

      return (
        <div>
          <center>
            <input type="text" ref="name" placeholder="Name"/><br/>
            <input type="text" ref="phonenumber" placeholder="Phone Number"/><br/>
            <input type="submit" onClick={() => this.post(this.refs)} value="Submit"/><br/>
          </center>
        </div>
      );
    }
}

export default App;