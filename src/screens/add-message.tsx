import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
// import { ProviderStores } from 'src/store'
// import { inject, observer } from 'mobx-react'
import { Typography, Modal, createStyles } from '@material-ui/core'
import { LimitedInput } from 'src/components/limited-input';
import autobind from 'utils/autobind';
import { MyInput } from 'src/components/input';

interface Props {
    open: boolean
    authorId?: string
    onClose: () => void
    classes?: any
}

interface CtrlState {
    message?: string
    isMessageValid?: boolean
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
        isMessageValid: false
    }

    @autobind
    onMessageChanged(message: string, isMessageValid: boolean) {
        this.setState({ message, isMessageValid })
    }
    
    render() {
        const { open, onClose } = this.props
        const { classes, authorId } = this.props;
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
                        <React.Fragment>
                            <Typography id="simple-modal-description">
                                Seems, this is your first message. Please, tell your name
                            </Typography>
                            <MyInput placeholder='Your name'/>
                        </React.Fragment>
                    }
                </div>
            </Modal>
        )
    }
}
export const AddNewMessage = withStyles(styles)(PureAddNewMessage)