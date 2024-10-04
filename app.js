import express from 'express'

import { getComments, createComment } from './database.js';

const app = express()
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.get('/comments', async (req, res) => {
    const comments = await getComments()
    res.send(comments)
})

app.post('/comments', async (req, res) => {
    const { user, comment } = req.body
    const result = await createComment(user, comment)
    res.status(201).send(String(result))
})

app.get('/', (req, res) => {
    res.send("ok")
})

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})