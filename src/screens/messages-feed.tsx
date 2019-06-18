import * as React from 'react'
import { ProviderStores } from 'src/store'
import { IMessage } from 'src/store/message';
import { AddNewMessage } from 'src/screens/add-message';
import { inject, observer } from 'mobx-react'
import { Typography, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import autobind from 'utils/autobind';

interface Props {
    messages?: IMessage[]
    userId?: string
    onSave?: (text: string, authorName?: string) => void
}

interface CtrlState {
    addWinOpen: boolean
}

class PureMessagesFeedScreen extends React.Component<Props, CtrlState> {
    constructor(props: Props) {
        super(props)
        this.state = {
            addWinOpen: false
        }
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
        const { messages, userId, onSave } = this.props
        return (
            <React.Fragment>
                <Typography variant="h5">
                    Messages Feed
                </Typography>
                {
                    (messages!).map(m => this.renderItem(m))
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
                    onSave={onSave} 
                    onClose={this.onClose}/>
            </React.Fragment>
        )
    }

    renderItem({ text, authorName, date, id }: IMessage) {
        var options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: "2-digit" };

        return (
            <div key={id.toString()}>
                <Typography>{authorName}</Typography>
                <Typography>{new Date(date).toLocaleDateString("en-UK", options)}</Typography>
                <Typography>{text}</Typography>
                <hr/>
            </div>
        )
    }
}
export const MessagesFeedScreen = inject(({ store: { messages, userId, saveMessage } }: ProviderStores) => ({
    messages,
    userId,
    onSave: saveMessage
}))(observer(PureMessagesFeedScreen))
