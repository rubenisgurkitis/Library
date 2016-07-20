import $ from 'jquery';

export default class Book {
    constructor(id, title, author, image) {
      this.id = id;
      this.title = title;
      this.author = author;
      this.image = image;
    }
    render() {
      $.get('src/modules/Book/Book.html', $.proxy(function(data) {
        $('#book-container').append(data);
        $('#newbook').attr('id', this.id);
        this.fillData();
      }, this));
    }
    fillData() {
      let $parent = $('#' + this.id);
      $parent.find('#title').append(this.title);
      $parent.find('#author').html(this.author);
      $parent.find('img').attr('src', this.image);

    }
}
