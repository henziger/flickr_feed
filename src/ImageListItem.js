import React, { Component } from 'react';
import './ImageListItem.css';
import getAuthorName from './helpers';

class ImageListItem extends Component {

  render () {
    return (
      <div className="container image-item">
        <div className="image-preview" onClick={this.props.setImage}>
          <img src={this.props.media} alt={this.props.title}/>
        </div>
        <div className="image-summary">
          <div onClick={this.props.setImage}><h2 className="image-title">{this.props.title}</h2></div>
          <div className="container image-meta">
            <div className="image-author">By <a href={this.props.authorUrl}>{getAuthorName(this.props.author)}</a></div>
            <div>Published: {this.props.published}</div>
            <div><a href={this.props.link}>View on Flickr</a></div>
          </div>
        </div>
      </div>
    )
  }
}

export default ImageListItem;
