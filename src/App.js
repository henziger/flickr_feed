import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import ImageListItem from './ImageListItem.js';

class App extends Component {

  state = {
    items: []
  };

  componentDidMount() {
    axios.get("https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&nojsoncallback=true")
      .then((response) => {
        this.setState({
          items: response.data.items
        })
      })
      .catch((err) => {
        console.log(err)
      })

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Flickr Public Feed</h1>
        </header>
        <ul>
          { this.state.items.map(image => <ImageListItem key={image.link} media={image.media.m} alt={image.title}/>)}
        </ul>

      </div>
    );
  }
}

export default App;
