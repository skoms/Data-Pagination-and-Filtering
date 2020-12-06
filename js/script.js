/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
`showPage` function:
Calculates the indexes for start and end and creates those elements to show it on the page.

*/
const showPage = ( list, page ) => {
   const startIndex = ( page * 9 ) - 9; // Calculates from where to start creating the elements according to page
   const endIndex = page * 9; // Calculates where to end according to pagenumber
   const studentList = document.querySelector( 'ul.student-list' ); // Stores the ul elements we need to display the elements into a variable
   studentList.innerHTML = ''; // Clears the HTML of the UL
   // Iterates over the elements within the range and creates the elements that fit
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
`addPagination` function:
Calculates the required number of pagination buttons, using the return
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
   // initiates the first button to be active if there are at least one element
   // to be shown, as the page should only initiate at page 1 if there are items to show.
   if( list.length > 0) {
      document.querySelector( 'ul button' ).className = 'active';
   }
   /* 
   Event Listener to detect a button has been clicked.  
   */
   linkList.addEventListener( 'click', e => {
      if ( e.target.type === 'button' ) {
         const buttons = document.querySelectorAll( 'ul.link-list button' ); // Selects all the buttons
         for ( let i = 0; i < buttons.length; i++ ) {
            const button = buttons[ i ];
            button.classList.remove( 'active' ); // remove any 'active' class that might have been left over
         }
         e.target.classList.add( 'active' ); // adding the class 'active' to the new active button (the one that triggered the event).
         showPage( list, e.target.textContent ); // Calls'showPage' with the arguments list and the button textContent(which is the pagenumber)
      }
   });
}


// 'addSearchField' creates the search form and appends it to '.header' before the end . It also puts two event listeners to the form
const addSearchField = list => {
   const header = document.querySelector( '.header' );
   header.insertAdjacentHTML( 'beforeend', `
      <label for="search" class="student-search">
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label> 
   `);
   // Initiates label and input variables to access the values inside the event listeners
   const label = document.querySelector( '.student-search' );
   const input = document.getElementById( 'search' );
   // 'UpdatePage' is a function to update the page
   const updatePage = ( list ) => {
      // it checks whether there are any items to show
      if ( list.length === 0 ) {
         // if there are no matching results, it displays 'No results found.' 
         showPage( list, 1 );
         addPagination( list ); // Also making it not display any pagination buttons since there are no results
         document.querySelector( 'ul.student-list' ).innerHTML = `<p>No results found.</p>`;
      } else {
         document.querySelector( 'ul.student-list' ).innerHTML = ``;
         showPage( list, 1 );
         addPagination( list );
      }
   }
   // Adds an eventlistener for clicks on the form. 
   label.addEventListener( 'click', () => {
      // Creates a filtered version of the students array
      const filteredList = list.filter( student => {
         const fullName = `${ student.name.title } ${ student.name.first } ${ student.name.last }`.toLowerCase();
         if( fullName.includes( input.value.toLowerCase() ) ) {
            return true;
         } else {
            return false;
         }
      });

      updatePage( filteredList ); // passes in filteredList to update the page (display and pagination buttons)
   });
   // This adds an eventlistener that triggers when input is endered and refreshes as you're typing. 
   label.addEventListener('keyup', () => {
      // creates a filtered version of the students array
      const filteredList = list.filter( student => {
         const fullName = `${ student.name.title } ${ student.name.first } ${ student.name.last }`.toLowerCase();
         if( fullName.includes( input.value.toLowerCase() ) ) {
            return true;
         } else {
            return false;
         }
      });
      
      updatePage( filteredList ); // passes in filteredList to update the page (display and pagination buttons)
   });
}

// A function to initiate the first page
const initiatePage = ( list ) => {
   showPage( list, 1 );
   addPagination( list );
   addSearchField( list );
}

// Calling the functions to initiate the first page,
// as well as adding the pagination buttons
initiatePage( data );