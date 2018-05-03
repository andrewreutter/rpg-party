import React from 'react'
import { authHOC } from './authHOC.jsx'

const authedClickHOC = Component => authHOC(
  ({auth, onClick=()=>{}, dispatch, ...rest}) => { // TODO: not sure how dispatch snuck in here,but silence it.
    return <Component onClick={wrappedOnClick} {...rest}/>
    function wrappedOnClick(e) {
      function callOriginal() { return onClick(e) }
      return auth.isSignedIn ? callOriginal() : auth.signIn().then(()=>setTimeout(callOriginal))
    }
  }
)

export { authedClickHOC }
