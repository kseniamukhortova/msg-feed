import * as React from 'react'
import { ProviderStores } from 'src/store'
import { IMessage } from 'src/store/message';
import { inject, observer } from 'mobx-react'
import { Typography, Button } from '@material-ui/core'
import BackIcon from '@material-ui/icons/ArrowBack';
import { IAuthor } from 'src/store/author';
import { Message } from 'src/components/message';
import './author.css'
import { block } from 'bem-cn';
const b = block('author')

interface Props {
    author?: IAuthor
    messages?: IMessage[]
    back?: () => void
}

class PureAuthorScreen extends React.Component<Props> {
    render() {
        const { author, messages, back } = this.props
        const { name, bio, id } = author!
        return (
            <React.Fragment>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={back}>
                    <BackIcon/>Back
                </Button>
                <Typography 
                    variant="h5"
                    className={b('title').toString()}>
                    Author: {name}
                </Typography>
                <Typography>
                    {bio}
                </Typography>
                <Typography 
                    variant="h6"
                    className={b('title').toString()}>
                    Messages
                </Typography>
                {(messages!
                    .filter(m => m.authorId === id)
                    .map(m => 
                        <Message 
                            key={m.id}
                            message={m} 
                            showAuthor={false}/>
                    )
                )}
            </React.Fragment>
        )
    }
}
export const AuthorScreen = inject(({ 
    store: { 
        messages, screenAuthor, toMessageFeed 
    } }: ProviderStores) => ({
    messages,
    author: screenAuthor,
    back: toMessageFeed
}))(observer(PureAuthorScreen))
