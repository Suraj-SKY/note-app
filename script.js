const btnElement = document.getElementById('btn');
const appElement = document.getElementById('app');

// get all notes and show them
getNote().forEach((note) => {
    const noteElement = createNoteElement(note.id, note.content)

    // add note when page reload
    appElement.insertBefore(noteElement, btnElement);
})

// create new note element 
function createNoteElement(id, content) {
    const element = document.createElement('textarea');
    element.classList.add('note');
    element.placeholder = 'Empty Note';
    element.value = content;

    // delete on double click
    element.addEventListener('dblclick', () => {
        const warning = confirm('Are you sure you want to delete this note?');
        if (warning) {
            // element.remove();
            deleteNote(id, element);
        }
    });

    // if any change happen
    element.addEventListener('input', () => {
        updateNote(id, element.value);
    });

    // return the created element
    return element;
}

// delete note
function deleteNote(id, element) {
    const notes = getNote().filter((note)=>note.id != id);
    // only don't include the selected note as it is going to be deleted

    saveNote(notes); // saving the updated note to localstorage

    // also deleting in DOM
    appElement.removeChild(element);
}

// update note
function updateNote(id, content) {
    const notes = getNote();

    // target only that element which selected
    const target = notes.filter((note) => note.id === id)[0];

    target.content = content; // second "content" is of note

    saveNote(notes); // saving the updated note to localstorage
}


function addNote() {
    const notes = getNote();

    // create new note element from here
    const noteObj = {
        id: Math.floor(Math.random() * 1000000),
        // 'id' randomly generated so that no mismtach occur
        // that's why we take such a big number
        content: ""
    }

    const noteElement = createNoteElement(noteObj.id, noteObj.content);

    appElement.insertBefore(noteElement, btnElement);
    // first parameter is the element to be inserted
    // second parameter is the element before which the new element will be inserted

    notes.push(noteObj);
    // add note to local storage
    saveNote(notes);
}

function saveNote(note) {
    localStorage.setItem('notes-app', JSON.stringify(note));
    // stringify is used b/c browser don't allow array in localstorage
}

// get all notes before setting to local storage
function getNote() {
    return JSON.parse(localStorage.getItem("notes-app") || "[]");
    // get note if present else get empty array
}

btnElement.addEventListener('click', addNote);