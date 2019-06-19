import * as React from 'react'
import { IMessage } from 'src/store/message';
import { Typography, Link } from '@material-ui/core';
import autobind from 'utils/autobind';
import './message.css'
import { block } from 'bem-cn';
const b = block('message')

interface Props {
    message: IMessage
    showAuthor: boolean
    showAuthorScreen?: (authorId: string) => void
}

export const DATE_OPTIONS = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: "2-digit" };
export const DATE_LOCALE = "en-UK"

export class Message extends React.Component<Props> {
    @autobind
    onAuthor() {
        const { showAuthorScreen, message: { authorId } } = this.props
        showAuthorScreen && showAuthorScreen(authorId)
    }
    render() {
        const { message: { text, authorName, date, id }, showAuthor } = this.props
        return (
            <div key={id} className={b().toString()}>
                <Typography className={b('date').toString()}>
                    {new Date(date).toLocaleDateString(DATE_LOCALE, DATE_OPTIONS)}
                </Typography>
                {
                    showAuthor ? 
                        <Typography>
                            <Link
                                type='button'
                                onClick={this.onAuthor}>
                            {authorName}
                            </Link>
                        </Typography> : null
                }
                
                <Typography>{text}</Typography>
            </div>
        )
    }
}