const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

//api route to get all parties
router.get('/parties', (req, res) => {
    const sql = `SELECT * FROM parties`;

    db.query(sql, (err, rows) => {
        if(err){
            res.status(500).json({ error: err.message});
            return;
        }
        res.json({
            message: 'sucess',
            data: rows
        });
    });
});
//api call for single party
router.get('/party/:id', (req, res) => {
    const sql = `SELECT * FROM parties WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if(err){
            res.status(400).json({ error: err.message});
            return;
        }
        res.json({
            message: 'sucess',
            data: row
        });
    });
});
//database query to delete party from candidate info
router.delete('/party/:id', (req, res) => {
    const sql = `DELETE FROM parties WHERE id = ?`;
    const params = [req.params.id];

db.query(sql, params, (err, result) => {
    if (err) {
    res.statusMessage(400).json({ error: res.message });
    //checks if anyhting was deleted/affected
    } else if (!result.affectedRows) {
    res.json({
        message: 'Party not found'
    });
    } else {
    res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
            });
        }
    });
});

module.exports = router;