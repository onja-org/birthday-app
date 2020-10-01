// ***** LOCALSTORAGE FUNCTIONS *****

import peopleData from '../data/people.json';
import { showPeople } from './list';

// if we don't have anything in the localstorage, we get the data from the json, and then save it on local storage on every turn

export const init = () => {
	let persons = [];
	const stringFromLS = localStorage.getItem('persons');
	const lsItems = JSON.parse(stringFromLS);
	if (lsItems) {
		persons = lsItems;
	} else {
		// used fetch here. or peopleData, that was imported from the people.json
		persons = peopleData;
	}
	// launch a custom event,
	showPeople(persons);
	updateLocalStorage(persons);
	return persons;
};

// we want to update the local storage each time we update, delete or add an attribute
export const updateLocalStorage = persons => {
	localStorage.setItem('persons', JSON.stringify(persons));
};
