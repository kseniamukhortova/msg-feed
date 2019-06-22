import { types, flow } from 'mobx-state-tree'
import { Message } from './message';
import { saveMessage, getMessages, getUsers, saveAuthor } from 'src/service/api';
import { Author } from './author';

export const AppStore = types
    .model('Store', {
        messages: types.array(Message),
        users: types.array(Author),
        userId: types.maybe(types.number),
        userName: types.maybe(types.string),
        search: types.string
    })
    .actions(self => ({
        saveMessage: flow(function*(text: string, authorName?: string) {
            const found = self.userId ? self.users.find(u => u.id === self.userId) : null
            const author = yield (
                found ? Promise.resolve(found): 
                saveAuthor(authorName!)
            )
            if (!found) {
                self.users.push(author)
            }

            const message = yield saveMessage(text, author.id)
            self.messages.push(message)
            self.userId = author.id
            self.userName = author.name
        }),
        getAuthor(authorId: number) {
            return self.users.find(u => u.id === authorId)
        },
        saveSearch(search: string) {
            self.search = search
        }
    }))

let store: any


export function configureStore() {
    if (store) {
        return Promise.resolve(store)
    }

    return Promise.all([getMessages(), getUsers()])
        .then(([messages, users]: any[]) => {
            store = AppStore.create({
                messages,
                users,
                search: ''
            })
            return store
        })
}

export type IAppStore = typeof AppStore.Type

export interface ProviderStores {
    store: IAppStore
}
