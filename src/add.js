import { editPersonPopup } from './edit';
import { showPeople } from './list';
import { updateLocalStorage } from './localStorage';

// ***** ADD PERSON TO LIST *****
export const addPerson = async persons => {
	const newPerson = {};
	const result = await editPersonPopup(newPerson);
	if (result) {
		result.id = Date.now().toString();
		result.picture = 'https://www.fillmurray.com/100/100';
		persons.push(result);
		showPeople(persons);
		updateLocalStorage(persons);
	}
};
