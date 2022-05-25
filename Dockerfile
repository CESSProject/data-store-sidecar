FROM docker.io/library/node:15 as builder

WORKDIR /opt/builder

COPY . .

RUN yarn install && \
    yarn build

# ---------------------------------

FROM docker.io/library/node:15-alpine

# metadata
ARG VERSION=""
ARG VCS_REF=master
ARG BUILD_DATE=""

LABEL summary="DATA STORE SIDECAR." \
	name="DATA STORE SIDECAR" \
	maintainer="cbf0311@163.com" \
	version="${VERSION}" \
	description="Substrate-api-sidecar image." \
	io.parity.image.vendor="Parity Technologies" \
	io.parity.image.source="https://github.com/CESSProject/data-store-sidecar.git/blob/\
${VCS_REF}/Dockerfile" \
	io.parity.image.documentation="https://github.com/CESSProject/data-store-sidecar.git/\
blob/${VCS_REF}/README.md" \
	io.parity.image.revision="${VCS_REF}" \
	io.parity.image.created="${BUILD_DATE}"

WORKDIR /usr/src/app

COPY --from=builder /opt/builder /usr/src/app

ENV SAS_EXPRESS_PORT=8080
ENV SAS_EXPRESS_BIND_HOST=0.0.0.0

USER node
EXPOSE ${SAS_EXPRESS_PORT}
CMD [ "node", "build/src/main.js" ]
