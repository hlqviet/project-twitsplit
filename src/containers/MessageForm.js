// @flow

import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Textarea from 'react-textarea-autosize'

import MessageContext from '../store/MessageContext'

const StyledInputDiv = styled.div`
text-align: center;
`
const StyledTextArea = styled(Textarea)`
width: 80%;

padding: .5rem;

border: 1px solid #e6ecf0;
border-radius: 8px;
outline: none;

resize: none;
overflow: hidden;

transition: all ease-in-out .2s;

&:focus {
  border: 2px solid #6c68d7;
}
`
const StyledButtonDiv = styled.div`
text-align: right;
`
const StyledButton = styled.button`
padding: 6px 16px;

color: #fff;
background-color: #8986df;

border-color: transparent;
border-radius: 100px;

cursor: pointer;

font-size: 14px;
font-weight: bold;
line-height: 20px;

box-shadow: none;

transition: all .15s ease-in-out;

&:hover {
  background-color: #5c5a9e;
}

&:disabled {
  opacity: .3;

  cursor: not-allowed;
}
`

type MessageFormProps = any

type MessageFormState = {
  value: string
}

export default class MessageForm extends PureComponent<MessageFormProps, MessageFormState> {
  static contextType = MessageContext

  handleChange: (event: SyntheticEvent<HTMLTextAreaElement>) => void
  handleSubmit: (event: SyntheticEvent<HTMLFormElement>) => void

  constructor (props: MessageFormProps) {
    super(props)

    this.state = { value: '' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event: SyntheticEvent<HTMLTextAreaElement>) {
    this.setState({ value: event.currentTarget.value })
  }

  handleSubmit (event: SyntheticEvent<HTMLFormElement>) {
    this.context.addMessages([this.state.value.trim().replace(/\n/g, ' ')])
    this.setState({ value: '' })

    event.preventDefault()
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <StyledInputDiv>
          <StyledTextArea
            async
            autoFocus
            placeholder="What's happening?"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </StyledInputDiv>
        <StyledButtonDiv>
          <StyledButton type='submit' disabled={!this.state.value.trim()}>Tweet</StyledButton>
        </StyledButtonDiv>
      </form>
    )
  }
}
