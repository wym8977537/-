import router from './router'
import { getUserInfo } from './api/login'
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('mms-token')
    if (!token) {
        if (to.path !== '/login') {
            next({ path: '/login' })
        } else {
            next()
        }
    } else {
        if (to.path === '/login') {
            next()
        } else {
            const userInfo = localStorage.getItem('msm-user')
            if (userInfo) {
                next()
            } else {
                getUserInfo(token).then((response) => {
                    const resp = response.data
                    console.log('prer', resp)
                    if (resp.flag) {
                        localStorage.setItem('msm-user', JSON.stringify(resp.data))
                        next()
                    } else {
                        next({ path: '/login' })
                    }
                })
            }
        }
    }
})