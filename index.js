const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())

morgan.token('body', function getBody (req) {
    return JSON.stringify(req.body);
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let data = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons', (request, response) => {
})

app.get('/info', (request, response) => {
    const date = new Date();
    response.send(
        '<div>Phonebook has info for ' + data.length + ' people' 
        + '<br/><br/>' + date.toString() +  '</div>'
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    console.log(typeof(id))
    const person = data.find(person => person.id == id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end();
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    data = data.filter(person => person.id != id);

    response.status(204).end();
})

app.post('/api/persons', (request, response) => {
    const new_id = Math.floor(Math.random() * 10000)
    const body = request.body;

    if (!body.name && !body.number) {
        return response.status(400).json({
            error: 'name or number is missing'
        })
    }

    if (data.some(person => person.name == body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: new_id,
        name: body.name,
        number: body.number,   
    }

    data = data.concat(person)
    response.json(person)

})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
