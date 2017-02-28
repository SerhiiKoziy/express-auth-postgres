import {version} from '../package.json';
import {Router} from 'express';
import {comparePasswords, cryptPassword} from '../utils/password';

const tableName = 'users';

comparePasswords('123','$2a$10$mFqOFZoDfPL4tTYpgOKtMeFAcXqdBwIUyqho9uXl9KEk1zg7cp.ry').then(isValid => {
    console.log('validity', isValid);
} )

const userApi = Router();
export default (db) => {
    const User = db.User;

    userApi.get('/', async (req, res) => {
        const users = await User.findAll();
        res.json(users);
    });
    userApi.get('/:id', (req, res) => {
        const id = req.params.id;
        client.query(`SELECT * FROM ${tableName} WHERE id = ${id}`, [], function (err, result) {
            if (result && result.rows[0]) {
                res.json(result.rows[0]);
            } else {
                res.status(404).send(`No entry with id ${id}`);
            }

        });
    });

    userApi.post('/register', (req, res) => {
        const {username, password} = req.body;
        console.log([username, password]);
        cryptPassword(password).then((hash) => {
            console.log(hash);
            User.create({ username, password: hash })
              .then(function (user) {
                  res.json(user);
              });
        });

    });

    userApi.put('/:id', (req, res) => {
        const id = req.params.id;
        client.query(`SELECT * FROM ${tableName} WHERE id = $1`, [id], function (err, result) {

            if (result && result.rows[0]) {
                Object.keys(req.body).forEach(key => {
                    client.query(`UPDATE ${tableName} SET ${key} = ${req.body[key]} WHERE id = ${id}`, [], function (err, result) {
                        console.log(`UPDATE ${tableName} SET ${key} = ${req.body[key]} WHERE id = ${id}`)
                    });
                });
                res.send(`Entry with id ${id} was updated`);
            } else {
                res.status(404).send(`No entry with id ${id}`);
            }

        });
    });
    userApi.delete('/:id', (req, res) => {
        const id = req.params.id;
        client.query(`DELETE FROM ${tableName} WHERE id = $1`, [id], function (err, result) {
            console.log(id);
            res.json(result);
        });
    });

    return userApi;
};
