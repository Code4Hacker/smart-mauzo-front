import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard, Employees } from './components';
import Login from './components/Welcome/Login';
import Customers from './components/admin/customers/Customers';
import Customer from './components/admin/customers/Customer';
import AllDeals from './components/admin/customers/AllDeals';
import { ECustomers, EDashboard, ELogin } from './components/employees';
import OneCustomer from './components/employees/customers/OneCustomer';
import Pro_form from './components/employees/customers/Printing/Pro_form';
import Stocks from './components/employees/report/Stocks';
import Invoice from './components/employees/customers/Printing/Invoice';
import Receipt from './components/employees/customers/Printing/Receipt';
import Pro_form2 from './components/employees/customers/Printing/Pro_forma2';
import ICustomer from './components/employees/customers/IndividualCustomers';
import AStocks from './components/admin/report/Stocks';
import Delivery from './components/employees/customers/Printing/Delivery';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin */}
        <Route path='/admin' element={  <Dashboard />} />
        <Route path='/employees' element={  <Employees />} />
        <Route path='/customers' element={  <Customers />} />
        <Route path='/deals' element={  <AllDeals />} />
        <Route path='/customers/:id' element={  <Customer />} />
        <Route path='/' element={  <Login />} />
        <Route path='/report' element={  <AStocks />} />

        {/* Employee */}
        <Route path='/e_login' element={  <ELogin />} />
        <Route path='/employee' element={  <EDashboard />} />
        <Route path='/e_customers' element={  <ECustomers />} />
        <Route path='/one_customer/:id' element={  <OneCustomer />} />
        <Route path='/repo' element={  <Stocks />} />
        <Route path='/userEmp' element={  <ICustomer />} />
        {/* GENERAL */}
        <Route path='/pro_forma/:id' element={  <Pro_form />} />
        <Route path='/pro_forma2/:id' element={  <Pro_form2 />} />
        <Route path='/invoice/:id' element={  <Invoice />} />
        <Route path='/receipt/:id' element={  <Receipt />} />
        <Route path='/delivery/:id' element={  <Delivery />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
