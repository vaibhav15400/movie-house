/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useParams } from 'react-router-dom';
import ShowMainData from '../component/show/ShowMainData';
import Details from '../component/show/Details';
import Seasons from '../component/show/Seasons';
import Cast from '../component/show/Cast';
import { ShowPageWrapper, InfoBlock } from './Show.style';
import { useShow } from '../misc/CustomHooks';

const Show = () => {
  const { id } = useParams();

  const { show, isloading, error } = useShow(id);

  // eslint-disable-next-line
  console.log('show', show);
  if (isloading) {
    return <h1>data is been loaded</h1>;
  }

  if (error) {
    return <div>Error occured : {error}</div>;
  }

  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.geners}
      />
      <InfoBlock>
        <h2>
          Details
          <Details
            status={show.status}
            network={show.network}
            premiered={show.premiered}
          />
        </h2>
      </InfoBlock>
      <InfoBlock>
        <h2>
          Seasons
          <Seasons seasons={show._embedded.seasons} />
        </h2>
      </InfoBlock>
      <InfoBlock>
        <h2>
          Cast
          <Cast cast={show._embedded.cast} />
        </h2>
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;
