import React from 'react';
import MediaQuery from 'react-responsive';
import moment from 'moment';

function PublishDate(props) {
  return (
    <div>
      <MediaQuery query="(max-width: 500px)">
        <div className="image-date">{moment(props.published).format("YYYY-MM-DD")}</div>
      </MediaQuery>
      <MediaQuery query="(min-width: 501px)">
        <div className="image-date">Published: {moment(props.published).format("Do MMM YYYY [at] HH:mm")}</div>
      </MediaQuery>
    </div>
  )
}

export default PublishDate;
