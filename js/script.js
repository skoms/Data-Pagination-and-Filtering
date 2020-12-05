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
   // Here we initiate the first button to be active, as the page initiates at page 1
   document.querySelector( 'button' ).className = 'active';

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
            const button = buttons[i];
            button.classList.remove( 'active' );
         }
         e.target.classList.add( 'active' );
         showPage( list, e.target.textContent );
      }
   });
}


// Calling the functions to initiate the first page,
// as well as adding the pagination buttons
showPage( data, 1 );
addPagination( data );