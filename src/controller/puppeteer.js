const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const userDataDir = 'C:\\Users\\md8qt\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 1';

const crawlListStudent = async (hrefGroup) => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
            userDataDir: 'C:\\Users\\md8qt\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 1\\Cache\\Cache_Data',
        });
        const page = await browser.newPage();
        await page.goto('https://fap.fpt.edu.vn/Default.aspx');

        const a = page.evaluate(() => {
        });

        const articles = await page.evaluate(() => {
            function Login() {
                const footer = document.getElementById("cssTable");
                if (!footer) return;
                const campusSelection = window.document.querySelector("#ctl00_mainContent_ddlCampus");
                if (!campusSelection) return;
                campusSelection.value = "3";
                footer.insertAdjacentHTML(
                    "beforeend",
                    '<h5 id="pointer_button" style="text-align: center;display:none; font-weight: bold;" onclick=" \n \
                const loginButton = document.querySelector(\'#ctl00_mainContent_btnLogin\'); \n \
                if (loginButton) \n \
                  loginButton.click(); \n \
              ">hello HV</h5>'
                );
                const loginButton = document.querySelector("#pointer_button");
                if (!loginButton) return;
                loginButton.click();
            }

            Login();

            function gacGetLoginElements() {
                return document.querySelectorAll('[data-identifier]');
            }

            let email = "ducnmhe173177@fpt.edu.vn";
            let loginElements = gacGetLoginElements();
            for (let i = 0; i < loginElements.length; i++) {
                let el = loginElements[i];
                let elEmail = el.getAttribute("data-identifier");
                console.log(elEmail);
                if (elEmail === email) {
                    el.click();
                }
            }



        });
        await new Promise(r => setTimeout(r, 1000));

        let page2 = await browser.newPage();
        await page2.goto(hrefGroup);

        let data = await page2.evaluate(() => {

            let table = document.getElementById('id');
            let rows = table.querySelectorAll("tr");
            let data = [];
            for (let i = 0; i < rows.length; i++) {
                let row = [],
                    cols = rows[i].querySelectorAll("td, th");
                for (let j = 0; j < cols.length; j++) {
                    row.push(cols[j].innerText);
                }
                data.push(row);
            }
            return data;
        });

        await browser.close();
        return data;
    } catch (error) {
        console.error('An error occurred:', error);
    }

};

module.exports = async (hrefGroup) => {
    const data = await crawlListStudent(hrefGroup);
    // console.log(data);
    return data;
};