//  Add smooth transition on changing links
module.exports = {
  smoothScrollTo
};

  $('.nav-item').on('click', function() {
    $('.nav-item').removeClass('active');
    $(this).addClass('active');
  });

 $('a[href^="#_"]').on('click', function(event) {
   //alert('on smooth');
   var target = $( $(this).attr('href') );      
   var dist = target.offset().top - 100;

   if(target.length) {
     event.preventDefault();
     $('html, body').animate({
       scrollTop: dist
     }, 500);
   }
   // $('#menuBtn').addClass('collapse');
   $('#navbarSupportedContent').removeClass('show');
 });

 function smoothScrollTo(element, targetName){
  var target;
  switch (element) {
    case 'section':
      target = $(`section[id^="${targetName}"]`);
      break;
    case 'a':
      target = $(`a[href^="${targetName}"]`);
      break;
  
    default:
      break;
  }
   let dist = target.offset().top - 100;
   let time = (dist + 100.0) / (250.0/150.0);
  //  console.log('######### DIST >' ,dist);
  //  console.log('######### TIME >' ,time);
   if(target.length) {
     event.preventDefault();
     $('html, body').animate({
       scrollTop: dist
     }, time);
   }
 }