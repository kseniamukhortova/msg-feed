import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { IAppStore, ProviderStores } from './store';
import { MessagesFeedScreen } from './screens/messages-feed';
import { AuthorScreen } from './screens/author';
import { BrowserRouter as Router, Route } from "react-router-dom";

interface Props {
    store?: IAppStore
}

class App extends React.Component<Props> {
    render() {
        return (
            <Router>
                <Route path="/" exact={true} component={MessagesFeedScreen} />
                <Route path="/author/:id" component={AuthorScreen} />
            </Router>
        )
    }
}

export default inject((stores: ProviderStores) => ({
    store: stores.store,
}))(observer(App))
