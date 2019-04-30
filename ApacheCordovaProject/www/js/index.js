

    // Get the Sidebar
    var mySidebar = document.getElementById("mySidebar");
    // Get the DIV with overlay effect
    var overlayBg = document.getElementById("myOverlay");

    // Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
    if (mySidebar.style.display === 'block') {
      mySidebar.style.display = 'none';
      overlayBg.style.display = "none";
    } else {
      mySidebar.style.display = 'block';
      overlayBg.style.display = "block";
    }
  }

// Close the sidebar with the close button
function w3_close() {
  mySidebar.style.display = "none";
  overlayBg.style.display = "none";
}


function TodoObject(todotext = "", urgency = "Low", important = "Low", isDone = false) {
    this.todotext = todotext;
    this.urgency = urgency;
    this.important = important;
    this.isDone = isDone;
    id = generateID();
    this.id = id

}

const availableTodoStorageKey = "availableTodos";

var availableTodolist = []
var doneTodoList = []

var todo1 = new TodoObject("Go to School");
var todo2 = new TodoObject("Play video games","High","High")

availableTodolist.push(todo1)
availableTodolist.push(todo2);


localStorage.setItem(availableTodoStorageKey, JSON.stringify(availableTodolist))

const availableTodosButton = document.getElementById("availableTodobtn");
const doneTodosButton = document.getElementById("doneTodobtn");
const addNewTodoButton = document.getElementById("addNewTodobtn");
var mainPageContent = document.getElementById("pageContent");




availableTodosButton.addEventListener("click", showAvailableTodoPage);
doneTodosButton.addEventListener("click", showDoneTodosPage);
addNewTodoButton.addEventListener("click", () => {
    showAddnewTodoPage()
});


function showAvailableTodoPage() {
    while (mainPageContent.firstChild) {
        mainPageContent.removeChild(mainPageContent.firstChild);
    }

    let pageTitel = document.createElement("h3");
    pageTitel.textContent = "Available Todos";
    mainPageContent.appendChild(pageTitel);

    let page = createAvailableTodosPage();
    mainPageContent.appendChild(page);
    w3_close();
}


function showDoneTodosPage() {
    while (mainPageContent.firstChild) {
        mainPageContent.removeChild(mainPageContent.firstChild);
    }

    let pageTitel = document.createElement("h3");
    pageTitel.textContent = "Done Todos";
    mainPageContent.appendChild(pageTitel);

    let page = createDoneTodosPage();
    mainPageContent.appendChild(page);

    w3_close();
}

function showAddnewTodoPage(todo = null) {
    this.todo = todo;
    while (mainPageContent.firstChild) {
        mainPageContent.removeChild(mainPageContent.firstChild);
    }

    let pageTitel = document.createElement("h3");
    pageTitel.textContent = "Add new Todo";
    mainPageContent.appendChild(pageTitel);
    let page = createAddTodoPage(this.todo)
    mainPageContent.appendChild(page);
    w3_close();
}



function createAvailableTodosPage() {
    let mainDiv = document.createElement("div")
    mainDiv.className = "w3-container";
    let ullist = document.createElement("ul")
    mainDiv.appendChild(ullist);
    ullist.className = "w3-ul w3-card-4 w3-white";

    let availableTodos = JSON.parse(localStorage.getItem(availableTodoStorageKey));

    for (i = 0; i < availableTodos.length; i++) {
        if (availableTodos[i].isDone == false) {
            let listObject = createListOfTodoObjects(availableTodos[i],true,true,false);
       //     let liObject = createListTodoObject(availableTodos[i]);
            ullist.appendChild(listObject);
        }
    }
    return mainDiv;
}

function createDoneTodosPage() {
    let mainDiv = document.createElement("div")
    mainDiv.className = "w3-container";
    let ullist = document.createElement("ul")
    mainDiv.appendChild(ullist);
    ullist.className = "w3-ul w3-card-4 w3-white";

    let availableTodos = JSON.parse(localStorage.getItem(availableTodoStorageKey));

    for (i = 0; i < availableTodos.length; i++) {
        if (availableTodos[i].isDone == true) {
            let listOfTodoObjects = createListOfTodoObjects(availableTodos[i],false,false,true);
           // let liObject = createListTodoObject2(availableTodos[i]);
            ullist.appendChild(listOfTodoObjects);
        }
    }
    return mainDiv;
}


