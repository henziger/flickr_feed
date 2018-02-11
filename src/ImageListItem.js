import React, { Component } from 'react';
import './ImageListItem.css';

// Assumes that all author elements from the Flickr API
// have the format of 'email@example.com ("FirstName LastName")'
function getAuthorName(authorData) {
  return authorData.split(" (\"")[1].replace("\")", "")
}

class ImageListItem extends Component {

  constructor(props) {
    super(props);
    this.state = props;
  }

  render () {
    return (
      <div className="container imageItem">
        <div className="imagePreview">
          <a href="#detail"><img src={this.state.media} alt={this.state.title}/></a>
        </div>
        <div className="imageSummary">
          <a href="#detail"><h2 className="imageTitle">{this.state.title}</h2></a>
          <div className="container">
            <p>By <a href={this.state.authorUrl}>{getAuthorName(this.state.author)}</a></p>
            <p>Published: {this.state.published}</p>
            <p><a href={this.state.link}>View on Flickr</a></p>
          </div>
        </div>
      </div>
    )
  }
}

export default ImageListItem;
