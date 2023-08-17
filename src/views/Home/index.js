import { useState, useCallback, Fragment, useReducer, useEffect, useLayoutEffect, useContext, useRef, forwardRef, useImperativeHandle } from 'react';
import { useQuery } from 'react-query';
import { ThemeContext } from '@/context';

import logo from '@/logo.svg';

import './index.css';

const FocusInput = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    childLog() { console.info('Method from Child Comp'); },
  }));
  return <input type="text" ref={ref} />;
});

function Example() {
  const [count, setCount] = useState(101);
  const [numReducer, dispatch] = useReducer((state, action) => {
    if (action.type === 'add') {
      return state + action.num;
    }
    return state - action.num;
  }, count);

  const { theme, setTheme } = useContext(ThemeContext);
  console.info('Theme Context: ', theme);

  const handleAlertClick = useCallback(() => {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 3000);
  }, [count]);

  const pRef = useRef();
  const inputRef = useRef();
  const handleRefTest = useCallback(() => {
    console.info(inputRef, pRef);
    inputRef.current.childLog();
  }, []);

  useEffect(() => {
    console.info('useEffect', inputRef);
    return () => console.info('useEffect return');
  });

  useLayoutEffect(() => {
    console.info('useLayoutEffect');
    return () => console.info('useLayoutEffect return');
  });

  return (
    <div>
      <Fragment>
        <p>You clicked {count} times</p>
      </Fragment>
      <p ref={pRef}>{numReducer}</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={handleAlertClick}>
        Show alert
      </button>
      <button onClick={() => dispatch({ type: 'add', num: 10 })}>
        Add
      </button>
      <button onClick={() => dispatch({ type: 'minus', num: 5 })}>
        Minus
      </button>
      <button onClick={() => setTheme('dark')}>
        SetTheme
      </button>
      <div>
        <FocusInput ref={inputRef}></FocusInput>
        <button onClick={handleRefTest}>
          Test Ref
        </button>
      </div>
    </div>
  );
}

function Home() {
  const { isLoading, error, data } = useQuery('repoData', () => fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res => res.json()));
  console.info('data: ', isLoading, error, data);

  // if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <header className="App-header">
      <Example/>
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  );
}

export default Home;