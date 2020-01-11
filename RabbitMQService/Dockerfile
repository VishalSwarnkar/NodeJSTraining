FROM node:8
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . .
EXPOSE 7777
USER node
CMD [ "npm", "start" ]