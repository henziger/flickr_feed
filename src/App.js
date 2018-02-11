import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import './App.css';

import ImageDetailPane from './ImageDetailPane.js';
import ImageListItem from './ImageListItem.js';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      image: undefined,
    };

    this.handler = this.handler.bind(this)
  }

  handler(index) {this.setState({image: index})}

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
    let main = null;
    if (this.state.image !== undefined) {
      let image = this.state.items[this.state.image];
      main =
        <div className="imageDetailPane">
          <ImageDetailPane media={image.media.m} title={image.title}
                           authorUrl={`https://www.flickr.com/photos/${image.author_id}/`}
                           author={image.author}
                           published={moment(image.published).format("Do MMM YYYY [at] HH:mm")}
                           link={image.link}
                           tags={image.tags.split(" ")}
                           goBack={() => this.handler(undefined)}
          />
        </div>
    } else {
      main =
        <div className="imageList">
        <ul>
          { this.state.items.map((image, index) =>
            <ImageListItem
              key={index}
              media={image.media.m} title={image.title}
              authorUrl={`https://www.flickr.com/photos/${image.author_id}/`}
              author={image.author}
              published={moment(image.published).format("Do MMM YYYY [at] HH:mm")}
              link={image.link}
              setImage={() => this.handler(index)}
            />)}
        </ul>
      </div>
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Flickr Public Feed</h1>
        </header>
        {main}
      </div>
    );
  }
}

export default App;
