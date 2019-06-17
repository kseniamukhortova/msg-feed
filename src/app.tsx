import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { IAppStore, ProviderStores } from './store';
import { MessagesFeedScreen } from './screens/messages-feed';

export enum ScreenType {
    MessagesFeed, Author
}

interface Props {
    store?: IAppStore
}

class App extends React.Component<Props> {
    render() {
        switch (this.props.store!.screen) {
            case ScreenType.MessagesFeed:
                return <MessagesFeedScreen />
            default:
                return null
        }
    }
}

export default inject((stores: ProviderStores) => ({
    store: stores.store,
}))(observer(App))
