# create-please-test

> Scaffold a Selenium-based automation test project in seconds.

```bash
npm create please-test my-project
```

---

## What it does

`create-please-test` generates a ready-to-run E2E test project using:

- **[please-test](https://www.npmjs.com/package/please-test)** — a readable Selenium wrapper
- **[selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver)** — browser automation
- **[Mocha](https://mochajs.org/)** — test runner
- **[Mochawesome](https://www.npmjs.com/package/mochawesome)** — HTML test report

---

## Requirements

- Node.js >= 14
- Chrome browser + [ChromeDriver](https://chromedriver.chromium.org/) installed and on your `PATH`

---

## Quick Start

```bash
# 1. Scaffold the project
npm create please-test my-project

# 2. Enter the directory
cd my-project

# 3. Install dependencies
npm install

# 4. Configure your app URL and credentials
cp .env.example .env
```

Edit `.env`:

```env
BASE_URL=https://myapp.com
ACCOUNT_EMAIL=user@mail.com
ACCOUNT_PASSWORD=secret
```

```bash
# 5. Run the tests
npm test

# (Optional) Generate an HTML report
npm run report
```

---

## Generated Project Structure

```
my-project/
├── index.js              # Entry point — enable/disable spec files here
├── app.js                # WebDriver setup + shared module exports
├── package.json
├── .env.example          # Environment variable template
├── .gitignore
│
├── data/
│   └── main.js           # URLs, page titles, and test account data
│
├── components/
│   └── auth.js           # Reusable login/logout actions
│
└── feature/
    └── login.spec.js     # Login test suite (example)
```

---

## How It Works

### `app.js` — Driver & shared instances

```js
const { Builder } = require('selenium-webdriver')
const pleaseClass = require('please-test')
const AuthComponent = require('./components/auth')

const driver = new Builder().forBrowser('chrome').build()
driver.manage().window().maximize()

const please = new pleaseClass(driver)

module.exports = {
    please,
    AUTH: new AuthComponent(please)
}
```

`please` is the main wrapper around Selenium. All your test files import it from `app.js`.

---

### `data/main.js` — URLs and accounts

```js
module.exports = {
    URL: {
        login:     { url: `${base_url}/login`,     title: 'Login' },
        dashboard: { url: `${base_url}/dashboard`, title: 'Dashboard' }
    },
    ACCOUNT: {
        valid:         { email: '...', password: '...' },
        wrongPassword: { email: '...', password: 'wrongpassword' },
        wrongEmail:    { email: 'invalid@email', password: '...' },
        empty:         { email: '',   password: '' }
    }
}
```

Add new pages and accounts here instead of hardcoding values in specs.

---

### `components/auth.js` — Reusable actions

```js
class Auth {
    async login(user) {
        await please.fill('input email',    '#email',               user.email)
        await please.fill('input password', '#password',            user.password)
        await please.click('button login',  '//button[@type="submit"]')
    }

    async logout() {
        await please.click('menu profil',   '.user-menu')
        await please.click('button logout', 'link=Logout')
    }
}
```

Components encapsulate page interactions so specs stay readable and DRY.

---

### `feature/login.spec.js` — Writing a test

```js
const { please, AUTH } = require('../app')
const { URL, ACCOUNT } = require('../data/main')

describe('Login', () => {
    it('login berhasil', async () => {
        await please.goTo(URL.login)
        await AUTH.login(ACCOUNT.valid)
        await please.checkWhere(URL.dashboard)
        await AUTH.logout()
    })
})
```

Each `it` block is one test case. Use `AUTH` (or any component) to keep interaction logic out of your spec.

---

### `index.js` — Toggle which specs run

```js
require('./feature/login.spec')
// require('./feature/checkout.spec')   // uncomment to enable
```

Uncomment a line to add a spec to the test run.

---

## Adding a New Feature Test

1. **Add URLs/data** in `data/main.js`
2. **Create a component** in `components/` (e.g. `components/checkout.js`)
3. **Write the spec** in `feature/checkout.spec.js`
4. **Enable it** by adding `require('./feature/checkout.spec')` in `index.js`

---

## Scripts

| Command       | Description                              |
|---------------|------------------------------------------|
| `npm test`    | Run all enabled specs in the terminal    |
| `npm run report` | Run tests and generate an HTML report at `report/index.html` |

---

## License

MIT © [Myghan](mailto:ghanyersa24@gmail.com)
