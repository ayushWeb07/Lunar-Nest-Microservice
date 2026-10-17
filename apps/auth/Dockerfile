FROM node:22-alpine AS development

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .

RUN pnpm run build

FROM node:22-alpine AS production

ENV NODE_ENV=production

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod --frozen-lockfile --ignore-scripts

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/auth/main"]