const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 4000;
const SECRET_KEY = 'your_secret_key'; // Ganti dengan secret key Anda

app.use(bodyParser.json());

// Rute untuk root
app.get('/', (req, res) => {
    res.send('Server is running. Use /login to authenticate.');
});

// Dummy user data
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' },
];

// Endpoint untuk login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Cek apakah pengguna ada dan password sesuai
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
        return res.status(401).json({ message: 'Username atau password salah' });
    }

    // Generate token
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login berhasil', token });
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
