FROM trufflesuite/ganache-cli:latest

LABEL maintainer="TheBous thebous1993@gmail.com"

RUN /bin/sh -c "apk add --no-cache bash"

ENTRYPOINT node /app/ganache-core.docker.cli.js --networkId 57771 --verbose --host 0.0.0.0
