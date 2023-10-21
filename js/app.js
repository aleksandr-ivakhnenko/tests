// Получение html-элементов(nodes)...
const expenseNewBtnNode = document.querySelector('#expense-new-btn');
const expenseAddBtn = document.querySelector('#expense-add-btn');

const expenseValueInput = document.querySelector('#expense-value-input');

const expenseAddFormNode = document.querySelector('#expense-add-form');

const selectCategorySelectedNode = document.querySelector('#select-category-selected');
const selectCategoryOptionsNode = document.querySelector('#select-category-options');
const selectCategoryOverlayNode = document.querySelector('#select-category-overlay');

//
const expensesList = [];

// События
expenseNewBtnNode.addEventListener('click', handleExpenseNewBtnClick);
expenseAddFormNode.addEventListener('click', event => handleExpenseAddFormClick(event));

// Функции-handle, выполняемые при событиях...
function handleExpenseNewBtnClick() {
	showOrHideNode(expenseAddFormNode);
};

function handleExpenseAddFormClick(event) {
	event.preventDefault();
	const eventNode = event.target;

	const showOrHideSelectCategoryNodes = () => {
		showOrHideNode(selectCategoryOptionsNode);
		showOrHideNode(selectCategoryOverlayNode);
	}

	if (eventNode === selectCategorySelectedNode ||
		eventNode === selectCategoryOverlayNode) {
		showOrHideSelectCategoryNodes();
	}

	if (eventNode.classList.value === 'select-category__option') {
		const optionValue = eventNode.innerText;
		selectCategorySelectedNode.innerText = optionValue;

		showOrHideSelectCategoryNodes();
	}

	if (eventNode === expenseAddBtn) {
		hideNode(expenseAddFormNode);
		const expenseFromUser = getExpenseFromUser();
		addExpense(expenseFromUser);
		console.log(expensesList);
	}
}

// 
class Expense {
	constructor(value, category) {
		this.value = value,
			this.category = category
	}
}

// Функция получения данных "расхода от пользователя"...
function getExpenseFromUser() {
	const value = expenseValueInput.value;
	const category = selectCategorySelectedNode.innerText;

	const expenseFromUser = new Expense(value, category);
	return expenseFromUser;
}

// Функция добавления нового "расхода" в конец массива "expensesList"...
function addExpense(expense) {
	expensesList.push(expense);
}

// Функция для скрытия элемента, переданного как аргумент...
function hideNode(node) {
	node.classList.remove('visible');
}

// Функция для показа/скрытия элемента, переданного как аргумент...
function showOrHideNode(node) {
	node.classList.toggle('visible');
}

// Функция расчета правильной высоты "app" с учетом интерфейсов мобильных браузеров...
const appHeight = () => {
	const doc = document.documentElement;
	doc.style.setProperty('--app-height', `${window.innerHeight}px`);
};

window.addEventListener('resize', appHeight);
appHeight();