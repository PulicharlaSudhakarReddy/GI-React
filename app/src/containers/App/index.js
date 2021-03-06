/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { registerGuestUser, getCurrentTime } from '../../utils/initialManager';
import { getCookie } from '../../utils/utilityManager';
import LoadingIndicator from '../../utils/loadingIndicator';
import axios from 'axios';
import { guestLoginAPI, storeId, accessToken, accessTokenCookie, isLoggedIn, getTheAccessToken } from '../../../public/constants/constants';

import HomePageContainer from '../HomePageContainer/index';
import HeaderContainer from '../HeaderContainer/index';
import ClpContainer from '../ClpContainer/index';
import PlpContainer from '../PlpContainer/index';
import FooterContainer from '../FooterContainer/footer';
import RegisterNow from '../../components/RegisterComponent/joinUs';
import ForgotpassContainer from '../ForgotPasswordContainer/forgotpassword';
import '../../../public/styles/app.scss';
//import { accessTokenCookie } from '../../../public/constants/constants';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: window.innerWidth <= 760,
      accessToken: '',
    };
    this.resize = this.resize.bind(this);
    this.guestLoginCallback = this.guestLoginCallback.bind(this);
  }


  componentDidMount() {
    this.initialLoginHandling();

    window.addEventListener('resize', this.resize);
    this.resize();
  }

  initialLoginHandling() {
    let token = getCookie(accessTokenCookie);
    if (token != '') {
      this.setState({ accessToken: token });
    }
    else {
      /* Check if User is logged in or Guest - Hit API accordingly */
      if (isLoggedIn) {

      }
      else {
        registerGuestUser(this.guestLoginCallback);
      }
    }
  }

  guestLoginCallback(token) {
    //console.log('API Token: ' + token);
    if (token != '') {
      this.setState({ accessToken: token });
      getTheAccessToken(token);
    }
    else { }
  }

  resize() {
    this.setState({ isMobile: window.innerWidth <= 760 });
  }

  render() {

    if (this.state.accessToken == '') {
      return <LoadingIndicator />;
    }

    const { isMobile } = this.state;
    return (
      <div>
        <Helmet titleTemplate="%s - Godrej" defaultTitle="Godrej">
          <meta name="description" content="A Godrej application" />
        </Helmet>
        <HeaderContainer />
        <ForgotpassContainer />
        <Switch>
          <Route exact path="/" component={HomePageContainer} />
          <Route path="/clp" component={ClpContainer} />
          <Route path='/plp' component={PlpContainer} />
          <Route path='/forgotpassword' component={ForgotpassContainer} />
          <Route path='/register' component={RegisterNow} />
        </Switch>
        <FooterContainer />

      </div>
    );
  }
}
