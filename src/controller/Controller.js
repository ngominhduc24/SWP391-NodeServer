const myFunction = require('./puppeteer');

let getData = async (req, res) => {
  if (!req.query.subject && !req.query.class) {
    return res.status(400).json({
      status: 400,
      message: 'Bad request',
    });
  }

  let database;
  const fs = require('fs');

  fs.readFile('./database.json', 'utf8', (error, data) => {
    if (error) {
      return res.status(500).json({
        status: 500,
        message: 'Internal server error',
      });
    }
    database = JSON.parse(data);


    let hrefCrawl = '';
    const myClass = req.query.class;
    for (const element of database) {
      if (element.name.toLowerCase() == myClass) {
        hrefCrawl = element.link;
        break; // Stop searching once you find a matching element
      }
    }

    if (hrefCrawl == '') {
      return res.status(400).json({
        status: 400,
        message: 'Class not found',
      });
    }


    myFunction(hrefCrawl)
      .then(dataTemp => {
        let index;
        let data = dataTemp; // Initialize 'data' with the data you received
        for (let i = 0; i < data[0].length; i++) {
          if (data[0][i] === 'CODE') {
            index = i;
          }
        }
        const extractedData = [];
        console.log(index);
        for (let i = 1; i < data.length; i++) {
          extractedData.push(data[i][index - 1]);
        }
        return res.status(200).json(extractedData);
      })
      .catch(error => {
        console.log(error);
        return res.status(500).json({
          status: 500,
          message: 'Internal server error',
        });
      });
  });
};

module.exports = {
  getData,
};
