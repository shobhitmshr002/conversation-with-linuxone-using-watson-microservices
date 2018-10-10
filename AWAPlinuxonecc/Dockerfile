#Use the IBM Node image as a base image
# FROM node:latest
# FROM s390x/node:8.12-alpine
FROM ibmcom/ibmnode
WORKDIR /AWAPlinuxonecc
COPY package.json /AWAPlinuxonecc/

RUN cd /AWAPlinuxonecc; npm install; npm prune --production
# comment added
COPY . /AWAPlinuxonecc
#Expose the port for AWAP app, and set 
#it as an environment variable as expected by cf apps
ENV PORT=3000
EXPOSE 3000
ENV NODE_ENV production

# removed comment LSU DEMO
#
#Copy all app files from the current directory into the app 
#directory in your container. Set the app directory
#as the working directory

#Sleep before the app starts. This command ensures that the
#IBM Containers networking is finished before the app starts. 
# CMD (sleep 60; npm start)
CMD ["node","/AWAPlinuxonecc/server.js" ]
