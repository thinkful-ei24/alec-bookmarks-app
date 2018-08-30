const bookMarkList = (function(){

  function generateItemElement(item) {
    console.log('generateItemElement is firing');
    let itemTitle = `<span class="shopping-item shopping-item__checked">${item.title}</span>`;
    let itemExpanded = '';
    if (item.expanded === true) {
      itemExpanded += `
        <div>
        <p class="description">${item.desc}</p>
        <a class="link" href="${item.url}">link</a>
        </div>
      `;
    }

    return `
      <li class="js-item-element" data-item-id="${item.id}">
      <div class="top-wrapper" style="border:1px solid red">
        ${item.title}
        <div class="shopping-item-controls">
          <div>${itemExpanded}</div>
          <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
      </div>
      </li>`;
  }


  function generateBookMarksItemsString(bookMarkList) {
    console.log('the booksmarks list is below ');
    console.log(bookMarkList);
    const items = bookMarkList.map((bookMark) => generateItemElement(bookMark));
    return items.join('');
  }

  function render() {
    // Filter item list if store prop is true by item.checked === false
    let items = store.bookmarks;
    //give each item a collapsible value
    for(let item of items){
      if(!item.expanded){
        item.expanded = false;
            console.log('this is  the expanded property: '+ item.expanded);
      }
    }
    let theRating = parseInt(store.RatingFilter);
    let ratingFiltered;
    if(store.RatingFilter.length > 0){
     ratingFiltered=store.bookmarks.filter(item => parseInt(item.rating) > theRating -1);
  } else {
     ratingFiltered=store.bookmarks;
  }
    // render the shopping list in the DOM
    console.log('`render` ran');
    const bookMarkListItemsString = generateBookMarksItemsString(ratingFiltered);
    $('.js-bookmarks-list').html(bookMarkListItemsString);
  }


  function handleNewItemSubmit() {
    $('#js-bookmarks-form').submit(function (event) {
      event.preventDefault();
      const newItemObj = {};
      newItemObj.title=$('.title-input').val();
      newItemObj.url=$('.url-input').val();
      newItemObj.desc=$('.desc-input').val();
      newItemObj.rating=$('.rating-input').val();
      // newItemObj.rating=$('.rating-input').val();
      console.log('below is the new item object:');
      console.log(newItemObj);

      Api.createBook(newItemObj, (newItem)=>{
        store.addBook(newItem);
        render();
      });
    });
  }

  function handleRatingFilterForm(){
    $('#rating-filter-form').submit(function (event) {
      event.preventDefault();
      let filter = $('.rating-filter').val();
      console.log('this is the filter we are putting in ' + filter);
      store.setRatingFilter(filter);
      console.log('this is the stores rating filter ' + filter);
      render();
    });
  }

  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }

  function handleItemExpandClicked() {
    console.log('handleItemCheckClicked is rendering');
    $(".js-bookmarks-list").on('click', '.js-item-element', event => {
      console.log("the item has been clicked");
      console.log("below is the current target");
      console.log(event.currentTarget);
      const id = getItemIdFromElement(event.currentTarget);
      const item = store.findById(id);
      const expandedVal = item.expanded;
      let toPass;
      if(expandedVal === true){
        toPass === false;
      } else {
        toPass === true;
      }

      console.log('this is the toPass ' + toPass);

      // item.checked = !item.checked;
        store.findAndChangeExpand(id, toPass);
        render();
    });
  }

  function handleDeleteItemClicked() {
    $('.js-bookmarks-list').on('click', '.js-item-delete', event => {
      const id = getItemIdFromElement(event.currentTarget);
      console.log('this is the id ' + id);
      Api.deleteBook(id, () => {
        store.findAndDelete(id);
        render();
      }, errorCallback);
    });
  }

  function errorCallback(message){
    console.log(message);
    $('#error-message-display').html(message.responseJSON.message);
  }

  function handleEditShoppingItemSubmit() {
    $('.js-shopping-list').on('submit', '.js-edit-item', event => {
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      const itemName = $(event.currentTarget).find('.shopping-item').val();
      Api.updateItem(id, {name: itemName}, () => {
        store.findAndUpdate(id, {name: itemName});
        render();
      }, errorCallback);
    });
  }

  function handleToggleFilterClick() {
    $('.js-filter-checked').click(() => {
      store.toggleCheckedFilter();
      render();
    });
  }

  function handleShoppingListSearch() {
    $('.js-shopping-list-search-entry').on('keyup', event => {
      const val = $(event.currentTarget).val();
      store.setSearchTerm(val);
      render();
    });
  }

  function bindEventListeners() {
    handleNewItemSubmit();
    handleItemExpandClicked();
    handleDeleteItemClicked();
    handleEditShoppingItemSubmit();
    handleToggleFilterClick();
    handleShoppingListSearch();
    handleRatingFilterForm();
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}());
