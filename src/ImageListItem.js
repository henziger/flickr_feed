import React, { Component } from 'react';
import './ImageListItem.css';
import formatDate from './dateFormatter.js';

class ImageListItem extends Component {

  constructor(props) {
    super(props);
    this.state = props;
  }

  render () {
    return (
      <div>
        <div className="ImagePreview">
          <a href="#detail"><img src={this.state.media} alt={this.state.title}/></a>
        </div>
        <div className="ImageSummary">
          <a href="#detail"><h2>{this.state.title}</h2></a>
          <a href={this.state.authorUrl}><p>{this.state.author}</p></a>
          <p>Published: {formatDate(new Date(this.state.published))}</p>
          <a href={this.state.link}>View on Flickr</a>
        </div>
      </div>
    )
  }
}

export default ImageListItem;
