import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const url = 'https://shazam.p.rapidapi.com/shazam-events/list?artistId=73406786&l=en-US&from=2022-12-31&limit=50&offset=0';
 
// const apiKey = process.env.REACT_APP_API_KEY;


export const shazamApi = createApi({
    reducerPath: 'shazamApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY);

            return headers;
},
}),

    endpoints: (builder) => ({
        
        getSongDetails: builder.query({ query: ({ songid }) => `/songs/get-details?key=${songid}&locale=en-US` }),
        getArtistDetails: builder.query({ query: (artistId) => `/artists/get-details?id=${artistId}&l=en-US` }),
        getSongRelated: builder.query({ query: ({ songid }) => `/songs/list-recommendations?key=${songid}&locale=en-US` }),
        getSongsBySearch: builder.query({ query: (searchTerm) => `/search?term=${searchTerm}&locale=en-US&offset=0&limit=5`}),
        getArtistSongs: builder.query({ query: (artistId) => `/artists/get-top-songs?id=${artistId}&l=en-US`}),
        getSongsByCountry: builder.query({ query: (listId) => `/charts/track?&listId=ip-country-chart-${listId}&pageSize=20&startFrom=0` }),
        getSongsByGenre: builder.query({ query: (listId) => `/charts/track?&listId=ip-country-chart-${listId}&pageSize=20&startFrom=0` }),
        getTopCharts: builder.query({ query: ({ startFrom, pageSize }) => `/charts/track?pageSize=${pageSize}&startFrom=${startFrom}`}),

        




    }),
});

export const {
    // useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetArtistDetailsQuery,
    useGetSongRelatedQuery,
    useGetSongsBySearchQuery,
    useGetArtistSongsQuery,
    useGetSongsByCountryQuery,
    useGetSongsByGenreQuery,
    useGetTopChartsQuery
    
} = shazamApi;