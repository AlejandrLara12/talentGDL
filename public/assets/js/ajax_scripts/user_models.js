module.exports = {
  showModelMsg,
  hideModelMsg,
  resetModels,
  clearCheckedModel,
  filterModels,
  getModels
};

let userGlobal = require('./user_global.js');
let userColors = require('./user_colors.js'); 
let userPreview = require('./user_preview.js'); 
let swal = require('sweetalert');
let scroll = require('./pages_scroll.js');

// global variables
let hm = 'hm-black-light';

  /* color option css */
  $('.model-option').on('click',function(event) {
    event.preventDefault();
    // console.log('model option has class: ', $(this).find('i').hasClass('fa-check') );

    if( !userGlobal.tallaSelected ){
      swal({
        title: "Ups",
        text: 'Primero seleccione una talla.', //res.errorMsg
        icon: "error"
      });
      return;
    }
    
    userColors.clearCheckedColor();

    if( $(this).hasClass('model-checked') ){
      $(this).find('i').removeClass('fa-check');
      $(this).removeClass('model-checked');
      $(this).removeClass(hm);

      userColors.resetColors();
    } else {
      resetModels(hm);

      $(this).find('i').addClass('fa-check');
      $(this).addClass('model-checked');
      $(this).addClass(hm);
      scroll.smoothScrollTo('section', '_colors');
    }

    let modelChecked = $('.model-checked');
    modelChecked = $(modelChecked[0]).data();
    if(modelChecked){
      userGlobal.modelChecked = modelChecked;
      userColors.renderFilteredColors(modelChecked);
      userPreview.hidePreview();
      userPreview.showPreviewMsg('* Seleccione un color');
    } else {
      // no model selected, let the user know, he needs to select one model first
      userGlobal.modelChecked = undefined;
      $('#color-container-message').find('p').text('Seleccione un modelo');
      $('#color-container-message').removeClass('d-none');
      userPreview.hidePreview();
      userPreview.showPreviewMsg('* Seleccione un modelo<br>Seleccione un color');
    }

  });

  function filterModels() {
    /* get al de .model-options elemnt in the DOM */
    let modelOptions = $('.model-option');
    let modelsAvlb = []; // models abailable
    
    /* get de array of models available for selected size in userGlobal.catFiltered // [1,2,12] */
    modelsAvlb = getModels(); 
    console.log('modelsAvlb ', modelsAvlb);
    

    /*  loop through .model-option elements get the data(cardModelId) and if it exists
        in modelsAvlb show it else hide it */
    for( let i = 0; i < modelOptions.length ; i++ ){
      let model = $(modelOptions[i]);
      let modelImgIsSet = false;
      // console.log('model', model);
      
      // console.log(`model.code init ####################  ${model.data('cardModelCode')}`);
      // console.log('userGlobal.catFiltered', userGlobal.catFiltered);
      
      // if(userGlobal.catFiltered){
        let modelDetail = userGlobal.catFiltered.filter(function(mod) {
          return mod.model == model.data('cardModelId');
        })[0];
      // }

        // if( modelDetail ){ modelDetail = modelDetail[0]; }

        if($.inArray( $(model).data('cardModelId'), modelsAvlb ) == -1){ 
          /* if cardModelId is not in modelsAvlb hide it */
          $(model).addClass('d-none'); 
        } else { 
          /* if cardModelId is in modelsAvlb show it and filter summaryColorsOpt*/
          let summaryColorsOpt = model.find('div.summary-color-option');
          $(model).removeClass('d-none');
          let modelDetail = userGlobal.catFiltered.filter( function(mod) { return mod.model == model.data('cardModelId'); })[0];
          // console.log('modelDetail', modelDetail);
          // console.log('userGlobal', userGlobal.catFiltered);
          for (let j = 0; j < summaryColorsOpt.length; j++) {
            let miniColor = $(summaryColorsOpt[j]);
            // console.log('miniColor', miniColor);
            // console.log('miniColor.id', miniColor.data('summaryColorId'));
            // console.log('modelDetail.colors', modelDetail.colors);
            // console.log('miniColor.id is in modelDetail.colors', $.inArray( miniColor.data('summaryColorId'), modelDetail.colors ));
            if( $.inArray( String(miniColor.data('summaryColorId')), modelDetail.colors ) !== -1 ){
              miniColor.removeClass('d-none');

              if(!modelImgIsSet){
                let url ='material/cat_model/';
                url += model.data('cardModelCode').toLowerCase();
                url += '-';
                url += miniColor.data('summaryColorCode').toLowerCase();
                url += '.jpg';
                // model.find('img.img-model-option').attr('src', 'material/cat_model/ldy-red.jpg');
                model.find('img.img-model-option').attr('src', url);
                modelImgIsSet = true;
              }
            } else {
              miniColor.addClass('d-none');
            }
          }
        }

    }

  }

  function hideModelCards() {
    $('#models-container-cards').addClass('d-none');
  }
  function showModelCards() {
    $('#models-container-cards').removeClass('d-none');
  }

  function showModelMsg(msg) {
    $('#models-container-message').find('p').removeClass('d-none');
    $('#models-container-message').find('p').text(msg);
  }

  function hideModelMsg() {
    $('#models-container-message').find('p').addClass('d-none');
    $('#models-container-message').find('p').text('Message goes here');
  }

  function resetModels() {
    // $('.color-option>.view>.mask>i').removeClass('fa-check');
    userGlobal.modelChecked = undefined;
    $('.model-option').find('i').removeClass('fa-check');
    $('.model-option').removeClass('model-checked');
    $('.model-option').removeClass(hm);
  }
  
  function clearCheckedModel() {
    userGlobal.modelChecked = undefined;
    $('.model-option').find('i').removeClass('fa-check');
    $('.model-option').removeClass('model-checked');
    $('.model-option').removeClass(hm);
  }

  function getModels() { 
    // returns array of the models' id available for that size
    // [1,2,3,4]
    let arrModelsId = [];
    if(userGlobal.catFiltered){
      userGlobal.catFiltered.forEach(function(modelObj) {
        arrModelsId.push( parseInt(modelObj.model) );
      });
    }
    return arrModelsId;
  }


