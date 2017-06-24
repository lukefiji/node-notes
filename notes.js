const fs = require("fs");

const fetchNotes = () => {
  // Read notes
  try {
    // If notes file exists
    const notesString = fs.readFileSync("notes-data.json");
    return JSON.parse(notesString);
  } catch (e) {
    // If notes file doesn't exist
    return [];
  }
};

const saveNotes = notes => {
  fs.writeFileSync("notes-data.json", JSON.stringify(notes));
};

const addNote = (title, body) => {
  const notes = fetchNotes();
  const note = {
    title,
    body
  };

  // Check for duplicate notes and add if there aren't any duplicates
  const duplicateNotes = notes.filter(note => note.title === title);
  if (duplicateNotes.length === 0) {
    // If there isn't a duplicate note, write to file
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

const getAll = () => {
  return fetchNotes();
};

const getNote = title => {
  // Fetch notes
  const notes = fetchNotes();
  const filteredNotes = notes.filter(note => note.title === title);
  return filteredNotes[0];
};

const removeNote = title => {
  // Fetch notes
  const notes = fetchNotes();

  // Filter notes, removing the note with title of argument
  const filteredNotes = notes.filter(note => {
    return note.title !== title;
  });

  // Save new notes array
  saveNotes(filteredNotes);

  // Return whether or not note has been removed
  return notes.length !== filteredNotes.length;
};

const logNote = note => {
  console.log("--");
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
