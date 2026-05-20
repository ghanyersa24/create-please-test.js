const { please, AUTH } = require('../app')
const { URL, ACCOUNT } = require('../data/main')

describe('Login - practicetestautomation.com', () => {
    it('menampilkan halaman login', async () => {
        await please.goTo(URL.login)
    })

    it('login gagal - username salah', async () => {
        await please.goTo(URL.login)
        await AUTH.login(ACCOUNT.wrongUsername)
        await please.see('pesan error username', '//div[@id="error"]', 'Your username is invalid!')
    })

    it('login gagal - password salah', async () => {
        await please.goTo(URL.login)
        await AUTH.login(ACCOUNT.wrongPassword)
        await please.see('pesan error password', '//div[@id="error"]', 'Your password is invalid!')
    })

    it('login gagal - form kosong', async () => {
        await please.goTo(URL.login)
        await AUTH.login(ACCOUNT.empty)
        await please.see('pesan error username', '//div[@id="error"]', 'Your username is invalid!')
    })

    it('login berhasil', async () => {
        await please.goTo(URL.login)
        await AUTH.login(ACCOUNT.valid)
        await please.checkWhere(URL.dashboard)
        await please.see('teks sukses', '//h1', 'Logged In Successfully')
        await AUTH.logout()
    })
})
