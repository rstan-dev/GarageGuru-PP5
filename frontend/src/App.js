import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import { Route, Switch } from "react-router-dom"

function App() {
  return (
    <div className={styles.App}>
      < NavBar />
      < Container className={styles.Content}>
        <Switch>
          <Route exact path="/" render={() => <h1>All Jobs</h1>} />
          <Route exact path="/myjobs" render={() => <h1>My Jobs</h1>} />
          <Route exact path="/addjob" render={() => <h1>Add Job</h1>} />
          <Route exact path="/assigned" render={() => <h1>Assigned Jobs</h1>} />
          <Route exact path="/watched" render={() => <h1>Watched Jobs</h1>} />
          <Route exact path="/login" render={() => <h1>Login</h1>} />
          <Route exact path="/logout" render={() => <h1>Logout</h1>} />
          <Route exact path="/register" render={() => <h1>Register</h1>} />
          <Route exact path="/profile" render={() => <h1>Profile</h1>} />
      </Switch>



      </Container>
    </div>
  );
}

export default App;