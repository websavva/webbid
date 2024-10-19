### BASE with Node.js and pnpm pre-installned
FROM node:20-alpine AS base

RUN npm install -g pnpm@9.6.0


### BUILD
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

ARG NEXT_PUBLIC_COMPANY_NAME=WebBid
ARG NEXT_PUBLIC_SUPPORT_EMAIL=support@webbid.shop
ARG NEXT_PUBLIC_DOMAIN=webbid.shop

ARG NEXT_PUBLIC_SERVICE_FEE_PERCENTAGE=5

# defining env
ENV NODE_ENV=${NODE_ENV}
ENV BUILD_TARGET=${BUILD_TARGET}
ENV PAYLOAD_CONFIG_PATH=${PAYLOAD_CONFIG_PATH}

ENV PORT=${PORT}
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}

ENV NEXT_PUBLIC_COMPANY_NAME=${NEXT_PUBLIC_COMPANY_NAME}
ENV NEXT_PUBLIC_SUPPORT_EMAIL=${NEXT_PUBLIC_SUPPORT_EMAIL}
ENV NEXT_PUBLIC_DOMAIN=${NEXT_PUBLIC_DOMAIN}

ENV NEXT_PUBLIC_SERVICE_FEE_PERCENTAGE=${NEXT_PUBLIC_SERVICE_FEE_PERCENTAGE}

RUN pnpm build


### PRODUCTION
FROM base as production

WORKDIR /app

COPY package.json pnpm-lock.yaml .npmrc next.config.js ./

# defining args for env
ARG NODE_ENV=production
ARG BUILD_TARGET=production
ARG PAYLOAD_CONFIG_PATH=dist/payload.config.js

ARG PORT=3000
ARG NEXT_PUBLIC_SERVER_URL=http://localhost:${PORT}

ARG NEXT_PUBLIC_COMPANY_NAME=WebBid
ARG NEXT_PUBLIC_SUPPORT_EMAIL=support@webbid.shop
ARG NEXT_PUBLIC_DOMAIN=webbid.shop

ARG NEXT_PUBLIC_SERVICE_FEE_PERCENTAGE=5

# defining env
ENV NODE_ENV=${NODE_ENV}
ENV BUILD_TARGET=${BUILD_TARGET}
ENV PAYLOAD_CONFIG_PATH=${PAYLOAD_CONFIG_PATH}

ENV PORT=${PORT}
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}

ENV NEXT_PUBLIC_COMPANY_NAME=${NEXT_PUBLIC_COMPANY_NAME}
ENV NEXT_PUBLIC_SUPPORT_EMAIL=${NEXT_PUBLIC_SUPPORT_EMAIL}
ENV NEXT_PUBLIC_DOMAIN=${NEXT_PUBLIC_DOMAIN}

ENV NEXT_PUBLIC_SERVICE_FEE_PERCENTAGE=${NEXT_PUBLIC_SERVICE_FEE_PERCENTAGE}

RUN pnpm install --prod --frozen-lockfile

COPY src/ ./src
COPY tsconfig.json .
COPY --from=build /app-build/.next/ ./.next
COPY --from=build /app-build/dist/ ./dist

ARG PORT=3000

EXPOSE ${PORT}

VOLUME [ "/app/product_files", "/app/media" ]

CMD ["pnpm", "start"]






