# Interactive To-Do List

A simple task manager built with vanilla HTML, CSS, and JavaScript. Tasks are saved in the browser with `localStorage`, so they persist after a page reload.

## Features

- Add tasks with the Add button or the Enter key
- Mark tasks complete (checkbox or click the text)
- Delete tasks
- Filter by All / Active / Done
- Clear all completed tasks
- Light and dark mode (follows system setting)

## Concepts practiced

- DOM manipulation (`createElement`, `append`, `textContent`)
- Event listeners (`click`, `change`, `keydown`)
- State handling (a `tasks` array that drives a `render()` function)
- `localStorage` with `JSON.stringify` / `JSON.parse`

## Run it

Open `index.html` in any browser. No build step or dependencies.

## Project structure

```
todo-list/
├── index.html
├── style.css
├── script.js
└── README.md
```
