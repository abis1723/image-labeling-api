FROM node:14.16-buster-slim

RUN npm config set scripts-prepend-node-path true

RUN npm install -g typescript@3.9.7

WORKDIR /opt

COPY src /opt/src/
COPY package.json /opt
COPY tsconfig.json /opt
COPY yarn.lock /opt
COPY config /opt/config/
# COPY . .
RUN yarn install && yarn build
ENV PORT 5000
WORKDIR /opt
EXPOSE  5000

RUN echo "ok" > /tmp/healthy

CMD ["npm", "start"]