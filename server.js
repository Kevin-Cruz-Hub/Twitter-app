const express = require('express')
require('dotenv').config()
const connectDB = require('./utils/connectDB')
const jsxEngine = require('jsx-view-engine')
const methodOverride = require('method-override')

const Tweet = require('./models/Tweet')
const manyTweets = require('./models/ManyTweets')

const app = express();

// When deploying
const PORT = process.env.PORT || 3000;
// *=========================================================================
// App Config
app.set('view engine', 'jsx');
app.engine('jsx',jsxEngine())
// *=========================================================================
// Middleware
app.use(express.urlencoded({ extended: false }));

// 2nd middleware
// Will allow you to recieve data using postman in a form of JSON
// postman -> set to post -> body -> raw -> set to json 
// json is Javascript Object Notation
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'))
// *=========================================================================
// Routes

/*
*Root Route
*/
app.get('/', (req, res) => {
    res.send('Working!')
})

// **=========================================================================
// View Routes: Routes that are going to return a view
/*
**READ
*Index
*/
app.get('/tweets', async (req, res) => {
    try {
        // Grabs all the different tweets we have in our backend
        // .find(): can be used to narrow your search within your database
        // find({key/value}): queries the database for the index that matches
            // Tweet.find({author: "Lenard"})
        // find({}, "key"): returns all the indexes that have data refereing to the key name
            // Tweet.find({},"title body")
        // .find also allows filtering for your data, you can also combine them to make ranges
            // lt = less than
            // lte = less than or equal to 
            // gt = greater than
            // gte = greater than or equal to
                // EX:find({ likes: { $gt: 20, $lt :100 } })
        // findById(): finds by ID
        // findOne(): limits the search to the first one that meets the criteria
        const tweets = await Tweet.find({}).sort({updatedAt: "desc"})
        res.render('Main', {tweets})
    } catch (error) {
        console.log(error)
    }
})
/*
 *New 
 */
app.get('/tweets/new', (req,res)=>{
    res.render('New')
})
/*

/**
 * Edit
 */
app.get('/tweets/:id/edit',async (req,res)=>{
    const {id} = req.params
    try{
        // find the element
        const tweet = await Tweet.findById(id)
        // return a form with the element data
        res.render('Edit', {tweet})
    }catch(e){
        console.log(e)
    }
})
/*
*Show
*/
app.get('/tweets/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const tweet = await Tweet.findById(id)

        res.render('Show',{tweet})
    } catch (error) {
        console.log(error)
    }
})

// **=========================================================================
// API routes
// These routes are not going to send any views to the user
// An API route is used as a way to communicate to the database, or have the front-end send some data. But none of these will return a view
/*
**CREATE
*Create Post
*/
app.post('/api/tweets', async (req, res) => {
    // This helps to check if you can send the json data, and recieving it in the request handler
    // console.log(req.body);
    // res.send(req.body)

    // To send the tweet data to the database
    const createdTweet = await Tweet.create(req.body)
    res.redirect('/tweets')
})
/*
**UPDATE
*Update
 */
app.put('/api/tweets/:id',async(req,res)=>{
    const {id} = req.params
    console.log(req.body)
    if(req.body.sponsored === 'on'){
        req.body.sponsored = true
    }else{
        req.body.sponsored = false
    }
    try{
        // If you dont put {new: true}: the document will return the old value before the change/update
        // This is how you update in the back-end then show then changes in the front-end
        const updatedTweet = await Tweet.findByIdAndUpdate(id, req.body, {new: true})
        res.redirect(`/tweets`)
    }catch(e){
        console.log(e)
    }
})

/*
**DELETE
*Delete Post
 */
app.delete('/api/tweets/:id', async (req,res)=>{
    const {id} = req.params;
    try{
        // remove()danger! Will remove all instances
        // findOneAndRemove()- this seems like a great choice
        // .findByIdAndRemove()- finds by ID - great for delete
        const deletedTweet = await Tweet.findByIdAndDelete(id);
        res.redirect('/tweets')
    }catch(e){
        console.log(e)
    }
})
/*
*Add comment
*/
// You need put because you are recieving data from the form through the req.body
app.put('/api/tweets/addComment/:id', async (req,res)=>{
    const {id} = req.params
    try{
        // find the tweet
        const tweet = await Tweet.findById(id)
        console.log(tweet)
        // Push a comment to tweet
        // req.body is the data being pushed to comments because there is a seperate schema for this
        console.log(req.body)
        tweet.comments.push(req.body)
        const updatedTweet = await Tweet.findByIdAndUpdate(id, tweet, {new: true})
        res.redirect(`/tweets/${id}`)
    }catch(e){
        console.log(e)
    }
})


/*
*Increase Likes
*/
app.get('/api/tweets/addLike/:id', async (req,res)=>{
    const {id} = req.params
    // find the tweet to update
    const tweetToUpdate = await Tweet.findById(id);
    // increase the likes
    tweetToUpdate.likes++;
    // update the tweet with the new data
    const updatedTweet = await Tweet.findByIdAndUpdate(id,tweetToUpdate,{new: true})
    res.redirect('/tweets')
})

/*
* Seed Route
*/
app.get('/api/tweets/seed', async (req, res) => {
    // everytime you hit this route the dummy data will be sent to the MongoDB database when ran in postman

    const createdTweets = await Tweet.insertMany(manyTweets)
    res.send(createdTweets)
})

// *=========================================================================
// Connect to MongoDB
connectDB()
// *=========================================================================
// Listener
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})