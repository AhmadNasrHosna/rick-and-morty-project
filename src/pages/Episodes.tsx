import React, { useState } from 'react';

import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';

import { axiosEpisodeTypes } from '../../type';
import CustomSpinner from '../components/CustomSpinner';
import CustomError from '../components/CustomError';
import Layout from '../components/Layout';
import EpisodeCardWrapper from '../components/EpisodeCardWrapper';
import useInitialEpisodes from '../hooks/useInitialEpisodes';

function Episodes() {
  const [episodeList, setEpisodeList] = useState<axiosEpisodeTypes>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  useInitialEpisodes({ setDataList: setEpisodeList, setLoading, setError });

  const loadMoreEpisodes = async () => {
    try {
      if (episodeList?.info.next) {
        setLoading(true);
        const { data } = await axios.get<axiosEpisodeTypes>(episodeList?.info.next);
        const modifiedResults = [...episodeList.results, ...data.results];

        setEpisodeList(
          (prevState) =>
            ({ ...prevState, info: data.info, results: modifiedResults } as axiosEpisodeTypes),
        );
        setLoading(false);
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  if (loading) {
    <CustomSpinner />;
  }

  if (error) {
    <CustomError error={error} />;
  }

  return (
    <Layout>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMoreEpisodes}
        hasMore={!!episodeList?.info.next}
        loader={<CustomSpinner key={0} />}
      >
        {episodeList?.results?.map((episode) => (
          <EpisodeCardWrapper {...episode} key={`${episode.id}${episode.name}`} />
        ))}
      </InfiniteScroll>
    </Layout>
  );
}

export default Episodes;
