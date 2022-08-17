# Covid application

For run app you should firstly create mongodb two databases for test environment
and for development environment. For that you need use this
[Data source](https://www.ecdc.europa.eu/en/publications-data/data-covid-19-vaccination-eu-eea)
to feed data in mongo.
You need download in CSV and then import data into mongo using this
bash terminal command:  `mongoimport --type csv -d databaseName -c collectionName --headerline --drop data.csv`

### Technologies

Program/lib | version | command for checking\

Node.js | v16.6.1 | `node -v` \
Typescript | v^4.3.5 | `typescript -v` \
Nest.js | v9.0.11 | `nest -v` \
MongoDB | v4.4.5 | `mongo --version`\
Mongoose | ^6.5.2 | see in this app package.json\
Eslint | 8.0.1 | see in this app package.json\

### Setup

1. Clone this repository\
   `git clone https://github.com/Vladinho10/covid`
2. Fill in your git credentials (if required)
3. Enter the downloaded directory.\
   `cd covid`
4. You need create `.env` file by analogy `.env.example`

for npm

* install packages\
  `npm i`
* run server\
  `npm run start`
* if you want your server stay always running\
  `npm run start:dev`

for yarn

* install packages\
  `yarn`
* run server\
  `yarn run start`
* if you want your server stay always running\
  `yarn run start:dev`

# Covid API

Request Description:

GET /vaccine-summary

Query Parameters:\
c, country code to get report for \
dateFrom, yyyy-Www, eg. 2020-W10 (Including) \
dateTo, yyyy-Www, eg, 2020-W20 (Excluding) \
rangeSize, number, eg, the period for which to calculate metrics \
sort, either by NumberDosesReceived[descending] or weekStart [ascending]

Request example \
GET /vaccine-summary?c=AT&dateFrom=2020-W10&dateTo=2020-W53&range=5

# Covid API test running

For test running you must use `npm run test:e2e` terminal command



