import React from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import Login from './components/Login.js';
import App from './App.js';
import ShowAllCampign from './components/ShowAllCampign.js';
import AddCustomer from './components/AddCustomer.js';
import MakeOrder from './components/MakeOrder.js';
import CreateCampign from './components/CreateCampign.js';
import Register from './components/Register.js';
import ShowAllCustomer from './components/ShowAllCustomer.js';
import SendCampaign from './components/SendCampaign.js';
import CommunicationLogs from './components/CommunicationLogs.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/' element={<App />}>
        <Route path='/send-campaign/:campaignId' element={<SendCampaign />} />
        <Route path='show-all-customer' element={<ShowAllCustomer />} />
        <Route path='add-customer' element={<AddCustomer />} />
        <Route path='show-all-campign' element={<ShowAllCampign />} />
        <Route path='make-order' element={<MakeOrder />} />
        <Route path='create-campign' element={<CreateCampign />} />
        <Route path='campaigns/:campaignId/logs' element={<CommunicationLogs />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

reportWebVitals();
