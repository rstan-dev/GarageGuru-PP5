import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "../NavBar";
import * as UserContext from "../../contexts/CurrentUserContext";

jest.mock("../../contexts/CurrentUserContext", () => ({
	useCurrentUser: jest.fn(),
	useSetCurrentUser: jest.fn(),
}));

test("renders NavBar", () => {
	render(
		<Router>
			<NavBar />
		</Router>
	);
	// screen.debug();
	const logInLink = screen.getByRole("link", { name: "Login" });
	expect(logInLink).toBeInTheDocument();
});

test("Renders Register link", () => {
	render(
		<Router>
			<NavBar />
		</Router>
	);

	const registerLink = screen.getByRole("link", { name: "Register" });
	expect(registerLink).toBeInTheDocument();
});

describe("NavBar Component", () => {
	it("renders Add Job link when user is logged in", () => {
		// Setup mock return values
		UserContext.useCurrentUser.mockReturnValue({ pk: 1, username: "testuser" });
		UserContext.useSetCurrentUser.mockReturnValue(jest.fn());

		// Render the NavBar component
		render(
			<Router>
				<NavBar />
			</Router>
		);

		// Assert that the Add Job link is in the document
		const addJobLink = screen.getByRole("link", { name: "Add Job" });
		expect(addJobLink).toBeInTheDocument();
	});

	it("renders All Jobs link when user is logged in", () => {
		// Setup mock return values
		UserContext.useCurrentUser.mockReturnValue({ pk: 1, username: "testuser" });
		UserContext.useSetCurrentUser.mockReturnValue(jest.fn());

		// Render the NavBar component
		render(
			<Router>
				<NavBar />
			</Router>
		);

		// Assert that the All Jobs link is in the document
		const allJobsLink = screen.getByRole("link", { name: "All Jobs" });
		expect(allJobsLink).toBeInTheDocument();
	});

	it("renders My Jobs link when user is logged in", () => {
		// Setup mock return values
		UserContext.useCurrentUser.mockReturnValue({ pk: 1, username: "testuser" });
		UserContext.useSetCurrentUser.mockReturnValue(jest.fn());

		// Render the NavBar component
		render(
			<Router>
				<NavBar />
			</Router>
		);

		// Assert that the My Jobs link is in the document
		const myJobsLink = screen.getByRole("link", { name: "My Jobs" });
		expect(myJobsLink).toBeInTheDocument();
	});

	it("renders Assigned Jobs link when user is logged in", () => {
		// Setup mock return values
		UserContext.useCurrentUser.mockReturnValue({ pk: 1, username: "testuser" });
		UserContext.useSetCurrentUser.mockReturnValue(jest.fn());

		// Render the NavBar component
		render(
			<Router>
				<NavBar />
			</Router>
		);

		// Assert that the Assigned link is in the document
		const assignedLink = screen.getByRole("link", { name: "Assigned" });
		expect(assignedLink).toBeInTheDocument();
	});

	it("renders Watching link when user is logged in", () => {
		// Setup mock return values
		UserContext.useCurrentUser.mockReturnValue({ pk: 1, username: "testuser" });
		UserContext.useSetCurrentUser.mockReturnValue(jest.fn());

		// Render the NavBar component
		render(
			<Router>
				<NavBar />
			</Router>
		);

		// Assert that the Watching link is in the document
		const watchingLink = screen.getByRole("link", { name: "Watching" });
		expect(watchingLink).toBeInTheDocument();
	});

	it("renders Invoices link when user is logged in", () => {
		// Setup mock return values
		UserContext.useCurrentUser.mockReturnValue({ pk: 1, username: "testuser" });
		UserContext.useSetCurrentUser.mockReturnValue(jest.fn());

		// Render the NavBar component
		render(
			<Router>
				<NavBar />
			</Router>
		);

		// Assert that the Invoices link is in the document
		const invoicesLink = screen.getByRole("link", { name: "Invoices" });
		expect(invoicesLink).toBeInTheDocument();
	});

	it("renders Logout link when user is logged in", () => {
		// Setup mock return values
		UserContext.useCurrentUser.mockReturnValue({ pk: 1, username: "testuser" });
		UserContext.useSetCurrentUser.mockReturnValue(jest.fn());

		// Render the NavBar component
		render(
			<Router>
				<NavBar />
			</Router>
		);

		// Assert that the Logout link is in the document
		const logoutLink = screen.getByRole("link", { name: "Logout" });
		expect(logoutLink).toBeInTheDocument();
	});

	it("renders Profile link when user is logged in", () => {
		// Setup mock return values
		UserContext.useCurrentUser.mockReturnValue({ pk: 1, username: "testuser" });
		UserContext.useSetCurrentUser.mockReturnValue(jest.fn());

		// Render the NavBar component
		render(
			<Router>
				<NavBar />
			</Router>
		);

		// Assert that the Profile link is in the document
		const profileLink = screen.getByRole("link", {
			name: "Profile Welcome: testuser",
		});
		expect(profileLink).toBeInTheDocument();
	});

	jest.clearAllMocks();
});
