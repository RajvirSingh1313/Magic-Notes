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
    notesObj.push([addTitle.value, addTxt.value,isImporant]);
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
    console.log(notesObj.length);
    let html = "";
    notesObj.forEach(function (element, index) {
        if (element[2] === true){
            html += `
                <div class="noteCard m-2 card bg-warning order-first" style="width: 18rem;">
                        <div class="card-body">
                            <button id="bookmarkbtn-${index}" onclick="importantNote([${index},this.id])"style="margin-left:200px;border:1px solid #454545;border-radius:5px;outline:'none';position:'absolute'"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmarks-fill" viewBox="0 0 16 16">
                            <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4z"/>
                            <path d="M4.268 1A2 2 0 0 1 6 0h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L13 13.768V2a1 1 0 0 0-1-1H4.268z"/>
                          </svg></button>

                            <h5 class="card-title" style="position:'absolute'">${element[0]}</h5>

                            <p class="card-text"> ${element[1]}</p>
                            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-light">Delete Note</button>
                        </div>
                </div>
            `
        }
        else{
            html += `
                <div class="noteCard m-2 card" style="width: 18rem;">
                        <div class="card-body">
                            <button id="bookmarkbtn-${index}" onclick="importantNote([${index},this.id])"style="margin-left:200px;border:1px solid #454545;border-radius:5px;outline:'none';position:'absolute'">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmarks" viewBox="0 0 16 16">
                            <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4zm2-1a1 1 0 0 0-1 1v10.566l3.723-2.482a.5.5 0 0 1 .554 0L11 14.566V4a1 1 0 0 0-1-1H4z"/>
                            <path d="M4.268 1H12a1 1 0 0 1 1 1v11.768l.223.148A.5.5 0 0 0 14 13.5V2a2 2 0 0 0-2-2H6a2 2 0 0 0-1.732 1z"/>
                          </svg></button>

                            <h5 class="card-title" style="position:'absolute'">${element[0]}</h5>

                            <p class="card-text"> ${element[1]}</p>
                            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
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
    console.log(index, 0)
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
function importantNote(index){
    console.log(index)
    let notes = localStorage.getItem("notes");
    if (notes.length == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    console.log()
    if (notesObj[index[0]][2] == true){
        document.getElementById(index[1]).innerHTML = '';
        document.getElementById(index[1]).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmarks" viewBox="0 0 16 16">
        <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4zm2-1a1 1 0 0 0-1 1v10.566l3.723-2.482a.5.5 0 0 1 .554 0L11 14.566V4a1 1 0 0 0-1-1H4z"/>
        <path d="M4.268 1H12a1 1 0 0 1 1 1v11.768l.223.148A.5.5 0 0 0 14 13.5V2a2 2 0 0 0-2-2H6a2 2 0 0 0-1.732 1z"/>
        </svg>`;
        console.log(document.getElementById(index[1]).parentElement.style.display = "none");

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
        console.log(document.getElementById(index[1]).parentElement.style.display = "none");

        notesObj[index[0]][2] = true;
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }
}

