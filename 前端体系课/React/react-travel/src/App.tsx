import React, { useEffect } from 'react';
import styles from "./App.module.css"
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { DetailPage, HomePage, RegisterPage, SignInPage, SearchPage, ShoppingCartPage, PlaceOrderPage } from './pages';
import { useSelector } from './redux/hooks';
import { useDispatch } from 'react-redux';
import { getShoppingCart } from './redux/shoppingCart/slice';

const PrivateRoute = ({ isAuthentiacted, element }) => {
  return isAuthentiacted ? (
    element
    // <element/>
  ) : (
    <Navigate to={"/signin"} />
  );
}

function App() {
  const jwt = useSelector(state => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart(jwt));
    }
  }, [jwt]);

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signin' element={<SignInPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/detail/:touristRouteId' element={<DetailPage />} />
          <Route path='/search/:keywords' element={<SearchPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/shoppingCart' element={<PrivateRoute isAuthentiacted={jwt !== null} element={<ShoppingCartPage />} />} />
          <Route path='/placeOrder' element={<PrivateRoute isAuthentiacted={jwt !== null} element={<PlaceOrderPage />} />} />
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
