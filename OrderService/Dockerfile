FROM node:8
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . .
EXPOSE 3001
USER node
CMD [ "npm", "start" ]