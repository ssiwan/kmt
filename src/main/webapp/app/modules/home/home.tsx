import './home.css';

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';

import { getSession } from '../../reducers/authentication';

export interface IHomeProp {
  account: any;
  getSession: Function;
}

export interface IHomeState {
  currentUser: any;
}

export class Home extends React.Component<IHomeProp, IHomeState> {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.account
    };
  }

  componentWillMount() {
    this.props.getSession();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentUser: nextProps.account
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="row">
        <div className="col-md-3 pad">
          <span className="hipster img-fluid rounded" />
        </div>
        <div className="col-md-9">
          <h2><Translate contentKey="home.title">Welcome to CalFire KMT</Translate></h2>
          <p className="lead"><Translate contentKey="home.subtitle">This is your homepage</Translate></p>
          {
            (currentUser && currentUser.login) ? (
              <div>
                <div className="alert alert-success">
                  <Translate contentKey="home.logged.message" interpolate={{ username: currentUser.login }}>You are logged in as user </Translate>
                </div>
              </div>
            ) : (
              <div>
                <div className="alert alert-warning">
                  <Translate contentKey="global.messages.info.authenticated.prefix">If you want to </Translate>
                  <Link to="/login" className="alert-link"><Translate contentKey="global.messages.info.authenticated.link">sign in</Translate></Link>
                  <Translate contentKey="global.messages.info.authenticated.suffix">, you can try the default accounts:
                  <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
                  <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).</Translate>
                </div>

                <div className="alert alert-warning">
                  <Translate contentKey="global.messages.info.register.noaccount">You do not have an account yet?</Translate>&nbsp;
                  <a className="alert-link"><Translate contentKey="global.messages.info.register.link">Register a new account</Translate></a>
                </div>
              </div>
            )
          }

          <p>
            <Translate contentKey="home.like">If you like DHSKnowledgeManagemet, do not forget to give us a star on</Translate>
            <a href="https://github.com/dhsynergetech/kmt" target="_blank" rel="noopener noreferrer">Github</a>!
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
