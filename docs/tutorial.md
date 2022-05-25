# Example demonstration of data store sidecar

this example demonstration explains How to use data store sidecar to connect to the storage service of the CESS network. Simply put, it is a tutorial on basic operations such as uploading and downloading object files.

## Introduction

After the [data store pallet](https://github.com/CESSProject/data-store-pallet) is complete, we next implement the data store sidecar. Their workflow can be clearly seen from the diagram below.

The data store sidecar inherits the function of the substrate sidecar, which is to provide the Rest API with the blockchain network based on substrate. Of course, we can call those related functions if the network's Runtime integrates the data store pallet.

In addition to this, we also embedded the CESS storage service API in the data store sidecar. That is to say, we can directly use the API of the data store sidecar to connect to the CESS storage service.

It is worth mentioning that in the stage of milestone 2, we will only implement the embedding of storage services. The data store pallet has not yet been integrated with the CESS storage service, which is the task of milestone 3.

# ![Figure 1: Typical example process](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/substrate-builder-program/10.svg)

Now, let's turn our attention to how to use the **CESS storage service** through the **data store sidecar**.

## Before the start

In order to test the code more conveniently, we have done the following preparations in advance.

1. Runs and maintains a testnet that integrates the data store pallet, and its RPC link is: wss://example-datastore.cess.cloud/ws/.
2. Started a demo of the data store sidecar, that is https://example-datastore.cess.cloud , and see [API docs](https://example-datastore.cess.cloud/docs).
3. Developed a [front-end page]() to test the API service of the demo.

## Demonstration of function Interface

### store
Upload meta-info of stored file on chain.

1. Call _store_ function to record meta-info of file on chain with inputing 1) fileId, 2) fileName, 3) fileSize, 4) keywords.
# ![Figure 2](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-pallet/docs/data-store-01.png)

2. Check if the above info on-chain.
# ![Figure 3](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-pallet/docs/data-store-02.png)

### retrieve
Check if the caller has permission to get the specified file.

1. Call _retrieve_ function to get meta-info of target file. Only the data owner has access to it.
# ![Figure 4](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-pallet/docs/data-store-03.png)

2. It gets successful when I call as the data owner.
# ![Figure 5](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-pallet/docs/data-store-04.png)

### edit
Support to modify meta-info of the owner's specified file.

1. Call _edit_ function to modify meta-info of the owner's specified file with inputing 1) fileId, 2) newFileName, 3) newKeywords.
# ![Figure 6](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-pallet/docs/data-store-05.png)

2. See if the updated info on-chain.
# ![Figure 7](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-pallet/docs/data-store-06.png)

### replace
Upload and replace old meta-info with new's of stored file on chain.

1. Call _replace_ function to replace meta-info of the owner's specified file with inputing 1) oldFileId, 2) newFileId, 3) fileName, 4) fileSize, 5) keywords.
# ![Figure 8](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-pallet/docs/data-store-07.png)

2. Check if the replacement is successful.
# ![Figure 9](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-pallet/docs/data-store-08.png)

### query
Query the meta-info of file by fileId and owner.
# ![Figure 10](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-pallet/docs/data-store-11.png)

### delete
Delete the meta-info of the specified file, and the caller must be the owner of the file.

1. Call _delete_ function to delete the targeted file by fileId.
# ![Figure 11](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-pallet/docs/data-store-09.png)

2. Removed all meta information.
# ![Figure 12](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-pallet/docs/data-store-10.png)

