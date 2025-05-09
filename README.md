# 📺 PlayTrack - Sistem Sewa & Kontrol TV Android untuk Rental PS/Game Room

**PlayTrack** adalah aplikasi profesional yang dirancang khusus untuk rental PS atau ruang game yang menggunakan TV Android. Dengan PlayTrack, Anda bisa mengelola penyewaan TV secara otomatis—dari menghitung durasi dan biaya sewa, memantau penggunaan, hingga mengontrol TV Android secara **remote tanpa remote fisik**.

---

## ✨ Fitur Utama

- 🔍 **Scan otomatis TV Android** dalam jaringan lokal (LAN)
- 🎮 **Mulai, perpanjang, dan hentikan sesi sewa** dari dashboard
- 💰 **Perhitungan otomatis biaya sewa** berdasarkan durasi atau paket
- 📺 **Remote langsung ke TV Android** (tanpa remote fisik, cukup ADB aktif)
- 📊 **Laporan transaksi & ekspor ke CSV**
- 🧑‍💻 **Tampilan dashboard modern** (Next.js + Tailwind + ShadCN)
- 🛠️ **Worker background** untuk mematikan TV otomatis saat waktu habis
- 🔒 Sistem lisensi (figar.januari@gmail.com)

---

## 💼 Cocok Untuk:

- Rental PS dan Game Room
- Usaha sewa TV Android per jam
- Cafe atau lounge dengan area gaming

---

## 🖥️ Minimum Spesifikasi Sistem

| Komponen     | Keterangan             |
|--------------|------------------------|
| OS           | **Linux (Ubuntu 20.04+)** atau **Windows 10+** |
| CPU          | Dual-core              |
| RAM          | 2 GB atau lebih        |
| Penyimpanan  | Minimal 5 GB kosong    |
| Node.js      | v20                    |
| MongoDB      | v6+                    |
| Redis        | v5/v6                  |
| ADB Tools    | Wajib tersedia         |
| Akses TV     | TV Android dengan Developer Mode + USB Debugging aktif |

---

## ⚙️ Instalasi di Linux (Otomatis)

```bash
cd $HOME && rm -rf playtrack && git clone https://github.com/figarjanuar/PlayTrack.git playtrack && cd playtrack && chmod +x setup.sh && ./setup.sh
```

📌 Akan otomatis install semua komponen dan menjalankan aplikasi sebagai service (`tvapp` dan `tvworker`).

---

## ⚙️ Instalasi di Windows (Manual)

1. Install komponen berikut:
   - [Git untuk Windows](https://git-scm.com/download/win)
   - [Node.js v20](https://nodejs.org/en/download)
   - [MongoDB Community](https://www.mongodb.com/try/download/community)
   - [Redis untuk Windows (by Microsoft)](https://github.com/microsoftarchive/redis/releases)
   - [ADB Platform Tools](https://developer.android.com/tools/releases/platform-tools)

2. Clone repository ini dan buka di terminal:
   ```bash
   git clone https://github.com/figarjanuar/PlayTrack.git
   cd PlayTrack
   ```

3. Jalankan `start-windows.bat` untuk install dan start aplikasi.

---

## 🔐 Lisensi

Aplikasi ini memerlukan lisensi resmi untuk dapat menjalankan fitur **Start Sewa TV**. Anda tetap dapat membuka aplikasinya, namun tidak bisa menjalankan sesi tanpa lisensi.

📩 Untuk pembelian lisensi, silakan hubungi: **figar.januari@gmail.com**

---

## 🔄 Update Aplikasi (Linux)

```bash
cd $HOME/playtrack && git pull && chmod +x update.sh && ./update.sh
```

---

## 🧰 Service Management (Linux)

| Nama Service | Fungsi                             |
|--------------|-------------------------------------|
| `tvapp`      | Menjalankan dashboard aplikasi      |
| `tvworker`   | Memantau dan mematikan TV otomatis  |

Cek status layanan:

```bash
systemctl status tvapp
systemctl status tvworker
```

Restart manual jika diperlukan:

```bash
sudo systemctl restart tvapp
sudo systemctl restart tvworker
```

---

## 📁 Isi Repository

- `.next/` → hasil build Next.js
- `public/` → asset frontend
- `package.json`, `package-lock.json` → konfigurasi aplikasi
- `setup.sh`, `update.sh`, `setup-windows.bat`, `update-windows.bat` → script setup & start
- `.env.local` → konfigurasi lingkungan db
- `public.pem` → public key RSA untuk validasi lisensi

---

## 👨‍💻 Dibuat oleh

**Figar Januar Ramadhan**  
[https://github.com/figarjanuar](https://github.com/figarjanuar)
