/* eslint-disable arrow-body-style */
import React from 'react';
import IMG_PLACEHOLDER from '../../images/not-found.png';
import { Star } from '../styled';
import { MainDataWrapper, TagList } from './ShowMainData.style';

const ShowMainData = ({ name, rating, summary, tags, image }) => {
  const mappedtags = () => {
    tags.map((tag, i) => <span key={i}>{tag}</span>);
  };
  return (
    <MainDataWrapper>
      <img src={image ? image.original : IMG_PLACEHOLDER} alt="show-cover" />
      <div className="text-side">
        <div className="Headline">
          <h1>{name}</h1>
          <div>
            <Star active />
            <span>{rating.average || 'N/A'}</span>
          </div>
        </div>
        <div
          className="summary"
          dangerouslySetInnerHTML={{ __html: summary }}
        />
        Tags: <TagList>{mappedtags}</TagList>
      </div>
    </MainDataWrapper>
  );
};

export default ShowMainData;
