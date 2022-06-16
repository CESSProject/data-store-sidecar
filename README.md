
<div align="center">
  <h1 align="center">DATA STORE SIDECAR</h1>
  
  [![GitHub license](https://img.shields.io/badge/license-Apache2-blue)](#LICENSE) 

**REST service that makes it easy to interact with blockchain nodes built using Substrate's FRAME framework and obtain object storage service through CESS network.**

  🎠🎠🎠
</div>

*The data-store-sidecar is one of the components of the data storage service based on the stable version of the [Substrate API Sidecar](https://github.com/paritytech/substrate-api-sidecar) designed and implemented by CESS LAB. See [CIP-1](https://github.com/CESSProject/CIPs/blob/main/CIP-1.md) for its design scheme, and it has been included in [W3F Grants Program-ces_data_store](https://github.com/w3f/Grants-Program/blob/master/applications/ces_data_store.md).*

## Source code installation and usage

### Clone the code

```bash
git clone https://github.com/CESSProject/data-store-sidecar.git
```

### Install package


```bash
cd data-store-sidecar
npm install
# or
yarn install
```

### Build

Build the docs
```bash
npm run build:docs
# OR
yarn  run build:docs
```
Build the ts

```bash
npm run build
# OR
yarn  run build
```

### Run express server

```bash
npm run start
# OR
npm run dev
```

And then we can open there urls in browser:

- API json list [http://localhost:3001](http://localhost:3001)

- API test tool [http://localhost:3001/api-test](http://localhost:3001/api-test)

- API swagger docs[http://localhost:3001/docs](http://localhost:3001/docs)

or 

- [Click here for full endpoint docs.](https://example-datastore.cess.cloud/docs)

In the full endpoints doc, you will also find the following `trace` related endpoints : 
- `/experimental/blocks/{blockId}/traces/operations?actions=false`
- `/experimental/blocks/head/traces/operations?actions=false`
- `/experimental/blocks/{blockId}/traces`
- `/experimental/blocks/head/traces`

To have access to these endpoints you need to :
1. Run your node with the flag `—unsafe-rpc-external`
2. Check in sidecar if `BlocksTrace` controller is active for the chain you are running.

Currently `BlocksTrace` controller is active in [Polkadot](https://github.com/paritytech/substrate-api-sidecar/blob/ff0cef5eaeeef74f9a931a0355d83fc5ebdea645/src/chains-config/polkadotControllers.ts#L17) and [Kusama](https://github.com/paritytech/substrate-api-sidecar/blob/ff0cef5eaeeef74f9a931a0355d83fc5ebdea645/src/chains-config/kusamaControllers.ts#L17).



[Jump to the configuration section](#configuration) for more details on connecting to a node.

## Configuration

To use a specific env profile (here for instance a profile called 'env.sample'):

```bash
NODE_ENV=sample yarn start
```

For more information on our configuration manager visit its readme [here](https://gitlab.com/chevdor/confmgr/-/raw/master/README.adoc). See `Specs.ts` to view the env configuration spec.

### Express server

- `SAS_EXPRESS_BIND_HOST`: address on which the server will be listening, defaults to `127.0.0.1`.
- `SAS_EXPRESS_PORT`: port on which the server will be listening, defaults to `8080`.
- `SAS_EXPRESS_LOG_MODE`: enable console logging of "all" HTTP requests, only "errors", or nothing by
    setting it to anything else. LOG_MODE defaults to only "errors".

### Substrate node

- `SAS_SUBSTRATE_WS_URL`: WebSocket URL to which the RPC proxy will attempt to connect to, defaults to
    `ws://127.0.0.1:9944`.

#### Custom substrate types

Some chains require custom type definitions in order for Sidecar to know how to decode the data
retrieved from the node. Sidecar affords environment variables which allow the user to specify an absolute path to a JSON file that contains type definitions in the corresponding formats. Consult polkadot-js/api for more info on
the type formats (see `RegisteredTypes`).

**N.B** Types set from environment variables will override the corresponding types pulled from
@polkadot/apps-config.

- `SAS_SUBSTRATE_TYPES_BUNDLE`: a bundle of types with versioning info, type aliases, derives, and
    rpc definitions. Format: `OverrideBundleType` (see [`typesBundle`](https://github.com/polkadot-js/api/blob/21039dec1fcad36061a96bf5526248c5fab38780/packages/types/src/types/registry.ts#L72)).
- `SAS_SUBSTRATE_TYPES_CHAIN`: type definitions keyed by `chainName`. Format: `Record<string, RegistryTypes>` (see [`typesChain`](https://github.com/polkadot-js/api/blob/21039dec1fcad36061a96bf5526248c5fab38780/packages/types/src/types/registry.ts#L76)).
- `SAS_SUBSTRATE_TYPES_SPEC`: type definitions keyed by `specName`. Format: `Record<string, RegistryTypes>` (see [`typesSpec`](https://github.com/polkadot-js/api/blob/21039dec1fcad36061a96bf5526248c5fab38780/packages/types/src/types/registry.ts#L80)).
- `SAS_SUBSTRATE_TYPES`: type definitions and overrides, not keyed. Format: `RegistryTypes` (see [`types`](https://github.com/polkadot-js/api/blob/21039dec1fcad36061a96bf5526248c5fab38780/packages/types/src/types/registry.ts#L64)).

You can read more about [defining types for polkadot-js here.](https://polkadot.js.org/api/start/types.extend.html)

##### Connecting a modified node template

Polkadot-js can recognize the standard node template and inject the correct types, but if you have
modified the name of your chain in the node template you will need to add the types manually in a
JSON `types` file like so:

```json
// my-chains-types.json
{
  "Address": "AccountId",
  "LookupSource": "AccountId"
}
```

and then set the enviroment variable to point to your definitions:

```bash
export SAS_SUBSTRATE_TYPES=/path/to/my-chains-types.json
```

## Data Store API

Supports rich channels for interacting with the chain, if your network integrates the [data store pallet](https://github.com/CESSProject/data-store-pallet), then you will be able to use the CESS storage service.

[Click here for full endpoint docs.](https://example-datastore.cess.cloud/docs)

## CESS Storage

Currently, we provide several storage APIs. You can use it to upload and download files.

See the store section of the [API docs](https://example-datastore.cess.cloud/docs) to learn more.


## Docker

### build a image
```bash
docker build -t "cess/data-store-sidecar:v1" .
```

### run in container
```
docker run -p 8080:8080 cess/data-store-sidecar:v1
```

### push image to repository (must login first)
```
docker push cess/data-store-sidecar:v1
```


## Run Tests

```bash
# run all the tests
yarn test
```

## Hardware requirements

### Disk Space
Sidecar is a stateless program and thus should not use any disk space.

### Memory
The requirements follow the default of node.js processes which is an upper bound in HEAP memory of a little less than 2GB thus 4GB of memory should be sufficient.

### Running sidecar and a node
Please note that if you run sidecar next to a substrate node in a single machine then your system specifications should improve significantly. 
- Our official specifications related to validator nodes can be found in the polkadot wiki [page](https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#standard-hardware).
- Regarding archive nodes :
  - again as mentioned in the polkadot wiki [page](https://wiki.polkadot.network/docs/maintain-sync#types-of-nodes), the space needed from an archive node depends on which block we are currently on (of the specific chain we are referring to).
  - there are no other hardware requirements for an archive node since it is not time critical (archive nodes do not participate in the consensus).

### Benchmarks
During the benchmarks we performed, we concluded that sidecar would use a max of 1.1GB of RSS memory. 

The benchmarks were:
- using 4 threads over 12 open http connections and
- were overloading the cache with every runtime possible on polkadot. 

Hardware specs in which the benchmarks were performed:
```
Machine type:
n2-standard-4 (4 vCPUs, 16 GB memory)

CPU Platform:
Intel Cascade Lake

Hard-Disk:
500GB
```
