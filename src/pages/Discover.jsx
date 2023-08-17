import { Error, Loader, SongCard} from '../components';
// import { genres } from '../assets/constants';

import { useGetTopChartsQuery } from '../redux/services/shazamCore';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

const Discover = () => {

    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state) => state.player);

    //console.log(genres);

    // const genreTitle = 'Pop';

   
    const pageSize = 20; 

  // State to keep track of the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch the data for the current page
  const { data, isFetching, error } = useGetTopChartsQuery({
    startFrom: (currentPage - 1) * pageSize, 
    pageSize,
  });

   // const songs = data.tracks;
    const tracks = data?.tracks || [];
    // console.log(tracks);

    // console.log(isFetching);
    // console.log(error);


  // Handle previous and next page button clicks
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };


    if(isFetching) return <Loader title="Loading songs..." />;

    if(error) return <Error />;
    
    return (
        <div className='flex flex-col'>

            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                <h2 className="font-bold text-3xl text-white text-left">
                    Discover 
                </h2>
                
                {/* <select name="" id="" onChange={() => {}} value="" className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-9 mt-5">
                    {genres.map((genre) => 

                        <option value={genre.value} key={genre.value}>{genre.title}</option>

                    )}
                </select> */}
            </div>

            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {tracks?.map((song, i) => (
                    <SongCard
                        key={song.key}
                        song={song}
                        i={i}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={tracks}
                    />
                ))}
            </div>

            <div className="mt-16 flex justify-center">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1} // Disable button on the first page
                  className="bg-gradient-to-tl from-white/10 to-[#8262b9] text-white px-4 py-2 rounded-lg mr-2"
                >
                    &lt;
                </button>
                <button
                  onClick={handleNextPage}
                  // Disable button on the last page (assuming you know the total number of pages)
                  disabled={currentPage === 10}
                  className="bg-gradient-to-tl from-white/10 to-[#8262b9] text-white px-4 py-2 rounded-lg"
                >
                  &gt;
                </button>
            </div>

        </div>
    );
};
export default Discover;
