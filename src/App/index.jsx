import React from 'react';
import injectReducer from '../utils/injectReducer';
import injectSaga from '../utils/injectSaga';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { selectCounter, selectFavoriteCookie } from './selectors';
import reducer from './reducer';
import saga from './sagas';
import { SET_COUNTER, REDUX_ASYNC } from './constants';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.increment = this.increment.bind(this);
  }

  increment() {
    /* redux */
    this.props.setCounter(this.props.selectCounter + 1);
  }


  render() {
    return (
      <div>
        <div>cookie: {this.props.selectFavoriteCookie}</div>

        <div>{this.props.selectCounter.toString()}</div>
        <button onClick={this.increment}>increment</button>
        <button onClick={this.props.reduxAsync}>redux async</button>
      </div>
    )
  }
}

App.propTypes = {
  setCounter: PropTypes.func.isRequired,
  reduxAsync: PropTypes.func.isRequired,
  selectCounter: PropTypes.string.isRequired,
};

// App.defaultValue = {
//   setCounter: () => {},
// }







export function mapDispatchToProps(dispatch) {
  return {
    setCounter: int => dispatch({ type: SET_COUNTER, int: int }),
    reduxAsync: (payload) => dispatch({ type: REDUX_ASYNC, payload }),
  };
}

const mapStateToProps = createStructuredSelector({
    selectCounter: selectCounter(),
    selectFavoriteCookie: selectFavoriteCookie(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(App);
