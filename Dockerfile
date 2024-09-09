FROM node:20-alpine AS base

RUN npm install -g pnpm@9.6.0


FROM base as build

WORKDIR /app-build

COPY package.json .npmrc pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

# defining args for env
ARG NODE_ENV=production
ARG BUILD_TARGET=production
ARG PAYLOAD_CONFIG_PATH=dist/payload.config.js

ARG PORT=3000
ARG NEXT_PUBLIC_SERVER_URL=http://localhost:${PORT}

# definine env
ENV NODE_ENV=${NODE_ENV}
ENV BUILD_TARGET=${BUILD_TARGET}
ENV PAYLOAD_CONFIG_PATH=${PAYLOAD_CONFIG_PATH}

ENV PORT=${PORT}
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}

RUN pnpm build

FROM base as production

WORKDIR /app

COPY package.json pnpm-lock.yaml .npmrc next.config.js next.config.ts ./

# defining args for env
ARG NODE_ENV=production
ARG BUILD_TARGET=production
ARG PAYLOAD_CONFIG_PATH=dist/payload.config.js

ARG PORT=3000
ARG NEXT_PUBLIC_SERVER_URL=http://localhost:${PORT}

# definine env
ENV NODE_ENV=${NODE_ENV}
ENV BUILD_TARGET=${BUILD_TARGET}
ENV PAYLOAD_CONFIG_PATH=${PAYLOAD_CONFIG_PATH}

ENV PORT=${PORT}
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}

RUN pnpm install --prod --frozen-lockfile

COPY src/ ./src
COPY --from=build /app-build/.next/ ./.next
COPY --from=build /app-build/dist/ ./dist

ARG PORT=3000

EXPOSE ${PORT}

VOLUME [ "/app/product_files", "/app/media" ]

CMD [ "node", "dist/index.js" ]






