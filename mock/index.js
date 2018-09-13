const express = require('express')
const path = require("path")
const app = express();
const webpack = require("webpack");
const webpackConfigBabel = require("../webpack.config.babel.js")
const webpackHotMiddleware  = require("webpack-hot-middleware"); 

const port = 4000
app.get('/api/*', (req, res) => {
    let pathfile = req.path;
    try {
        let json = require(path.join(__dirname, pathfile + '.js'));
        if (json) {
            res.send({
                errcode: 0,
                data: json
            })
        }
    } catch (e) {
        res.send({
            errcode: 1000,
            data: "",
            errmsg: {
                mockError:e
            }
        })
    }

})
var compiler = webpack(webpackConfigBabel())

let httpServer = () => {
    return new Promise((resolve, reject) => {
        let server = app.listen(port, () => {
            console.log(`Server Starts at ${port}`)
        })
        app.use(webpackHotMiddleware(compiler));
        app.use(require('webpack-dev-middleware-hard-disk')(compiler, {
            publicPath: '../src/',
            quiet: true
        }))
        resolve()
    }).catch(error => {
        console.log( error)
    })
}

httpServer().then(()=>{
    
})
