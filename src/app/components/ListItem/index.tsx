import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../containers/HomePage/slice';

import { Link } from 'app/components/Link';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
interface Props extends InputProps {
  _id: string;
  name: string;
}
export const ListItem = memo(({ _id, name, ...restOf }: Props) => {
  const dispatch = useDispatch();

  const deleteList = (id: string) => {
    dispatch(actions.deleteOwlList(id));
    dispatch(actions.loadOwlLists());
  };
  return (
    <span>
      <Link to={process.env.PUBLIC_URL + '/list/' + _id}>&gt; {name}</Link>{' '}
      <button
        onClick={() => {
          deleteList(_id);
        }}
      >
        X
      </button>
    </span>
  );
});
