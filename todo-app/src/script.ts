'use strick'
import { v4 as uuid } from 'uuid'

const list = document.querySelector<HTMLUListElement>('#list')
const form = document.querySelector<HTMLFormElement>('#new-task-form')
const input = document.querySelector<HTMLInputElement>('#new-task-title')

type TaskType = {
	id: string
	title: string
	complated: boolean
	createdAt: Date
}

const tasks: TaskType[] = loadtasks();
tasks.forEach(addListItem);

form.addEventListener('submit', (event) => {
	event.preventDefault()

	if (input?.value == '' || input?.value == null) return

	const newTask: TaskType = {
		id: uuid(),
		title: input?.value,
		complated: false,
		createdAt: new Date(),
	}

	tasks.push(newTask);

	addListItem(newTask);
	input.value = ""
})

function addListItem(task: TaskType) {
	const eachItem = document.createElement('li')
	const label = document.createElement('label')
	const checkBox = document.createElement('input')

	checkBox.addEventListener("change", () => {
		task.complated = checkBox.checked;
		saveTasks()
	})

	checkBox.type = 'checkbox';
	checkBox.checked = task.complated
	label.append(checkBox, task.title);
    eachItem.append(label);
    list?.append(eachItem);
}

function saveTasks() {
	localStorage.setItem("TASKS", JSON.stringify(tasks))
}


function loadtasks (): TaskType[] {
	const tasks = localStorage.getItem("TASKS");
	if (tasks == null ) return [];

	return JSON.parse(tasks)
}