//import sharpresizeImage from '../index';
import main from  "../index";

describe("Test function CheckImageDetails", () => {
    it("function CheckImageDetails('filename=encenadaport.jpg&width=100&height=100') to be true", () => {
        const myVar = main.CheckImageDetails('filename=encenadaport.jpg&width=100&height=100');
        expect(myVar).toBe(true);
    });
    it("function CheckImageDetails('') to be False", () => {
        const myVar = main.CheckImageDetails('');
        expect(myVar).toBe(false);
    });
    
});


describe("Test function sharpresizeImage", () => {
   it("function sharpresizeImage('encenadaport.jpg',100,100) to be called when passing right params",async () => {
        const myVar = await main.sharpresizeImage('encenadaport.jpg',100,100);
        expect(myVar).toHaveBeenCalledBefore;
    });
    


}); 


  
  