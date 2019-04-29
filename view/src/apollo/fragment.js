import gql from 'graphql-tag';

export const LECTURE_FRAGMENT = gql`
    fragment LecturePars on Lecture {
        lecture
        id
        category
        professor
        classroom
        credit
        color
        time
    }
`