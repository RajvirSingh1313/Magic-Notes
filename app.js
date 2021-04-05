showNotes();
// If user adds a note, add it to the localStorage

if ("serviceWorker" in navigator) {
    // register service worker
    navigator.serviceWorker.register("service-worker.js");
}

let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let isImporant = false;
    let notes = localStorage.getItem("notes");
    if (notes === null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.push([addTitle.value, addTxt.value, isImporant]);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    showNotes();
})

// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes === null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        if (element[2] === true) {
            html += `
            <div class="noteCard m-2 card bg-warning order-first" style="width: 18rem;">
            <div class="card-body">
            <div style="display:flex;margin-left: 150px;">
            <button id="bookmarkbtn-${index}" onclick="importantNote([${index},this.id])"style="margin-left:20px;border:1px solid #454545;border-radius:5px;outline:'none';">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmarks-fill" viewBox="0 0 16 16">
            <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4z"/>
            <path d="M4.268 1A2 2 0 0 1 6 0h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L13 13.768V2a1 1 0 0 0-1-1H4.268z"/>
            </svg></button>
            <button id="savebtn-${index}" onclick="editNotes(this.id)"style="margin-left:20px;border:1px solid #454545;border-radius:5px;outline:'none';"><svg height="16" viewBox="0 -1 401.52289 401" xmlns="http://www.w3.org/2000/svg"><path d="m370.589844 250.972656c-5.523438 0-10 4.476563-10 10v88.789063c-.019532 16.5625-13.4375 29.984375-30 30h-280.589844c-16.5625-.015625-29.980469-13.4375-30-30v-260.589844c.019531-16.558594 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.519531-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.59375c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.792969c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m376.628906 13.441406c-17.574218-17.574218-46.066406-17.574218-63.640625 0l-178.40625 178.40625c-1.222656 1.222656-2.105469 2.738282-2.566406 4.402344l-23.460937 84.699219c-.964844 3.472656.015624 7.191406 2.5625 9.742187 2.550781 2.546875 6.269531 3.527344 9.742187 2.566406l84.699219-23.464843c1.664062-.460938 3.179687-1.34375 4.402344-2.566407l178.402343-178.410156c17.546875-17.585937 17.546875-46.054687 0-63.640625zm-220.257812 184.90625 146.011718-146.015625 47.089844 47.089844-146.015625 146.015625zm-9.40625 18.875 37.621094 37.625-52.039063 14.417969zm227.257812-142.546875-10.605468 10.605469-47.09375-47.09375 10.609374-10.605469c9.761719-9.761719 25.589844-9.761719 35.351563 0l11.738281 11.734375c9.746094 9.773438 9.746094 25.589844 0 35.359375zm0 0"/></svg></button>
            </div>

            <h5 class="card-title" style="position:'absolute'">${element[0]}</h5>

            <p class="card-text"> ${element[1]}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-light">Delete Note</button>
            <button id="invisible-button-${index}" onclick="saveEditNote(this.id)" style="display:none;"class="btn btn-primary">Save Note</button>
            </div>
            </div>
            `
        }
        else {
            html += `
            <div class="noteCard m-2 card" style="width: 18rem;">
            <div class="card-body">
            <div style="display:flex;margin-left: 150px;">
            <button id="bookmarkbtn-${index}" onclick="importantNote([${index},this.id])"style="margin-left:20px;border:1px solid #454545;border-radius:5px;outline:'none';">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmarks" viewBox="0 0 16 16">
            <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4zm2-1a1 1 0 0 0-1 1v10.566l3.723-2.482a.5.5 0 0 1 .554 0L11 14.566V4a1 1 0 0 0-1-1H4z"/>
            <path d="M4.268 1H12a1 1 0 0 1 1 1v11.768l.223.148A.5.5 0 0 0 14 13.5V2a2 2 0 0 0-2-2H6a2 2 0 0 0-1.732 1z"/>
            </svg></button>
            <button id="savebtn-${index}" onclick="editNotes(this.id)"style="margin-left:20px;border:1px solid #454545;border-radius:5px;outline:'none';"><svg height="16" viewBox="0 -1 401.52289 401" xmlns="http://www.w3.org/2000/svg"><path d="m370.589844 250.972656c-5.523438 0-10 4.476563-10 10v88.789063c-.019532 16.5625-13.4375 29.984375-30 30h-280.589844c-16.5625-.015625-29.980469-13.4375-30-30v-260.589844c.019531-16.558594 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.519531-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.59375c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.792969c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m376.628906 13.441406c-17.574218-17.574218-46.066406-17.574218-63.640625 0l-178.40625 178.40625c-1.222656 1.222656-2.105469 2.738282-2.566406 4.402344l-23.460937 84.699219c-.964844 3.472656.015624 7.191406 2.5625 9.742187 2.550781 2.546875 6.269531 3.527344 9.742187 2.566406l84.699219-23.464843c1.664062-.460938 3.179687-1.34375 4.402344-2.566407l178.402343-178.410156c17.546875-17.585937 17.546875-46.054687 0-63.640625zm-220.257812 184.90625 146.011718-146.015625 47.089844 47.089844-146.015625 146.015625zm-9.40625 18.875 37.621094 37.625-52.039063 14.417969zm227.257812-142.546875-10.605468 10.605469-47.09375-47.09375 10.609374-10.605469c9.761719-9.761719 25.589844-9.761719 35.351563 0l11.738281 11.734375c9.746094 9.773438 9.746094 25.589844 0 35.359375zm0 0"/></svg></button>
            </div>

            <h5 class="card-title" style="position:'absolute'">${element[0]}</h5>

            <p class="card-text"> ${element[1]}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            <button id="invisible-button-${index}" onclick="saveEditNote(this.id)" style="display:none;"class="btn btn-primary">Save Note</button>
            </div>
            </div>
            `

        }
        let notesElm = document.getElementById("notes");
        if (notesObj.length !== 0) {
            notesElm.innerHTML = html;

        }
    })
}

