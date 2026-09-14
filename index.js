import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';

function generateUniqueID(firstName, lastName) {
	if (typeof firstName !== "string" || typeof lastName !== "string"){
		return null;
	}
	//check if both exist or valid input

	const firstNLetter = firstName.charAt(0).toLowerCase();
	//lower case first letter first name
	const lastN = lastName.toLowerCase();
	//lower case last name
	const uniqueS = uuidv4().replace(/-/g, "").slice(0,8);
	//alphanumeric string len 8 (uuid)
	const output = firstNLetter + lastN + uniqueS;
	//concat them all, return
	return output;
}

function addAccount(inputArray) {
	if(inputArray.length !== 4){
		return false;
	}

	const fName = inputArray[0];
	const lName = inputArray[1];
	const email = inputArray[2];
	const age = inputArray[3];

	if(typeof fName !== "string" || typeof lName !== "string" ||
		typeof email !== "string" || typeof age !== "number"){
		return false;
	}

	if(fName.trim() === '' || lName.trim() === '' || email.trim() === ''){
		return false;
	}
	//all fields present

	if(!(validator.isEmail(email)) || age < 18){
		return false;
	}
	//email in valid format
	//age is >=18

	const uniqueS = generateUniqueID(fName, lName);
	//use func from item 1

	const output = fName + ',' + lName + ',' + email + ',' + age + ',' + uniqueS + '\n';
	//save input into users.txt
	try {
		fs.appendFileSync('users.txt', output);
		console.log(output);
		return true;
	} catch (error) {
		return false;
	}
	//fname,lname,email,age,uniqueID
	//if success, true, if not, false
}

export { generateUniqueID, addAccount }