import Book from '../Book/Book.js';
import Modal from '../Modal/Modal.js';
import $ from 'jquery';
import _ from 'lodash';

let booksData = [];
let modal = {};
const url = 'http://localhost:3000/books/';

export default class BooksController {
  constructor() {
    this.render();
  }

  render() {
    $.get(url, $.proxy((data) => {
      this.booksData = data;
      for (let i=0; i < data.length; i++) {
        new Book(data[i]).render();
      }
      this.attachEvents();
    }, this));
  }

  attachEvents() {
    // Click event handler for edit and delete buttons on Book components
    $('#book-container').on('click', (e) => {
      if (e.target.value === 'delete') {
        this.deleteBook(e.target.dataset.id)
      } else if (e.target.value === 'edit') {
        modal = new Modal(this.getBookFromId(e.target.dataset.id));
        modal.render((book) => {
          this.handleModalEvents(book.id);
        });
      }
    });
    // Click event handler for the footer button
    $('#add-book-button').on('click', (e) => {
      modal = new Modal();
      modal.render((book) => {
        this.handleModalEvents(book);
      });
    });
  }

  handleModalEvents(bookId) {
    // Submit button from modal
    $('#modal-submit-button').on('click', (e) => {
      e.preventDefault();
      this.addOrUpdateBook(bookId);
    });
    // Cancel button from modal
    $('#modal-cancel-button').on('click', (e) => {
      this.closeModal();
    });
  }

  addOrUpdateBook(bookId) {
    let values = {};
    // Serializes on an object the values from the form inputs
    $.each($('#form').serializeArray(), function(i, field) {
      values[field.name] = field.value;
    });
    // TODO: Implement the possibility of adding or editing a book with an image URL
    values.image = 'src/assets/bookcover.jpg';

    if(bookId) {
      $.ajax({
        method: "PUT",
        url: url + bookId,
        data: values,
        success: (response) => {
          this.closeModal()
          // Finds the item in the array and inserts the new data
          this.booksData[_.findIndex(this.booksData, {'id': response.id})] = response;
          let $parent = $('#' + response.id);
          $parent.find('#title').html(response.title);
          $parent.find('#author').html(response.author);
        }
      })
    } else {
      $.post(url, values, (response) => {
        this.closeModal();
        this.booksData.push(response);
        new Book(response).render();
      })
    }
  }

  deleteBook(bookId) {
    $.ajax({
      url: url + '/' + bookId, //TODO: Change for string template
      type: 'DELETE',
      success: $.proxy((response) => {
        let $target = $('#' + bookId);
        $target.fadeOut(400, () => {
          $target.remove();
        });
        // Finds the item in the array and removes it
        this.booksData.splice(_.findIndex(this.booksData, {'id': parseInt(bookId)}), 1);
      }, this)
    })
  }

  closeModal() {
    modal.disableElements(false);
    let $target = $('#modal');
    $target.fadeOut(400, () => {
      $target.remove();
    });
    modal = {};
  }

  getBookFromId(bookId) {
    return _.find(this.booksData, {'id': parseInt(bookId)});
  }
}
