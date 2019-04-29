export const defaults = {
    userLectures: [
        {
            __typename: 'Lecture',
            lecture: 'hello world!',
            id: '1234',
            category: 'A13',
            professor: '정승우',
            classroom: '123',
            credit: 3,
            color: 'rgb(123,123,123)',
            time: ['123','123']
        },
    ]
};

export const typeDefs = [ 
    ` 
    schema {
        query: Query,
        mutation: Mutation
    }

    type Query {
        lectures: [Lecture]!,
        lecture(id: String!): Lecture
    }
    
    type Mutation {
        addLecture(
            lecture: String!,
            id: String!, 
            category: String!,
            professor: String!,
            classroom: String!,
            credit: Int!,
            color: String!,
            time: []
        ) : Lecture

        deleteLecture(
            id: String!
        ) : Lecture

        editLecture(
            lectuer: String!,
            id: String!,
            category: String!,
            professor: String!,
            classroom: String!,
            credit: Int!,
            colorL String!,
            time: []
        ) : Lecture
    }

    type Lecture { 
        lecture: String!,
        id: String!,
        category: String!,
        professor: String!,
        classroom: String!,
        credit: Int!,
        color: String!,
        time: []
    }
    `
]

// Lecture 구조 {
//     lecture: 강의 이름,
//     id: 학수번호,
//     category: 전공, 교양,
//     professor: 교수,
//     classroom: 강의실,
//     credit: 학점,
//     color: 표시 색깔,
//     time: 시간   
// }