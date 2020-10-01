// ***** EDIT PERSONS FROM LIST *****
import { showPeople } from './list';
import { updateLocalStorage } from './localStorage';
import { destroyPopup } from './utils';

import wait from 'waait';

export const editPerson = async (id, persons) => {
	const person = persons.find(person => person.id === id);
	const result = await editPersonPopup(person);
	if (result) {
		showPeople(persons);
		updateLocalStorage(persons);
	}
};

export const editPersonPopup = person => {
	return new Promise(async resolve => {
		// create the html form
		const popup = document.createElement('form');
		popup.classList.add('popup');
		popup.insertAdjacentHTML(
			'afterbegin',
			`<fieldset>
				<h5>${person.birthday ? `${person.firstName + ' ' + person.lastName}` : 'Add somebody new 🤗'}</h5>
                <label>Last name</label>
				<input required type="text" name="lastName" placeholder="Person's last name" value="${
					person.lastName ? person.lastName : ''
				}"/>
                <label>First name</label>
				<input required type="text" name="firstName" placeholder="Person's first name" value="${
					person.firstName ? person.firstName : ''
				}"/>
                <label>Birthday</label>
				<input required type="date" name="birthday" value="${
					// https://stackoverflow.com/questions/14245339/pre-populating-date-input-field-with-javascript
					person.birthday ? new Date(person.birthday).toISOString().substring(0, 10) : ''
				}"/>
				<button type="submit">Submit</button>
            </fieldset>
		`
		);

		const skipButton = document.createElement('button');
		skipButton.type = 'button'; // so it doesn't submit
		skipButton.textContent = 'Cancel';
		skipButton.classList.add('cancel');
		popup.firstElementChild.appendChild(skipButton);
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
				// popup.input.value;
				person.firstName = e.target.firstName.value;
				person.lastName = e.target.lastName.value;
				// use this date conversion to get a timestamp back (just like the birthday inside people.json)
				person.birthday = new Date(e.target.birthday.value).getTime();
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
