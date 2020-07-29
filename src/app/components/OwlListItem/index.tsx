import React, { memo } from 'react';

import { useDispatch } from 'react-redux';
import { actions } from '../../containers/ListPage/slice';
type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
interface Props extends InputProps {
  index: number;
  text: string;
  status: string;
}
export const OwlListItem = memo(({ index, text, status, ...restOf }: Props) => {
  const dispatch = useDispatch();

  const deleteOwlItem = (id: number) => {
    dispatch(actions.deleteOwlItem(id));
    dispatch(actions.loadOwlItems());
  };
  const changeOrder = (id: number, inc: number) => {
    dispatch(actions.changeOrder({ id: id, inc: inc }));
    dispatch(actions.loadOwlItems());
  };
  return (
    <div>
      <input
        key={index}
        type="text"
        disabled={status === 'deleting' ? true : false}
        value={
          status === 'pending' || status === 'deleting'
            ? text + ' - Pending upload'
            : text
        }
        {...restOf}
      />
      {status === 'deleting' ? null : (
        <button
          onClick={() => {
            deleteOwlItem(index);
          }}
        >
          X
        </button>
      )}
      <button
        onClick={() => {
          changeOrder(index, 1);
        }}
      >
        &uarr;
      </button>
      <button
        onClick={() => {
          changeOrder(index, -1);
        }}
      >
        &darr;
      </button>
    </div>
  );
});
