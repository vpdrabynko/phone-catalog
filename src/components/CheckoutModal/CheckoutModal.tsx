import cross from '../../Icons/closeBlack.svg';
import './CheckoutModal.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CheckoutModal:React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal__wrapper">
            <button
              type="button"
              className="modal__button"
              onClick={onClose}
            >
              <img src={cross} alt="cross" className="modal__image" />
            </button>
          </div>

          <h1 className="modal__title">
            We are sorry, but this feature is not implemented yet
          </h1>
        </div>
      )}
    </>
  );
};
