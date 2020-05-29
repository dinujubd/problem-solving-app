import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { create, get, list, remove, search, update } from './repository';

const app = express();
const port = 8181;

app.use(bodyParser.json());
app.use(
    cors({
        origin: 'http://localhost:8080',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    })
);

app.get('/problems', (req: any, res: { json: (arg0: any) => void }) => {
    res.json(list());
});

app.get('/problems/:problem_id', (req: { params: { problem_id: any } }, res: { json: (arg0: any) => void }) => {
    res.json(get(req.params.problem_id));
});

app.post('/problems', (req: { body: any }, res: { json: (arg0: any) => void }) => {
    res.json(create(req.body));
});

app.put('/problems', (req: { body: any }, res: { json: (arg0: any) => void }) => {
    res.json(update(req.body));
});

app.delete('/problems', (req: { body: { problem_id: any } }, res: { json: (arg0: boolean) => void }) => {
    remove(req.body.problem_id);
    res.json(true);
});

app.get('/search', (req: { query: { key: any } }, res: { json: (arg0: any) => void }) => {
    res.json(search(req.query.key));
});

app.listen(port, () => console.log('server up!'));
