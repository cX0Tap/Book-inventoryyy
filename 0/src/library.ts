// src/library.ts

import { Book, Genre } from './models';

class Library {
  private books: Book[] = [];
  private nextId: number = 1;

  // Add a new book
  addBook(book: Omit<Book, 'id'>): Book {
    const newBook = { ...book, id: this.nextId++ };
    this.books.push(newBook);
    return newBook;
  }

  // Update book details
  updateBook(id: number, updatedDetails: Partial<Book>): Book | null {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex !== -1) {
      const updatedBook = { ...this.books[bookIndex], ...updatedDetails };
      this.books[bookIndex] = updatedBook;
      return updatedBook;
    }
    return null; // Book not found
  }

  // Delete a book by ID
  deleteBook(id: number): boolean {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex !== -1) {
      this.books.splice(bookIndex, 1);
      return true;
    }
    return false; // Book not found
  }

  // Search books by property
  searchBooks<T extends keyof Book>(key: T, value: Book[T]): Book[] {
    return this.books.filter((book) => book[key] === value);
  }

  // List all books
  listBooks(): Book[] {
    return this.books;
  }
}

export default Library;
