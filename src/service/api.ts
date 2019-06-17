import { IMessage } from "src/store/message";
// const uuidv1 = require('uuid/v1');

export interface InitialInfo {
    messages: IMessage[]
}

export function getInitialData(userId?: string) {
    return Promise.resolve(<InitialInfo>{
        messages: [
            {
                id: 1,
                date: new Date(2019, 0, 1, 1, 50).getTime(),
                text: 'Happy New Year!',
                authorId: 'usr1',
                authorName: 'John Doe'
            },
            {
                id: 2,
                date: new Date(2019, 1, 14, 6, 34).getTime(),
                text: 'Lets go party!',
                authorId: 'usr2',
                authorName: 'Alex'
            },
            {
                id: 3,
                date: new Date(2019, 4, 3, 13, 45).getTime(),
                text: 'Weather is fine today',
                authorId: 'usr3',
                authorName: 'Norma'
            }
        ]
    })
}
