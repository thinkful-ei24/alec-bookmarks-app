const store = (function(){
  const addBook = function(book) {
    this.bookmarks.push(book);
  };

  const findById = function(id) {
    return this.bookmarks.find(item => item.id === id);
  };

  const findAndChangeExpand = function(id, val){
    let currentItem = this.bookmarks.find(item => item.id === id);
    currentItem.expanded = val;
  };

  const findAndDelete = function(id) {
    console.log('this is the id in the stores delete function: ' + id);
    this.bookmarks = this.bookmarks.filter(item => item.id !== id);
  };

  const setRatingFilter = function(filterVal) {
    this.RatingFilter = filterVal;
  };



  return {
    bookmarks: [],
    addBook,
    findById,
    findAndChangeExpand,
    findAndDelete,
    setRatingFilter,
    RatingFilter: ''
  };

}());
