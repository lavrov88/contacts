import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client"
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// )

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
    <Provider store={store}>
      <App />
    </Provider>
)
