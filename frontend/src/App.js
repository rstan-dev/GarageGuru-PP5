import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import PageNotFound from "./components/PageNotFound";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";

import LoginForm from "./pages/auth/LoginForm";
import RegisterForm from "./pages/auth/RegisterForm";
import ProfilePage from "./pages/profile/ProfilePage";
import EditProfileForm from "./pages/profile/EditProfileForm";
import ChangePasswordForm from "./pages/profile/ChangePasswordForm";
import ChangeUsernameForm from "./pages/profile/ChangeUsernameForm";
import AddJobForm from "./pages/jobs/AddJobForm";
import JobPage from "./pages/jobs/JobPage";
import AllJobsPage from "./pages/jobs/AllJobsPage";
import EditJobForm from "./pages/jobs/EditJobForm";
import AddInvoiceForm from "./pages/invoices/AddInvoiceForm";
import EditInvoiceForm from "./pages/invoices/EditInvoiceForm";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import InvoicePage from "./pages/invoices/InvoicePage";
import AllInvoicesPage from "./pages/invoices/AllInvoicesPage";
import FixedHeader from "./components/FixedHeader";
import Asset from "./components/Asset";
import Footer from "./components/Footer";

function App() {
	const currentUser = useCurrentUser();
	const currentUsername = currentUser?.username || "";

	return currentUser ? (
		<div className={styles.App}>
			<NavBar />
			<Container className={styles.Content}>
				<Switch>
					{/* ADD JOB PAGE */}
					<Route
						exact
						path='/jobs/addjob'
						render={() => (
							<>
								<FixedHeader text='Viewing Add Job' />
								<AddJobForm />
							</>
						)}
					/>

					{/* ALL JOBS PAGE */}
					<Route
						exact
						path='/'
						render={() => (
							<>
								<FixedHeader text='Viewing All Jobs' />
								<AllJobsPage />
							</>
						)}
					/>

					{/* MY JOBS PAGE */}
					<Route
						exact
						path='/myjobs'
						render={() => (
							<>
								<FixedHeader text='Viewing My Jobs - created by me' />
								{currentUser ? (
									<AllJobsPage filter={`owner__username=${currentUsername}&`} />
								) : (
									<Asset
										spinner
										message={"loading jobs"}
									/>
								)}
							</>
						)}
					/>

					{/* ASSIGNED JOBS PAGE */}
					<Route
						exact
						path='/assigned'
						render={() => (
							<>
								<FixedHeader text='Viewing Assigned Jobs - assigned to me' />
								{currentUser ? (
									<AllJobsPage
										filter={`assigned_to__username=${currentUsername}&`}
									/>
								) : (
									<Asset
										spinner
										message={"loading jobs"}
									/>
								)}
							</>
						)}
					/>

					{/* WATCHED JOBS PAGE */}
					<Route
						exact
						path='/watched'
						render={() => (
							<>
								<FixedHeader text='Viewing Watched Jobs - watched by me' />
								{currentUser ? (
									<AllJobsPage filter={`watched_by=${currentUser.pk}&`} />
								) : (
									<Asset
										spinner
										message={"loading jobs"}
									/>
								)}
							</>
						)}
					/>

					{/* JOBS PAGES */}
					<Route
						exact
						path='/jobs/:id'
						render={() => (
							<>
								<FixedHeader text='Viewing Job' />
								<JobPage />
							</>
						)}
					/>

					<Route
						exact
						path='/jobs/:id/edit-job'
						render={() => (
							<>
								<FixedHeader text='Viewing Edit Job' />
								<EditJobForm />
							</>
						)}
					/>

					{/* INVOICES PAGES */}
					<Route
						exact
						path='/all-invoices'
						render={() => (
							<>
								<FixedHeader text='Viewing All Invoices' />
								<AllInvoicesPage />
							</>
						)}
					/>

					<Route
						exact
						path='/invoices/addinvoice'
						render={() => (
							<>
								<FixedHeader text='Viewing Add Invoice' />
								<AddInvoiceForm />
							</>
						)}
					/>

					<Route
						exact
						path='/invoices/:id/edit-invoice'
						render={() => (
							<>
								<FixedHeader text='Viewing Edit Invoice' />
								<EditInvoiceForm />
							</>
						)}
					/>

					<Route
						exact
						path='/invoices/:id'
						render={() => (
							<>
								<FixedHeader text='Viewing Invoice' />
								<InvoicePage />
							</>
						)}
					/>

					{/* PROFILE PAGES */}
					<Route
						exact
						path='/profile/:id'
						render={() => (
							<>
								<FixedHeader text='Viewing Profile' />
								<ProfilePage />
							</>
						)}
					/>

					<Route
						exact
						path='/profile/:id/edit-profile'
						render={() => (
							<>
								<FixedHeader text='Viewing Edit Profile' />
								<EditProfileForm />
							</>
						)}
					/>

					<Route
						exact
						path='/profile/:id/change-password'
						render={() => (
							<>
								<FixedHeader text='Viewing Change Password' />
								<ChangePasswordForm />
							</>
						)}
					/>

					<Route
						exact
						path='/profile/:id/change-username'
						render={() => (
							<>
								<FixedHeader text='Viewing Change Username' />
								<ChangeUsernameForm />
							</>
						)}
					/>

					{/* PAGE NOT FOUND */}
					<Route render={() => <PageNotFound />} />
				</Switch>
			</Container>
		</div>
	) : (
		<div className={styles.App}>
			<NavBar />
			<Container className={styles.Content}>
				<Switch>
					{/* LOGIN / REGISTER PAGES */}
					<Route
						exact
						path='/login'
						render={() => <LoginForm />}
					/>
					<Route
						exact
						path='/register'
						render={() => <RegisterForm />}
					/>
					<Route render={() => <LoginForm />} />
				</Switch>
			</Container>
			<Footer />
		</div>
	);
}

export default App;
