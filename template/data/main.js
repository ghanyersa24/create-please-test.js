require('dotenv').config()

const base_url = process.env.BASE_URL

module.exports = {
    URL: {
        login: {
            url: `${base_url}/login`,
            title: 'Login'
        },
        dashboard: {
            url: `${base_url}/dashboard`,
            title: 'Dashboard'
        }
    },
    ACCOUNT: {
        valid: {
            email: process.env.ACCOUNT_EMAIL,
            password: process.env.ACCOUNT_PASSWORD
        },
        wrongPassword: {
            email: process.env.ACCOUNT_EMAIL,
            password: 'wrongpassword'
        },
        wrongEmail: {
            email: 'invalid@email',
            password: process.env.ACCOUNT_PASSWORD
        },
        empty: {
            email: '',
            password: ''
        }
    }
}
