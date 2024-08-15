const router = require('./router.js')

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

for(modId in mods){
  const mod = mods[modId]
  router.get(`/mods/${mod.id}`, async ctx => {
    await ctx.render('mod_pages/mod', {
      seo: {
        title: mod.name + ' | OroArmor'
      },
      mod: mod
    })
  })
}


module.exports = router
