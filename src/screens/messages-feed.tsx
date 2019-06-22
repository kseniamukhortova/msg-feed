import * as React from 'react'
import { ProviderStores } from 'src/store'
import { IMessage } from 'src/store/message';
import { AddNewMessage } from 'src/screens/add-message';
import { inject, observer } from 'mobx-react'
import { Typography, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import autobind from 'utils/autobind';
import { Message, DATE_LOCALE, DATE_OPTIONS } from 'src/components/message';
import { MyInput } from 'src/components/input';
import './messages-feed.css'
import { block } from 'bem-cn';
const b = block('feed')

interface Props {
    messages?: IMessage[]
    userId?: string
    saveMessage?: (text: string, authorName?: string) => void
    search?: string
    saveSearch?: (search: string) => void
}

interface CtrlState {
    addWinOpen?: boolean
}

class PureMessagesFeedScreen extends React.Component<Props, CtrlState> {
    state = {
        addWinOpen: false,
    }

    @autobind
    onOpenAddNew() {
        this.setState({ addWinOpen: true })
    }

    @autobind
    onClose() {
        this.setState({ addWinOpen: false })
    }

    @autobind
    onSearch(search: string) {
        const { saveSearch } = this.props
        saveSearch && saveSearch(search.toLowerCase())
    }

    render() {
        const { messages, userId, saveMessage, search } = this.props
        return (
            <div className={b()}>
                <Typography 
                    variant="h4"
                    className={b('title').toString()}>
                    Messages Feed
                </Typography>
                <MyInput
                    initValue={search}
                    placeholder='Search'
                    onChanged={this.onSearch}
                />
                {
                    (messages!)
                        .filter(m => !search || 
                            m.text.toLowerCase().indexOf(search) >= 0 ||
                            m.authorName.toLowerCase().indexOf(search) >= 0 ||
                            (new Date(m.date)).toLocaleDateString(DATE_LOCALE, DATE_OPTIONS).toLowerCase().indexOf(search) >= 0
                        ).map(m => 
                            <Message 
                                key={m.id}
                                message={m} 
                                showAuthor={true}/>
                        )
                }
                <Button 
                    className={b('add').toString()}
                    variant="contained" 
                    color="primary"
                    onClick={this.onOpenAddNew}>
                    <AddIcon/>
                    New message
                </Button>
                <AddNewMessage 
                    authorId={userId}
                    open={this.state.addWinOpen}
                    onSave={saveMessage} 
                    onClose={this.onClose}/>
            </div>
        )
    }
}
export const MessagesFeedScreen = inject(({ 
    store: { 
        messages, userId, saveMessage, search, saveSearch
    }}: ProviderStores) => 
    ({
        messages,
        userId,
        saveMessage,
        search,
        saveSearch
    })
)(observer(PureMessagesFeedScreen))
