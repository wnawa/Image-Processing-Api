"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_cache_1 = __importDefault(require("node-cache"));
require("isomorphic-fetch");
const appCache = new node_cache_1.default({ stdTTL: 3599 });
const router = express_1.default.Router();
const todosURL = 'https://jsonplaceholder.typicode.com/todos';
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (appCache.has('todos')) {
        console.log('Get data from Node Cache');
        return res.send(appCache.get('todos'));
    }
    else {
        const data = yield fetch(todosURL)
            .then((response) => response.json());
        appCache.set("todos", data);
        console.log('Fetch data from API');
        res.send(data);
    }
}));
router.get('/stats', (req, res) => {
    res.send(appCache.getStats());
});
module.exports = router;
