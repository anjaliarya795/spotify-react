import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const url = 'https://shazam.p.rapidapi.com/shazam-events/list?artistId=73406786&l=en-US&from=2022-12-31&limit=50&offset=0';
 

export const shazamApi = createApi({
    reducerPath: 'shazamApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '78fe10b33amshf0672e8f58ad038p1f1f12jsnafd588a9fcbf');

            return headers;
},
}),

    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => '/charts/track?locale=en-US&pageSize=20&startFrom=0' }),
        getSongDetails: builder.query({ query: ({ songid }) => `/songs/get-details?key=${songid}&locale=en-US` }),
        getArtistDetails: builder.query({ query: (artistId) => `/artists/get-details?id=${artistId}&l=en-US` }),
        getSongRelated: builder.query({ query: ({ songid }) => `/songs/list-recommendations?key=${songid}&locale=en-US` }),
        getSongsBySearch: builder.query({ query: (searchTerm) => `/search?term=${searchTerm}&locale=en-US&offset=0&limit=5`}),
        // getArtistSongs: builder.query({ query: ({artistId}) => `/songs/list-artist-top-tracks?id=${artistId}&locale=en-US'`}),
        getSongsByCountry: builder.query({ query: (countryCode) => `` }),




    }),
});

export const {
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetArtistDetailsQuery,
    useGetSongRelatedQuery,
    useGetSongsBySearchQuery,
    // useGetArtistSongsQuery,
    useGetSongsByCountryQuery,
    
} = shazamApi;