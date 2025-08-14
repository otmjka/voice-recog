// import './App.css';

import type { FC } from "react";

type AppProps = {
}

/*
  App
    Router

*/ 
const App: FC<AppProps> = () => {
  return (
    <MainPage/>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={onClick}>count is</button>
        <div>{count}</div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default App;
