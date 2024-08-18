FROM node:20.12.2-buster-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20.12.2-buster-slim AS runner

WORKDIR /app

COPY --from=builder /app/package*.json ./

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3001
EXPOSE 3002

CMD ["npm", "run", "start:prod"]
