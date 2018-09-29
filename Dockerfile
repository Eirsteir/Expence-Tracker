FROM node:8.11.1

WORKDIR /usr/src/expence-tracker-api

COPY ./ ./

RUN npm install

ENV PORT 3000
EXPOSE 3000

CMD ["/bin/bash"]
