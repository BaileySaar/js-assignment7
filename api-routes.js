const router = require('express').Router()

const { MongoClient, ObjectId } = require('mongodb')

const url = process.env.MONGODB_URI || require('./secrets/mongodb.json').url
const client = new MongoClient(url)

const getCollection = async (dbName, collectionName) => {
    await client.connect()
    return client.db(dbName).collection(collectionName)
}

router.get('/', async (_, response) => {
    // this maps to GET /api/todos
    const collection = await getCollection('todo-api', 'todos')
    const todo = await collection.find({}).toArray()
    response.json(todo)
})

router.post('/', async (request, response) => {
    // this maps to POST /api/todos
    const { item, complete } = request.body
        const collection = await getCollection('todo-api', 'todos')
        await collection.insertOne({ item, complete })
        response.json({ message: 'New todo added!' })
})

router.put('/:id', async (request, response) => {
     // this maps to PUT /api/todos/:id
     const { id } = request.params;
     const collection = await getCollection('todo-api', 'todos')
     const todo = await collection.findOne({ _id: new ObjectId(id) })
    const complete = !todo.complete
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { complete } })
     response.send('Todo status updated!');
})
module.exports = router ;