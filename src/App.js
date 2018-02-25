import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';
import './App.css';

import Header from './Header.js';
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
      searchfield: "",
    };
  }

  setImage(index) {
    if (index !== undefined)
      window.location.hash = index;
    else
      window.location.hash = "";
    this.setState({image: index})
  }

  updateField(event) {
    this.setState({searchfield: event.target.value});
  }

  getQuery() {
    // Prevent non-tagged queries. Bug or feature? Depends on who you're asking :)
    return this.state.query || "potato";
  }

  makeQuery(event) {
    this.setState({query: this.state.searchfield}, this.getImageFeed);
    event.preventDefault();
  }

  makeApiRequest(onOkay) {
    fetchJsonp(`https://api.flickr.com/services/feeds/photos_public.gne?tags=${this.getQuery()}&tagmode=all&format=json`,
      {
        jsonpCallback: 'jsoncallback',
      })
      .then(results => {
        return results.json();
      })
      .then(json => {
        onOkay(json)
      })
      .catch(err => {
        console.log(err);
      });
  }

  getImageFeed() {
    this.makeApiRequest(json => {
      this.setState({
        items: json.items,
        image_links: new Set(json.items.map(item => item.link))
      })
    })
  }

  extendImageFeed() {
    this.makeApiRequest(json => {
      this.setState({
        items: [...json.items.filter(item => !this.state.image_links.has(item.link)), ...this.state.items],
        image_links: new Set([...this.state.image_links, ...json.items.map(item => item.link)]),
        new_images: 0,
      })
    })
  }

  checkForNewImages() {
    // The Flickr API will only fetch 20 images, so we pretend that there will only ever be
    // at most 20 new images.
    if (this.state.new_images >= 20)
      return;

    this.makeApiRequest(json => {

        let i = 0;
        json.items.forEach(item => {
          if (!this.state.image_links.has(item.link)) {
            i++;
          }
        });

        this.setState({
          new_images: i,
        })
      })
  }

  componentDidMount() {
    this.getImageFeed();
    setInterval(() => this.checkForNewImages(), 5000);
    window.onpopstate = (event) => {
      this.setState({ image: parseInt(window.location.hash.substring(1), 10) || undefined });
    };
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
                           published={image.published}
                           link={image.link}
                           tags={image.tags.split(" ")}
                           goBack={() => this.setImage(undefined)}
          />
        </div>
    } else {
      main =
        <div className="image-list">
          <ul>
            { new_images_link }
            { this.state.items.map((image, index) =>
              <ImageListItem
                key={index}
                media={image.media.m} title={image.title}
                authorUrl={`https://www.flickr.com/photos/${image.author_id}/`}
                author={image.author}
                published={image.published}
                link={image.link}
                setImage={() => this.setImage(index)}
              />)}
          </ul>
        </div>
    }

    return (
      <div className="App">
        <Header makeQuery={(event) => this.makeQuery(event)}
                updateField={(event) => this.updateField(event)}
        />
        {main}
      </div>
    );
  }
}

export default App;
