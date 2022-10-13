import express from "express";
import mysql from "mysql2/promise";
import { DB_CONFIG } from "../config/dbConfig.js";

export const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const { name, date } = req.body;
    const parsedDate = date.substring(0, 19);
    const connection = await mysql.createConnection(DB_CONFIG);
    const [response] = await connection.query("INSERT INTO post SET ?", {
      name,
      date: parsedDate,
    });
    await connection.end();
    return res.json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// READ many
router.get("/", async (_, res) => {
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query(`SELECT * FROM post`);
    res.send(rows);
    await connection.end();
  } catch (error) {
    return res.status(500).json(error);
  }
});

// READ one
router.get("/:id", async (req, res) => {
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query(
      `SELECT * FROM post WHERE id = ${req.params.id}`
    );
    res.send(rows[0]);
    await connection.end();
  } catch (error) {
    return res.status(500).json(error);
  }
});

// UPDATE
router.put("/", async (req, res) => {
  try {
    const { id, name } = req.body;
    const connection = await mysql.createConnection(DB_CONFIG);
    const [response] = await connection.query(
      `UPDATE post SET name="${name}" WHERE id="${id}"`
    );
    await connection.end();
    return res.json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// DELETE
router.delete("/", async (req, res) => {
  try {
    const { id } = req.body;
    const connection = await mysql.createConnection(DB_CONFIG);
    const [response] = await connection.query("DELETE FROM post WHERE id=?", [
      id,
    ]);
    await connection.end();
    return res.json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
});
