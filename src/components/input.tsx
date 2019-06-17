
import * as React from 'react'
import InputBase from '@material-ui/core/InputBase'
import { withStyles } from '@material-ui/core/styles'
import autobind from 'utils/autobind';

const styles = (theme: any) => ({
    bootstrapInput: {
        borderRadius: 4,
        color: theme.palette.common.black,
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
    },
})

interface Props {
    classes: any
    placeholder?: string
    multiline?: boolean
    onChanged?: (value: string) => void
}

class WrappedInput extends React.Component<Props> {
    @autobind
    onChange(event: any) {
        const { onChanged } = this.props
        const value = event.target.value
        onChanged && onChanged(value)
    }

    render() {
        const { classes, placeholder, multiline } = this.props
        return (
            <InputBase
                id="input-with-icon-grid"
                multiline={multiline}
                placeholder={placeholder}
                onChange={this.onChange}
                classes={{
                    input: classes.bootstrapInput,
                }}
            />
        )
    }
}

export const MyInput = withStyles(styles)(WrappedInput)
