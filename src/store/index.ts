import { types, flow } from 'mobx-state-tree'
import { Message } from './message';
import { getInitialData, saveMessage, getAuthorData} from 'src/service/api';

export const AppStore = types
    .model('Store', {
        messages: types.array(Message),
        userId: types.maybe(types.string),
        userName: types.maybe(types.string),
        search: types.string
    })
    .actions(self => ({
        saveMessage: flow(function*(text: string, authorName?: string) {
            const message = yield saveMessage(text, self.userId || undefined, authorName || self.userName || undefined)
            self.messages.push(message)
            self.userId = message.authorId
            self.userName = message.authorName
        }),
        getAuthorData: flow(function*(authorId: string) {
            return getAuthorData(authorId)
        }),
        saveSearch(search: string) {
            self.search = search
        }
    }))

let store: any


export function configureStore() {
    if (store) {
        return Promise.resolve(store)
    }

    return getInitialData()
        .then(data => data.messages, _err => [])
        .then(messages => {
            store = AppStore.create({
                messages,
                search: ''
            })
            return store
        })
}

export type IAppStore = typeof AppStore.Type

export interface ProviderStores {
    store: IAppStore
}
