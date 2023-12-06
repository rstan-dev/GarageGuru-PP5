import React from 'react';
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "../NavBar";
import * as UserContext from '../../contexts/CurrentUserContext';

jest.mock('../../contexts/CurrentUserContext', () => ({
    useCurrentUser: jest.fn(),
    useSetCurrentUser: jest.fn(),
  }));

test('renders NavBar', () => {
    render(<Router>
        <NavBar />
    </Router>
    );
    // screen.debug();
    const logInLink = screen.getByRole('link', {name: 'Login'})
    expect(logInLink).toBeInTheDocument();
});

test('Renders Register link', () => {
    render(
        <Router>
            <NavBar />
        </Router>
    );

    const registerLink = screen.getByRole('link', {name: 'Register'});
    expect(registerLink).toBeInTheDocument();
});

describe('NavBar Component', () => {
    it('renders Add Job link when user is logged in', () => {
      // Setup mock return values
      UserContext.useCurrentUser.mockReturnValue({ pk: 1, username: 'testuser' });
      UserContext.useSetCurrentUser.mockReturnValue(jest.fn());

      // Render the NavBar component
      render(
        <Router>
          <NavBar />
        </Router>
      );

      // Assert that the Add Job link is in the document
      const addJobLink = screen.getByRole('link', { name: 'Add Job' });
      expect(addJobLink).toBeInTheDocument();
    });

  });