const express = require('express');
const mysql = require('mysql2/promise');
const DB_CONFIG = require('../config/dbConfig.js');

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
  try {
    const { name, price, isDraft, releaseDate } = req.body;
    const connection = await mysql.createConnection(DB_CONFIG);
    const [response] = await connection.query('INSERT INTO product SET ?', {
      name,
      price,
      isDraft,
      releaseDate,
    });
    await connection.end();
    return res.json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// READ many
router.get('/', async (_, res) => {
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query(`SELECT * FROM product`);
    res.send(rows);
    await connection.end();
  } catch (error) {
    return res.status(500).json(error);
  }
});

// READ one
router.get('/:id', async (req, res) => {
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query(
      `SELECT * FROM product WHERE id = ${req.params.id}`,
    );
    res.send(rows[0]);
    await connection.end();
  } catch (error) {
    return res.status(500).json(error);
  }
});

// UPDATE
router.put('/', async (req, res) => {
  try {
    const { id, name, price, isDraft, releaseDate } = req.body;
    const connection = await mysql.createConnection(DB_CONFIG);
    const [response] = await connection.query(
      `UPDATE product SET name=?, price=?, isDraft=?, releaseDate=? WHERE id=?`,
      [name, price, isDraft, releaseDate.slice(0, 10), id],
    );
    await connection.end();
    return res.json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// DELETE
router.delete('/', async (req, res) => {
  try {
    const { id } = req.body;
    const connection = await mysql.createConnection(DB_CONFIG);
    const [response] = await connection.query(
      'DELETE FROM product WHERE id=?',
      [id],
    );
    await connection.end();
    return res.json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
