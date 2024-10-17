import express from 'express';

const app = express();

app.use(express.json());

const PORT = 3000;

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

app.get('/users', (req, res) => {
    res.json(users);
});

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
