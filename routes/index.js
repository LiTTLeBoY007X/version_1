var express = require('express');
var router = express.Router();
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const DBcontent = require('../model/ContentModel')



function requireUser(req, res, next) {
  if (req.session.user.username === "da59e2b9-7b1d-40cf-a8c9-5a96ae9e4f06") {
    next(); // ผู้ใช้มี session user
  } else {
    console.log(req.session.user)
    res.status(403).send('Permission denied!'); // ผู้ใช้ไม่มี session user
  }
}



router.get('/', ((req, res, next) => {
  if (!req.session.user) {
    req.session.user = { username: 'user' };
  }
  res.sendFile('homepage.html', { root: 'public' })
}))


router.get('/admin', (req, res, next) => {
  res.sendFile('admin.html', { root: 'public' })
})





var servicetypereq = ''

router.get('/service/:_servicetype', (req, res, next) => {
  servicetypereq = req.params._servicetype
  res.sendFile('service.html', { root: 'public' })
})

//find service type
router.post('/dbcontent/service', async (req, res, next) => {
  try {
    var data = await DBcontent.find({ serviceType: servicetypereq }).sort({ created_at: -1 })
    const contents = data.map(doc => doc.content);
    const ids = data.map(doc => doc._id);
    const time = data.map(doc => doc.created_at.toLocaleString('en-US'));
    const filenames = data.map(doc => doc.filename)
    const templates = data.map(doc => doc.templateDB);

    const responseData = {
      contents: contents,
      ids: ids,
      Datetime: time,
      filenames: filenames,
      templates: templates
    };


    // ส่งข้อมูลกลับเป็น JSON หรือ Object
    res.json(responseData)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

})

router.post('/dbcontent', async (req, res, next) => {
  try {
    var data = await DBcontent.find().sort({ created_at: -1 })
    const contents = data.map(doc => doc.content);
    const ids = data.map(doc => doc._id);
    const time = data.map(doc => doc.created_at.toLocaleString())
    const filenamess = data.map(doc => doc.filename)
    const templates = data.map(doc => doc.templateDB);

    const responseData = {
      contents: contents,
      ids: ids,
      Datetime: time,
      filenames: filenamess,
      templates: templates
    };

    
    // ส่งข้อมูลกลับเป็น JSON หรือ Object
    res.json(responseData)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

})



module.exports = router;



