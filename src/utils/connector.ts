import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from './injectReducer';
import injectSaga from './injectSaga';

/* this function converts the shorthand to traditional longhand for connect() */
export function connector(selectorEvents: any, dispatchEvents: any) {
  const _connect: any = connect; // fixes ts lint issue

  /* convert `{ setAmount: setAmount }` to `{ setAmount: data => dispatch({ type: 'setAmount', data: data }) }` */
  const createDispatchEvents = (dispatch: Function) => {
    Object.keys(dispatchEvents).forEach(key => {
      const type = dispatchEvents[key];
      dispatchEvents[key] = (data: any) => dispatch({ type, data });
    });
    return dispatchEvents;
  }

  return _connect(
    createStructuredSelector(selectorEvents),
    createDispatchEvents,
  );
}

/* inject allows you to procedurally add reducers and sagas. This pattern is
used often so you do not have to add these to the main file every time a
component is made */
export function inject({ key, saga, reducer }: any): Function  {
  const _injectSaga: any = injectSaga; // fixes ts lint issue

  const withReducer = injectReducer({ key, reducer });
  const withSaga = _injectSaga({ key, saga });
  return compose(withReducer, withSaga)
}