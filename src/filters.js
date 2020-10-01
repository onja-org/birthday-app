export const searchNameFilter = document.querySelector('.searchName');
export const filterMonthFilter = document.querySelector('.filterMonth');

export const filterByName = persons => {
	if (searchNameFilter.value !== '') {
		persons = persons.filter(person => {
			const fullNameLowercase =
				person.firstName.toLowerCase() + ' ' + person.lastName.toLowerCase();
			return fullNameLowercase.includes(searchNameFilter.value.toLowerCase());
		});
	}
	return persons;
};

export const filterByMonth = persons => {
	if (filterMonthFilter.value !== '') {
		persons = persons.filter(person => {
			let birthday = new Date(person.birthday);
			return birthday.getMonth() === Number(filterMonthFilter.value);
		});
	}
	return persons;
};
