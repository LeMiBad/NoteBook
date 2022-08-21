import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';

import AuthPage from './components/AuthPage/AuthPage';
import ContactsPage from './components/ContactsPage/ContactsPage';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={setupStore()}>
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFoundPage/>}/>
        <Route path='/' element={<AuthPage/>}/>
        <Route path='contacts' element={<ContactsPage/>}/>
      </Routes>
    </BrowserRouter>
  </Provider>
);
