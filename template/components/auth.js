let please
class Auth {
    constructor(master) {
        please = master
    }

    async login(user) {
        await please.fill('input username', '#username', user.username)
        await please.fill('input password', '#password', user.password)
        await please.click('button submit', '#submit')
    }

    async logout() {
        await please.click('button logout', 'link=Log out')
    }
}

module.exports = Auth
