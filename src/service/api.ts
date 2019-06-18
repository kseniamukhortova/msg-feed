import { IMessage } from "src/store/message";
// Mocked API calles
// data duplication is introduced to mock the views obtained by joining DB tables

export interface Messages {
    messages: IMessage[]
}

let messages = [
    {
        id: 'msg1',
        date: new Date(2019, 0, 1, 1, 50).getTime(),
        text: 'Happy New Year!',
        authorId: 'usr1',
        authorName: 'John Doe'
    },
    {
        id: 'msg2',
        date: new Date(2019, 1, 14, 6, 34).getTime(),
        text: 'Lets go party!',
        authorId: 'usr2',
        authorName: 'Alex'
    },
    {
        id: 'msg3',
        date: new Date(2019, 4, 3, 13, 45).getTime(),
        text: 'Weather is fine today',
        authorId: 'usr3',
        authorName: 'Norma'
    }
]

let users = [
    {
        userId: 'usr1',
        name: 'John Doe'
    },
    {
        userId: 'usr2',
        name: 'Alex'
    },
    {
        userId: 'usr3',
        name: 'Norma'
    }
]
let msgIdCounter = messages.length
let userIdCounter = users.length

export function getInitialData() {
    return Promise.resolve(<Messages>{ messages })
}

export function saveMessage(text: string, userId?: string, userName?: string) {
    let _userName: string
    let _userId: string
    const found = users.find(u => u.userId === userId)
    if (found) {
        _userName = found.name
        _userId = userId!
    } else {
        _userId = userId || `usr${++userIdCounter}`
        _userName = userName || 'Dummy Name'
        users.push({ userId: _userId, name: _userName })
    }

    const msgId = `msg${++msgIdCounter}`
    const newMessage = {
        id: msgId,
        date: new Date().getTime(),
        text,
        authorId: _userId,
        authorName: _userName
    } as IMessage
    messages.push(newMessage)
    return Promise.resolve(newMessage)
}