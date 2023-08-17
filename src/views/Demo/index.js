import { useCallback, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams, useSearchParams, useLoaderData } from 'react-router-dom';
import { Button } from 'antd';
import { ThemeContext } from '@/context';
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

function SubComp() {
  const state = useSelector(state => state);

  useEffect(() => {
    return () => {
      console.info('will unmounted');
    };
  }, []); // 当在 useEffect 的回调函数里返回一个函数时，这个函数会在组件卸载前被调用，用以模拟 willUnMount 生命周期

  return (
    <p>{state.number.a}</p>
  );
}

function Demo() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const loaderData = useLoaderData();
  const state = useSelector(state => state);
  const [showSubComp, setShowSubComp] = useState(true);

  console.info('location: ', location);
  console.info('params: ', params);
  console.info('searchParams: ', searchParams.get('id'));
  console.info('loaderData: ', loaderData);
  console.info('state: ', state);

  const action = useCallback((action) => {
    dispatch(action);
  }, [dispatch]);

  useEffect(() => {
    console.info('mounted');
  }, []); // 加空数组只触发一次
  useEffect(() => {
    console.info('mounted or update');
  }); // 不加参数，每次渲染都会触发

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      console.info('just update');
    }
  }); // 用 ref 来做变量标记，模拟 didUpdate 生命周期

  return (
    <div className="demo">
      {!!showSubComp && <SubComp></SubComp>}
      <Button onClick={() => { setShowSubComp(false); }}>Remove SubComp</Button>
      <p>{state.counter.value}</p>
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
      <ThemeContext.Consumer>
        {({ theme }) => (
          <p>Context Theme: {theme}</p>
        )}
      </ThemeContext.Consumer>
    </div>
  );
}

// loader结果返回，才会渲染组件
export const loader = ({ params }) => {
  return new Promise((resolve) => setTimeout(() => resolve(params), 0));
};

// // shouldComponentUpdate：可以用 React.memo 包裹一个组件来对它的 props 进行浅比较
// const Demo = React.memo((props) => {
//   // 具体的组件
// });

export default Demo;