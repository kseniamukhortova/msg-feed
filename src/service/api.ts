import { IMessage } from "src/store/message";
import { requestGet, requestPost } from "utils/requestor";

export interface Messages {
    messages: IMessage[]
}

const svcUrl = 'http://localhost:3001/'

function msgDtoToMessage({ id, user_id, message, created_at }: any) {
    return {
        id,
        userId: user_id,
        message,
        date: created_at
    }
}

function userDtoToAuthor(user: any) {
    return {
        id: user.id,
        name: user.name,
        data: user
    }
}

export function getMessages() {
    return requestGet(svcUrl, 'messages')
        .then(res => res.messages.map(
            (dto: any) => msgDtoToMessage(dto))
        )
}

export function getUsers() {
    return requestGet(svcUrl, 'users')
        .then(res => (res.users as any[]).map(u => userDtoToAuthor(u)))
}

export function saveAuthor(name: string) {
    return requestPost(svcUrl, 'add_user', { name })
        .then(u => userDtoToAuthor(u))
}

export function saveMessage(message: string, user_id: number) {
    return requestPost(svcUrl, 'add_message', { message, user_id })
        .then(m => msgDtoToMessage(m))
}
