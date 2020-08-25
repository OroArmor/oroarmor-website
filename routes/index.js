const router = require('koa-router')()

const programming = require(".././configs/programming.js")
const mods = require(".././configs/mods.js")

router.get('/', async ctx => {
  await ctx.render('index', {
    seo: {
      title: 'Home | OroArmor'
    },
    programming,
    mods
  })
})
.get('/mods', async ctx => {
  await ctx.render('mods', {
    seo: {
      title: 'Mods | OroArmor'
    },
    mods
  })
})


module.exports = router
