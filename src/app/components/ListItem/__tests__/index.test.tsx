import React from 'react';
import { Store } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';
import { MemoryRouter } from 'react-router-dom';

import { ListItem } from '../index';

const renderList = (store: Store) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <ListItem key="1" _id="1" name="test" />
      </MemoryRouter>
    </Provider>,
  );
};

describe('<ListItem />', () => {
  let store: ReturnType<typeof configureAppStore>;

  beforeEach(() => {
    store = configureAppStore();
  });
  it('should match snapshot', () => {
    const ListItem = renderList(store);
    expect(ListItem.container.firstChild).toMatchSnapshot();
  });
});
