
import express from 'express';
import  nodecache from 'node-cache';
import 'isomorphic-fetch';

const appCache = new nodecache({ stdTTL : 3599});
const router = express.Router();
const todosURL = 'https://jsonplaceholder.typicode.com/todos';

router.get('/', async (req,res) => {
    if(appCache.has('todos')){
        console.log('Get data from Node Cache');
        return res.send(appCache.get('todos'))
    }
    else{
        const data = await fetch(todosURL)
            .then((response) => response.json());
        appCache.set("todos",data);
        console.log('Fetch data from API');
        res.send(data);
    }
})

router.get('/stats',(req,res)=>{
    res.send(appCache.getStats());
})

module.exports = router