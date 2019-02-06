/*
  Code JavaScript du TP2 582-P51-MA
  Yves Chouinard | 16628
  Février 2019
*/

window.addEventListener('load', () => {
  $("#collection").accordion({
    header: "h2"
  });
  
  $(".chansons").accordion({
    header: "h3"
  });
});