const PORT = process.env.PORT || 3000;
const express = require('express')
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const Inputs = require('./schema/model');



app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

app.set('view engine', 'hbs');
const path = require('path');
app.use(express.static(path.join(__dirname, './css')));


mongoose.connect(process.env.DB_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false

}, () => {
    console.log('connected to db');
})











app.get('/load', async (req, res) => {
    const posts = await Inputs.find();
    res.json({ posts: posts })

})



// middleware function
const prevent = (req, res, next) => {

    console.log('hi there from middeware')
    next();
}


// when page innitially  loads or even reloads
app.get('/', prevent, async (req, res) => {

    try {

        res.render('index.hbs');



    } catch (err) {
        res.render('index.hbs', { data: err })
    }


})



// for when a new post come in 

app.post('/', async (req, res) => {
    console.log(req.body.name);
    console.log(req.body.content);


    try {

        // await Inputs.create({
        //     name: req.body.name,
        //     content: req.body.content
        // })

        const posts = await Inputs.find();
        //res.render('index.hbs', { data: posts });
        res.json({ posts: posts })




    } catch (err) {

        res.json({ message: err })
    }




});


// this will spit out the posts from the mongoDB back into the fetch
app.post('/newPost', async (req, res) => {
    console.log(req.body.name);
    console.log(req.body.content);

    try {

        await Inputs.create({
            name: req.body.name,
            content: req.body.content
        })

        const posts = await Inputs.find();
        //console.log(posts)
        res.json({ posts: posts })



    } catch (err) {

        res.json({ message: err })
    }




});



let middleware = (e) => {
    e.preventDefault();
}



// delete using a post method behind the scenes with fetch
app.delete('/delete', async (req, res) => {
    try {
        console.log(req.body.id)
        await Inputs.remove({ _id: req.body.id });
        const posts = await Inputs.find();
        res.json({ posts: posts })
    } catch (err) {
        res.json({ message: err });
    }


})



app.patch('/updatePost', async (req, res) => {

    try {
        await Inputs.update(
            { _id: req.body.id },
            { $set: { name: req.body.name, content: req.body.content } }
        );
        const updatedPosts = await Inputs.find();
        res.json(updatedPosts);

    } catch (err) {
        res.json({ message: err });
    }

})


//const posts = await Inputs.find();

//res.json({ posts: posts })





app.listen(PORT, () => {
    console.log("server started on port 3000");

})