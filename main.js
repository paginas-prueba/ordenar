$(function(){
    $('#sort-it ol').sortable({
      onDrop: function(item) {
        $(item).removeClass("dragged").removeAttr("style");
        $("body").removeClass("dragging");

        getInitialOrder('#sort-it li');
      }
    });
        
    getInitialOrder('#sort-it li');
  
    //bind to form submission
    $('#sort-it').submit(function(e){
      checkItems('#sort-it li', '#sort-it ol');
      e.preventDefault();
    })
    
}); // end doc ready
  
function getInitialOrder(obj){
    var num = 1;
    $(obj).each(function(){
       //set object initial order data based on order in DOM
      $(this).find('input[type="number"]').val(num).attr('data-initial-value', num); 
      num++;
    });
      $(obj).find('input[type="number"]').attr('max', $(obj).length); //give it an html5 max attr based on num of objects
}
  
function updateAllNumbers(currObj, targets){
        var delta = currObj.val() - currObj.attr('data-initial-value'), //if positive, the object went down in order. If negative, it went up.
                c = parseInt(currObj.val(), 10), //value just entered by user
                cI = parseInt(currObj.attr('data-initial-value'), 10), //original object val before change
                top = $(targets).length;
        
        //if the user enters a number too high or low, cap it
        if(c > top){
            currObj.val(top);
        }else if(c < 1){
            currObj.val(1);
        }
        
    $(targets).not($(currObj)).each(function(){ //change all the other objects
      var v = parseInt($(this).val(), 10); //value of object changed    
        
      if (v >= c && v < cI && delta < 0){ //object going up in order pushes same-numbered and in-between objects down
        $(this).val(v + 1);
      } else if (v <= c && v > cI && delta > 0){ //object going down in order pushes same-numbered and in-between objects up
        $(this).val(v - 1);
      }
    }).promise().done(function(){
      //after all the fields update based on new val, set their data element so further changes can be tracked 
      //(but ignore if no value given yet)
      $(targets).each(function(){
        if($(this).val() !== ""){
          $(this).attr('data-initial-value', $(this).val());
        }
      });
    });
}

function checkItems(things, parent){
    contErr = 0;
    $(things).each(function(){
        if ($(this).find('input').val() == 1){
            if ($(this)[0].innerHTML.split(/\n/)[0] !== "Procesión de entrada") {
                contErr++;
            }
        } else if ($(this).find('input').val() == 2){
            if ($(this)[0].innerHTML.split(/\n/)[0] !== "Acto penitencial") {
                contErr++;
            }
        } else if ($(this).find('input').val() == 3){
            if ($(this)[0].innerHTML.split(/\n/)[0] !== "Palabra de Dios") {
                contErr++;
            }
        } else if ($(this).find('input').val() == 4){
            if ($(this)[0].innerHTML.split(/\n/)[0] !== "Homilía") {
                contErr++;
            }
        } else if ($(this).find('input').val() == 5){
            if ($(this)[0].innerHTML.split(/\n/)[0] !== "Preces") {
                contErr++;
            }
        } else if ($(this).find('input').val() == 6){
            if ($(this)[0].innerHTML.split(/\n/)[0] !== "Ofertorio") {
                contErr++;
            }
        } else if ($(this).find('input').val() == 7){
            if ($(this)[0].innerHTML.split(/\n/)[0] !== "Santo") {
                contErr++;
            }
        } else if ($(this).find('input').val() == 8){
            if ($(this)[0].innerHTML.split(/\n/)[0] !== "Consagración") {
                contErr++;
            }
        } else if ($(this).find('input').val() == 9){
            if ($(this)[0].innerHTML.split(/\n/)[0] !== "Padrenuestro") {
                contErr++;
            }
        } else if ($(this).find('input').val() == 10){
            if ($(this)[0].innerHTML.split(/\n/)[0] !== "Paz") {
                contErr++;
            }
        } else if ($(this).find('input').val() == 11){
            if ($(this)[0].innerHTML.split(/\n/)[0] !== "Comunión") {
                contErr++;
            }
        } else if ($(this).find('input').val() == 12){
            if ($(this)[0].innerHTML.split(/\n/)[0] !== "Despedida") {
                contErr++;
            }
        }
    });
    
    if (contErr > 0) {
        document.getElementById("result").innerHTML = "Inténtalo otra vez<br>Has tenido " + contErr + " errores"
        document.getElementById("result").style.color = "rgb(158, 1, 1)";
    } else {
        document.getElementById("result").innerHTML = "Enhorabuena, no has tenido ningún fallo"
        document.getElementById("result").style.color = "#7CFC00";
    }
}