const books = [];
const RENDER_EVENT = 'render-book';

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('inputBook');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });
});

function addBook() {
    const titleBook = document.getElementById('inputBookTitle').value;
    const authorBook = document.getElementById('inputBookAuthor').value;
    const yearBook = document.getElementById('inputBookYear').value;
    const completeBook = document.getElementById('inputBookIsComplete').checked;
   
    const generatedID = generateId();
    const bookObject = generateBookObject(generatedID, titleBook, authorBook, yearBook, completeBook);
    books.push(bookObject);
   
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function generateId() {
    return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year,
        isComplete
    }
}

function makeBook(bookObject) {
    const bookTitle = document.createElement('h3');
    bookTitle.innerText = bookObject.title;
   
    const bookAuthor = document.createElement('p');
    bookAuthor.innerText = "Penulis: " + bookObject.author;

    const bookYear = document.createElement('p');
    bookYear.innerText = "Tahun: " + bookObject.year;
   
    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(bookTitle, bookAuthor, bookYear);

    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-button', 'red');
    trashButton.textContent = 'Hapus Buku';
  
    trashButton.addEventListener('click', function () {
      removeBook(bookObject.id);
    });

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('action');
    buttonContainer.append(trashButton);
   
    const container = document.createElement('article');
    container.classList.add('book_item', 'shadow');
    container.append(textContainer, buttonContainer);
    container.setAttribute('id', `book-${bookObject.id}`);
   
    if (bookObject.isComplete) {
        const unfinishButton = document.createElement('button');
        unfinishButton.classList.add('unfinish-button', 'green');
        unfinishButton.textContent = 'Belum selesai dibaca';
     
        unfinishButton.addEventListener('click', function () {
          unfinishBook(bookObject.id);
        });
     
        buttonContainer.append(unfinishButton);
    } else {
        const finishButton = document.createElement('button');
        finishButton.classList.add('finish-button', 'green');
        finishButton.textContent = 'Selesai dibaca';
        
        finishButton.addEventListener('click', function () {
          finishBook(bookObject.id);
        });
        
        buttonContainer.append(finishButton);
    }
     
    return container;
}

document.addEventListener(RENDER_EVENT, function () {
    console.log(books);
    const uncompletedBOOKList = document.getElementById('incompleteBookshelfList');
    uncompletedBOOKList.innerHTML = '';

    const completedBOOKList = document.getElementById('completeBookshelfList');
    completedBOOKList.innerHTML = '';
   
    for (const bookItem of books) {
      const bookElement = makeBook(bookItem);
      if (!bookItem.isComplete) {
        uncompletedBOOKList.append(bookElement);
      } else {
        completedBOOKList.append(bookElement);
      }
    }
});

function findBook(bookId) {
  for (const bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}

function findBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }
 
  return -1;
}

function removeBook(bookId) {
  const bookTarget = findBookIndex(bookId);
 
  if (bookTarget === -1) return;
 
  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
}
 
function finishBook (bookId) {
  const bookTarget = findBook(bookId);
 
  if (bookTarget == null) return;
 
  bookTarget.isComplete = true;

  const idx = findBookIndex(bookId);
  console.log(books[idx]);
  document.dispatchEvent(new Event(RENDER_EVENT));
}
 
function unfinishBook(bookId) {
  const bookTarget = findBook(bookId);
 
  if (bookTarget == null) return;
 
  bookTarget.isComplete = false;
  
  const idx = findBookIndex(bookId);
  console.log(books[idx]);
  document.dispatchEvent(new Event(RENDER_EVENT));
}