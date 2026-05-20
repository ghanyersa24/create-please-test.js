let please
class Auth {
    constructor(master) {
        please = master
    }

    async login(user) {
        await please.fill('input email', '#email', user.email)
        await please.fill('input password', '#password', user.password)
        await please.click('button login', '//button[@type="submit"]')
    }

    async logout() {
        await please.click('menu profil', '.user-menu')
        await please.click('button logout', 'link=Logout')
    }
}

module.exports = Auth
