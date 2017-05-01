$(document).ready(function () {
   alert("Ready");
   $("#food_header").click(function () {
      sortTable(0, "ItemTable");
   });
   $("#comments_header").click(function () {
      sortTable(2, "ItemTable");
   });
   $("#price_header").click(function () {
      sortTable(3, "ItemTable");
   });
});

function sortTable(n, s) {
   /*Got this function from W3Schools: https://www.w3schools.com/howto/howto_js_sort_table.asp*/
   var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
   table = document.getElementById(s);
   switching = true;
   //Set the sorting direction to ascending:
   dir = "asc";
   /*Make a loop that will continue until
   no switching has been done:*/
   while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.getElementsByTagName("TR");
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < (rows.length - 1); i++) {
         //start by saying there should be no switching:
         shouldSwitch = false;
         /*Get the two elements you want to compare,
         one from current row and one from the next:*/
         x = rows[i].getElementsByTagName("TD")[n];
         y = rows[i + 1].getElementsByTagName("TD")[n];
         /*check if the two rows should switch place,
         based on the direction, asc or desc:*/
         if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
               //if so, mark as a switch and break the loop:
               shouldSwitch = true;
               break;
            }
         } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
               //if so, mark as a switch and break the loop:
               shouldSwitch = true;
               break;
            }
         }
      }
      if (shouldSwitch) {
         /*If a switch has been marked, make the switch
         and mark that a switch has been done:*/
         rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
         switching = true;
         //Each time a switch is done, increase this count by 1:
         switchcount++;
      } else {
         /*If no switching has been done AND the direction is "asc",
         set the direction to "desc" and run the while loop again.*/
         if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
         }
      }
   }
}

function sortTable(n, s) {
   /*Got this function from W3Schools: https://www.w3schools.com/howto/howto_js_sort_table.asp*/
   var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
   table = document.getElementById(s);
   switching = true;
   //Set the sorting direction to ascending:
   dir = "asc";
   /*Make a loop that will continue until
   no switching has been done:*/
   while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.getElementsByTagName("TR");
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < (rows.length - 1); i++) {
         //start by saying there should be no switching:
         shouldSwitch = false;
         /*Get the two elements you want to compare,
         one from current row and one from the next:*/
         x = rows[i].getElementsByTagName("TD")[n];
         y = rows[i + 1].getElementsByTagName("TD")[n];
         /*check if the two rows should switch place,
         based on the direction, asc or desc:*/
         alert("local compare is: " + x.innerHTML.localeCompare(y.innerHTML()));
            if (dir == "asc") {
               if (x.innerHTML.localeCompare(y.innerHTML()) > 0) {
                  alert("of course");
                  //if so, mark as a switch and break the loop:
                  shouldSwitch = true;
                  break;
               }
            } else if (dir == "desc") {
               if (y.innerHTML.localeCompare(x.innerHTML()) < 0) {
                  //if so, mark as a switch and break the loop:
                  shouldSwitch = true;
                  break;
               }
         }
      }
      if (shouldSwitch) {
         /*If a switch has been marked, make the switch
         and mark that a switch has been done:*/
         rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
         switching = true;
         //Each time a switch is done, increase this count by 1:
         switchcount++;
      } else {
         /*If no switching has been done AND the direction is "asc",
         set the direction to "desc" and run the while loop again.*/
         if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
         }
      }
   }
}