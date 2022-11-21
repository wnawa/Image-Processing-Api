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
//import sharpresizeImage from '../index';
const index_1 = __importDefault(require("../index"));
describe("Test function CheckImageDetails", () => {
    it("function CheckImageDetails('filename=encenadaport.jpg&width=100&height=100') to be true", () => {
        const myVar = index_1.default.CheckImageDetails('filename=encenadaport.jpg&width=100&height=100');
        expect(myVar).toBe(true);
    });
    it("function CheckImageDetails('') to be False", () => {
        const myVar = index_1.default.CheckImageDetails('');
        expect(myVar).toBe(false);
    });
});
describe("Test function sharpresizeImage", () => {
    it("function sharpresizeImage('encenadaport.jpg',100,100) to be called when passing right params", () => __awaiter(void 0, void 0, void 0, function* () {
        const myVar = yield index_1.default.sharpresizeImage('encenadaport.jpg', 100, 100);
        expect(myVar).toHaveBeenCalledBefore;
    }));
});
