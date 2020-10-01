import { init } from './localStorage';

import { deletePerson } from './delete';
import { editPerson } from './edit';
import { addPerson } from './add';

import { searchNameFilter, filterMonthFilter } from './filters';
import { showPeople } from './list';

// ***** GENERATE MAIN PERSONS OBJECT *****
let persons = init();

export const handleClick = e => {
	const deleteButton = e.target.closest('button.delete');
	if (deleteButton) {
		const idToDelete = deleteButton.dataset.id;
		deletePerson(idToDelete, persons);
	}

	const editButton = e.target.closest('button.edit');
	if (editButton) {
		const idToEdit = editButton.dataset.id;
		editPerson(idToEdit, persons);
	}

	const addButton = e.target.closest('button.add');
	if (addButton) {
		addPerson(persons);
	}
};

document.body.addEventListener('click', handleClick);
searchNameFilter.addEventListener('input', () => showPeople(persons));
filterMonthFilter.addEventListener('change', () => showPeople(persons));
