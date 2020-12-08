const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");

// customise yargs version
yargs.version("1.1.0");

// create add command
yargs.command({
	command: "add",
	describe: "Add a new note",
	builder: {
		title: {
			describe: "Note title",
			demandOption: true,
			type: "string",
		},
		body: {
			describe: "Note body",
			demandOption: true,
			type: "string",
		},
	},
	handler(argv) {
		notes.addNote(argv.title, argv.body);
	},
});

// create remove command
yargs.command({
	command: "remove",
	describe: "Removes a note",
	builder: {
		title: {
			describe: "Note title",
			demandOption: true,
			type: "string",
		},
	},
	handler(argv) {
		notes.removeNote(argv.title);
	},
});

// create list command
yargs.command({
	command: "list",
	describe: "Lists all notes",

	handler() {
		notes.listNotes();
	},
});

// create read command
yargs.command({
	command: "read",
	describe: "Reads a command",
	builder: {
		title: {
			describe: "Note title",
			demandOption: true,
			type: "string",
		},
	},
	handler(argv) {
		notes.readNote(argv.title);
	},
});

yargs.parse();
// console.log(yargs.argv);
