import React, { Component } from 'react';
import { authenticationService } from '../_services';

export default class Home extends Component {

  render() {

    const currentUser = authenticationService.currentUserValue;

      return(
        <>
          <h2>Hi {currentUser.name}</h2>
        </>
      )
  }
}
