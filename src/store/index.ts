import { types, flow } from 'mobx-state-tree'
import { Message } from './message';
import { getInitialData, saveMessage } from 'src/service/api';
import { LocalStorage } from 'utils/local-store';
import { ScreenType } from 'src/app';

export const AppStore = types
    .model('Store', {
        messages: types.array(Message),
        userId: types.maybe(types.string),
        screen: types.number,
        screenAuthor: types.maybe(types.string)
    })
    .actions(self => ({
        saveMessage: flow(function*(text: string, authorName?: string) {
            const message = yield saveMessage(text, self.userId || undefined, authorName)
            self.messages.push(message)
            self.userId = message.authorId
            LocalStorage.set(USERID_KEY, message.authorId)
        }),
    }))

let store: any
const USERID_KEY = 'userId'


export function configureStore() {
    if (store) {
        return Promise.resolve(store)
    }

    const userId = LocalStorage.get(USERID_KEY)
    return getInitialData()
        .then(data => data.messages, _err => [])
        .then(messages => {
            store = AppStore.create({
                messages,
                userId,
                screen: ScreenType.MessagesFeed
            })
            return store
        })
}

export type IAppStore = typeof AppStore.Type

export interface ProviderStores {
    store: IAppStore
}
