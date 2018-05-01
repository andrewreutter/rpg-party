import React from 'react'

const Button = ({...buttonProps}) => (
  <button {...buttonProps}/>
)

const BigButton = ({children, ...buttonProps}) => (
  <div>
    <Button style={{width:'100%'}} {...buttonProps}>
      <h1>{children}</h1>
    </Button>
  </div>
)

export { Button, BigButton }
