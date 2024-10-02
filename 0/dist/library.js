"use strict";
// src/library.ts
Object.defineProperty(exports, "__esModule", { value: true });
class Library {
    constructor() {
        this.books = [];
        this.nextId = 1;
    }
    // Add a new book
    addBook(book) {
        const newBook = Object.assign(Object.assign({}, book), { id: this.nextId++ });
        this.books.push(newBook);
        return newBook;
    }
    // Update book details
    updateBook(id, updatedDetails) {
        const bookIndex = this.books.findIndex((book) => book.id === id);
        if (bookIndex !== -1) {
            const updatedBook = Object.assign(Object.assign({}, this.books[bookIndex]), updatedDetails);
            this.books[bookIndex] = updatedBook;
            return updatedBook;
        }
        return null; // Book not found
    }
    // Delete a book by ID
    deleteBook(id) {
        const bookIndex = this.books.findIndex((book) => book.id === id);
        if (bookIndex !== -1) {
            this.books.splice(bookIndex, 1);
            return true;
        }
        return false; // Book not found
    }
    // Search books by property
    searchBooks(key, value) {
        return this.books.filter((book) => book[key] === value);
    }
    // List all books
    listBooks() {
        return this.books;
    }
}
exports.default = Library;
