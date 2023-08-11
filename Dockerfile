FROM node:18-alpine3.17 AS deps

RUN apk add --no-cache libc6-compat #permite tener las dependencias en cache
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM node:18-alpine3.17 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine3.17 AS runner
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --only=prod
COPY --from=builder /app/dist ./dist

CMD [ "node", "dist/main" ]