# Use the IBM Node image as a base image
# FROM s390x/node:8.12-alpine
FROM ibmcom/ibmnode
WORKDIR /AWAPlinuxonecc
COPY package.json /AWAPlinuxonecc/

RUN cd /AWAPlinuxonecc; npm install; npm prune --production
COPY . /AWAPlinuxonecc
ENV PORT=3000
EXPOSE 3000
ENV NODE_ENV production

CMD ["node", "/AWAPlinuxonecc/server.js" ]
