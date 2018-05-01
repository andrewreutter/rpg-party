import React from 'react';
import { connect } from 'react-redux'

function firestoreDocReducer(firestore, name) {
  console.log({name, firestore})
  return _firestoreReducer(null, name,
    firestore.doc(name),
    snap => snap.data()
  )
}
function firestoreCollectionReducer(firestore, name) {
  return _firestoreReducer([], name,
    firestore.collection(name),
    snap => { const arr = []; snap.forEach(doc=>arr.push(doc.data())); return arr }
  )
}
function firestoreDocRefReducer(firestore, name) {
  return (state=firestore.doc(name), action) => state
}
function firestoreCollectionRefReducer(firestore, name) {
  return (state=firestore.collection(name), action) => state
}
function _firestoreRefReducer(ref) {
  return (state, action) => ref
}
function _firestoreReducer(defaultValue, name, ref, snapToData) {
  ref.onSnapshot(snap => {
    const value = snap.empty ? defaultValue : snapToData(snap)
    store.dispatch({ type: 'FIREBASE_VALUE', name, value })
  })
  return (state={ready:false, ref, value:undefined, error:undefined}, action) => (
    (action.type === 'FIREBASE_VALUE' && action.name === name)
      ? {...state, ready:true, value:action.value || []}
      : state
  )
}

function firebaseReducer(firebase, refName) {
  const ref = firebase.ref(refName)
  ref.on('value', snap => {
    store.dispatch({type:'FIREBASE_VALUE', refName, value:snap.val() })
  })
  return (state={ready:false, ref, value:undefined, error:undefined}, action) => {
    return (action.type === 'FIREBASE_VALUE' && action.refName === refName)
      ? {...state, ready:true, value:action.value}
      : state
  }
}

function firebaseConnect(mapStateToFirebaseReducer, mapFireStateToProps, mapFireRefToProps) {
  const connectHOC = () => {
    return connect(
      (state, ownProps) => {
        const fireState = mapStateToFirebaseReducer(state)
        return {
          fireReady: fireState.ready,
          fireStateProps: !fireState.ready ? undefined : mapFireStateToProps(fireState.value, ownProps),
          fireRefProps: mapFireRefToProps(fireState.ref, ownProps),
        }
      }
    )
  }
  return Component => {
     return connectHOC()(
    ({fireReady, fireStateProps, fireRefProps, ...ownProps}) => (
      !fireReady ? null : <Component {...ownProps} {...fireStateProps} {...fireRefProps}/>
    )
  )
}
}

let store
const firedux = {
  initializeApp: config => { ({store} = config) }
}

export {
  firedux,
  firestoreDocReducer,
  firestoreDocRefReducer,
  firestoreCollectionReducer,
  firestoreCollectionRefReducer,
  firebaseReducer,
  firebaseConnect
}
