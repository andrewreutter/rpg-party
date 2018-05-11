import React from 'react'
import classNames from 'classnames'

const wrapInClass = hAndNum => (
  ({className, ...divProps}) => (
    <div {...divProps} className={classNames(hAndNum, className)}/>
  )
)

const
  H1 = wrapInClass('H1'),
  H2 = wrapInClass('H2'),
  H3 = wrapInClass('H3'),
  H4 = wrapInClass('H4'),
  H5 = wrapInClass('H5'),
  Content = wrapInClass('Content'),
  Footer = wrapInClass('Footer')

export {
  H1, H2, H3, H4, H5,
  Content,
  Footer
}
