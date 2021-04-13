FROM node:lts-alpine
ARG env
WORKDIR /app
ADD . /app

EXPOSE 80

RUN echo $env
RUN npm install -g serve && npm install && REACT_APP_ENV=$env npm run build

CMD ["serve", "-l", "80", "-s", "build"]
