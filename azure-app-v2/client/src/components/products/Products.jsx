import { useEffect, useState, Fragment } from 'react';

import EditableProduct from './EditableProducts';
import ReadOnlyProduct from './ReadOnlyProducts';
import Button from '../common/Button';

const serverUrl =
  (process.env.REACT_APP_SERVER_URI || 'http://localhost:8080') + '/api/v1/products';

const Products = () => {
  const [products, setProducts] = useState([
    {
      id: '',
      name: '',
      price: '',
      isDraft: '',
      releaseDate: '',
    },
  ]);
  const [product, setProduct] = useState({
    id: '',
    name: '',
    price: '',
    isDraft: false,
    releaseDate: new Date().toJSON().slice(0, 10),
  });

  const [editProductId, setEditProductId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    await fetch(serverUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then((products) => {
        setProducts(products);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  const handleChange = (e) => {
    if (e.target.name === 'isDraft') {
      setProduct({ ...product, [e.target.name]: e.target.checked });
    } else setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAdd = async (product) => {
    await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then((response) => {
        const newProduct = { ...product, id: response.insertId };
        setProducts([...products, newProduct]);
      });
  };

  const handleEditableId = (product) => {
    product ? setEditProductId(product.id) : setEditProductId(product);
  };

  const onSave = async (product) => {
    await fetch(serverUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .finally(() => {
        const newState = products.map((e) => {
          if (e.id === product.id) {
            return product;
          }
          return e;
        });
        setProducts(newState);
      });
  };

  const onDelete = async (id) => {
    await fetch(serverUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(setProducts(products.filter((product) => product.id !== id)));
  };

  if (loading) return 'Loading...';

  return (
    <div>
      {products.length !== 0 ? (
        <h2>Products</h2>
      ) : (
        <h4>There are no products</h4>
      )}
      {products.map((product) => (
        <Fragment key={product.id}>
          {editProductId === product.id ? (
            <EditableProduct
              product={product}
              handleEditableId={handleEditableId}
              onSave={onSave}
            />
          ) : (
            <ReadOnlyProduct
              product={product}
              handleEditableId={handleEditableId}
              onDelete={onDelete}
            />
          )}
        </Fragment>
      ))}
      <hr className="hline" />
      <div>
        <h2>Add new Product</h2>
        <div className="container">
          <div className="input-container">
            <label>Name</label>
            <input
              type="text"
              name="name"
              key="name"
              placeholder="Amazing product name"
              id="name"
              onChange={handleChange}
              value={product.name}
              required
            />
          </div>
          <div className="input-container">
            <label>Price</label>
            <input
              type="number"
              name="price"
              key="price"
              placeholder="999.99"
              id="price"
              onChange={handleChange}
              value={product.price}
              required
            />
          </div>
          <div className="input-container">
            <label>Draft</label>
            <input
              type="checkbox"
              name="isDraft"
              key="draft"
              id="draft"
              value={product.isDraft}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label>Release date</label>
            <input
              type="date"
              name="releaseDate"
              key="release"
              id="release"
              onChange={handleChange}
              required
            />
          </div>
          <div className="add-button-container">
            <Button
              id="new-Product"
              text={'Add new'}
              onClick={() => handleAdd(product)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
