import * as React from 'react'
import { ProviderStores } from 'src/store'
import { IMessage } from 'src/store/message';
import { inject, observer } from 'mobx-react'
import { Typography, Button } from '@material-ui/core'
import BackIcon from '@material-ui/icons/ArrowBack';
import { IAuthor } from 'src/store/author';
import { Message } from 'src/components/message';
import { block } from 'bem-cn';
import { getAuthorData } from 'src/service/api';
import { withRouter, RouteComponentProps } from "react-router-dom";
const b = block('author')
import './author.css'

interface Props extends RouteComponentProps<{id: string}> {
    messages?: IMessage[]
    getAuthorData?: (authorId: string) => Promise<IAuthor>
}

interface CtrlState {
    author?: IAuthor
    ntf?: string
}

class PureAuthorScreen extends React.Component<Props, CtrlState> {
    state: CtrlState = { author: undefined, ntf: 'Loading author data' }
    
    componentDidMount() {
        getAuthorData(this.props.match.params.id)
            .then(author => {
                if (author) {
                    this.setState({ author })
                } else {
                    this.setState({ ntf: 'Author not found' })
                }
            }, () => {
                this.setState({ ntf: 'Error loading data' })
            })
    }

    render() {
        const { messages, history } = this.props
        const { author, ntf: msg } = this.state
        return (
            <React.Fragment>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={history.goBack}>
                    <BackIcon/>Back
                </Button>
                {
                    !author ? 
                    <Typography
                        className={b('ntf').toString()}>
                        {msg}
                    </Typography> :
                    <React.Fragment>
                        <Typography 
                            variant="h5"
                            className={b('title').toString()}>
                            Author: {author.name}
                        </Typography>
                        <Typography>
                            {author.bio}
                        </Typography>
                        <Typography 
                            variant="h6"
                            className={b('title').toString()}>
                            Messages
                        </Typography>
                        {(messages!
                            .filter(m => m.authorId === author.id)
                            .map(m => 
                                <Message 
                                    key={m.id}
                                    message={m} 
                                    showAuthor={false}/>
                            )
                        )}
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}
export const AuthorScreen = inject(({ 
    store: { 
        messages, getAuthorData
    } }: ProviderStores) => ({
    messages,
    getAuthorData
}))(withRouter(observer(PureAuthorScreen)))
