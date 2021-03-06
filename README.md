﻿![Logo](https://i.postimg.cc/7hvnJjcF/Group-3-1.png)
# CarPool

A progressive web application with the purpose of bringing the community together
by sharing the responsibilities of driving.

## Access

Access the live application by scanning the QR code below to view on your mobile device.

![QR](https://i.postimg.cc/pTWRhHNT/Whats-App-Image-2018-10-16-at-19-37-25.jpg)

Or simply click [here](http://carpool.iminsys.com).

Help us by reporting any issues that you may encounter or if you have any suggestions then we welcome your feedback. This can be done through the 'Report a Problem' option in the settings tab of the application.

## Installation

[Download and install Node.js](https://nodejs.org/en/download/).

Once Node.js is installed, clone the **CarPool** repository.

In your CarPool directory, run the [`npm install`] command to install the required dependencies:

```bash
$ npm install
```
Once the installation is complete, navigate to the `\CarPool\client\` folder and run the [`npm install`] command again.  

## Features

* User registration and login
* View and edit profile
* User vouching and trust rating system
* Route creation and efficient matching
* Create or join a carpool to arrange trips
* Optimal trip calculation to determine the shortest route for the driver

## Documentation
	
* <a href="https://drive.google.com/open?id=1Bm0DS6Q2ma_6LgFtqEvHb00QAVKw4pVi" target="_blank">User manual</a>
* <a href="https://drive.google.com/open?id=1eM-7meF5puDQnJiRQuKKxiiulo7DSO4w" target="_blank">Requirements and design document </a>
* <a href="https://drive.google.com/open?id=1L5UCMJzX3bENWo_TjIH5aXFxkfkO-MV8" target="_blank">Coding standards document </a>
* <a href="https://drive.google.com/open?id=1k2Dlv7ecHKxDC_CeFzqmtw77P6L1lly9" target="_blank">Testing policy document</a>

### Security Issues

As developers with the greatest concern for your safety, we understand the risks involved when travelling with potential strangers. Therefore, we intend to implement an Authentication System whereby users are required to provide proof of their identity as well as their drivers license if the user will be driving. Checks will be performed in order to validate the provided Identity Document and driver's license.

## Quick Start

Please follow the [installation](#installation) instructions before proceeding.

Once all the dependencies are installed,  ensure that your are in the `\CarPool\client\` directory then run the [`npm run local`] command:

```bash
$ npm run local
```

This will start the server, and automatically open the CarPool web application in your browser.

## Philosophy

Many of us have been in situations where we need to be somewhere but we simply do not have the means to get there. At CarPool, our philosophy is to provide the community with the means to band together, in order to solve a common problem. CarPool will be a unique application that differentiates itself from other competitors, such as Uber, by exposing the good in people. Rather than creating a "corporate environment" for users to do business, CarPool provides a platform for users to simply help each other out.

## Tests

To run the test suite, install the dependencies as described in [installation](#installation), once that is complete, ensure that you are in the `\CarPool\client\` folder and run the [`npm test`] command:

```bash
	$ npm test
```

## People

CarPool is a project proposed and sponsored by [Iminsys][iminsys-url], developed by the Brogrammers development team and owned by the [University of Pretoria][up-url].

[iminsys-url]: http://www.iminsys.com
[package-diagram-url]: https://ibb.co/dbs9xH
[up-url]: http://www.up.ac.za