import React from 'react';
import { Store } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';
import { OwlListItem } from '../index';

const renderItem = (store: Store) => {
  return render(
    <Provider store={store}>
      <OwlListItem index={0} key="0" text="test" status="pending" readOnly />
    </Provider>,
  );
};

describe('<ListItem />', () => {
  let store: ReturnType<typeof configureAppStore>;

  beforeEach(() => {
    store = configureAppStore();
  });
  it('should match snapshot', () => {
    const ListItem = renderItem(store);
    expect(ListItem.container.firstChild).toMatchSnapshot();
  });
});
