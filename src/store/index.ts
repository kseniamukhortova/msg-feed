import { types, flow } from 'mobx-state-tree'
import { Message } from './message';
import { getInitialData, saveMessage, getAuthorData} from 'src/service/api';
import { LocalStorage } from 'utils/local-store';
import { ScreenType } from 'src/app';
import { Author } from './author';

export const AppStore = types
    .model('Store', {
        messages: types.array(Message),
        userId: types.maybe(types.string),
        screen: types.number,
        screenAuthor: types.maybe(Author)
    })
    .actions(self => ({
        saveMessage: flow(function*(text: string, authorName?: string) {
            const message = yield saveMessage(text, self.userId || undefined, authorName)
            self.messages.push(message)
            self.userId = message.authorId
            LocalStorage.set(USERID_KEY, message.authorId)
        }),
        showAuthorScreen: flow(function*(authorId: string) {
            const author = yield getAuthorData(authorId)
            self.screen = ScreenType.Author
            self.screenAuthor = author
        }),
        toMessageFeed() {
            self.screen = ScreenType.MessagesFeed
        }
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
