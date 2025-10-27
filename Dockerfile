FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
COPY entrypoint.sh ./
ENV NODE_ENV=production
ENV PORT=3000
RUN chmod +x entrypoint.sh
EXPOSE 3000
CMD ["sh", "./entrypoint.sh"]