const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
	const notes = loadNotes();
	const duplicateNote = notes.find((note) => note.title === title);

	if (!duplicateNote) {
		notes.push({
			title: title,
			body: body,
		});
		saveNotes(notes);
		console.log(chalk.green.inverse("New note added"));
	} else {
		console.log(chalk.red.inverse("Note title taken"));
	}
};

const removeNote = (title) => {
	const notes = loadNotes();
	const newNotes = notes.filter((note) => {
		return note.title !== title;
	});
	if (newNotes.length === notes.length) {
		console.log(chalk.red.inverse("No note removed"));
	} else {
		console.log(chalk.green.inverse("Note removed!"));
		saveNotes(newNotes);
	}
};

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync("notes.json");
		const dataJson = dataBuffer.toString();
		return JSON.parse(dataJson);
	} catch (error) {
		return [];
	}
};

const saveNotes = (notes) => {
	const dataJson = JSON.stringify(notes);
	fs.writeFileSync("notes.json", dataJson);
};

const listNotes = () => {
	const notes = loadNotes();
	console.log(chalk.green("Your notes"));
	for (note of notes) {
		console.log(note.title);
	}
};

const readNote = (title) => {
	const notes = loadNotes();
	const note = notes.find((note) => note.title == title);
	if (note) {
		console.log(chalk.green.inverse(note.title));
		console.log(note.body);
	} else {
		console.log(chalk.red.inverse("Note not found"));
	}
};

// comment
module.exports = {
	addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes,
	readNote: readNote,
};
