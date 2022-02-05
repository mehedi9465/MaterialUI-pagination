import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home/Home'
import ApiService from '../Service/ApiService';

describe('post api call',
() => test('api call test', async () => {
  const {data} = await ApiService.getPost(1);
  expect(data).toBeDefined();
}))

test('renders learn react link', () => {
  render(<Home />);
  const home = screen.getByTestId('home');
  expect(home).toBeInTheDocument();
});
