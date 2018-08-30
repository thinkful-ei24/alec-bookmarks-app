$(document).ready(function() {
  bookMarkList.bindEventListeners();
  bookMarkList.render();
  Api.getBooks((items) => {
    items.forEach((item) => store.addBook(item));
    bookMarkList.render();
  });
});
