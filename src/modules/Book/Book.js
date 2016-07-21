import $ from 'jquery';

export default class Book {
    constructor(book) {
      this.id = book.id;
      this.title = book.title;
      this.author = book.author;
      this.image = book.image;
    }

    render() {
      $.get('src/modules/Book/Book.html', $.proxy((data) => {
        $('#book-container').append(data);
        let $target = $('#newbook');
        $target.fadeIn(400);
        $target.attr('id', this.id);
        this.fillData();
      }, this));
    }

    fillData() {
      let $parent = $('#' + this.id);
      $parent.find('#title').html(this.title ? this.title : 'Title');
      $parent.find('#author').html(this.author ? this.author : 'Author');
      $parent.find('img').attr('src', this.image);
      $parent.find('button[value="edit"]').attr('data-id', this.id);
      $parent.find('button[value="delete"]').attr('data-id', this.id);
    }
}
