
import * as React from 'react'
import InputBase from '@material-ui/core/InputBase'
import { withStyles } from '@material-ui/core/styles'
import autobind from 'utils/autobind';
import { Typography } from '@material-ui/core'

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
    limit?: number
    placeholder?: string
    onChanged?: (value: string, isValid: boolean) => void
}

interface CtrlState {
    length: number
    isValid: boolean
}

class WrappedLimitedInput extends React.Component<Props, CtrlState> {
    state = {
        length: 0,
        isValid: false
    }

    @autobind
    onChange(event: any) {
        const value = event.target.value
        const length = value.length
        const { limit, onChanged } = this.props
        const isValid = length && (!limit || length <= limit)
        this.setState({ length, isValid })
        onChanged && onChanged(value, isValid)
    }

    render() {
        const { classes, limit, placeholder } = this.props
        const { length, isValid } = this.state
        return (
            <React.Fragment>
                <InputBase
                    id="input-with-icon-grid"
                    multiline={true}
                    placeholder={placeholder}
                    onChange={this.onChange}
                    classes={{
                        input: classes.bootstrapInput,
                    }}
                />
                {
                    limit ? 
                        <Typography
                            color={isValid ? 'primary': 'error'}
                            id="limited-input-counter">
                            {length} of {limit}
                        </Typography> : null
                }
                
            </React.Fragment>
        )
    }
}

export const LimitedInput = withStyles(styles)(WrappedLimitedInput)
