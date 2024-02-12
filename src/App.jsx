import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard, Employees } from './components';
import Login from './components/Welcome/Login';
import Customers from './components/admin/customers/Customers';
import Customer from './components/admin/customers/Customer';
import { ECustomers, EDashboard, ELogin } from './components/employees';
import OneCustomer from './components/employees/customers/OneCustomer';
import Pro_form from './components/employees/customers/Printing/Pro_form';
import Stocks from './components/employees/report/Stocks';
import Invoice from './components/employees/customers/Printing/Invoice';
import Receipt from './components/employees/customers/Printing/Receipt';
import Pro_form2 from './components/employees/customers/Printing/Pro_forma2';
import ICustomer from './components/employees/customers/IndividualCustomers';
import AStocks from './components/admin/report/AStocks';
import Delivery from './components/employees/customers/Printing/Delivery';
import StuffMember from './components/employees/customers/StuffMember';
import Stuffs from './components/employees/customers/Stuffs';
import Stuff_A from './components/employees/customers/Stuff_A';
import UStock from './components/employees/report/Update';
import SCustomer from './components/employees/customers/SearchCustomer';
import S_Customer from './components/admin/customers/Search_C';
import StuffMember2 from './components/employees/customers/StuffMember2';
import EProducts from './components/employees/ProductData';
import { Toaster } from 'react-hot-toast';
import AEProducts from './components/admin/ProductData';

function App() {

  return (
    <>
    <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Admin */}
          <Route path='/admin' element={<Dashboard />} />
          <Route path='/employees' element={<Employees />} />
          <Route path='/customers' element={<Customers />} />
          <Route path='/a_products' element={<AEProducts />} />
          <Route path='/customers/:id' element={<Customer />} />
          <Route path='/' element={<Login />} />
          <Route path='/report' element={<AStocks />} />


          <Route path='/products' element={<EProducts />} />

          {/* Employee */}
          <Route path='/e_login' element={<ELogin />} />
          <Route path='/employee' element={<EDashboard />} />
          <Route path='/e_customers' element={<ECustomers />} />
          <Route path='/one_customer/:id' element={<OneCustomer />} />
          <Route path='/repo' element={<Stocks />} />
          <Route path='/userEmp' element={<ICustomer />} />
          <Route path='/search_customer' element={<SCustomer />} />
          <Route path='/search_' element={<S_Customer />} />

          <Route path='/stuff_members' element={<Stuffs />} />
          <Route path='/stuff' element={<Stuff_A />} />
          <Route path='/edit_stock/:id' element={<UStock />} />
          <Route path='/stuff_member/:id' element={<StuffMember />} />
          <Route path='/stuff_memb/:id' element={<StuffMember2 />} />
          {/* GENERAL */}
          <Route path='/pro_forma/:id' element={<Pro_form />} />
          <Route path='/pro_forma2/:id' element={<Pro_form2 />} />
          <Route path='/invoice/:id' element={<Invoice />} />
          <Route path='/receipt/:id' element={<Receipt />} />
          <Route path='/delivery/:id' element={<Delivery />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App;
