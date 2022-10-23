import { useState } from 'react';

import Button from '../common/Button';

const EditableProduct = ({ product, handleEditableId, onSave }) => {
  const [newProduct, setNewProduct] = useState(product);

  const handleChange = (e) => {
    if (e.target.name === 'isDraft')
      setNewProduct({ ...newProduct, [e.target.name]: e.target.checked });
    else setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="product">
        <div className="text-container">
          <div>Name</div>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
          />
          <div>Price</div>
          <div className="text-container">
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
            />
          </div>
          <div>Draft</div>
          <div className="text-container">
            <input
              type="checkbox"
              name="isDraft"
              checked={newProduct.isDraft}
              onChange={handleChange}
            />
          </div>
          <div>Date</div>
          <div className="text-container">
            <input
              type="date"
              name="releaseDate"
              value={newProduct.releaseDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="action-container">
          <Button
            id="cancel"
            text={'Cancel'}
            onClick={() => {
              handleEditableId(null);
            }}
            onChange={handleChange}
          />
          <Button
            id="save"
            text={'Save'}
            onClick={() => {
              handleEditableId(null);
              onSave(newProduct);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditableProduct;
