FROM node:lts-alpine
WORKDIR /app
COPY --chown=$USER:$USER . /app
RUN npm install
USER $USER
