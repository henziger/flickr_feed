import React, {Component} from 'react';
import MediaQuery from 'react-responsive';

import './ImageListItem.css';
import getAuthorName from './helpers';
import PublishDate from './PublishDate';

class ImageListItem extends Component {

  render () {

    return (
      <div className="image-item">
        <div className="image-preview" onClick={this.props.setImage}>
          <img src={this.props.media} alt={this.props.title}/>
        </div>
        <div className="image-summary">
          <div className="image-title" onClick={this.props.setImage}>{this.props.title}</div>
          <MediaQuery query="(max-width: 800px)">
            <PublishDate published={this.props.published}/>
            <div className="image-meta">
              <div className="image-author">by <a href={this.props.authorUrl}>{getAuthorName(this.props.author)}</a></div>
              <div><a href={this.props.link}>View on Flickr</a></div>
            </div>
          </MediaQuery>
          <MediaQuery query="(min-width: 801px)">
            <div className="image-meta">
              <div className="image-author">by <a href={this.props.authorUrl}>{getAuthorName(this.props.author)}</a></div>
              <PublishDate published={this.props.published}/>
              <div><a href={this.props.link}>View on Flickr</a></div>
            </div>
          </MediaQuery>
          </div>
        </div>
    )
  }
}

export default ImageListItem;
