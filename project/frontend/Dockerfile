FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build

RUN yarn global add serve

CMD ["serve", "-s", "dist", "-l", "5173"]




