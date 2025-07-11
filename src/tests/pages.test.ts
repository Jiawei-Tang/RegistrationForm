import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';
import { RegistrationPanel } from '../components/RegistrationPanel';

describe('HomePageTest', () => {
    it('renders the title and button', () => {
        render(React.createElement(App));
        expect(screen.getByText(/Register Form/i)).toBeInTheDocument();

        const button = screen.getByRole('button', { name: /Register New Users/i });
        expect(button).toBeInTheDocument();
    });
});

describe('RegistrationPanel', () => {
    it('renders the panel title', () => {
        render(React.createElement(RegistrationPanel, { isPanelOpen: true, onDismiss: () => {} }));
        expect(screen.getByText(/Registration Form for New Users/i)).toBeInTheDocument();
    });
});