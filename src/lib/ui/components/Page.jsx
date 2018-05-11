import React from 'react'
import classNames from 'classnames'

import { AuthWidget } from '../../auth/components/AuthWidget.jsx'

const Page = ({className, children, ...divProps}) => (
  <div {...divProps} className={classNames(className, 'Page')}>
    <AuthWidget/>
    { children }
  </div>
)

export { Page }
