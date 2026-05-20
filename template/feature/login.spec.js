const { please, AUTH } = require('../app')
const { URL, ACCOUNT } = require('../data/main')

describe('Login', () => {
    it('menampilkan halaman login', async() => {
        await please.goTo(URL.login)
    })

    it('login gagal - email salah', async() => {
        await please.goTo(URL.login)
        await AUTH.login(ACCOUNT.wrongEmail)
        await please.checkWhere(URL.login)
    })

    it('login gagal - password salah', async() => {
        await please.goTo(URL.login)
        await AUTH.login(ACCOUNT.wrongPassword)
        await please.checkWhere(URL.login)
    })

    it('login gagal - form kosong', async() => {
        await please.goTo(URL.login)
        await AUTH.login(ACCOUNT.empty)
        await please.checkWhere(URL.login)
    })

    it('login berhasil', async() => {
        await please.goTo(URL.login)
        await AUTH.login(ACCOUNT.valid)
        await please.checkWhere(URL.dashboard)
        await AUTH.logout()
    })
})
