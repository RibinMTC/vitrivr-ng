FROM node:12.18.3 AS compile-image

WORKDIR /vitrivr-webinterface

ENV PATH /vitrivr-webinterface/node_modules/.bin:$PATH

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

CMD ["ng", "serve","--host","0.0.0.0","--poll","500"]

