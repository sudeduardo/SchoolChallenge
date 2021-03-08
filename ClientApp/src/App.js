import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Layout } from './components/Layout';

import SubjectsPage from "./pages/SubjectsPage"
import SubjectAddPage from "./pages/SubjectAddPage"
import SubjectEditPage from "./pages/SubjectEditPage"

import StudentPage from "./pages/StudentsPage"
import StudentAddPage from "./pages/StudentAddPage"
import StudentEditPage from "./pages/StudentEditPage"

import {Provider} from "react-redux";
import store from './reducers/index'

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Provider store={store}>
        <Layout>
          <Route exact path='/students' component={StudentPage} />
          <Route exact path='/students/:id/edit' component={StudentEditPage} />
          <Route exact path='/students/add' component={StudentAddPage} />
          <Route exact path='/subjects' component={SubjectsPage} />
          <Route exact path='/subjects/add' component={SubjectAddPage} />
          <Route exact path='/subjects/:id/edit' component={SubjectEditPage} />
          {/* <Redirect exact path='/' to="students"  /> */}
        </Layout>
      </Provider>
    );
  }
}
