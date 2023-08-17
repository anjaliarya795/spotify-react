import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { useGetArtistDetailsQuery, useGetArtistSongsQuery } from '../redux/services/shazamCore';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  console.log(artistId)
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);

  // const { data: artistSongs, isFetching: isFetchingArtistSongs} = useGetArtistSongsQuery(artistId);
  
  // console.log(typeof(artistSongs))
  // console.log(artistSongs)

  // const songsByArtist = artistSongs.data

  if (isFetchingArtistDetails) return <Loader title="Loading artist details..." />;
  
  // if (isFetchingArtistSongs) return <Loader title="Loading songs..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId={artistId}
        artistData={artistData?.data[0]}
      />

      {/* <RelatedSongs
        data={artistSongs}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      /> */}

              {artistData?.tracks?.length ? <RelatedSongs
                data={artistData}
                artistId={artistId}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
            /> : null
            }
    </div>
  );
};

export default ArtistDetails;
