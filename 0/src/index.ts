// src/index.ts

import * as readlineSync from 'readline-sync';
import Library from './library';
import { Book, Genre } from './models';

const library = new Library();

function mainMenu() {
  console.log('\nBook Inventory Management System');
  console.log('1. Add Book');
  console.log('2. Update Book');
  console.log('3. Delete Book');
  console.log('4. Search Books');
  console.log('5. List All Books');
  console.log('6. Exit');

  const choice = readlineSync.question('Choose an option: ');

  switch (choice) {
    case '1':
      addBook();
      break;
    case '2':
      updateBook();
      break;
    case '3':
      deleteBook();
      break;
    case '4':
      searchBooks();
      break;
    case '5':
      listBooks();
      break;
    case '6':
      console.log('Exiting...');
      process.exit(0);
    default:
      console.log('Invalid choice. Please try again.');
  }

  mainMenu(); // Display the menu again after the operation
}

function addBook() {
  const title = readlineSync.question('Enter book title: ');
  const author = readlineSync.question('Enter author: ');
  const genreInput = readlineSync.question('Enter genre (Fiction, Non-Fiction, Science, History): ');
  const publishedYear = parseInt(readlineSync.question('Enter published year: '));
  const availableInput = readlineSync.question('Is the book available? (Y/N): ');
  const available = availableInput.toLowerCase() === 'y';

  const genre = Genre[genreInput as keyof typeof Genre];

  if (!genre) {
    console.log('Invalid genre. Please try again.');
    return;
  }

  const newBook: Book = {
    id: 0, // Will be set in the library class
    title,
    author,
    genre,
    publishedYear,
    available,
  };

  const addedBook = library.addBook(newBook);
  console.log('Book added:', addedBook);
}

function updateBook() {
  const id = parseInt(readlineSync.question('Enter book ID to update: '));
  const updatedDetails: Partial<Book> = {};

  const title = readlineSync.question('Enter new title (leave blank to keep current): ');
  const author = readlineSync.question('Enter new author (leave blank to keep current): ');
  const genreInput = readlineSync.question('Enter new genre (Fiction, Non-Fiction, Science, History, leave blank to keep current): ');
  const publishedYearInput = readlineSync.question('Enter new published year (leave blank to keep current): ');
  const availableInput = readlineSync.question('Is the book available? (Y/N, leave blank to keep current): ');

  if (title) updatedDetails.title = title;
  if (author) updatedDetails.author = author;
  if (genreInput) {
    const genre = Genre[genreInput as keyof typeof Genre];
    if (genre) updatedDetails.genre = genre;
  }
  if (publishedYearInput) updatedDetails.publishedYear = parseInt(publishedYearInput);
  if (availableInput) updatedDetails.available = availableInput.toLowerCase() === 'y';

  const updatedBook = library.updateBook(id, updatedDetails);

  if (updatedBook) {
    console.log('Book updated:', updatedBook);
  } else {
    console.log('Book not found.');
  }
}

function deleteBook() {
  const id = parseInt(readlineSync.question('Enter book ID to delete: '));
  const deleted = library.deleteBook(id);

  if (deleted) {
    console.log('Book deleted successfully.');
  } else {
    console.log('Book not found.');
  }
}

function searchBooks() {
  const searchKey = readlineSync.question('Search by property (title, author, genre): ') as keyof Book;
  const searchValue = readlineSync.question('Enter the value to search: ');

  if (searchKey === 'genre') {
    const genre = Genre[searchValue as keyof typeof Genre];
    if (genre) {
      const results = library.searchBooks('genre', genre);
      console.log('Search Results:', results);
    } else {
      console.log('Invalid genre.');
    }
  } else {
    const results = library.searchBooks(searchKey, searchValue as any);
    console.log('Search Results:', results);
  }
}

function listBooks() {
  const books = library.listBooks();
  console.log('Books in Inventory:', books);
}

mainMenu();
