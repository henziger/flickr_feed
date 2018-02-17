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
      image_links: new Set(),
      new_images: 0,
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

  getQuery() {
    return this.state.query || "potato";
  }

  makeQuery(event) {
    this.getImageFeed();
    event.preventDefault();
  }

  getImageFeed() {
    axios.get(`https://api.flickr.com/services/feeds/photos_public.gne?tags=${this.getQuery()}&tagmode=all&format=json&nojsoncallback=true`)
      .then((response) => {
        this.setState({
          items: response.data.items,
          image_links: new Set(response.data.items.map(item => item.link))
        })
      })
      .catch((err) => {
        console.log(err)
      });
    return false;
  }

  extendImageFeed() {
    axios.get(`https://api.flickr.com/services/feeds/photos_public.gne?tags=${this.getQuery()}&tagmode=all&format=json&nojsoncallback=true`)
      .then((response) => {
        this.setState({
          items: [...response.data.items.filter(item => !this.state.image_links.has(item.link)), ...this.state.items],
          image_links: new Set([...this.state.image_links, ...response.data.items.map(item => item.link)]),
          new_images: 0,
        })
      })
      .catch((err) => {
        console.log(err)
      });
    return false;
  }

  checkForNewImages() {
    axios.get(`https://api.flickr.com/services/feeds/photos_public.gne?tags=${this.getQuery()}&tagmode=all&format=json&nojsoncallback=true`)
      .then((response) => {

        let i = this.state.new_images;
        response.data.items.forEach(item => {
          if (!this.state.image_links.has(item.link)) {
            i++;
          }
        });

        this.setState({
          new_images: i,
        })
      })
      .catch((err) => {
        console.log(err)
      });
  }

  componentDidMount() {
    this.getImageFeed();
    this.searchBar.focus();
    setInterval(() => this.checkForNewImages(), 1000)
  }

  render() {
    let main;
    let new_images_link;

    if (this.state.new_images) {
      new_images_link =
        <li>
          <div className="new-images-button" onClick={() => this.extendImageFeed()}>
            {this.state.new_images} new image{this.state.new_images > 1 ? "s" : ""}
          </div>
        </li>
    }

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
        <div>
          <div className="image-list">
            <ul>
              { new_images_link }
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
        </div>
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title align-header">Flickr Public Feed</h1>
          <div className="search-container">
            <form onSubmit={this.makeQuery}>
              <input className="search-field" type="text" value={this.state.query} onChange={this.setQuery}
                     placeholder={"Search"}
                     ref={(input) => { this.searchBar = input; }}
              />
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
