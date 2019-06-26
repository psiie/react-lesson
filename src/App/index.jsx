import React from 'react';
import injectReducer from '../utils/injectReducer';
import injectSaga from '../utils/injectSaga';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCounter } from './selectors';
import reducer from './reducer';
import saga from './sagas';
import { SET_COUNTER, REDUX_ASYNC } from './constants';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 20,
    };

    this.increment = this.increment.bind(this);
  }

  increment() {

    // this.setState({ ...this.state, counter: this.state.counter + 1 });
    // this.setState({ counter: this.state.counter + 1 });
    this.setState(state => ({ ...state, counter: state. counter + 1 }));
    // this.setState(state => ({ ...state, counter: this.state.counter + 1 }));

    /* redux */
    // const counter = this.props.selectCounter;
    // this.props.setCounter(counter + 1);
  }

  // componentWillReceiveProps(newProps) {
  //   console.log('rerender has not occured yet.');
  //   console.log('old props', this.props);
  //   console.log('next props', newProps);

  //   if (this.props.foo !== this.props.foo) this.setState({ ...state, somethingAmazing: true });
  // }

  render() {
    const { counter } = this.state;
    // const counter = this.props.selectCounter; /* redux */
    return (
      <div>
        <h1>Hello World</h1>

        <div>{counter.toString()}</div>
        <button onClick={this.increment}>increment</button>
        {/* <button onClick={this.props.reduxAsync}>redux async</button> */}
      </div>
    )
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    // setCounter: int => dispatch({ type: SET_COUNTER, int }),
    // reduxAsync: () => dispatch({ type: REDUX_ASYNC }),
  };
}

const mapStateToProps = createStructuredSelector({
    // selectCounter: selectCounter(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(App);
