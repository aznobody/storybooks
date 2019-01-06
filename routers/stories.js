const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureGuest } = require('../middlewares/auth');
const mongoose = require('mongoose');
const { Story } = require('../models/Story');
const { User } = require('../models/User');

//Stories all the public stories
router.get('/', async(req, res) => {
        const stories = await Story.find({ status: 'public' })
            .populate('user')
            .sort({ date: 'desc' });
        res.render('stories/index', { stories });
    })
    //Add stories
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('stories/add');
})

//Add Story
router.post('/', ensureAuthenticated, (req, res) => {
        console.log(req.body);
        let allowComments = false;
        if (req.body.allowComments)
            allowComments = true;

        const newStory = new Story({
            title: req.body.title,
            body: req.body.body,
            status: req.body.status,
            allowComments: allowComments,
            user: req.user.id
        });

        newStory.save()
            .then(story => { res.redirect('/stories/show/' + story.id) })

    })
    //Show single story
router.get('/show/:id', async(req, res) => {
    const story = await Story.findOne({ _id: req.params.id })
        .populate('user')
        .populate('comments.commentUser');
    if (story.status == 'public') { //if story is public then show it
        res.render('stories/show', {
            story: story
        });
    } else {

        if (req.user && req.user.id == story.user._id) {
            res.render('stories/show', {
                story: story
            })
        } else {
            res.redirect('/stories')
        }

    }

})

//List stories from a user
router.get('/user/:userId', (req, res) => {
        Story.find({ user: req.params.userId, status: 'public' })
            .populate('user')
            .then(stories => {
                res.render('stories/index', { stories });
            })
    })
    //Logged in user all stories
router.get('/my', ensureAuthenticated, (req, res) => {
        Story.find({ user: req.user.id })
            .populate('user')
            .then(stories => {
                res.render('stories/index', { stories });
            })
    })
    //edit story form
router.get('/edit/:id', ensureAuthenticated, async(req, res) => {
        const story = await Story.findOne({ _id: req.params.id });
        if (story.user != req.user.id)
            res.redirect('/stories');
        else
            res.render('stories/edit', {
                story: story
            });
    })
    //edit form process
router.put('/:id', async(req, res) => {
    const story = await Story.findOne({ _id: req.params.id });

    let allowComments = false;
    if (req.body.allowComments)
        allowComments = true;

    story.title = req.body.title;
    story.body = req.body.body;
    story.status = req.body.status;
    story.allowComments = allowComments;

    story.save()
        .then(story => {
            res.redirect('/dashboard');
        });
})

//delete story
router.delete('/:id', (req, res) => {
    Story.remove({ _id: req.params.id })
        .then(() => {
            res.redirect('/dashboard');
        });
});

//add comment
router.post('/comment/:id', (req, res) => {
    Story.findOne({ _id: req.params.id })
        .then(story => {
            const newComment = {
                    commentBody: req.body.commentBody,
                    commentUser: req.user.id
                }
                //Aadd at begining to comments array
            story.comments.unshift(newComment);
            story.save()
                .then(story => {
                    res.redirect('/stories/show/' + story.id)
                })
        })
})

module.exports = router;