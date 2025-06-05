#!/bin/bash

set -e

echo "🔧 Memulai setup aplikasi..."

# Update dan install dependencies dasar
sudo apt update
sudo apt install -y curl gnupg software-properties-common

# Install Node.js v20 (via NodeSource)
if ! command -v node &> /dev/null || [[ "$(node -v)" != v20* ]]; then
  echo "📦 Menginstal Node.js v20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt install -y nodejs
else
  echo "✅ Node.js v20 sudah terinstal."
fi

# Install MongoDB 8.0
if ! command -v mongod &> /dev/null; then
  echo "📦 Menginstal MongoDB 8.0..."
  wget -qO - https://www.mongodb.org/static/pgp/server-8.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg --dearmor
  echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
  sudo apt update
  sudo apt install -y mongodb-org
  sudo systemctl enable mongod
  sudo systemctl start mongod
else
  echo "✅ MongoDB sudah terinstal."
fi

# Install Redis
if ! command -v redis-server &> /dev/null; then
  echo "📦 Menginstal Redis..."
  sudo apt install -y redis-server
  sudo systemctl enable redis-server
  sudo systemctl start redis-server
else
  echo "✅ Redis sudah terinstal."
fi

# Install ADB
if ! command -v adb &> /dev/null; then
  echo "📦 Menginstal ADB..."
  sudo apt install -y android-tools-adb android-tools-fastboot
else
  echo "✅ ADB sudah terinstal."
fi

# Install dependencies Node.js
echo "📦 Menginstal dependencies Node.js..."
npm install

# Membuat file .env.local jika belum ada
ENV_FILE=".env.local"
if [ ! -f "$ENV_FILE" ]; then
  echo "🌱 Membuat file .env.local..."
  echo "MONGODB_URI=mongodb://localhost:27017/tv_timer_prod?authSource=admin" > "$ENV_FILE"
else
  echo "✅ File .env.local sudah ada."
fi

# Build aplikasi
echo "⚙️ Membangun aplikasi..."
npm run build

# Membuat service systemd untuk aplikasi
echo "🛠️ Membuat service systemd untuk aplikasi..."

APP_SERVICE_PATH="/etc/systemd/system/tvapp.service"
WORKER_SERVICE_PATH="/etc/systemd/system/tvworker.service"

sudo bash -c "cat > $APP_SERVICE_PATH" <<EOL
[Unit]
Description=TV Rental App
After=network.target

[Service]
Type=simple
WorkingDirectory=$(pwd)
ExecStart=$(which npm) start
Restart=always
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOL

sudo bash -c "cat > $WORKER_SERVICE_PATH" <<EOL
[Unit]
Description=TV Rental Worker
After=network.target

[Service]
Type=simple
WorkingDirectory=$(pwd)
ExecStart=$(which npm) run worker
Restart=always
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOL

# Reload systemd dan enable services
sudo systemctl daemon-reexec
sudo systemctl daemon-reload
sudo systemctl enable tvapp
sudo systemctl enable tvworker
sudo systemctl start tvapp
sudo systemctl start tvworker

echo "✅ Setup selesai. Aplikasi berjalan di background."
