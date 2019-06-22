import * as React from 'react'
import { ProviderStores } from 'src/store'
import { IMessage } from 'src/store/message';
import { inject, observer } from 'mobx-react'
import { Typography, Button } from '@material-ui/core'
import BackIcon from '@material-ui/icons/ArrowBack';
import { IAuthor } from 'src/store/author';
import { Message } from 'src/components/message';
import { block } from 'bem-cn';
import { withRouter, RouteComponentProps } from "react-router-dom";
const b = block('author')
import './author.css'

interface Props extends RouteComponentProps<{id: string}> {
    messages?: IMessage[]
    author?: IAuthor
}

class PureAuthorScreen extends React.Component<Props> {

    renderAdditionalData(author: IAuthor) {
        return Object.keys(author.data)
            .filter(key => 
                key !== 'id' && 
                key !== 'name')
            .map(key => 
                <React.Fragment key={key}>
                    <Typography 
                    variant="h6"
                    className={b('title').toString()}>
                        {key}:
                    </Typography>
                    <Typography>
                        {author.data[key]}
                    </Typography>
                </React.Fragment>
            )
    }
    render() {
        const { messages, history, author } = this.props
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
                        Author not found
                    </Typography> :
                    <React.Fragment>
                        <Typography 
                            variant="h5"
                            className={b('title').toString()}>
                            Author: {author.name}
                        </Typography>
                        { this.renderAdditionalData(author) }
                        <Typography 
                            variant="h6"
                            className={b('title').toString()}>
                            Messages
                        </Typography>
                        {(messages!
                            .filter(m => m.userId === author.id)
                            .map(m => 
                                <Message 
                                    key={m.id}
                                    author={author}
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
        messages, getAuthor
    }}: ProviderStores, props: Props) => {
        const userId = parseInt(props.match.params.id)
        const author = userId ? getAuthor(userId) : null
        return {
            messages,
            author
        }   
    }
)(withRouter(observer(PureAuthorScreen)))
