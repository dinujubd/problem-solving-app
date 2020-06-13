import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { DbOperations } from './dbService';

const app = express();
const port = 8181;

const problemsRepo = new DbOperations('problems');
const algoRepo = new DbOperations('algorithms');
const dsRepo = new DbOperations('dataStructures');
const verndorRepo = new DbOperations('dataStructures');

app.use(bodyParser.json());
app.use(
    cors({
        origin: 'http://localhost:8080',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    })
);

app.get('/problems', (req, res) => {
    res.json(new DbOperations('problems').list());
});
app.get('/vendors', (req, res) => {
    res.json(verndorRepo.list());
});

app.get('/problems/:problem_id', (req, res) => {
    res.json(problemsRepo.get(req.params.problem_id));
});

app.post('/problems', (req, res) => {
    res.json(problemsRepo.create(req.body));
});

app.put('/problems', (req, res) => {
    res.json(problemsRepo.update(req.body));
});

app.delete('/problems', (req, res) => {
    problemsRepo.delete(req.body.problem_id);
    res.json(true);
});

app.get('/problems/search', (req, res) => {
    res.json(problemsRepo.search(req.query.key.toString()));
});

//Algo

app.get('/algorithms', (req, res) => {
    res.json(algoRepo.list());
});

app.get('/algorithms/:algo_id', (req, res) => {
    res.json(algoRepo.get(req.params.algo_id));
});

app.post('/algorithms', (req, res) => {
    res.json(algoRepo.create(req.body));
});

app.put('/algorithms', (req, res) => {
    res.json(algoRepo.update(req.body));
});

app.post('/algorithms/delete', (req, res) => {
    algoRepo.delete(req.body.title);
    res.json(true);
});

app.get('/problems/search', (req, res) => {
    res.json(problemsRepo.search(req.query.key.toString()));
});

//DS

app.get('/ds', (req, res) => {
    res.json(dsRepo.list());
});

app.get('/ds/:ds_id', (req, res) => {
    res.json(problemsRepo.get(req.params.ds_id));
});

app.post('/ds', (req, res) => {
    res.json(dsRepo.create(req.body));
});

app.put('/ds', (req, res) => {
    res.json(dsRepo.update(req.body));
});

app.post('/ds/delete', (req, res) => {
    dsRepo.delete(req.body.title);
    res.json(true);
});

app.get('/ds/search', (req, res) => {
    res.json(dsRepo.search(req.query.key.toString()));
});

app.listen(port, () => console.log('server up!'));
