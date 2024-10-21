import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use(express.json());

const PORT = 3000;

const swaggerOptions = {
    definition: {
        aponapi: '3.0.0',
        info: {
            title: 'Users API',
            version: '1.0.0',
            description: ' A simple Express Users API',
        },
    },
    apis: ['./server.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
});

let users = [
    {
        id: 1,
        name: 'Lisa',
        surname: 'Erikson',
        age: 37,
    },
    {
        id: 2,
        name: 'Joe',
        surname: 'Jackson',
        age: 45,
    },
];

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   surname:
 *                     type: string
 *                   age:
 *                     type: integer
 */
app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users', (req, res) => {
    res.json(users);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - surname
 *               - age
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 surname:
 *                   type: string
 *                 age:
 *                   type: integer
 */

app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
    };
    users.push(newUser);
    res.json({ message: 'User details added successfully!', user: newUser });
});

// app.put('/users/:id', (req, res) => {
//     const userId = parseInt(req.param.id);
//     const user = users.find((u) => u.id === userId);
//     if (!user) {
//         return res.status(404).json({ message: 'User not found!' });
//     }
//     user.name = req.body.name || user.name;
//     user.surname = req.body.surname || user.surname;
//     res.json({ message: 'User updated successfully!', user });
// });

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found!' });
    }

    const updatedUser = { ...user };

    updatedUser.name = req.body.name || updatedUser.name;
    updatedUser.surname = req.body.surname || updatedUser.surname;

    const userIndex = users.findIndex((u) => u.id === userId);
    users[userIndex] = updatedUser;

    res.json({ message: 'User updated successfully!', user: updatedUser });
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter((u) => u.id !== userId);
    res.json({ message: 'User deleted succesfully!' });
});
