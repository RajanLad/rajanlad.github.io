// ----------------------Pour charger des éléments d'interface utilisateur avec son apparence et sa disparition------------------------------
// animation de transition en chaîne entre deux zones de texte
window.onload = function(e){ 
  document.getElementById("source").style.transition = "all 2s"; 
  document.getElementById("destination").style.transition = "all 2s"; 
  document.getElementById("submit_it").style.transition = "all 2s"; 
  document.getElementById("destination").disabled = true; 
  document.getElementById("destination").style.width="70px";
  document.getElementById("destination").style.opacity="0.2";
}

// ------------ Pour faire des appels d'API j'ai utilisé AJAX, ici il y a deux fonctions qui font ces appels, sourceResult (element), desResult (element) --------- ----------

// ------------- Nous faisons ici des appels d'API à deux liens spéciaux
// ----------- One on event input
// ------------- https: //api.comparatrip.eu/cities/autocomplete/? q = "+ ville
// ----------- Deux événements au clic
// ------------- https: //api.comparatrip.eu/cities/popular/5
function sourceResult(inp) {
    
        inp.addEventListener("input", function(e) {
              // xmlhttp pour XMLHttpRequest
             // city for passe la valeur entrée dans un champ de texte à ce moment.
             // outerFrame pour le conteneur de sortie pour l'élément individuel d'agir en tant que liste
             // individualElementDiv pour l'élément individuel à partir des appels d'API
             // je pour compteur de boucle for
             // arr pour stocker les éléments sous forme de tableau
            var  xmlhttp, city = this.value,outerFrame,individualElementDiv,i,arr;
            
            //XMLHttpRequest is made
            xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
            // La réponse de JSON est décodée
                arr = JSON.parse(this.responseText);
                
            // et passé pour former une liste de lieux juste en dessous du champ de texte
                autocomplete(inp,city,outerFrame,individualElementDiv,i,arr);
                
              }
            };
            xmlhttp.open("GET", "https://api.comparatrip.eu/cities/autocomplete/?q="+city, true);
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlhttp.send();
        });
    
    
      // Exécuter une fonction quand quelqu'un clique dans le document: 
      inp.addEventListener("click", function (e) {
              // xmlhttp pour XMLHttpRequest
               // city for passe la valeur entrée dans un champ de texte à ce moment.
               // outerFrame pour le conteneur de sortie pour l'élément individuel d'agir en tant que liste
               // individualElementDiv pour l'élément individuel à partir des appels d'API
               // je pour compteur de boucle for
               // arr pour stocker les éléments sous forme de tableau
            var  xmlhttp, city = this.value,outerFrame,individualElementDiv,i,arr;

            //chain transition animation between two textbox
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
// Identique pour la zone de texte de destination et la zone de texte source
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
    
    
      // Exécuter une fonction quand quelqu'un clique dans le document: 
      inp.addEventListener("click", function (e) {
        // xmlhttp pour XMLHttpRequest
             // city for passe la valeur entrée dans un champ de texte à ce moment.
             // outerFrame pour le conteneur de sortie pour l'élément individuel d'agir en tant que liste
             // individualElementDiv pour l'élément individuel à partir des appels d'API
             // je pour compteur de boucle for
             // arr pour stocker les éléments sous forme de tableau
             var  xmlhttp, city = this.value,outerFrame,individualElementDiv,i,arr1;
    
        // animation de transition en chaîne entre deux zones de texte
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
      // la fonction autocomplete prend deux arguments,l'élément de champ de texte et un tableau de valeurs autocompleted possibles: * /
          
      //  ferme toutes les listes de valeurs complétées automatiquement déjà ouvertes * /
          closeAllLists();
    
          // crée un élément DIV qui contiendra les éléments (valeurs): 
                outerFrame = document.createElement("DIV");
                outerFrame.setAttribute("id", inp.id + "autocomplete-list");
                outerFrame.setAttribute("class", "autocomplete-items");
            
                // ajoute l'élément DIV en tant qu'enfant du conteneur autocomplete:
                inp.parentNode.appendChild(outerFrame);
                
                // pour chaque élément du tableau ... /
                for (i = 0; i < arr.length; i++) {
    
                if (arr[i].local_name.substr(0, city.length).toUpperCase() == city.toUpperCase()) {
    
                  //
                  individualElementDiv = document.createElement("DIV");
    
            // définit la valeur de la liste du tableau reçu de la demande AJAX
                  individualElementDiv.innerHTML = arr[i].local_name;
    
          // insère un champ de saisie contenant la valeur de l'élément de tableau actuel: * /
                  individualElementDiv.innerHTML += "<input type='hidden' value='" + arr[i].local_name + "'><input type='hidden' value='" + arr[i].unique_name + "'>";
          
                  //document.getElementById("uniqueValue").innerHTML=arr[i].unique_name; 
          // Exécuter une fonction lorsque quelqu'un clique sur la valeur de l'élément (élément DIV): * /
                    individualElementDiv.addEventListener("click", function(e) {
          // insère la valeur du champ de texte autocomplete: * /
                        inp.value = this.getElementsByTagName("input")[0].value;
                        
                        // stocke la valeur unique pour la valeur source pour la requête de destination
                        inp.nextElementSibling.innerHTML = this.getElementsByTagName("input")[1].value;
                        
                        
                        //enable submit
                        if(document.getElementById("destination")==inp)
                        {
                          document.getElementById("destination").style.opacity="0.2";
                          document.getElementById("destination").disabled = true; 

                          document.getElementById("submit_it").style.opacity="1";
                        }

                        // ferme la liste des valeurs de complétion automatique (ou toute autre liste ouverte de valeurs de complétion automatique: * /
                        closeAllLists();
                    });
                    outerFrame.appendChild(individualElementDiv);
                }
                else{
                  
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
    
    
    