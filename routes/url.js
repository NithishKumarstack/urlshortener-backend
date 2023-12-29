const router = require("express").Router();
const Url = require('../model/url.js');
const { User } = require('../model/user.js');
const shortid = require('shortid');

router.post('/url/shorturl', async (req, res) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) {
      return res.status(400).send({ message: "Invalid URL" });
    }
    const shortUrl = shortid.generate();
    const newUrl = new Url({
      shortId: shortUrl,
      redirectUrl: originalUrl,
    });
    const savedUrl = await newUrl.save();
    res.status(200).send({ data: savedUrl, message: "URL created successfully" });
  } catch (error) {
    console.error('Error creating URL:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});


router.get('/:shortId', async (req, res) => {
  try {
    const { shortId } = req.params;
    console.log(shortId);
    const url = await Url.findOne({ shortId });

    if (!url) {
      return res.status(404).send({ message: 'Short URL not found' });
    }
    url.visitedHistory.push({ timestamp: Date.now() });
    await url.save();
    console.log('Redirect URL:', url.redirectUrl);
res.redirect(url.redirectUrl);
  } catch (error) {
    console.error('Error redirecting:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

router.get('/url/list', async (req, res) => {
  try {
    const urlList = await Url.find();
    res.status(200).send({ data: urlList, message: "URL list fetched successfully" });
  } catch (error) {
    console.error('Error fetching URL list:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

module.exports = router;
