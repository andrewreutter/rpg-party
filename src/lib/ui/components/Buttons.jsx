import React from 'react'

const Button = ({...buttonProps}) => (
  <button {...buttonProps}/>
)

const BigButton = ({children, ...buttonProps}) => (
  <div>
    <Button className="BigButton" {...buttonProps}>
      {children}
    </Button>
  </div>
)

export { Button, BigButton }
