# 依存関係をインストールしビルドするためのステージ
FROM node:20.13.0-alpine AS builder
WORKDIR /app

# パッケージをコピーして依存関係をインストール
COPY package.json package-lock.json ./
RUN npm ci

# ソースコードをコピーしてビルド
COPY . .

CMD npm run start
EXPOSE 3000