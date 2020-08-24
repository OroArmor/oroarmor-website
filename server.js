// System imports
const path = require('path')

// External modules
const Koa = require('koa')
const serve = require('koa-static')

const port = process.env.PORT || 5000;


// Load middleware and middleware configuration
let middlewares = require('koa-load-middlewares')()
const Pug = middlewares.pug

// Local code
const router = require('./routes/')

// Create a new app
const app = new Koa()

// Initializes and attaches Pug
let pug = new Pug({
  viewPath: path.resolve(__dirname, 'views', 'pages'),
  basedir: path.resolve(__dirname, 'views', 'partials'),
  debug: false,
  pretty: false,
  locals: {
    socialMedia: require('./configs/social.js'),
    nconf: {
      domain: process.env.DOMAIN || 'localhost:3000'
    }
  }
})
pug.use(app)

// Middleware
app.use(async (ctx, next) => {
    try {
      await next()

      // Get the status of any responses or assume the request wasn't handled
      ctx.status = ctx.status || 404

      // Throw any error codes, or just report and continue
      if (ctx.status >= 400) ctx.throw(ctx.status)
      else console.log(`\t--> ${ctx.status} OK`)
    } catch (err) {
      err.status = err.status || 500 // Make sure we have a status code

      // Render the error page
      ctx.render('error', {
        error: err
      })
      ctx.status = err.status // Correct the response back to an error response (since ctx.render changes it to 200)

      // Tell Koa that we've handled an error
      ctx.app.emit('err', err, ctx)

      // Log the error and our response
      console.log(err)
      console.log(`\t--> ${ctx.status} NOT OK: ${err.message}`)
    }
  })
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve(__dirname + '/public'))

// Start the server
module.exports = app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
