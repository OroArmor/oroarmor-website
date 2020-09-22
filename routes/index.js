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
.get('/mods/netherite_plus', async ctx =>{
  await ctx.render('mod_pages/netherite_plus', {
    seo: {
      title: 'Netherite Plus | OroArmor'
    },
    mods
  })
})


module.exports = router
