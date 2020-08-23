const router = require('koa-router')()

router.get('/', async ctx => {
  await ctx.render('index', {
    seo: {
      title: 'Home | OroArmor'
    }
  })
})

module.exports = router
