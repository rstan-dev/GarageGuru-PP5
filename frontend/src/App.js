import styles from './App.module.css';
import NavBar from './components/NavBar';
import PageNotFound from './components/PageNotFound';
import { Container } from 'react-bootstrap';
import { Route, Switch } from "react-router-dom";
import './api/axiosDefaults';

import LoginForm from './pages/auth/LoginForm';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();


function App() {
  const [currentUser, setCurrentUser] = useState(null)

  const handleMount = async () => {
    try {
      const {data} = await axios.get('dj-rest-auth/user')
      setCurrentUser(data)
    } catch(err) {
      console.log(err)

    }
  }

  useEffect(() => {
    handleMount()
  }, [])


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider vlaue={setCurrentUser}>
        <div className={styles.App}>
          < NavBar />
          < Container className={styles.Content}>
            <Switch>
              <Route exact path="/" render={() => <h1>All Jobs</h1>} />
              <Route exact path="/myjobs" render={() => <h1>My Jobs</h1>} />
              <Route exact path="/addjob" render={() => <h1>Add Job</h1>} />
              <Route exact path="/assigned" render={() => <h1>Assigned Jobs</h1>} />
              <Route exact path="/watched" render={() => <h1>Watched Jobs</h1>} />
              <Route exact path="/login" render={() => <LoginForm />} />
              <Route exact path="/logout" render={() => <h1>Logout</h1>} />
              <Route exact path="/register" render={() => <h1>Register</h1>} />
              <Route exact path="/profile" render={() => <h1>Profile</h1>} />
              <Route render={() => <PageNotFound />} />
          </Switch>
          </Container>
        </div>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;