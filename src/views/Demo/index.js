import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams, useSearchParams, useLoaderData } from 'react-router-dom';
import { Button } from 'antd';
import {
  addNumberAction,
  minusNumberAction,
  addNumberThunk,
  addStringAction,
  minusStringAction,
  dataAddNumberAction,
  dataMinusNumberAction,
  dataAddStringAction,
  dataMinusStringAction,
  decrement,
  increment,
  incrementByAmount,
} from '@/store';

import "./index.less";

function Demo() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const loaderData = useLoaderData();
  const state = useSelector(state => state);

  console.info('location: ', location);
  console.info('params: ', params);
  console.info('searchParams: ', searchParams.get('id'));
  console.info('loaderData: ', loaderData);
  console.info('state: ', state);

  const action = useCallback((action) => {
    dispatch(action);
  }, [dispatch]);

  return (
    <div className="demo">
      <div className="list-item">
        <Button onClick={() => { action(addNumberAction(3)); }}>Add Number</Button>
        <Button onClick={() => { action(minusNumberAction(3)); }}>Minus Number</Button>
        <Button onClick={() => { action(addStringAction(3)); }}>Add String</Button>
        <Button onClick={() => { action(minusStringAction(3)); }}>Minus String</Button>
      </div>
      <div className="list-item">
        <Button onClick={() => { action(dataAddNumberAction(3)); }}>Data Add Number</Button>
        <Button onClick={() => { action(dataMinusNumberAction(3)); }}>Data Minus Number</Button>
        <Button onClick={() => { action(dataAddStringAction(3)); }}>Data Add String</Button>
        <Button onClick={() => { action(dataMinusStringAction(3)); }}>Data Minus String</Button>
      </div>
      <div className="list-item">
        <Button onClick={() => { dispatch(increment()); }}>increment</Button>
        <Button onClick={() => { dispatch(decrement()); }}>decrement</Button>
        <Button onClick={() => { dispatch(incrementByAmount(5)); }}>incrementByAmount</Button>
      </div>
      <div className="list-item">
        <Button onClick={() => { dispatch(addNumberThunk(50)); }}>thunk</Button>
      </div>
    </div>
  );
}

// loader结果返回，才会渲染组件
export const loader = ({ params }) => {
  return new Promise((resolve) => setTimeout(() => resolve(params), 0));
};

export default Demo;