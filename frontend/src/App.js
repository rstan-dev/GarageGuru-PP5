import styles from './App.module.css';
import NavBar from './components/NavBar';
import PageNotFound from './components/PageNotFound';
import { Container } from 'react-bootstrap';
import { Route, Switch } from "react-router-dom";
import './api/axiosDefaults';

import LoginForm from './pages/auth/LoginForm';
import RegisterForm from './pages/auth/RegisterForm';
import ProfilePage from './pages/profile/ProfilePage';
import EditProfileForm from './pages/profile/EditProfileForm';
import ChangePasswordForm from './pages/profile/ChangePasswordForm';
import ChangeUsernameForm from './pages/profile/ChangeUsernameForm';
import AddJobForm from './pages/jobs/AddJobForm';
import JobPage from './pages/jobs/JobPage';
import AllJobsPage from './pages/jobs/AllJobsPage';
import EditJobForm from './pages/jobs/EditJobForm';
import AddInvoiceForm from './pages/invoices/AddInvoiceForm';
import EditInvoiceForm from './pages/invoices/EditInvoiceForm';


function App() {

  return (

        <div className={styles.App}>
          < NavBar />
          < Container className={styles.Content}>
            <Switch>
              <Route exact path="/" render={() => < AllJobsPage message="No Jobs Found..." /> } />
              <Route exact path="/myjobs" render={() => <h1>My Jobs</h1>} />
              <Route exact path="/jobs/addjob" render={() => <AddJobForm />} />
              <Route exact path="/assigned" render={() => <h1>Assigned Jobs</h1>} />
              <Route exact path="/watched" render={() => <h1>Watched Jobs</h1>} />
              <Route exact path="/login" render={() => <LoginForm />} />
              <Route exact path="/logout" render={() => <h1>Logout</h1>} />
              <Route exact path="/register" render={() => <RegisterForm />} />
              <Route exact path="/profile" render={() => <ProfilePage />} />
              <Route exact path="/profile/edit-profile" render={() => <EditProfileForm />} />
              <Route exact path="/profile/change-password" render={() => <ChangePasswordForm />} />
              <Route exact path="/profile/change-username" render={() => <ChangeUsernameForm />} />
              <Route exact path="/jobs/:id" render={() => <JobPage />} />
              <Route exact path="/jobs/:id/edit-job" render={() => <EditJobForm />} />
              <Route exact path="/invoices/addinvoice" render={() => <AddInvoiceForm />} />
              <Route exact path="/invoices/:id/edit-invoice" render={() => <EditInvoiceForm />} />
              <Route render={() => <PageNotFound />} />
          </Switch>
          </Container>
        </div>
  );
}

export default App;