import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Switch, useLocation } from 'react-router-dom';
import routeData from 'react-router';

import Navbar from '../components/Navbar';
import Episodes from '../pages/Episodes';
import Locations from '../pages/Locations';
import * as ROUTES from '../constants/routes';
import NotFound from '../pages/NotFound';
import { renderHook } from '@testing-library/react-hooks';

const mockUseLocation = () => {
  jest.mock('react-router-dom', () => ({
    useLocation: jest.fn().mockReturnValue({
      pathname: '/val1',
    }),
  }));
};

const renderNavbar = () =>
  render(
    <MemoryRouter>
      <Switch>
        <Route path={ROUTES.EPISODES} component={Episodes} exact />
        <Route path={ROUTES.LOCATIONS} component={Locations} />
        <Route component={NotFound} />
      </Switch>
    </MemoryRouter>,
  );

test('Renders episodes nav button', async () => {
  await act(async () => {
    renderNavbar();
    const episodesNavbarButton = screen.queryByTestId('episodes-nav-link');
    expect(episodesNavbarButton).toHaveTextContent('By Episodes');
  });
});

test('Renders locations nav button', async () => {
  await act(async () => {
    renderNavbar();
    const locationsNavbarButton = screen.queryByTestId('locations-nav-link');
    expect(locationsNavbarButton).toHaveTextContent('By Locations');
  });
});

test('Navigates to episodes page correctly', async () => {
  renderNavbar();
  const episodesNavbarButton = await screen.findByTestId('episodes-nav-link');

  await waitFor(() => [
    fireEvent.click(
      episodesNavbarButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    ),
    expect(screen.getByText(/This is S01E01st episode in 1st session/i)).toBeInTheDocument(),
  ]);
});

test('Navigates to locations page correctly', async () => {
  renderNavbar();
  const locationsNavbarButton = await screen.findByTestId('locations-nav-link');

  await waitFor(() => [
    fireEvent.click(
      locationsNavbarButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    ),
    expect(screen.getByText(/This is a Planet located in Dimension C-137./i)).toBeInTheDocument(),
  ]);
});
