import Button from '../common/Button';

const ReadOnlyProduct = ({ product, handleEditableId, onDelete }) => {
  return (
    <div className="container">
      <div className="product">
        <div className="text-container">
          <h3>{product.name}</h3>
          <div>
            Price: {product.price} | Release date:
            {product.releaseDate.slice(0, 10)}
          </div>
        </div>
        <div className="action-container">
          <Button
            id="delete"
            text={'Delete'}
            onClick={() => onDelete(product.id)}
          />
          <Button
            id="update"
            text="Edit"
            onClick={(e) => handleEditableId(product)}
          />
        </div>
      </div>
    </div>
  );
};

export default ReadOnlyProduct;
