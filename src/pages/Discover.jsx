import { Error, Loader, SongCard} from '../components';
import { genres } from '../assets/constants';

import { useGetTopChartsQuery } from '../redux/services/shazamCore';

import { useDispatch, useSelector } from 'react-redux';

const Discover = () => {

    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state) => state.player);

    // console.log(genres);

    const { data, isFetching, error } = useGetTopChartsQuery();

    const genreTitle = 'Pop';

    // const songs = data.tracks;
    const tracks = data?.tracks || [];
    console.log(tracks);

    // console.log(isFetching);
    // console.log(error);

    if(isFetching) return <Loader title="Loading songs..." />;

    if(error) return <Error />;
    
    return (
        <div className='flex flex-col'>

            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                <h2 className="font-bold text-3xl text-white text-left">
                    Discover {genreTitle}
                </h2>
                
                <select name="" id="" onChange={() => {}} value="" className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-9 mt-5">
                    {genres.map((genre) => 

                        <option value={genre.value} key={genre.value}>{genre.title}</option>

                    )}
                </select>
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

        </div>
    );
};
export default Discover;
