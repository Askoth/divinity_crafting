import dev from './index.dev.js'

if (process.env.NODE_ENV == 'development') {
    dev.init()
} else {
    console.log('production')
}