function createListOfTodoObjects(todo = null,addEditBtn = true,
    addMarkDoneBtn = true,addDeleteBtn = true){

        let listTag = document.createElement("li");
        listTag.className = "w3-bar";
    
        if(addDeleteBtn){
            let deleteBtn = createDeleteButton();
             listTag.appendChild(deleteBtn);
             deleteBtn.addEventListener("click", () => { deleteTodo(todo) })
        }
        if(addEditBtn){
            let editBtn = crateEditButton();
            listTag.appendChild(editBtn);
            editBtn.addEventListener("click", () => {
                editTodo(todo);
            })
        }
        if(addMarkDoneBtn){
            let markDoneBtn = createMarkDoneButton();
            listTag.appendChild(markDoneBtn);
            markDoneBtn.addEventListener("click", () => { markDone(todo) })
        }
        let inforContainer = document.createElement("div")
        listTag.appendChild(inforContainer);
        inforContainer.className = "w3-bar-item";
        let todoDesc = document.createElement("span")
        inforContainer.appendChild(todoDesc);
        todoDesc.className = "w3-large";
        if (todo != null) {
            todoDesc.textContent = todo.todotext;
        }
        todoDesc.appendChild(document.createElement("br"));
        let todoUrgency = document.createElement("span")
        inforContainer.appendChild(todoUrgency);
        if (todo != null) {
            todoUrgency.textContent = "Urgency: " + todo.urgency;
        }
        todoUrgency.appendChild(document.createElement("br"))
        let todoimportancy = document.createElement("span")
        inforContainer.appendChild(todoimportancy);
        if (todo != null) {
            todoimportancy.textContent = "Important: " + todo.important;
        }
        todoimportancy.appendChild(document.createElement("br"))
        return listTag;

    }


function crateEditButton() {
    let editButton = document.createElement("span");
    editButton.className = "w3-bar-item w3-button w3-small w3-right";
    editButton.textContent = '\u2710 Edit';
    return editButton;
}

function createMarkDoneButton() {
    let markDoneButton = document.createElement("span");
    markDoneButton.className = "w3-bar-item w3-button w3-small w3-right";
    markDoneButton.textContent = '\u2714 Done';
    return markDoneButton;
}

function createDeleteButton() {
    let deleteButton = document.createElement("span");
    deleteButton.className = "w3-bar-item w3-button w3-small w3-right";
    deleteButton.textContent = '\u2716 Delete';
    return deleteButton;
}

function editTodo(todo) {
    showAddnewTodoPage(todo);
}

function markDone(todo) {
    todo.isDone = true;
    addIntoAvailableTodos(todo);
    localStorage.setItem(availableTodoStorageKey, JSON.stringify(availableTodolist));
    showAvailableTodoPage();
}

function deleteTodo(todo) {
    removeTodoFromAvailableTodos(todo);
    localStorage.setItem(availableTodoStorageKey, JSON.stringify(availableTodolist));
    showDoneTodosPage();
}


function createFirstLevelDiv() {
    let firstDiv = document.createElement("div");
    firstDiv.className = "w3-row-padding";
    firstDiv.style = "margin:0 -16px;"
    return firstDiv;
}

function createSecondLevelDiv() {
    let secondDiv = document.createElement("div");
    secondDiv.className = "w3-half";
    return secondDiv;
}


function createInputText() {
    let inputText = document.createElement("input")
    inputText.className = "w3-input w3-border";
    inputText.type = "text"
    return inputText;
}


function createLabelAndInputForTodo(todo) {
    let divTag = createFirstLevelDiv();
    let innerDivTag = createSecondLevelDiv();
    divTag.appendChild(innerDivTag);

    let labelTag = document.createElement("label")
    labelTag.textContent = "Todo"
    innerDivTag.appendChild(labelTag);

    let inputTag = createInputText();
    innerDivTag.appendChild(inputTag);
    inputTag.placeholder = "Enter Todo"
    inputTag.name = "Todo";
    inputTag.required = "required";
    if (todo != null && todo.todotext != undefined) {
        inputTag.value = todo.todotext;
    }
    return divTag;
}

function createLabelAndInputForUrgency(todo) {
    let divTag = createFirstLevelDiv();
    let innerDivTag = createSecondLevelDiv();
    divTag.appendChild(innerDivTag);

    let labelTag = document.createElement("label")
    labelTag.textContent = "Urgency: "
    innerDivTag.appendChild(labelTag);

    let selectTag = createSelectTag();
    innerDivTag.appendChild(selectTag);

    if (todo != null && todo.urgency != undefined) {
        todo.urgency == "High" ? selectTag.selectedIndex = 1 : selectTag.selectedIndex = 0;
    }
    return divTag;
}


