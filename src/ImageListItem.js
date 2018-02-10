import React, { Component } from 'react';
import './ImageListItem.css';

class ImageListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {media: props.media, alt: props.alt};
  }

  render () {
    return (
      <div className="ImagePreview">
        <a href="#detail"><img src={this.state.media} alt={this.state.alt}/></a>
      </div>
    )
  }
}

export default ImageListItem;
