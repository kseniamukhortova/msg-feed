import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import { Typography, Modal, createStyles, Button } from '@material-ui/core'
import { LimitedInput } from 'src/components/limited-input';
import autobind from 'utils/autobind';
import { MyInput } from 'src/components/input';
import './add-message.css'
import { block } from 'bem-cn';
const b = block('add-message')

interface Props {
    open: boolean
    authorId?: string
    onClose: () => void
    classes?: any
    onSave?: (text: string, authorName?: string) => void
}

interface CtrlState {
    message?: string
    isMessageValid?: boolean
    name?: string
    isNameValid?: boolean
}

const MODAL_STYLE = {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
}

const styles = (theme: any) => createStyles({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    }
})

class PureAddNewMessage extends React.Component<Props, CtrlState> {
    state = {
        message: '',
        isMessageValid: false,
        name: '',
        isNameValid: !!this.props.authorId
    }

    @autobind
    onMessageChanged(message: string, isMessageValid: boolean) {
        this.setState({ message, isMessageValid })
    }

    @autobind
    onNameChanged(name: string) {
        this.setState({ name, isNameValid: name.length > 0 })
    }

    @autobind
    onSave() {
        const { onSave, onClose } = this.props
        const { message, name } = this.state
        onSave && onSave(message, name)
        onClose && onClose()
    }
    
    render() {
        const { open, onClose, classes, authorId } = this.props;
        const { isNameValid, isMessageValid } = this.state
        const isValid = isNameValid && isMessageValid
        return (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={onClose}>
                <div style={MODAL_STYLE} className={classes.paper}>
                    <Typography variant="h6" id="modal-title">
                        Adding new message
                    </Typography>
                    <LimitedInput 
                        placeholder='Your message' 
                        limit={100} 
                        onChanged={this.onMessageChanged}/>
                    {
                        authorId ? null : 
                        <div className={b('author').toString()}>
                            <Typography id="simple-modal-description">
                                Seems, this is your first message. Please, tell your name
                            </Typography>
                            <MyInput 
                                placeholder='Your name' 
                                onChanged={this.onNameChanged}/>
                        </div>
                    }
                    <div className={b('buttons').toString()}>
                        <Button 
                            className={b('save').toString()}
                            variant="contained" 
                            color="primary"
                            disabled={!isValid}
                            onClick={this.onSave}>
                            <CheckIcon/>
                            Save
                        </Button>
                        <Button 
                            className={b('cancel').toString()}
                            variant="contained" 
                            color="secondary"
                            onClick={onClose}>
                            <CancelIcon/>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
        )
    }
}
export const AddNewMessage = withStyles(styles)(PureAddNewMessage)