function createLabelAndInputForImportancy(todo) {
    let divTag = createFirstLevelDiv();

    let innerDivTag = createSecondLevelDiv();
    divTag.appendChild(innerDivTag);

    let labelTag = document.createElement("label")
    labelTag.textContent = "Importancy: "
    innerDivTag.appendChild(labelTag);
    let selectTag = createSelectTag();
    innerDivTag.appendChild(selectTag);

    if (todo != null && todo.important != undefined) {
        todo.important == "High" ? selectTag.selectedIndex = 1 : selectTag.selectedIndex = 0;
    }
    return divTag;
}


/** 
 * Create a select Tag with options "Low" and "High"
 * 
*/
function createSelectTag() {
    let selectTag = document.createElement("select");

    let option1 = document.createElement("option");
    selectTag.appendChild(option1);
    option1.value = "Low"
    option1.textContent = "Low"

    let option2 = document.createElement("option");
    selectTag.appendChild(option2);
    option2.value = "High"
    option2.textContent = "High";

    return selectTag;
}



/**
 * 
 * @param {*} todo 
 * create a add new todo page,
 * if the parameter todo is given fill the imput with data from the todo object
 */
function createAddTodoPage(todo = null) {
    //this.todo = todo;
    console.log(todo)
    let mainDiv = document.createElement("div");
    mainDiv.setAttribute('class', 'w3-container w3-white w3-padding-16');
    // mainDiv.className = "w3-container w3-white w3-padding-16";
    let formcontainer = document.createElement("form");
    formcontainer.action = "";
    mainDiv.appendChild(formcontainer);
    let todoDesc = createLabelAndInputForTodo(todo);
    formcontainer.appendChild(todoDesc);
    formcontainer.appendChild(document.createElement("br"))

    let urgency = createLabelAndInputForUrgency(todo);
    formcontainer.appendChild(urgency);
    formcontainer.appendChild(document.createElement("br"))

    let importancy = createLabelAndInputForImportancy(todo);
    formcontainer.appendChild(importancy);
    formcontainer.appendChild(document.createElement("br"))

    let addButton = document.createElement("button");
    addButton.setAttribute('class', 'w3-button w3-dark-grey');
    addButton.type = "submit";
    addButton.textContent = "Save"
    formcontainer.appendChild(addButton)

    formcontainer.onsubmit = () => {
        todoText = todoDesc.children[0].children[1].value;
        temp1 = urgency.childNodes[0].children[1];
        selectedUrgency = temp1.children[temp1.selectedIndex].value;

        temp2 = importancy.childNodes[0].children[1];
        selectedImportancy = temp2.children[temp2.selectedIndex].value;


        if (todo == null) {
            todo = new TodoObject(todoText, selectedUrgency, selectedImportancy);
        } else {
            todo.todotext = todoText;
            todo.urgency = selectedUrgency;
            todo.important = selectedImportancy;
        }

        addIntoAvailableTodos(todo);
        localStorage.setItem(availableTodoStorageKey, JSON.stringify(availableTodolist));
        showAvailableTodoPage();
    }
    return mainDiv;
}


function addIntoAvailableTodos(todo) {
    let updated = addTodo(todo);
    if(!updated){
        availableTodolist.push(todo);
    }
}

function addTodo(todo){
    let updated = false;
    for(let index in availableTodolist){
        if(availableTodolist[index].id == todo.id){
            availableTodolist[index] = todo;
            updated = true;
        }
    }
    return updated;
}


function removeTodoFromAvailableTodos(todo) {
    for (i = 0; i < availableTodolist.length; i++) {
        if (availableTodolist[i].id == todo.id) {
            availableTodolist.splice(i, 1)
        }
    }
}







// The goals of this function are twofold:
// 
// * Provide a way to generate a string guaranteed to be unique when compared
//   to other strings generated by this function.
// * Make the string complex enough that it is highly unlikely to be
//   accidentally duplicated by hand (this is key if you're using `ID`
//   as a private/protected name on an object).
//
// Use:
//
//     var privateName = ID();
//     var o = { 'public': 'foo' };
//     o[privateName] = 'bar';
function generateID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

availableTodosButton.click();