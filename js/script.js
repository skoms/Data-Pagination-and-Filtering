/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
The `showPage` function:
This function takes in 2 arguments, the list and the pagenumber of the page you want to show,
first we declare 3 functions: startIndex, to indicate where in the list we want to start getting
students using some simple calculation based on the desired number of students per page,
here its 9, endIndex, which similarily as the one above, but is for showing where we wish to end
not including list[endIndex], and studentList, that selects UL element with class 'student-list'
from the DOM. We set the innerHTML of the studentList to an empty string to clean up and 
residue from last instance. Then we loop over and create all the list items that pass the range check
in the conditional statement, and using template literals to weave in values from the object keys
in the list. Finally using '.insertAdjacentHTML' on studentList and placing the 'html'
(which is where the template literals for the students are stored) before the end.
*/
const showPage = ( list, page ) => {
   const startIndex = ( page * 9 ) - 9;
   const endIndex = page * 9;
   const studentList = document.querySelector( 'ul.student-list' );
   studentList.innerHTML = '';
   for ( let i = 0; i < list.length; i++ ) {
      if ( list.indexOf( list[ i ] ) >= startIndex && list.indexOf( list[ i ] ) < endIndex  ) {
         let html = `
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${ list[i].picture.large }" alt="Profile Picture">
               <h3>${ list[i].name.title } ${ list[i].name.first } ${ list[i].name.last }</h3>
               <span class="email">${ list[i].email }</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${ list[i].registered.date }</span>
            </div>
         </li>
         `;
         studentList.insertAdjacentHTML( 'beforeend', html );
      }
   }
}


/*
The `addPagination` function:
This function calculates the required number of pagination buttons, using the return
to loop that many times to make the required amount of buttons, and adding them within the 
loop using '.inserAdjacentHTML'.
*/
const addPagination = list => {
   const numOfPagination = Math.ceil( list.length / 9 );
   const linkList = document.querySelector( 'ul.link-list' );
   linkList.innerHTML = '';
   for ( let i = 1; i <= numOfPagination; i++ ) {
      linkList.insertAdjacentHTML( 'beforeend', `
         <li>
            <button type="button">${ i }</button>
         </li>
      `);
   }
   // Here we initiate the first button to be active if there are at least one element
   // to be shown, as the page should only initiate at page 1 if there are items to show.
   if( list.length > 0) {
      document.querySelector( 'ul button' ).className = 'active';
   }
   /* 
   Here we add an Event Listener to the UL with class name link-list to detect whether one
   of the buttons have been clicked, this is achieved by checking the event target type and 
   making sure it is a button. Then we select all the buttons, remove any 'active' class, 
   that might have been left over from the left button press, and adding the class 'active'
   to the new active button (the one that triggered the event). Finally we show the new page
   using 'showPage' with the arguments list(from the parameter) and the button textcontent,
   which is also the number of the page we want.
   */
   linkList.addEventListener( 'click', e => {
      if ( e.target.type === 'button' ) {
         const buttons = document.querySelectorAll( 'ul.link-list button' );
         for ( let i = 0; i < buttons.length; i++ ) {
            const button = buttons[ i ];
            button.classList.remove( 'active' );
         }
         e.target.classList.add( 'active' );
         showPage( list, e.target.textContent );
      }
   });
}


/* 
 The 'addSearchField' function creates the search form and appends it to 
 the header element before the end using '.inserAdjacentHTML' and the 
 argument 'beforeend'. It also puts two event listeners to the form, for more
 info look below.
*/
const addSearchField = list => {
   const header = document.querySelector( '.header' );
   header.insertAdjacentHTML( 'beforeend', `
      <label for="search" class="student-search">
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label> 
   `);
   // Initiating the label and input variables to easily access the values inside the 
   // event listeners
   const label = document.querySelector( '.student-search' );
   const input = document.getElementById( 'search' );
   /*
      'UpdatePage' is as the name suggests a function to update the page, 
      this function checks whether there are any items to show, if there are no matching
      results, it should just display 'No results found.' on the page. Also making
      it not display any pagination buttons as there aren't actually any pages of 
      results
   */
   const updatePage = ( list ) => {
      if ( list.length === 0 ) {
         showPage( list, 1 );
         addPagination( list );
         document.querySelector( 'ul.student-list' ).innerHTML = `<p>No results found.</p>`;
      } else {
         document.querySelector( 'ul.student-list' ).innerHTML = ``;
         showPage( list, 1 );
         addPagination( list );
      }
   }
   /* 
      This add an eventlistener to when someone presses the form, be that the field itself,
      or the searchbutton. Creates a filtered version of the students array using '.filter',
      and then passes in said new array into the showPage and addPagination to display
      the page correctly according to the new list.
   */
   label.addEventListener( 'click', e => {
      const filteredList = list.filter( student => {
         const fullName = `${ student.name.title } ${ student.name.first } ${ student.name.last }`.toLowerCase();
         if( fullName.includes( input.value.toLowerCase() ) ) {
            return true;
         } else {
            return false;
         }
      });

      updatePage( filteredList );
   });
   /* 
      This add an eventlistener to when someone is typing in the input search field. 
      The event listener is triggered every time a key comes up again, doing it so that
      the list refreshes as we are still typing, this has a few benefits, mainly that
      the user wont always need to write the whole name before he/she finds the person 
      they are looking for. then it creates a filtered version of the students array using '.filter',
      and then passes in said new array into the showPage and addPagination to display
      the page correctly according to the new list.
   */
   label.addEventListener('keyup', e => {
      const filteredList = list.filter( student => {
         const fullName = `${ student.name.title } ${ student.name.first } ${ student.name.last }`.toLowerCase();
         if( fullName.includes( input.value.toLowerCase() ) ) {
            return true;
         } else {
            return false;
         }
      });
      
      updatePage( filteredList );
   });
}

// A small little function just to initiate the firstpage in the correct order, instead
// of calling 3 functions, also more descriptive in what it does, compared to decypher 
// three of them
const initiatePage = ( list ) => {
   showPage( list, 1 );
   addPagination( list );
   addSearchField( list );
}

// Calling the functions to initiate the first page,
// as well as adding the pagination buttons
initiatePage( data );