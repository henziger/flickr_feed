import React, { Component } from 'react';
import './ImageListItem.css';
import getAuthorName from './helpers';

class ImageListItem extends Component {

  render () {
    return (
      <div className="container imageItem">
        <div className="imagePreview" onClick={this.props.setImage}>
          <img src={this.props.media} alt={this.props.title}/>
        </div>
        <div className="imageSummary">
          <div onClick={this.props.setImage}><h2 className="imageTitle">{this.props.title}</h2></div>
          <div className="container">
            <p>By <a href={this.props.authorUrl}>{getAuthorName(this.props.author)}</a></p>
            <p>Published: {this.props.published}</p>
            <p><a href={this.props.link}>View on Flickr</a></p>
          </div>
        </div>
      </div>
    )
  }
}

export default ImageListItem;
