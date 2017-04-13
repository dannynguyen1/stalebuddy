$(document).ready(function checkValid() {
   //alert("Document Ready!");
   var form = $("#Item_Form");
   form.validate({
      rules: {
         field: {
            required: true,
            date: true
         }
      }
   });

   $("#add_button").click(function () {
      form.valid();
      if (form.valid() === true) {
         assignForm();
      }

   });

   $("#delete_button").click(function () {
      deleteRows();
   });
});

var list_of_items = [];

function assignForm() {
   var product_element = $("#product").val();
   var expiration_element = $("#expiration").val();
   var use_by_element = $("#use_by").val();
   var price_element = $("#price").val();



   var item = {
      name: product_element,
      expiration: new Date(expiration_element),
      use_by: new Date(use_by_element),
      price: price_element
   };
   item.expiration.setDate(item.expiration.getDate() + 1);

   if (!use_by_element) {
      item.use_by = null;
   } else {
      item.use_by.setDate(item.use_by.getDate() + 1);
   }


   list_of_items.push(item);
   addToMainTable(item);
}

//Function modified from here: http://www.tutorialrepublic.com/faq/how-to-add-remove-table-rows-dynamically-using-jquery.php

function addToMainTable(item) {

   var table_holder = $("#ItemTable");

   var markup = "<tr><td>" + item.name + "</td><td>" + item.expiration.toLocaleDateString() + "</td>";

   if (item.use_by !== null) {
      markup = markup + "<td>" + item.use_by.toLocaleDateString() + "</td>";
   } else {
      markup = markup + "<td> </td>";
   }

   markup = markup + "<td>" + item.comment + "</td><td>" + item.group + "</td><td>" +
      item.price + "</td><td><input type = 'checkbox' name = 'record_delete'></td></tr>";

   table_holder.append(markup);

}

function deleteRows() {
   $("#ItemTableBody").find('input[name="record_delete"]').each(function () {
      if ($(this).is(":checked")) {
         $(this).parents("tr").remove();
      }
   });
}
