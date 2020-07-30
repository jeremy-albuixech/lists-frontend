import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { selectItems, selectError, selectItemText } from './selectors';
import { sliceKey, reducer, actions } from './slice';
import { owlItemSaga } from './saga';
import { OwlListItem } from '../../components/OwlListItem';
import { OwlItems } from 'owl-types/types/OwlItems';
import { Link } from 'app/components/Link';
import { OwlItemErrorType } from './types';

export function ListPage() {
  let list_id: string = useParams();
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: owlItemSaga });
  const owlItems = useSelector(selectItems);
  const newItemText = useSelector(selectItemText);
  const error = useSelector(selectError);

  const dispatch = useDispatch();
  const onChangeOwlItem = (
    evt: React.ChangeEvent<HTMLInputElement>,
    item: OwlItems,
  ) => {
    dispatch(
      actions.editOwlItem({ value: evt.currentTarget.value, _id: item._id }),
    );
  };
  const setNewItemText = (itemText: string) => {
    dispatch(actions.setNewItemText(itemText));
  };
  const addOwlItem = () => {
    dispatch(actions.addOwlItem(newItemText));
    dispatch(actions.setNewItemText(''));
    dispatch(actions.loadOwlItems());
  };

  const resetList = () => {
    dispatch(actions.resetList());
  };

  useEffect(() => {
    return () => {
      dispatch(actions.cleanup());
    };
  }, [dispatch]);

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMount(() => {
    dispatch(actions.setListId(list_id));
  });

  return (
    <>
      <Helmet>
        <title>Add items to your list</title>
        <meta name="description" content="Add items to your list." />
      </Helmet>
      <Link to={process.env.PUBLIC_URL}>&gt; Back to Lists</Link> <br />
      <label>Add item to list</label>
      <br />
      <input
        type="text"
        value={newItemText}
        onChange={e => setNewItemText(e.target.value)}
      />
      <button
        onClick={() => {
          addOwlItem();
        }}
      >
        Add
      </button>
      {owlItems.items && owlItems.items.length > 0 ? (
        <List>
          {owlItems.items.map((item, index) => (
            <OwlListItem
              index={index}
              key={index}
              text={item.text}
              status={item.status}
              onChange={e => onChangeOwlItem(e, item)}
            />
          ))}

          <button
            onClick={() => {
              resetList();
            }}
          >
            Reset List
          </button>
        </List>
      ) : error ? (
        <ErrorText>{owlListErrorText(error)}</ErrorText>
      ) : null}
    </>
  );
}

export const owlListErrorText = (error: OwlItemErrorType) => {
  switch (error) {
    case OwlItemErrorType.MISSING_PARAM:
      return '400 - Missing one of the request parameters.';
    case OwlItemErrorType.RESPONSE_ERROR:
      return '500 - There was an error during the request.';
    case OwlItemErrorType.NOTFOUND_ERROR:
      return "404 - We couldn't find the document requested.";
    default:
      return 'An error has occurred!';
  }
};

const ErrorText = styled.div`
  color: ${p => p.theme.text};
`;

const List = styled.div``;
