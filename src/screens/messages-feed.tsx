import * as React from 'react'
import { ProviderStores } from 'src/store'
import { IMessage } from 'src/store/message';
import { AddNewMessage } from 'src/screens/add-message';
import { inject, observer } from 'mobx-react'
import { Typography, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import autobind from 'utils/autobind';
import { Message } from 'src/components/message';

interface Props {
    messages?: IMessage[]
    userId?: string
    saveMessage?: (text: string, authorName?: string) => void
    showAuthorScreen?: (authorId: string) => void
}

interface CtrlState {
    addWinOpen: boolean
}

class PureMessagesFeedScreen extends React.Component<Props, CtrlState> {
    state = {
        addWinOpen: false
    }

    @autobind
    onOpenAddNew() {
        this.setState({ addWinOpen: true })
    }

    @autobind
    onClose() {
        this.setState({ addWinOpen: false })
    }

    render() {
        const { messages, userId, saveMessage, showAuthorScreen } = this.props
        return (
            <React.Fragment>
                <Typography variant="h5">
                    Messages Feed
                </Typography>
                {
                    (messages!).map(m => 
                        <Message 
                            key={m.id}
                            message={m} 
                            showAuthor={true}
                            showAuthorScreen={showAuthorScreen}/>
                    )
                }
                <Button 
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
            </React.Fragment>
        )
    }
}
export const MessagesFeedScreen = inject(({ 
    store: { 
        messages, userId, saveMessage, showAuthorScreen
    }}: ProviderStores) => 
    ({
        messages,
        userId,
        saveMessage,
        showAuthorScreen
    })
)(observer(PureMessagesFeedScreen))
