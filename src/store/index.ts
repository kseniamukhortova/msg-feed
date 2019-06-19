import { types, flow } from 'mobx-state-tree'
import { Message } from './message';
import { getInitialData, saveMessage, getAuthorData} from 'src/service/api';
import { ScreenType } from 'src/app';
import { Author } from './author';

export const AppStore = types
    .model('Store', {
        messages: types.array(Message),
        userId: types.maybe(types.string),
        userName: types.maybe(types.string),
        screen: types.number,
        screenAuthor: types.maybe(Author),
        search: types.string
    })
    .actions(self => ({
        saveMessage: flow(function*(text: string, authorName?: string) {
            const message = yield saveMessage(text, self.userId || undefined, authorName || self.userName || undefined)
            self.messages.push(message)
            self.userId = message.authorId
            self.userName = message.authorName
        }),
        showAuthorScreen: flow(function*(authorId: string) {
            const author = yield getAuthorData(authorId)
            self.screen = ScreenType.Author
            self.screenAuthor = author
        }),
        toMessageFeed() {
            self.screen = ScreenType.MessagesFeed
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

    return getInitialData()
        .then(data => data.messages, _err => [])
        .then(messages => {
            store = AppStore.create({
                messages,
                screen: ScreenType.MessagesFeed,
                search: ''
            })
            return store
        })
}

export type IAppStore = typeof AppStore.Type

export interface ProviderStores {
    store: IAppStore
}
