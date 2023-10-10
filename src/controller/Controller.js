const myFunction = require('./puppeteer');

let getData = async (req, res) => {
  const hrefCrawl = 'https://fap.fpt.edu.vn/Course/Groups.aspx?group=38482';
  let data = await myFunction(hrefCrawl);

  return res.status(200).json(data);
};


module.exports = {
  getData,
};