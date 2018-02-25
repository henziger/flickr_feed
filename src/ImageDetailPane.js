import React, {Component} from 'react';
import MediaQuery from 'react-responsive';

import './ImageDetailPane.css';
import PublishDate from './PublishDate';
import getAuthorName from './helpers';

class ImageDetailPane extends Component {

  lorem1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent molestie venenatis mi, eget fermentum orci vestibulum et. Donec quis euismod ligula, ut pharetra nibh. Duis pulvinar ipsum cursus odio pretium tristique. Integer sit amet tristique est. Nam accumsan mattis metus, eget mollis turpis sagittis vel. Aliquam interdum fringilla nulla quis scelerisque. Morbi sem urna, accumsan a porta maximus, gravida vel sapien. Pellentesque massa risus, pulvinar et tellus scelerisque, lacinia maximus dolor. Cras bibendum, est sed gravida tempus, ex felis volutpat velit, at efficitur erat turpis sed justo. Duis volutpat dui turpis, quis semper augue sodales vel.";
  lorem2 = "Nam eget sodales ex. Curabitur ornare vitae lacus a lobortis. Ut ultrices ligula scelerisque, scelerisque nulla laoreet, ultrices massa. Aenean a lectus dui. Praesent ac diam ex. Nam tempor ipsum nec convallis facilisis. Etiam tellus nulla, venenatis porttitor fringilla in, consectetur id nisi. Nunc non tellus accumsan, consectetur odio sit amet, posuere tortor. Praesent finibus vestibulum est non convallis. Cras dolor dui, lacinia a volutpat in, sodales id urna. ";

  render () {

    return (
      <div className="image-detail-pane">
        <div className="image-header-container">
          <div className="image-detail-title">
            <a href={this.props.link}><h2 className="image-detail-header">{this.props.title}</h2></a>
            <MediaQuery query="(max-width: 500px)">
              <div className="image-detail-meta">
                <a href={this.props.authorUrl}>{getAuthorName(this.props.author)}</a>
                <PublishDate published={this.props.published}/>
              </div>
            </MediaQuery>
            <MediaQuery query="(min-width: 501px)">
              <div className="image-detail-meta">
                <a href={this.props.authorUrl}>{getAuthorName(this.props.author)}</a>
                <div>&nbsp;|&nbsp;</div>
                <PublishDate published={this.props.published}/>
              </div>
            </MediaQuery>
          </div>

          <button className="back-button" onClick={this.props.goBack}>Back</button>

        </div>

        <div className="image-body-container">
          <div className="image-detail-preview">
            <img src={this.props.media} alt={this.props.title}/>
          </div>
          <div className="image-description">
            <div>
              <p>{this.lorem1}</p>
              <p>{this.lorem2}</p>
            </div>
            <div>
              <div className="tag">Tags:</div>
              {
                this.props.tags.map((tag, index) => {
                  return (
                    <div className="tag" key={index}>
                      <a href={`https://www.flickr.com/photos/tags/${tag}`}>{tag}</a>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ImageDetailPane;
