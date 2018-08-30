const Api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/alec';

  const getBooks = function(callback){
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  const createBook = function(data, onSuccess, onError){
    console.log('below is the data coming into create book');
    console.log(data);
    const newBook = JSON.stringify(data);
    console.log('this is the new book stringified ' + newBook);
    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: newBook,
      success: onSuccess,
      error: onError
    });
  };

  const updateBook = function(id, updateData, successCallback, errorCallback){
    const stringData = JSON.stringify(updateData);
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: stringData,
      success: successCallback,
      error: errorCallback
    });
  };

  const deleteBook = function(id, successCallback,errorCallback){
    const stringData = JSON.stringify({id: id});
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      data: stringData,
      success: successCallback,
      error: errorCallback
    });
  }

  return {
    getBooks,
    createBook,
    updateBook,
    deleteBook
  };
}());
