import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import './utils/normalize.scss';
import { useState, useEffect } from 'react';
import { HeadNavigation } from './components/HeadNavigation/HeadNavigation';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFound } from './pages/NotFoundPage/NotFound';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { Phone } from './types/Phone';
import { getPhones } from './helpers/fetchPhones';
import { Loader } from './components/Loader/Loader';
import { FootNavigation } from './components/FootNavigation/FootNavigation';
import { PhoneDetails } from './pages/PhoneDetailsPage/PhoneDetails';
import { Favorites } from './pages/FavoritesPage/Favorites';
import { Cart } from './pages/CartPage/Cart';
import { useLocalStorage } from './helpers/useLocalStorage';
import { useAppSelector } from './app/hooks';

const visiblePhones = (query: string, phones: Phone[]) => {
  const formattedQuery = query.trim().toLowerCase();

  return phones.filter(
    phone => phone.name.toLowerCase().includes(formattedQuery),
  );
};

const visibleLikedPhones = (query: string, phones: Phone[]) => {
  const formattedQuery = query.trim().toLowerCase();

  return phones.filter(
    phone => phone.name.toLowerCase().includes(formattedQuery),
  );
};

const App = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [likedProducts, setLikedProducts] = useLocalStorage(
    [], 'likedProducts',
  );
  const [cartProducts, setCartProducts] = useLocalStorage([], 'cartItems');

  const searchQuery = useAppSelector((state) => state.search.query);

  const loadProducts = async () => {
    setIsLoading(true);
    setError(null);

    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      const productsFromServer = await getPhones();

      setPhones(productsFromServer);
    } catch {
      setError('Error loading products. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartProducts));
  }, [cartProducts]);

  const visiblePhonesItems = visiblePhones(searchQuery, phones);
  const visibleLikedItems = visibleLikedPhones(searchQuery, likedProducts);

  return (
    <div className="page">
      <HeadNavigation
        likedProducts={likedProducts}
        cartProducts={cartProducts}
      />

      {error && (
        <div className="error-message">{error}</div>
      )}

      {!error && (
        <div className="main">
          {isLoading ? (
            <Loader />
          ) : (
            <Routes>
              <Route
                path="/"
                element={(
                  <HomePage
                    phones={phones}
                    likedProducts={likedProducts}
                    setLikedProducts={setLikedProducts}
                    cartProducts={cartProducts}
                    setCartProducts={setCartProducts}
                  />
                )}
              />
              <Route
                path="home"
                element={
                  <Navigate to="/" replace />
                }
              />

              <Route path="/phones">
                <Route
                  index
                  element={(
                    <PhonesPage
                      phones={visiblePhonesItems}
                      setPhones={setPhones}
                      likedProducts={likedProducts}
                      setLikedProducts={setLikedProducts}
                      cartProducts={cartProducts}
                      setCartProducts={setCartProducts}
                    />
                  )}
                />
                <Route
                  path=":productId"
                  element={(
                    <PhoneDetails
                      phones={phones}
                      likedProducts={likedProducts}
                      setLikedProducts={setLikedProducts}
                      cartProducts={cartProducts}
                      setCartProducts={setCartProducts}
                    />
                  )}
                />
              </Route>

              <Route path="/tablets">
                <Route index element={<TabletsPage />} />
                <Route
                  path=":productId"
                  element={<TabletsPage />}
                />
              </Route>

              <Route path="/accessories">
                <Route index element={<AccessoriesPage />} />
                <Route
                  path=":productId"
                  element={<AccessoriesPage />}
                />
              </Route>

              <Route path="/favorites">
                <Route
                  index
                  element={(
                    <Favorites
                      likedProducts={visibleLikedItems}
                      setLikedProducts={setLikedProducts}
                      cartProducts={cartProducts}
                      setCartProducts={setCartProducts}
                    />
                  )}
                />
              </Route>

              <Route path="/shoppingBag">
                <Route
                  index
                  element={(
                    <Cart
                      cartProducts={cartProducts}
                      setCartProducts={setCartProducts}
                    />
                  )}
                />
              </Route>

              <Route
                path="*"
                element={
                  <NotFound />
                }
              />
            </Routes>
          )}
        </div>
      )}

      <FootNavigation />
    </div>
  );
};

export default App;
