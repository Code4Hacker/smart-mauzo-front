import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard, Employees } from './components';
import Login from './components/Welcome/Login';
import Customers from './components/admin/customers/Customers';
import Customer from './components/admin/customers/Customer';
import AllDeals from './components/admin/customers/AllDeals';
import { ECustomers, EDashboard, ELogin } from './components/employees';
import OneCustomer from './components/employees/customers/OneCustomer';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin' element={
          <Dashboard />
        } />
        <Route path='/employees' element={
          <Employees />
        } />
        <Route path='/customers' element={
          <Customers />
        } />
        <Route path='/deals' element={
          <AllDeals />
        } />
        <Route path='/customers/:id' element={
          <Customer />
        } />
        <Route path='/' element={
          <Login />
        } />
        {/* Employee */}
        <Route path='/e_login' element={
          <ELogin />
        } />
        <Route path='/employee' element={
          <EDashboard />
        } />
        <Route path='/e_customers' element={
          <ECustomers />
        } />
        <Route path='/one_customer/:id' element={
          <OneCustomer />
        } />


      </Routes>
    </BrowserRouter>
  )
}

export default App;
