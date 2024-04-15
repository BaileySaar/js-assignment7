
const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static('public'))

const todos = [
	{ id: 1, item: 'Learn JavaScript', complete: false },
	{ id: 2, item: 'Learn Express', complete: false },
	{ id: 3, item: 'Build a To Do App', complete: false }
]

app.get('/', (_, response) => {
	response.sendFile('index.html', { root })
})



// GET /api/todos
app.get('/api/todos', (request, response) => {
    console.log('Fetching todos.')
    response.json(todos)
})
// POST /api/todos
app.post('/api/todos',  (request, response) => {
    console.log('Posting todo.')
    const { id, item, complete } = request.body
    todos.push({ id: todos.length+1, item, complete: false })
    response.json({ message: 'New todo added.' })
})

// PUT /api/todos/:id
app.put('/api/todos/:id', (request, response) => {
	console.log('Put todo.')
	const { id } = request.params
	const task = todos.find(todo => todo.id.toString() === id)
	task.complete = !task.complete // toggle the complete property
})


const message = `Server running: http://localhost:${port}`
app.listen(port, () => console.log(message))