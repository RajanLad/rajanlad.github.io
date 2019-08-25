window.onload = function(e){ 
  document.getElementById("source").style.transition = "all 2s"; 
  document.getElementById("destination").style.transition = "all 2s"; 
  document.getElementById("submit_it").style.transition = "all 2s"; 
  document.getElementById("destination").disabled = true; 
  document.getElementById("destination").style.width="70px";
  document.getElementById("destination").style.opacity="0.2";
}

function sourceResult(inp) {
    
        inp.addEventListener("input", function(e) {
            //xmlhttp for XMLHttpRequest
            //city for pass the value entered in a text field at that point time.
            //outerFrame for the out container for the individual element to act as list
            //individualElementDiv for the individual element from the API calls
            //i for for loop counter
            //arr to store the elements in form of array
            var  xmlhttp, city = this.value,outerFrame,individualElementDiv,i,arr;
            
            //
            xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                arr = JSON.parse(this.responseText);
                
    
                autocomplete(inp,city,outerFrame,individualElementDiv,i,arr);
                
              }
            };
            xmlhttp.open("GET", "https://api.comparatrip.eu/cities/autocomplete/?q="+city, true);
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlhttp.send();
        });
    
    
      /*execute a function when someone clicks in the document:*/
      inp.addEventListener("click", function (e) {
          //alert("dd");
          //xmlhttp for XMLHttpRequest
            //city for pass the value entered in a text field at that point time.
            //outerFrame for the out container for the individual element to act as list
            //individualElementDiv for the individual element from the API calls
            //i for for loop counter
            //arr to store the elements in form of array
            var  xmlhttp, city = this.value,outerFrame,individualElementDiv,i,arr;

            //chain transition between two textbox
            document.getElementById("destination").style.width="70px";
            document.getElementById("destination").style.opacity="0.2";
            document.getElementById("destination").disabled = false; 
            //
            xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                arr = JSON.parse(this.responseText);
                
                if (!city) { autocomplete(inp,city,outerFrame,individualElementDiv,i,arr);}
                else{
                
                }
              }
            };
            xmlhttp.open("GET", "https://api.comparatrip.eu/cities/popular/5", true);
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlhttp.send();
      });
    }
    
    function desResult(inp) {
     
        inp.addEventListener("input", function(e) {
            //xmlhttp for XMLHttpRequest
            //city for pass the value entered in a text field at that point time.
            //outerFrame for the out container for the individual element to act as list
            //individualElementDiv for the individual element from the API calls
            //i for for loop counter
            //arr to store the elements in form of array
            var  xmlhttp, city = this.value,outerFrame,individualElementDiv,i,arr;
    
            //
            xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                arr = JSON.parse(this.responseText);
                
    
                autocomplete(inp,city,outerFrame,individualElementDiv,i,arr);
                
              }
            };
            xmlhttp.open("GET", "https://api.comparatrip.eu/cities/autocomplete/?q="+city, true);
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlhttp.send();
        });
    
    
      /*execute a function when someone clicks in the document:*/
      inp.addEventListener("click", function (e) {
          //xmlhttp for XMLHttpRequest
            //city for pass the value entered in a text field at that point time.
            //outerFrame for the out container for the individual element to act as list
            //individualElementDiv for the individual element from the API calls
            //i for for loop counter
            //arr to store the elements in form of array
             var  xmlhttp, city = this.value,outerFrame,individualElementDiv,i,arr1;
    
              //chain transition between two textbox
              document.getElementById("destination").style.width="300px";
              document.getElementById("destination").style.opacity="1.0";
              document.getElementById("destination").disabled = false; 

              document.getElementById("source").style.opacity="0.2";
              document.getElementById("source").disabled = true; 

            //
            xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                arr1 = JSON.parse(this.responseText);
                
                if (!city) { autocomplete(inp,city,outerFrame,individualElementDiv,i,arr1);}
                else{
                
                }
              }
            };
            xmlhttp.open("GET", "https://api.comparatrip.eu/cities/popular/from/"+document.getElementById("sourceUniqueValue").innerHTML+"/5", true);
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlhttp.send();
      });
    }
    
    function autocomplete(inp,city,outerFrame,individualElementDiv,i,arr) {
      /*the autocomplete function takes two arguments,
      the text field element and an array of possible autocompleted values:*/
    
          /*close any already open lists of autocompleted values*/
          closeAllLists();
    
                /*create a DIV element that will contain the items (values):*/
                outerFrame = document.createElement("DIV");
                outerFrame.setAttribute("id", inp.id + "autocomplete-list");
                outerFrame.setAttribute("class", "autocomplete-items");
                /*append the DIV element as a child of the autocomplete container:*/
                inp.parentNode.appendChild(outerFrame);
                /*for each item in the array...*/
    
                for (i = 0; i < arr.length; i++) {
    
                if (arr[i].local_name.substr(0, city.length).toUpperCase() == city.toUpperCase()) {
    
                  //
                  individualElementDiv = document.createElement("DIV");
    
                  //set the value for the list from array received from AJAX request
                  individualElementDiv.innerHTML = arr[i].local_name;
    
                  /*insert a input field that will hold the current array item's value:*/
                  individualElementDiv.innerHTML += "<input type='hidden' value='" + arr[i].local_name + "'><input type='hidden' value='" + arr[i].unique_name + "'>";
                  //document.getElementsById("uniqueValue").innerHTML=arr[i].unique_name;
                    /*execute a function when someone clicks on the item value (DIV element):*/
                    individualElementDiv.addEventListener("click", function(e) {
                        /*insert the value for the autocomplete text field:*/
                        inp.value = this.getElementsByTagName("input")[0].value;
                        
                        //store the unique value for source value for the destination query
                        inp.nextElementSibling.innerHTML = this.getElementsByTagName("input")[1].value;
                        
                        
                        //enable submit
                        if(document.getElementById("destination")==inp)
                        {
                          document.getElementById("destination").style.opacity="0.2";
                          document.getElementById("destination").disabled = true; 

                          document.getElementById("submit_it").style.opacity="1";
                        }

                        /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
                        closeAllLists();
                    });
                    outerFrame.appendChild(individualElementDiv);
                }
                else{
                  //document.getElementById("demo").innerHTML += "arr[i].local_name";
                }
                }
    
    
    
      function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
          if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
          }
        }
      }
      /*execute a function when someone clicks in the document:*/
      document.addEventListener("click", function (e) {
          closeAllLists(e.target);
      });
    }
    
    function fav(inp, arr) {
      /*the autocomplete function takes two arguments,
      the text field element and an array of possible autocompleted values:*/
      var currentFocus;
      /*execute a function when someone writes in the text field:*/
      inp.addEventListener("click", function(e) {
          var a, b, i, val = this.value;
          /*close any already open lists of autocompleted values*/
          closeAllLists();
    
          currentFocus = -1;
          /*create a DIV element that will contain the items (values):*/
          a = document.createElement("DIV");
          a.setAttribute("id", this.id + "autocomplete-list");
          a.setAttribute("class", "autocomplete-items");
          /*append the DIV element as a child of the autocomplete container:*/
          this.parentNode.appendChild(a);
          /*for each item in the array...*/
          for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
     
              /*create a DIV element for each matching element:*/
              b = document.createElement("DIV");
              /*make the matching letters bold:*/
              b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
              b.innerHTML += arr[i].substr(val.length);
              /*insert a input field that will hold the current array item's value:*/
              b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
              /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
                  /*insert the value for the autocomplete text field:*/
                  inp.value = this.getElementsByTagName("input")[0].value;
                  /*close the list of autocompleted values,
                  (or any other open lists of autocompleted values:*/
                  closeAllLists();
              });
              a.appendChild(b);
            
          }
      });
    
    
    
      function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
          if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
          }
        }
      }
      /*execute a function when someone clicks in the document:*/
      document.addEventListener("click", function (e) {
          closeAllLists(e.target);
      });
    }
    