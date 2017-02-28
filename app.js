const request = require('request')
const express = require('express')
const app = express()

app.get('/api', function (req, res) {
  request.get({
      url: 'https://douban.fm/j/v2/playlist?client=s:mainsite|y:3.0&app_name=radio_website&version=100',
      qs: {
        channel: req.query.channel || 0,
        type: req.query.type || 'n',
      },
    },
    (error, response, body) => {
      res.send(body)
    }
  )
})

app.use(express.static('public'))
app.listen(3001)