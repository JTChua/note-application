var notes = [{
    id: new Date(),
    title: 'Sample Note',
    body: 'This is a description for our sample note',
    bgColor: 'cyan'
}]


// method to reuse, instead of calling document.createElement every time to create new element
const createElement = (tag, classes = []) => {
    const element = document.createElement(tag);
    classes.forEach((c) => {element.classList.add(c);      
    })
    return element
}


//Methods to create notes display
const createNoteView = (note) => {

    const noteDiv = createElement('div', ['note']); //div for notes, for creating notes
    noteDiv.id = note.id;

    const textDiv = createElement('div', ['text']);
    textDiv.style.backgroundColor = note.bgColor;

    const noteTitle = createElement('h2', ['title']);
    noteTitle.innerHTML = note.title;

    const noteBody = createElement('p', ['body']);
    noteBody.innerHTML = note.body;

    //Edit Button
    const editButton = createElement('button', ['edit']);
    editButton.innerHTML = 'Edit Notes';

    //Delete Button
    const deleteButton = createElement('button', ['delete']);
    deleteButton.innerHTML = 'Delete Notes';

    //Added to div container
    textDiv.append(noteTitle, noteBody);
    noteDiv.append(textDiv, editButton, deleteButton);


    editButton.onclick = () => editNote(noteDiv); //for edit button
    deleteButton.onclick = () => deleteNote(noteDiv); //for delete button

    return noteDiv
}

//Document query selector to get the div wrapper with the class of notesDiv
const notesDiv = document.querySelector('.notesDiv');

//any time the page load, create note from the array of notes available at the beginning
notes.forEach((note) => {
    const noteDiv = createNoteView(note);
    notesDiv.append(noteDiv);
})


// method for cancel edit
const cancelEdit = (noteDiv) => {
    const inputTitle = noteDiv.querySelector('h2.title');
    inputTitle.contentEditable = false;

    const inputBody = noteDiv.querySelector('p.body');
    inputBody.contentEditable = false;

    const editButton = document.querySelector('button.edit');
    editButton.innerHTML = 'Edit Notes';

    const deleteButton = document.querySelector('button.delete');
    deleteButton.innerHTML = 'Delete Notes';

    const note = notes.find((note) => note.id == noteDiv.id);
    inputTitle.innerHTML = note.title;
    inputBody.innerHTML = note.body;

    editButton.onclick = () => editNote(noteDiv);
    deleteButton.onclick = () => deleteNote(noteDiv);
}


// methods for edit notes
const editNote = (noteDiv, editSave = false) => {
    const inputTitle = document.querySelector('h2.title');
    inputTitle.contentEditable = true;
    inputTitle.focus();
    const inputBody = document.querySelector('p.body');
    inputBody.contentEditable = true;

    const editButton = document.querySelector('button.edit');
    editButton.innerHTML = 'Save Notes';

    const deleteButton = document.querySelector('button.delete');
    deleteButton.innerHTML = 'Cancel Edit';

    deleteButton.onclick = () => cancelEdit(noteDiv); //for cancellation of edit
    editButton.onclick = () => editNote(noteDiv, true); //for save edit

    if(editSave) {
        const note = notes.find((note) => note.id == noteDiv.id);

        note.title = inputTitle.innerText.trim();
        note.body = inputBody.innerText.trim();

        deleteButton.innerHTML = 'Delete Notes';
        editButton.innerHTML = 'Edit Notes';

        inputTitle.contentEditable = false;
        inputBody.contentEditable = false;

        editButton.onclick = () => editNote(noteDiv);
        deleteButton.onclick = () => deleteNote(noteDiv);
    }
}


//Methods for saving notes
const saveNotes = () => {
    const inputTitle = document.querySelector('input#title');
    const inputBody = document.querySelector('input#body');
    const inputbgColor = document.querySelector('select#color');
    const id = new Date().getTime();

    const note = {
        id: id,
        title: inputTitle.value,
        body: inputBody.value,
        bgColor: inputbgColor.value
    }

    notes.push(note);
    const noteDiv = createNoteView(note);
    notesDiv.prepend(noteDiv);
    inputTitle.value = '';
    inputBody.value = '';
    inputbgColor.value = '';
}

   

//invoke saving notes method to add button
document.querySelector('button.add').onclick = () => saveNotes(); //for add button


// methods for delete notes
const deleteNote = (noteDiv) => {
    noteDiv.remove();
    notes = notes.filter((note) => note.id != noteDiv.id);

}






