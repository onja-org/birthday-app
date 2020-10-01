import { showPeople } from './list';
import { updateLocalStorage } from './localStorage';
import { destroyPopup } from './utils';
import wait from 'waait';

// ***** DELETE PERSON FROM LIST *****
export const deletePerson = async (id, persons) => {
	const person = persons.find(person => person.id === id);
	const result = await deletePopup(person);
	if (result) {
		persons = persons.filter(person => person.id !== result.id);
		showPeople(persons);
		updateLocalStorage(persons);
	}
};

export const deletePopup = person => {
	return new Promise(async resolve => {
		// create the html form
		const popup = document.createElement('form');
		popup.classList.add('popup');
		popup.insertAdjacentHTML(
			'afterbegin',
			`<fieldset>
				<h5>Delete ${person.firstName} ${person.lastName} 🙈</h5>
				<p>Are you sure you want to delete this person from the list?</p>
				<button type="submit">Bye 👋 🗑</button>
            </fieldset>
		`
		);

		const skipButton = document.createElement('button');
		skipButton.type = 'button'; // so it doesn't submit
		skipButton.textContent = 'Cancel';
		skipButton.classList.add('cancel');
		popup.lastElementChild.appendChild(skipButton);
		skipButton.addEventListener(
			'click',
			() => {
				resolve(null);
				destroyPopup(popup);
			},
			{ once: true }
		);

		popup.addEventListener(
			'submit',
			e => {
				e.preventDefault();
				resolve(person);
				destroyPopup(popup);
			},
			{ once: true }
		);

		document.body.appendChild(popup);
		await wait(50);
		popup.classList.add('open');
	});
};
