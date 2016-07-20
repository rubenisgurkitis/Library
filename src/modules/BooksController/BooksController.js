import Book from '../Book/Book.js'
import $ from 'jquery';

const url = 'http://localhost:3000';

export default class List {
  render() {
    let books = $.get(url + '/books', (data) => {
      for (let i=0; i < data.length; i++) {
        console.log(data);
        new Book(data[i].id, data[i].title, data[i].author, data[i].image).render();
      }
    });
  }
}
