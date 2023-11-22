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
import { useCurrentUser } from "./contexts/CurrentUserContext";
import InvoicePage from './pages/invoices/InvoicePage';
import AllInvoicesPage from './pages/invoices/AllInvoicesPage';


function App() {
  const currentUser = useCurrentUser();
  const currentUsername = currentUser?.username || "";

  console.log(currentUsername)

  return (

        <div className={styles.App}>
          < NavBar />
          < Container className={styles.Content}>
            <Switch>
              {/* ALL JOBS PAGE */}
              <Route
              exact
              path="/"
              render={() =>
              <>
              <h1>Viewing All Jobs</h1>
              < AllJobsPage message="No Jobs Found..." />
              </> } />

              {/* MY JOBS PAGE */}
              <Route
              exact
              path="/myjobs"
              render={() =>
              <>
              <h1>Viewing My Jobs - Created By Me</h1>
              {
                currentUser ? (
              < AllJobsPage message="No Jobs Found..."
              filter={`owner__username=${currentUsername}&`}
              />
              ) : (
                <div>Loading...</div>
              )
              }
              </>
              }
              />

              {/* ASSIGNED JOBS PAGE */}
              <Route
              exact
              path="/assigned"
              render={() =>
              <>
              <h1>Viewing Assigned Jobs - Assigned To Me</h1>
              {
                currentUser ? (
              < AllJobsPage message="No Jobs Found..."
              filter={`assigned_to__username=${currentUsername}&`}
              />
              ) : (
                <div>Loading...</div>
              )
              }
              </>
              }
              />

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
              <Route exact path="/all-invoices" render={() => <AllInvoicesPage />} />
              <Route exact path="/invoices/addinvoice" render={() => <AddInvoiceForm />} />
              <Route exact path="/invoices/:id/edit-invoice" render={() => <EditInvoiceForm />} />
              <Route exact path="/invoices/:id" render={() => <InvoicePage />} />
              <Route render={() => <PageNotFound />} />
          </Switch>
          </Container>
        </div>
  );
}

export default App;