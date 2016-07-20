import $ from 'jquery';

export default class Modal {
  constructor(book) {
    this.book = book;
  }
  render(callback) {
    $.get('src/modules/Modal/Modal.html', $.proxy((data) => {
      $('section').append(data);
      this.disableElements(true);
      if (this.book) {
        this.fillData();
      }
      callback(this.book);
    }, this));
  }

  fillData() {
    $('input[name="title"]').attr('value', this.book.title);
    $('input[name="author"]').attr('value', this.book.author);
  }

  disableElements(disable) {
    $('#book-container').children().find('button').prop('disabled', disable);
    $('footer').find('button').prop('disabled', disable);
  }
}
