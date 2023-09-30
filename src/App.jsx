import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard, Employees, Welcome } from './components';
import Login from './components/Welcome/Login';
import Customers from './components/admin/customers/Customers';
import Customer from './components/admin/customers/Customer';
import AllDeals from './components/admin/customers/AllDeals';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome />} />
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
        <Route path='/login' element={
          <Login />
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App;
