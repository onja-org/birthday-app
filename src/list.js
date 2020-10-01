import {
	lightFormat,
	differenceInCalendarYears,
	differenceInCalendarDays,
	compareAsc,
} from 'date-fns';

import { getNextBirthday } from './utils';
import { editSVG, deleteSVG } from './svg';
import { filterByName, filterByMonth } from './filters';

const container = document.querySelector('main');

// **** SHOW PEOPLE FUNCTION *****

export function showPeople(persons) {
	let personsFilteredAndSorted = persons;

	personsFilteredAndSorted = filterByName(personsFilteredAndSorted);
	personsFilteredAndSorted = filterByMonth(personsFilteredAndSorted);

	// we sort from the soonest birthday to the latest.
	personsFilteredAndSorted.sort((a, b) => {
		let dayToBirthdayA = differenceInCalendarDays(getNextBirthday(a.birthday), new Date());
		let dayToBirthdayB = differenceInCalendarDays(getNextBirthday(b.birthday), new Date());
		return compareAsc(dayToBirthdayA, dayToBirthdayB);
	});

	let html = personsFilteredAndSorted
		.map(person => {
			const birthdayDate = new Date(person.birthday);
			const today = new Date();
			const nextBirthDay = getNextBirthday(birthdayDate);
			// we do the difference between this date and the next
			let daysToBirthday = differenceInCalendarDays(nextBirthDay, today);

			return `
				<article>
					<img src="${person.picture}" alt="${person.firstName} ${person.lastName} picture" />
					<section>
						<div class="name">${person.firstName} ${person.lastName}</div>
						<div class="when">
							${
								daysToBirthday === 0
									? `He/She is ${
											differenceInCalendarYears(new Date(), birthdayDate) + 1
									  }</b> today`
									: `Turns <b>${
											differenceInCalendarYears(new Date(), birthdayDate) + 1
									  }</b> on the ${lightFormat(nextBirthDay, 'dd/MM')}`
							}
						</div>
					</section>
					<section class="days">
						${daysToBirthday === 0 ? `🎂🎂🎂` : `🎂 in ${daysToBirthday} days`}
					</section>
					<section class="icons">
						<button class="edit" data-id="${person.id}">
							${editSVG}
						</button>
						<button class="delete" data-id="${person.id}">
							${deleteSVG}
						</button>
					</section>
				</article>
	`;
		})
		.join('');

	if (personsFilteredAndSorted.length === 0) {
		html = `<p><i>Nobody matches that filter options.</p>`;
	}

	container.innerHTML = html;
}
