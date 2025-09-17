
FROM dart:stable AS dart_sdk


FROM node:18-slim


WORKDIR /usr/src/app

COPY --from=dart_sdk /usr/lib/dart /usr/lib/dart


ENV PATH="/usr/lib/dart/bin:${PATH}"


RUN apt-get update && apt-get install -y python3


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 5000


CMD ["node", "app.js"]