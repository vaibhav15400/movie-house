/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import MainPageLayout from '../component/MainPageLayout';
import { useShows } from '../misc/CustomHooks';
import { apiget } from '../misc/config';
import ShowGrid from '../component/show/ShowGrid';

const Starred = () => {
  const [starred] = useShows();
  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map(showId => apiget(`/shows/${showId}`));

      Promise.all(promises)
        .then(apiData => apiData.map(show => ({ show })))
        .then(results => {
          setShows(results);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [starred]);

  return (
    <MainPageLayout>
      {isLoading && <div>SHOWS ARE STILL LOADING</div>}{' '}
      {error && <div>ERROR OCCURRED: {error}</div>}
      {!isLoading && !shows && <div>NO SHOWS WERE ADDED</div>}
      {!isLoading && !error && shows && <ShowGrid data={shows} />}
    </MainPageLayout>
  );
};

export default Starred;
