###################
# BUILD FOR LOCAL DEVELOPMENT
###################

ARG ACCESS_TOKEN_SECRET
ARG ACCESS_TOKEN_EXPIRATION_TIME
ARG REFRESH_TOKEN_SECRET
ARG REFRESH_TOKEN_EXPIRATION_TIME
ARG DATABASE_URL
ARG REDIS_URL

FROM node:18-alpine As development

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY package*.json ./
COPY ./prisma ./prisma

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Bundle app source
COPY . .

RUN npx prisma generate

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY package*.json ./

# In order to run `npm run build` we need access to the Nest CLI.
# The Nest CLI is a dev dependency,
# In the previous development stage we ran `npm ci` which installed all dependencies.
# So we can copy over the node_modules directory from the development image into this build image.
COPY --from=development /usr/src/app/node_modules ./node_modules

COPY . .

RUN npx prisma generate

# Run the build command which creates the production bundle
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory.
# Passing in --only=production ensures that only the production dependencies are installed.
# This ensures that the node_modules directory is as optimized as possible.
RUN npm ci --only=production && npm cache clean --force

EXPOSE 4000

###################
# PRODUCTION
###################

FROM node:18-alpine As production

ARG ACCESS_TOKEN_SECRET
ARG ACCESS_TOKEN_EXPIRATION_TIME
ARG REFRESH_TOKEN_SECRET
ARG REFRESH_TOKEN_EXPIRATION_TIME
ARG DATABASE_URL
ARG REDIS_URL

# Copy the bundled code from the build stage to the production image
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/prisma ./prisma

RUN npx prisma migrate deploy
# Start the server using the production build
CMD [ "node", "dist/main.js" ]