// Function to delete a note
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes.length == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    location.reload();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function (e) {

    let inputVal = search.value.toLowerCase()

    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        if (cardTxt.includes(inputVal) || element.getElementsByTagName('h5')[0].innerText.toLocaleLowerCase().includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})

/*
Further Features:
1. Add Title ✅
2. Mark As Important ✅
3. Separate notes by user
4. Sync and host to web server
*/

// Function to bookmark for important notes
function importantNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes.length == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    if (notesObj[index[0]][2] == true) {
        document.getElementById(index[1]).innerHTML = '';
        document.getElementById(index[1]).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmarks" viewBox="0 0 16 16">
        <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4zm2-1a1 1 0 0 0-1 1v10.566l3.723-2.482a.5.5 0 0 1 .554 0L11 14.566V4a1 1 0 0 0-1-1H4z"/>
        <path d="M4.268 1H12a1 1 0 0 1 1 1v11.768l.223.148A.5.5 0 0 0 14 13.5V2a2 2 0 0 0-2-2H6a2 2 0 0 0-1.732 1z"/>
        </svg>`;
        document.getElementById(index[1]).parentElement.style.display = "none";

        notesObj[index[0]][2] = false;
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }
    else {
        document.getElementById(index[1]).innerHTML = '';
        document.getElementById(index[1]).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmarks-fill" viewBox="0 0 16 16">
        <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4z"/>
        <path d="M4.268 1A2 2 0 0 1 6 0h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L13 13.768V2a1 1 0 0 0-1-1H4.268z"/>
        </svg>`;
        document.getElementById(index[1]).parentElement.style.display = "none";

        notesObj[index[0]][2] = true;
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }
}

function editNotes(index) {
    document.getElementById(index).parentElement.parentElement.children[1].innerHTML=`<input type='text' style="width:90%; margin-top:10px;" class="form-control" value="${document.getElementById(index).parentElement.parentElement.children[1].innerText}">`;
    document.getElementById(index).parentElement.parentElement.children[2].innerHTML=`<input type='text' style="width:90%; margin-top:10px;" class="form-control" value="${document.getElementById(index).parentElement.parentElement.children[2].innerText}">`;
    document.getElementById(index).parentElement.parentElement.children[4].style.display = "initial";
}

function saveEditNote(note) {
    let title_input_id = document.getElementById(note).parentElement.children[0].children[0].id;

    let edited_title = document.getElementById(note).parentElement.children[1].children[0].value;
    let edited_note = document.getElementById(note).parentElement.children[2].children[0].value;

    let notes = localStorage.getItem("notes");
    if (notes === null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.forEach(function (element, index) {
        if (document.getElementById(index).parentElement.children[0].children[0].id === title_input_id) {
            document.getElementById(note).parentElement.children[1].innerHTML = ``;
            document.getElementById(note).parentElement.children[2].innerHTML = ``;

            element[0] = edited_title;
            element[1] = edited_note;

            document.getElementById(note).parentElement.children[1].innerText = edited_title;
            document.getElementById(note).parentElement.children[2].innerText = edited_note;

            document.getElementById(note).parentElement.children[4].style.display = "none";

        }
    })
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}