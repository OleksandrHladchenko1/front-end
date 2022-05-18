import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { Wrapper } from './components/common/Wrapper';

import './index.scss';

ReactDOM.render(
  <Wrapper>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Wrapper>,
document.getElementById('root'));
