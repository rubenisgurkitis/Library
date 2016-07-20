import Book from '../Book/Book.js';
import Modal from '../Modal/Modal.js';
import $ from 'jquery';
import _ from 'lodash';

let booksData = [];
let modal = {};
const url = 'http://localhost:3000/books/';

export default class BooksController {
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
    $('#add-book-button').on('click', (e) => {
      modal = new Modal();
      modal.render((id) => {
        this.handleModalEvents(id);
      });
    });
  }

  handleModalEvents(bookId) {
    $('#modal-submit-button').on('click', (e) => {
      e.preventDefault();
      this.addOrUpdateBook(bookId);
    });
    $('#modal-cancel-button').on('click', (e) => {
      this.closeModal();
    });
  }

  addOrUpdateBook(bookId) {
    let values = {};
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
          console.log(response)
          this.closeModal()
          //booksData[_.findIndex(booksData, {'id', response.id})] = response;
          let $parent = $('#' + response.id);
          $parent.find('#title').html(response.title);
          $parent.find('#author').html(response.author);
        }
      })
    } else {
      $.post(url, values, (response) => {
        console.log(response);
        this.closeModal();
        booksData.push(response);
        new Book(response).render();
      })
    }
  }

  deleteBook(bookId) {
    $.ajax({
      url: url + '/' + bookId, //TODO: Change for string template
      type: 'DELETE',
      success: (response) => {
        $('#' + bookId).remove();
        _.forEach(this.bookObjects, (book) => {
          if (book.id === bookId) {
            book = null;
          }
        })
      }
    })
  }

  closeModal() {
    modal.disableElements(false);
    $('#modal').remove();
    modal = {};
  }

  getBookFromId(bookId) {
    return _.find(this.booksData, {'id': parseInt(bookId)});
  }
}
