import React from 'react';
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "../NavBar";


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


