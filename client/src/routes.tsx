import * as React from 'react';

import ActivationPage from './components/auth/ActivationPage';
// import {Dynamic} from './components/Dynamic';
import LoginPage from './components/auth/LoginPage';
import PasswordForgotPage from './components/auth/PasswordForgotPage';
import PasswordResetPage from './components/auth/PasswordResetPage';
import SignUpPage from './components/auth/SignUpPage';
import CategoriesPage from './components/categories/CategoriesPage';
import NotFountPage from './components/NotFoundPage';

import RecordsPage from './components/records/RecordsPage';

export const routes = [
  {
    path: '/',
    exact: true,
    main: props => (
      // <Dynamic path="./components/records/RecordsPage" childProps={props} />
      <RecordsPage {...props} />
    )
  },
  {
    path: '/records',
    main: props => (
      // <Dynamic path="./components/records/RecordsPage" childProps={props} />
      <RecordsPage {...props} />
    )
  },
  {
    path: '/categories',
    main: props => (
      // <Dynamic path="./components/categories/CategoriesPage" childProps={props} />
      <CategoriesPage {...props} />
    )
  },
  {
    path: '/login',
    main: props => (
      // <Dynamic path="./components/auth/LoginPage" childProps={props} />
      <LoginPage {...props} />
    )
  },
  {
    path: '/signup',
    main: props => (
      // <Dynamic path="./components/auth/SignUpPage" childProps={props} />
      <SignUpPage {...props} />
    )
  },
  {
    path: '/password-forgot',
    main: props => (
      // <Dynamic path="./components/auth/PasswordForgotPage" childProps={props} />
      <PasswordForgotPage {...props} />
    )
  },
  {
    path: '/password-reset/:token',
    main: props => (
      // <Dynamic path="./components/auth/PasswordForgotPage" childProps={props} />
      <PasswordResetPage {...props} />
    )
  },
  {
    path: '/activate/:token',
    main: props => (
      // <Dynamic path="./components/auth/ActivationPage" childProps={props} />
      <ActivationPage {...props} />
    )
  },
  {
    path: '/*',
    main: props => (
      // <Dynamic path="./components/NotFoundPage" childProps={props} />
      <NotFountPage {...props} />
    )
  }
];
