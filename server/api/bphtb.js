const express = require('express')
const db = require('../config/db')
const router = express.Router();

router.post('/pembayaran',async (req, res, next) => {
    // var page = req.query.page;
    // var limit = req.query.limit;
    // var start = req.query.start;
    // var offset = (Number(page) - 1) * Number(limit);
    var query = "SELECT no_sspd, no_registrasi, nik, nama_wp, alamat_wp, nop, alamat_op, jumlah_setoran, create_at, user_name FROM pembayaran_pajak ORDER BY id DESC OFFSET 0 LIMIT 27 "

    await db.any(query)
        .then((data) => {
            res.status(200)
                .json({
                    status: 'success',
                    totalCount: data.length,
                    data: data,
                });
        })
        .catch((error) => {
            return next(error)
        })
})
router.post('/api/v1/caripembayaran', async (req, res, next) => {
    let {no_registrasi} =req.body;
    await db.any("SELECT * FROM pembayaran_pajak WHERE no_registrasi = $1",[no_registrasi])
        .then((data) => {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                });
        })
        .catch((error) => {
            return next(error)
        })
})

module.exports = router