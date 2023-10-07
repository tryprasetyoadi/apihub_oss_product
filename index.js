const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Konfigurasi database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'example_struct',
});

db.connect((err) => {
  if (err) {
    console.error('Koneksi database gagal: ' + err.stack);
    return;
  }
  console.log('Terhubung ke database dengan ID ' + db.threadId);
});

// Endpoint untuk membuat data baru
app.post('/data', (req, res) => {
  const data = req.body;
  db.query(
    'INSERT INTO oss_14_produk (nib, id_produk, id_proyek, kbli, id_bidang_usaha, jenis_produksi, kapasitas, satuan, merk_dagang, pemegang_haki, pemegang_paten, pi_nomor, pi_tanggal, pi_npwp, id_kbli_ta, tkdn) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      data.nib,
      data.id_produk,
      data.id_proyek,
      data.kbli,
      data.id_bidang_usaha,
      data.jenis_produksi,
      data.kapasitas,
      data.satuan,
      data.merk_dagang,
      data.pemegang_haki,
      data.pemegang_paten,
      data.pi_nomor,
      data.pi_tanggal,
      data.pi_npwp,
      data.id_kbli_ta,
      data.tkdn,
    ],
    (err, result) => {
      if (err) {
        console.error('Gagal menambahkan data: ' + err);
        res.status(500).json({ error: 'Gagal menambahkan data' });
        return;
      }
      res.status(201).json({ message: 'Data berhasil ditambahkan' });
    }
  );
});

// Endpoint untuk membaca data
app.get('/data', (req, res) => {
  db.query('SELECT * FROM oss_14_produk', (err, results) => {
    if (err) {
      console.error('Gagal membaca data: ' + err);
      res.status(500).json({ error: 'Gagal membaca data' });
      return;
    }
    res.json(results);
  });
});

// Endpoint untuk mengupdate data
app.put('/data/:id', (req, res) => {
  const id = req.params.id;
  const data = req.body;
  db.query(
    'UPDATE oss_14_produk SET ? WHERE id = ?',
    [data, id],
    (err, result) => {
      if (err) {
        console.error('Gagal mengupdate data: ' + err);
        res.status(500).json({ error: 'Gagal mengupdate data' });
        return;
      }
      res.json({ message: 'Data berhasil diupdate' });
    }
  );
});

// Endpoint untuk menghapus data
app.delete('/data/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM oss_14_produk WHERE id = ?', id, (err, result) => {
    if (err) {
      console.error('Gagal menghapus data: ' + err);
      res.status(500).json({ error: 'Gagal menghapus data' });
      return;
    }
    res.json({ message: 'Data berhasil dihapus' });
  });
});

app.listen(port, () => {
  console.log('Server berjalan di port ' + port);
});
