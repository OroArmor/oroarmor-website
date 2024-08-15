// System imports
const path = require('path')

const pug = require('pug')
const fs = require('fs')

// Local code
const router = require('./routes/');

router.get("/404.html", async ctx => {
    ctx.render('error', {
        error: {
            status: 404
        },
        seo: {
            title: 'Error | OroArmor'
        }
    })
})
.get("api/mods.json", async ctx => {
    ctx.response.body = JSON.stringify(require("./configs/mods.js"));
});

const port = process.env.PORT || 5000;

// Initializes and attaches Pug
let options = {
    viewPath: path.resolve(__dirname, 'views', 'pages'),
    basedir: path.resolve(__dirname, 'views', 'partials'),
    debug: false,
    pretty: true,
    socialMedia: require('./configs/social.js'),
    nconf: {
        domain: process.env.NODE_ENV == 'production' ? `${process.env.DOMAIN}` : `${process.env.DOMAIN}:${port}`
    }
}

if (fs.existsSync("export")) {
    fs.rmdirSync(
        "export",
        {recursive: true, force: true}
    );
}

for (let path in router.data) {
    ctx = {
        render: async (page, page_options) => {
            ctx.response.body = pug.renderFile(`./views/pages/${page}.pug`, {
                ...options,
                ...page_options
            });
        },
        response: {
            body: null
        }
    }
    router.data[path](ctx);

    if (ctx.response.body != null ) {
        let fs_dir = `export/${path.substring(0)}`;
        let fs_path = `${fs_dir}/index.html`;
        
        if (path === "/404") {
            fs_dir = "export"
            fs_path = `${fs_dir}/404.html`
        } else if (path.indexOf(".") != -1) {
            fs_dir = `export/${path.substring(0, path.lastIndexOf("/"))}`
            fs_path = `export/${path}`
        }

        fs.mkdirSync(
            fs_dir,
            {
                recursive: true
            }
        )
        // write to FS
        fs.writeFileSync(
            fs_path,
            ctx.response.body,
            'utf8'
        );
    }
}
fs.cpSync(
    "public/",
    "export/",
    {
        recursive: true
    }
)

if (process.env.NODE_ENV != 'production'){
    const express = require('express')
    const app = express()
    app.set('view engine', 'pug')
    app.use(express.static('export'))

    // for (let path in router.data) {
    //     app.get(path, (req, res) => router.data[path](res));
    // }

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })
}