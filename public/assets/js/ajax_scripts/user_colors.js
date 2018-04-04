module.exports = {
  renderFilteredColors,
  clearCheckedColor,
  resetColors,
  colorTest
};

let swal =  require('sweetalert');
let userGlobal = require('./user_global.js');
let userPreview = require('./user_preview.js');
let scroll = require('./pages_scroll.js');

  /* color option css */
  $('.color-option').on('click',function(event) {
    event.preventDefault();
    // $('.color-option>.view>.mask>i').removeClass('fa-check');
    clearCheckedColor();
    userGlobal.colorChecked = undefined;

    console.log('global.modelchecked ', userGlobal.modelChecked );
    if(userGlobal.modelChecked){
      $(this).find('i').addClass('fa-check');
      $(this).addClass('color-checked');
      userGlobal.colorChecked = $(this).data();
      userPreview.hidePreviewMsg();
      userPreview.createPreview();
      scroll.smoothScrollTo('section', '_user_preview');
    } else {
      swal({
        title: "Ups",
        text: 'Seleccione un modelo', //res.errorMsg
        icon: "error"
      });
    }
  });

  function clearCheckedColor() {
    // $('.color-option>.view>.mask>i').removeClass('fa-check');
    userGlobal.colorChecked = undefined;
    $('.color-option').find('i').removeClass('fa-check');
    $('.color-option').removeClass('color-checked');
  }


  function renderFilteredColors(modelChecked) { // filtered/available colors for a selected Model

    // modelChecked = $(modelChecked[0]).data();
    // console.log('model-checked.data(): ', modelChecked);
    $('#color-container-message').addClass('d-none');

    // if models exist for certain size
    if( userGlobal.catFiltered ){
      
      for( let j = 0; j < userGlobal.catFiltered.length; j++){
        // console.log(`catFiltered[${j}] ${userGlobal.catFiltered[j].model} == modelChecked.cardModelId ${modelChecked.cardModelId}` );
        if(userGlobal.catFiltered[j].model == modelChecked.cardModelId ){
          userGlobal.colorsFiltered = userGlobal.catFiltered[j].colors;
          break;
        }
        // console.log('global models loop', userGlobal.catFiltered[i]);
      }

      let colorsObj = $('.color-option');
      // console.log( 'colorsObj:', colorsObj);  
      // console.log( 'colorsFiltered:', userGlobal.colorsFiltered);
      // loop through colorsObject
      for( let i = 0; i < colorsObj.length ; i++ ){
        // console.log('colorsObj[i]', colorsObj[i]); console.log('$(color).data()', $(color).data());
        let color = colorsObj[i]; // color option
        let colorData = $(color).data() ; // colorId colorName
        // console.log( `color: ${colorData.colorId} is in ${userGlobal.colorsFiltered}: ${colorData.colorName}`);  

        if( $.inArray( String(colorData.colorId), userGlobal.colorsFiltered) > -1){
          $(color).removeClass('d-none');
        } else {
          // color option is not available for that model
          $(color).addClass('d-none');
        }

      }
      

    } else {
      // userGlobal.modelsFitered does not exist, ask user to select a size and uncheck the model
      swal({
        title: "Ups",
        text: 'Seleccione una talla', // res.errorMsg
        icon: "error"
      });
    }
    
  } //  /renderFilteredColors()

  function resetColors() {
    // description Shows all colors availabe in the DOM
    console.log('resetColors called');
    $('.color-option').removeClass('d-none');
  } //  /resetColors()

  function colorTest() {
    console.log('colorTest called');
  } //  /resetColors()

