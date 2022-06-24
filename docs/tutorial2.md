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

### buy storage space (If you only use the default account address, you can skip this section)

**1. We create a transaction and sign it offline to get the tx string firstly.**

# ![Figure 2](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-sidecar/docs/01.png)

**2. Then, as you think. We fill in the newly obtained tx string into the input box on the left and click the start button. If your output is as shown, then congratulations, the space purchase was successful.**

# ![Figure 3](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-sidecar/docs/02.png)

### store

**The store interface is responsible for uploading files to CESS and recording them in the sample network. You can use a test tool to experiment with this. As shown in the figure below, first select store, select the file to be stored, and click offline sign. Then, click the orange button, and the program will automatically fill in the signed transaction to the left column. At this point you can click Go Start. If it returns ok below, it means the operation is successful. In order to continue the subsequent process, we record the fileid of the file here.**

# ![Figure 2](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-sidecar/docs/m3-p1.png)

**At this point, you can query the record of the stored file in the sample network.**

# ![Figure 3](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-sidecar/docs/m3-p1.6.png)

_It is a reminder that before downloading the file, please wait a moment (the specific time depends on the size of the uploaded file), especially if you have just uploaded it. Similarly, if you encounter a download failure, please first check that the process you have operated is correct. If everything is correct, then please try again after a while._

### retrieve

**After the file is stored, you can download the file at any time. Again, this step can be demonstrated using the test tool. The image below shows how to download the file we stored in the previous step.**

# ![Figure 4](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-sidecar/docs/m3-p2.png)

### replace

**In addition, the Data Store Sidecar also supports the replace interface, which supports the function of uploading new files and replacing old files. The operation steps are shown in the figure below.**

# ![Figure 5](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-sidecar/docs/m3-p3.png)

**If you want to confirm whether the new file is stored successfully, we can also perform a retrieve test on the new file as below.**

# ![Figure 6](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-sidecar/docs/m3-p4.png)


### delete

**Of course, if you no longer want to store some files, you can delete it from the remote at any time.**

# ![Figure 7](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-sidecar/docs/m3-p5.png)

**Once deleted, the file can no longer be retrieved.**

# ![Figure 8](https://raw.githubusercontent.com/CESSProject/W3F-illustration/main/data-store-sidecar/docs/m3-p6.png)
