#!/bin/bash

set -e

echo "🔄 Menjalankan update aplikasi (PlayTrack)..."
echo "📂 Lokasi: $(pwd)"

# Tarik update terbaru
git pull origin main

# Install dependency (tanpa dev)
npm install --omit=dev

# Restart service
sudo systemctl restart tvapp
sudo systemctl restart tvworker

echo "✅ Update selesai dan service sudah aktif."
