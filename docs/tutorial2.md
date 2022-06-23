# Example demonstration 2 of data store sidecar

This demonstration developed in milestone 3, is the full version of [example 1](https://github.com/CESSProject/data-store-sidecar/blob/main/docs/tutorial.md), which is the product of milestone 2. The original interface developed during the milestone 2 is only related to the CESS storage service, that is, the functions you can see in [example 1](https://github.com/CESSProject/data-store-sidecar/blob/main/docs/tutorial.md), such as uploading files, downloading files, etc. Milestone 3 builds on this by merging the function calls of the example network with [data store pallet](https://github.com/CESSProject/data-store-pallet) into the existing storage interface.

## Introduction

> After the [data store pallet](https://github.com/CESSProject/data-store-pallet) is complete, we next implement the data store sidecar. Their workflow can be clearly seen from the diagram below.

> The data store sidecar inherits the function of the substrate sidecar, which is to provide the Rest API with the blockchain network based on substrate. Of course, we can call those related functions if the network's Runtime integrates the data store pallet.

> In addition to this, we also embedded the CESS storage service API in the data store sidecar. That is to say, we can directly use the API of the data store sidecar to connect to the CESS storage service.

> It is worth mentioning that in the stage of milestone 2, we will only implement the embedding of storage services. The data store pallet has not yet been integrated with the CESS storage service, which is the task of milestone 3.

The above quote is sample content from Milestone 2. We can proudly inform readers that data store pallet has merged with CESS storage service now, and finally the process shown in the figure below has been fully implemented.

# ![Figure 1: Typical example process](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/substrate-builder-program/10.svg)

Now, let's turn our attention to how to interact with **Data Store Pallet** and the **CESS storage service** through the **data store sidecar**.

## Before the start

In order to test the code more conveniently, we have done the following preparations in advance.

1. Runs and maintains a testnet that integrates the data store pallet, and its RPC link is: _wss://example-datastore.cess.cloud/ws/_.
2. Started a demo of the data store sidecar, that is https://example-datastore.cess.cloud , and see [API docs](https://example-datastore.cess.cloud/docs).
3. Developed a [front-end page](https://example-datastore.cess.cloud/api-test/) to test the API service of the demo.
4. Since you need to conduct transactions on the CESS network, you should first have a Polkadot wallet address and have a certain amount of TCESS (don't worry, you can get it through the [faucet](https://testnet-faucet.cess.cloud)).

## Demonstration of demo's API service

### buy storage space

**1. We create a transaction and sign it offline to get the tx string firstly.**

9cxPjcxLquWU6x2TLTrPMG

44z8Fz2YdkJHAPaWVzLQef

# ![Figure 2](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-sidecar/docs/m3-p1.png)

# ![Figure 3](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-sidecar/docs/m3-p1.6.png)

**2. Then, as you think. We fill in the newly obtained tx string into the input box on the left and click the start button. If your output is as shown, then congratulations, the space purchase was successful.**

# ![Figure 4](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-sidecar/docs/m3-p2.png)

### store

**1. We can store the file. As shown below now, select the file to store and get the tx string, and fileid.**

# ![Figure 5](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-sidecar/docs/m3-p3.png)

**2. Similarly, fill in the input box on the left with the obtained tx string and fileid. By the way, please don't forget to select the upload option.**

# ![Figure 6](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-sidecar/docs/m3-p4.png)


### query

**1. At this point, we can check whether the file was uploaded successfully based on the file id.**

# ![Figure 7](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-sidecar/docs/m3-p5.png)


_It is a reminder that before downloading the file, please wait a moment (the specific time depends on the size of the uploaded file), especially if you have just uploaded it. Similarly, if you encounter a download failure, please first check that the process you have operated is correct. If everything is correct, then please try again after a while._

### retrieve

**1. Since we do not need to initiate a transaction request to the network to download the file, we only need to fill in the fileid to get it, as below.**

# ![Figure 8](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-sidecar/docs/m3-p6.png)

**2. If everything is ok, you will be able to see the following popup. Please click it and download the file!**

# ![Figure 9](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-sidecar/docs/v3-07.png)

### delete

**When you want to delete a stored file, you can do the following.**

**1. You can check if the file is already stored, as below shown.**

# ![Figure 10](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-sidecar/docs/v2-05.png)

**2. Now, we can delete the target file according to the following operations.**

# ![Figure 11](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-sidecar/docs/v2-08.png)

**3. Want to check if the deletion was successful? Here's what you need.**

# ![Figure 12](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-sidecar/docs/v2-09.png)
