import { generateUniqueID, addAccount } from './index.js';

console.log(generateUniqueID("Alan", "Turing"));

//correct
console.log(addAccount(["Tim", "Berners-Lee", "tim@w3c.com", 25]));
console.log(addAccount(["Ted", "Nelson", "ted@w3c.com", 43]));

//not exact 4 params
console.log(addAccount(["Alan", "Turing", "aturing@w3c.com"]));
console.log(addAccount(["Alan", "Turing", "aturing@w3c.com", 58, "one more"]));

//type mismatches
console.log(addAccount(["Alan", "Turing", "aturing@w3c.com", "58"]));
console.log(addAccount([67, "Turing", "aturing@w3c.com", 58]));

//empty strings
console.log(addAccount(["", "Turing", "aturing@w3c.com", 58]));
console.log(addAccount(["Alan", "   ", "aturing@w3c.com", 58]));
console.log(addAccount(["Alan", "Turing", "", 58]));

//wrong email
console.log(addAccount(["Alan", "Turing", "aturingw3c.com", 58]));
console.log(addAccount(["Alan", "Turing", "aturing@", 58]));

//underage
console.log(addAccount(["Alan", "Turing", "aturing@w3c.com", 17]));