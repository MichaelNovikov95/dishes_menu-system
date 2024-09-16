FROM node:20.12.0 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install -g @angular/cli@latest
RUN npm install

COPY . .
RUN npm run build --prod

FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build app/dist/dishes_system_menu/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g","daemon off;"]