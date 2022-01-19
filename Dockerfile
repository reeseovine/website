FROM node:lts-alpine

# Create volumes before copying files
VOLUME /app/posts
VOLUME /app/static
VOLUME /app/config

# Copy source code
WORKDIR /app
ADD . .

# Install dependencies
ENV NODE_ENV=production
RUN yarn install

# Start your blog!
CMD yarn start
EXPOSE 5000
