import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { selectLists, selectError, selectNewListName } from './selectors';
import { ListItem } from '../../components/ListItem';
import { sliceKey, reducer, actions } from './slice';
import { owlListSaga } from './saga';
import { OwlListErrorType } from './types';

export function HomePage() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: owlListSaga });
  const lists = useSelector(selectLists);
  const error = useSelector(selectError);
  const newListName = useSelector(selectNewListName);

  const dispatch = useDispatch();

  const setNewListName = (listName: string) => {
    dispatch(actions.setNewListName(listName));
  };

  const createNewList = () => {
    dispatch(actions.createNewList(newListName));
  };

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    dispatch(actions.loadOwlLists());
  });

  return (
    <>
      <Helmet>
        <title>Manage your lists!</title>
        <meta name="description" content="Make a list." />
      </Helmet>
      <label>Create a new list</label>
      <br />
      <input
        type="text"
        value={newListName}
        onChange={e => setNewListName(e.target.value)}
      />
      <button
        onClick={() => {
          createNewList();
        }}
      >
        Create
      </button>
      {lists?.length > 0 ? (
        <List>
          {lists.map(item => (
            <ListItem key={item._id} _id={item._id} name={item.name} />
          ))}
        </List>
      ) : error ? (
        <ErrorText>{owlListErrorText(error)}</ErrorText>
      ) : null}
    </>
  );
}

export const owlListErrorText = (error: OwlListErrorType) => {
  switch (error) {
    case OwlListErrorType.MISSING_PARAM:
      return '400 - Missing one of the request parameters.';
    case OwlListErrorType.RESPONSE_ERROR:
      return '500 - There was an error during the request.';
    case OwlListErrorType.NOTFOUND_ERROR:
      return "404 - We couldn't find the document requested.";
    default:
      return 'An error has occurred!';
  }
};

const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;

const List = styled.div``;
