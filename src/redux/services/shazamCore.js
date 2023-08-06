import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const url = 'https://shazam.p.rapidapi.com/shazam-events/list?artistId=73406786&l=en-US&from=2022-12-31&limit=50&offset=0';
 

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '78fe10b33amshf0672e8f58ad038p1f1f12jsnafd588a9fcbf');

            return headers;
},
}),

    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => '/charts/track?locale=en-US&pageSize=20&startFrom=0' }),
    }),
});

export const {
    useGetTopChartsQuery,
} = shazamCoreApi;