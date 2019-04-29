import ApolloClient from 'apollo-boost';
import { defaults, typeDefs } from './clientState';
import { LECTURE_FRAGMENT } from './fragment';

const resolvers =  {
    Query: {
        lectures: (_, variables, context) => {
            return defaults['userLectures'];
        },

        lecture: (_, variables, { cache }) => {
            const id = cache.config.dataIdFromObject({
                __typename:'Lecture', 
                id: variables.id
            });
            const lecture = cache.readFragment( { fragment: LECTURE_FRAGMENT, id })
            return lecture;
        }
    }
}

const client = new ApolloClient ({
    uri : 'https://48p1r2roz4.sse.codesandbox.io',
    clientState: {
        typeDefs,
        defaults,
        resolvers
    }
});

export default client;