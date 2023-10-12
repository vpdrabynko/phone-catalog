import { MainNavigation } from '../../components/MainNavigation/MainNavigation';
import { PhoneCard } from '../../components/PhoneCard/PhoneCard';
import { Phone } from '../../types/Phone';
import { CartItem } from '../../types/CartItem';
import { NoResults } from '../NoResultsPage/NoResults';
import './Favorites.scss';

type Props = {
  likedProducts: Phone[],
  setLikedProducts: React.Dispatch<React.SetStateAction<Phone[]>>,
  cartProducts: CartItem[],
  setCartProducts: React.Dispatch<React.SetStateAction<CartItem[]>>,
};

export const Favorites: React.FC<Props> = ({
  likedProducts,
  setLikedProducts,
  cartProducts,
  setCartProducts,
}) => {
  return (
    <>
      <div className="favorites">
        <MainNavigation />

        <div className="favorites__content">
          <h1 className="favorites__title">
            Favorites
          </h1>

          <p className="favorites__subtitle">
            {`${likedProducts.length} items`}
          </p>

          {!likedProducts.length ? (
            <NoResults />
          ) : (
            <div className="favorites__phones">
              {likedProducts.map(product => (
                // eslint-disable-next-line react/jsx-key
                <div className="favorites__phones--item">
                  <PhoneCard
                    phone={product}
                    likedProducts={likedProducts}
                    setLikedProducts={setLikedProducts}
                    cartProducts={cartProducts}
                    setCartProducts={setCartProducts}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
