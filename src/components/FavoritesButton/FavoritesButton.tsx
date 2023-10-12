import classNames from 'classnames';
import { Phone } from '../../types/Phone';

type Props = {
  phone?: Phone,
  setLikedProducts: React.Dispatch<React.SetStateAction<Phone[]>>,
  likedProducts: Phone[],
};

export const FavoritesButton: React.FC<Props> = ({
  phone,
  likedProducts,
  setLikedProducts,
}) => {
  const isLiked = phone ? likedProducts.some(
    (likedProduct) => likedProduct.id === phone.id,
  ) : false;

  const handleToggleFavorite = () => {
    if (phone) {
      if (isLiked) {
        const updatedLikedProducts = likedProducts.filter(
          (likedProduct) => likedProduct.id !== phone.id,
        );

        setLikedProducts(updatedLikedProducts);
      } else {
        const updatedLikedProducts = [...likedProducts, phone];

        setLikedProducts(updatedLikedProducts);
      }
    }
  };

  if (!phone) {
    return null;
  }

  return (
    <div className="favorites-button">
      <button
        type="button"
        onClick={handleToggleFavorite}
        className={classNames('phone__favorites', {
          'phone__favorites--clicked': isLiked,
        })}
        data-cy="addToFavorite"
      >
        <p hidden>
          favorites
        </p>
      </button>
    </div>
  );
};
