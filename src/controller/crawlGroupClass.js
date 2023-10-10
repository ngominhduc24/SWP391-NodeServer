const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const userDataDir = 'C:\\Users\\md8qt\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 1';

(async () => {
    // noti
    console.log('Crawling group class....');

    // Mở trình duyệt mới và tới trang của kenh14
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        userDataDir: 'C:\\Users\\md8qt\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 1\\Cache\\Cache_Data',
    });
    const page = await browser.newPage();
    await page.goto('https://fap.fpt.edu.vn/Default.aspx');
    console.log('15% [====               ]');
    // Chạy đoạn JavaScript trong hàm này, đưa kết quả vào biến article
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
        console.clear();
        console.log('40% [==========          ]');

        function gacGetLoginElements() {
            return document.querySelectorAll('[data-identifier]');
        }

        async function gacPerformLogin(email) {
            setTimeout(function () {
                let loginElements = gacGetLoginElements();
                for (let i = 0; i < loginElements.length; i++) {
                    let el = loginElements[i];
                    let elEmail = el.getAttribute("data-identifier");
                    console.log(elEmail);
                    if (elEmail === email) {
                        el.click();
                    }
                }
            }, 1500); // Wait for 1 second
        }

        gacPerformLogin("ducnmhe173177@fpt.edu.vn");

    });

    console.clear();
    console.log('50% [===========         ]');
    await new Promise(r => setTimeout(r, 1000));
    console.clear();
    console.log('60% [==================  ]');

    const page2 = await browser.newPage();
    await page2.goto('https://fap.fpt.edu.vn/Course/Groups.aspx?group=38482');
    await new Promise(r => setTimeout(r, 1000));
    console.clear();
    console.log('76% [==================== ]');

    let data = await page2.evaluate(() => {
        let data = [];
        let table = document.getElementById('ctl00_mainContent_divGroup');
        let rows = table.querySelectorAll("a");
        rows.forEach((row) => {
            data.push({
                link: row.href,
                name: row.innerText,
            });
        });
        return data;
    });
    console.clear();
    console.log('80% [=====================]')

    let dataJson = JSON.stringify(data);
    let fs = require('fs');
    fs.writeFile('database.json', dataJson, (err) => {
        if (err) {
            console.error('Error crawling data fap:', err);
        } else {
            console.clear();
            console.log('100% [====================]');
            console.log('Finished crawling group class');
        }
    });
    await browser.close();
})();