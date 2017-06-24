const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes");

const titleOptions = {
  describe: "Title of note",
  demand: true, // Makes argument required
  alias: "t"
};

const bodyOptions = {
  describe: "Body of note",
  demand: true,
  alias: "b"
};

// Parsing app arguments
const argv = yargs
  .command("add", "Add a new note", {
    title: titleOptions,
    body: bodyOptions
  })
  .command("list", "List all notes")
  .command("read", "Read a note", {
    title: titleOptions
  })
  .command("remove", "Remove a note", {
    title: titleOptions
  })
  .help().argv; // Shows commands on --help
let command = argv._[0];

// Going through note commands
let note;
const title = argv.title;

switch (command) {
  case "add":
    note = notes.addNote(title, argv.body);
    if (note) {
      console.log("Note created");
      notes.logNote(note);
    } else {
      console.log(
        "You are adding a duplicate note. Please use a different title."
      );
    }
    break;
  case "list":
    const allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach(note => notes.logNote(note));
    break;
  case "read":
    note = notes.getNote(title);
    if (note) {
      console.log("Note found");
      notes.logNote(note);
    } else {
      console.log(`Note note found: ${title}`);
    }
    break;
  case "remove":
    const noteRemoved = notes.removeNote(title);
    var message = noteRemoved
      ? `Note was removed: ${title}`
      : `Note not found: ${title}`;
    console.log(message);
    break;
  default:
    console.log("Command not recognized");
}
