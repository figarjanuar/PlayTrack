FROM node:20-bullseye
RUN apt-get update && apt-get install -y android-tools-adb && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY . .
RUN npm install --omit=dev
CMD ["npm", "start"]
