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
      query: "",
    };

    this.handler = this.handler.bind(this);
    this.setQuery = this.setQuery.bind(this);
    this.makeQuery = this.makeQuery.bind(this);
  }

  handler(index) {this.setState({image: index})}

  setQuery(event) {
    this.setState({query: event.target.value});
  }

  makeQuery(event) {
    this.updateImageFeed();
    event.preventDefault();
  }

  updateImageFeed() {
    axios.get(`https://api.flickr.com/services/feeds/photos_public.gne?tags=${this.state.query || "potato"}&tagmode=all&format=json&nojsoncallback=true`)
      .then((response) => {
        this.setState({
          items: response.data.items
        })
      })
      .catch((err) => {
        console.log(err)
      });
    return false;
  }

  componentDidMount() {
    this.updateImageFeed();
  }

  render() {
    let main = null;
    if (this.state.image !== undefined) {
      let image = this.state.items[this.state.image];
      main =
        <div className="image-detail-pane">
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
        <div className="image-list">
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
          <h1 className="App-title align-header">Flickr Public Feed</h1>
          <div className="search-container">
            <form onSubmit={this.makeQuery}>
              <input className="search-field" type="text" value={this.state.query} onChange={this.setQuery} placeholder={"Search"}/>
              <button type="submit">
                <i className="fa fa-search" />
              </button>
            </form>
          </div>
        </header>
        {main}
      </div>
    );
  }
}

export default App;
