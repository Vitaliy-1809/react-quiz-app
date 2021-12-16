import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import Auth from './containers/Auth/Auth';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';
import { connect } from 'react-redux';
import Logout from './components/Logout/Logout';
import { autoLogin } from './store/actions/auth';

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {

    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/quiz/:id' component={Quiz} />
        <Route path='/' exact component={QuizList} />
        <Redirect to='/' />
      </Switch>
    )

    if (this.props.isAuthentificated) {
      routes = (
        <Switch>
          <Route path='/quiz-creator' component={QuizCreator} />
          <Route path='/quiz/:id' component={Quiz} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={QuizList} />
          <Redirect to='/' />
        </Switch>
      )
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthentificated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
