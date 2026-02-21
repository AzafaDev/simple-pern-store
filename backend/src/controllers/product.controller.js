import { sql } from '../configs/sql.js';

export const getProducts = async (req, res) => {
  try {
    const products = await sql`
            SELECT * FROM products
            ORDER BY created_at DESC
        `;
    console.log('fetching products successfully', products);
    res.status(200).json(products);
  } catch (error) {
    console.log('error getting products', error);
    res.status(500).json({ message: 'error getting products' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, image, price } = req.body;
    if (!name || !image || !price) {
      return res
        .status(400)
        .json({ message: 'name, image and price are required' });
    }

    const product = await sql`
            INSERT INTO products (name, image, price)
            VALUES (${name}, ${image}, ${price})
            RETURNING *
        `;
    console.log('product created successfully', product);
    res.status(201).json(product[0]);
  } catch (error) {
    console.log('error creating product', error);
    res.status(500).json({ message: 'error creating product' });
  }
};
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await sql`
            SELECT * FROM products
            WHERE id = ${id}
        `;
    if (product.length === 0) {
      return res.status(404).json({ message: 'product not found' });
    }
    console.log('fetching product successfully', product);
    res.status(200).json(product[0]);
  } catch (error) {
    console.log('error getting product', error);
    res.status(500).json({ message: 'error getting product' });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price } = req.body;
    const updatedProduct = await sql`
            UPDATE products
            SET name = ${name}, image = ${image}, price = ${price}
            WHERE id = ${id}
            RETURNING *
        `;
    if (updatedProduct.length === 0) {
      return res.status(404).json({ message: 'product not found' });
    }
    console.log('product updated successfully', updatedProduct);
    res.status(200).json(updatedProduct[0]);
  } catch (error) {
    console.log('error updating product', error);
    res.status(500).json({ message: 'error updating product' });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await sql`
            DELETE FROM products
            WHERE id = ${id}
            RETURNING *
        `;
    if (deletedProduct.length === 0) {
      return res.status(404).json({ message: 'product not found' });
    }
    console.log('product deleted successfully', deletedProduct);
    res.status(200).json(deletedProduct[0]);
  } catch (error) {
    console.log('error deleting product', error);
    res.status(500).json({ message: 'error deleting product' });
  }
};
