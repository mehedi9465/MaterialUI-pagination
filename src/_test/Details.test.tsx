import React from 'react';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import Details from '../pages/Details/Details';

test('Render Details Component', () => {
    const history = createMemoryHistory();
    history.push('/details', {title: '', url: '', created_at: Date(), author: ''})

    render(
        <Router history={history}>
            <Details />
        </Router>
    );
    
    const details = screen.getByTestId('details');
    expect(details).toBeInTheDocument();
})