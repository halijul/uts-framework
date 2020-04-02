import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/createStore';
import InputSection from './components/InputSection';
import NotesSection from './components/NotesSection';
import Oli from './components/Oli';
import About from './components/About';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  Redirect
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-info">
          <a className="navbar-brand" href="#">
            Motor Oli
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <button className="nav-item">
                <Link className="nav-link" to="/login">
                  LogIn
                </Link>
              </button>
              <li className="nav-item active">
                <Link className="nav-link" to="/Oli">
                  Oli
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/about">
                  Tentang Kami
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/form">
                  Form
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/product">
                  LogOut
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <Route path="/login" component={Login} exact/>
        <Route path="/Oli" component={Oli} exact/>
        <Route path="/about" component={About} exact/>
        <PrivateRoute path="/form"> <FormPage /></PrivateRoute>
        {/* <Route path="/product" component={Logout} /> */}
      </div>
    </Router>
  );
}

function FormPage() {
  return (
    <Provider store={store}>
      <div className="container">
        <h1>Form Pembelian</h1>
        <InputSection />
        <div className="line"></div>
        <NotesSection />
      </div>

    </Provider>

  );
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function AuthButton() {
  let history = useHistory();

  return fakeAuth.isAuthenticated ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push("/login"));
        }}
      >
        Sign Out
      </button>
    </p>
  ) : (
    <p>Anda belum Login.</p>
  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function Login() {
  return (
    <Router>
      <div>
        <AuthButton />

        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/login" } };
  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };


  return (
    <div>
      <h1>Anda harus login terlebih dahulu untuk masuk</h1>
      <button onClick={login}>Log in</button>
    </div>
  );
}