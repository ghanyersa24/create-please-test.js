# create-please-test

> Scaffold a Selenium-based automation test project in seconds.

```bash
npm create please-test my-project
```

The built-in template is pre-configured against **[practicetestautomation.com/practice-test-login](https://practicetestautomation.com/practice-test-login/)** — runs out of the box with no extra setup.

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

# 4. Copy the environment file
cp .env.example .env
```

`.env` is pre-filled with the default credentials for the practice site:

```env
BASE_URL=https://practicetestautomation.com
ACCOUNT_USERNAME=student
ACCOUNT_PASSWORD=Password123
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
│   └── main.js           # Page URLs and test account data
│
├── components/
│   └── auth.js           # Reusable login/logout actions
│
└── feature/
    └── login.spec.js     # Example login test suite
```

---

## Template Tests: Login

The template includes **5 login scenarios** against `practicetestautomation.com`:

| # | Scenario | Expected |
|---|----------|----------|
| 1 | Open login page | Page loads |
| 2 | Login with wrong username | Error: `Your username is invalid!` |
| 3 | Login with wrong password | Error: `Your password is invalid!` |
| 4 | Login with empty form | Error: `Your username is invalid!` |
| 5 | Successful login | Redirect to `/logged-in-successfully/`, heading `Logged In Successfully` visible |

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

`please` is the main Selenium wrapper. All test files import it from `app.js`.

---

### `data/main.js` — URLs and accounts

```js
module.exports = {
    URL: {
        login: {
            url: `${base_url}/practice-test-login/`,
            title: 'Test Login | Practice Test Automation'
        },
        dashboard: {
            url: `${base_url}/logged-in-successfully/`,
            title: 'Logged In Successfully | Practice Test Automation'
        }
    },
    ACCOUNT: {
        valid:         { username: 'student',     password: 'Password123' },
        wrongPassword: { username: 'student',     password: 'wrongpassword' },
        wrongUsername: { username: 'invaliduser', password: 'Password123' },
        empty:         { username: '',            password: '' }
    }
}
```

Add new pages and accounts here instead of hardcoding values in spec files.

---

### `components/auth.js` — Reusable actions

```js
class Auth {
    async login(user) {
        await please.fill('username input', '#username', user.username)
        await please.fill('password input', '#password', user.password)
        await please.click('submit button', '#submit')
    }

    async logout() {
        await please.click('logout button', 'link=Log out')
    }
}
```

Components encapsulate page interactions so spec files stay readable and DRY.

---

### `feature/login.spec.js` — Example test

```js
const { please, AUTH } = require('../app')
const { URL, ACCOUNT } = require('../data/main')

describe('Login - practicetestautomation.com', () => {
    it('shows error on wrong username', async () => {
        await please.goTo(URL.login)
        await AUTH.login(ACCOUNT.wrongUsername)
        await please.see('error message', '//div[@id="error"]', 'Your username is invalid!')
    })

    it('redirects to dashboard on successful login', async () => {
        await please.goTo(URL.login)
        await AUTH.login(ACCOUNT.valid)
        await please.checkWhere(URL.dashboard)
        await please.see('success heading', '//h1', 'Logged In Successfully')
        await AUTH.logout()
    })
})
```

Each `it` block is one test case. Use components like `AUTH` to keep interaction logic out of the spec.

---

### `index.js` — Toggle which specs run

```js
require('./feature/login.spec')
// require('./feature/checkout.spec')   // uncomment to enable
```

---

## Adding a New Feature Test

1. **Add URLs/data** in `data/main.js`
2. **Create a component** in `components/` (e.g. `components/checkout.js`)
3. **Write the spec** in `feature/checkout.spec.js`
4. **Enable it** by adding `require('./feature/checkout.spec')` in `index.js`

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm test` | Run all enabled specs in the terminal |
| `npm run report` | Run tests and generate an HTML report at `report/index.html` |

---

## License

MIT © [Myghan](mailto:ghanyersa24@gmail.com)
