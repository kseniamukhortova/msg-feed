
import * as React from 'react'
import autobind from 'utils/autobind';
import { Typography } from '@material-ui/core'
import { MyInput } from './input';

interface Props {
    limit?: number
    placeholder?: string
    onChanged?: (value: string, isValid: boolean) => void
}

interface CtrlState {
    length: number
    isValid: boolean
}

export class LimitedInput extends React.Component<Props, CtrlState> {
    state = {
        length: 0,
        isValid: false
    }

    @autobind
    onChange(value: string) {
        const length = value.length
        const { limit, onChanged } = this.props
        const isValid = !!length && (!limit || length <= limit)
        this.setState({ length, isValid })
        onChanged && onChanged(value, isValid)
    }

    render() {
        const { limit, placeholder } = this.props
        const { length, isValid } = this.state
        return (
            <React.Fragment>
                <MyInput
                    multiline={true}
                    placeholder={placeholder}
                    onChanged={this.onChange}
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
