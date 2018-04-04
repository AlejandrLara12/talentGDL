let userGlobal = require('./user_global.js');
let userColors = require('./user_colors.js');  
let userModels = require('./user_models.js');  
let userPreview = require('./user_preview.js');
let scroll = require('./pages_scroll.js');

// $(document).ready(function() {

  /* talla option */
  $('#user_talla').change(function(event) {
    event.preventDefault();
    // if user_Talla slicer or select option changes
    // console.log('Value changed');

    // clean checked models
    $('.model-option').find('i').removeClass('fa-check');
    $('.model-option').removeClass('model-checked');
    $('.model-option').removeClass('hm-black-light');

    // clean checked color
    $('.color-option').find('i').removeClass('fa-check');
    $('.color-option').removeClass('color-checked');

    
    console.log( `talla[${$('#user_talla option:selected').text()}] value: ${$(this).val()}` );

    let talla = $('#user_talla').val();
    userGlobal.tallaSelected = talla;

    let request = $.ajax(
      {
        url: 'ajax/user_ajax.php',
        type: 'GET',
        data: {
          action: 'getAvailableShoes',
          talla: talla
        }
      }
    );
    
    request.done(function(data) {
      message = 'success';
      // console.log('userTalla.data => ', data);
      let res = $.parseJSON(data); // response
      let cat = [];
      // console.log('request.done => ', res);

      if( res.error ){
        swal({
          title: "¡Lo sentimos!",
          text: 'No se accedio al catalogo correctamente', //res.errorMsg
          icon: "error"
        });
      } else {
        /** Data structure
         * [ 
         *   { 
         *     model: 1, 
         *     colors: [1,2,3], 
         *     precios: [100,100,150] 
         *   }, 
         *   { 
         *     model: 2, 
         *     colors: [1,3,4], 
         *     precios: [100,100,100] 
         *   } 
         * ] 
         */
        
        res.result.map(function(row) {
          let modelHasBeenAdded = false;
          let modelArrIndex;
          cat.forEach((option, index) => { // option
            if( option.model == row.YSC_ModeloId ){ 
              modelArrIndex = index;
              modelHasBeenAdded = true; 
            }
          })
          if( modelHasBeenAdded ){
            cat[modelArrIndex].colors.push(row.YSC_ColorId);
            cat[modelArrIndex].precios.push(row.YSC_Precio);
          } else {
            cat.push({
              model: row.YSC_ModeloId,
              colors: [row.YSC_ColorId],
              precios: [row.YSC_Precio]
            });
          }
          modelHasBeenAdded = false;
        });
        // console.log('cat: ', cat);
      }

      // userGlobal.modelsFiltered = cat;
      if(cat.length > 0){
        userGlobal.catFiltered = cat;
        userModels.hideModelMsg();
      } else {
        userGlobal.catFiltered = [];
        userModels.showModelMsg('No se encontro ningun modelo.');
        
      }

      userModels.filterModels();
      unsetModelChecked();
      userColors.resetColors();
      userPreview.hidePreview();
      userPreview.showPreviewMsg('* Seleccione un modelo <br>* Seleccione un color');
      scroll.smoothScrollTo('section','_models')
    });

    request.fail(function() {
      message = 'fail';
      // window.open('?controller=pages&action=error', '_self');
    });

    request.always(function() {
      console.log('ajax message: ', message);
    });
    

  });

  

  function getColors(modelObj) {
    // returns array of colors' id available for that model
    // [1,2,3,4]
    return modelObj.colors;
    // let arrColorsId = [];
    // modelsObjArr.forEach(function(color) {
    //   arrColorsId.push( parseInt(modelAvlb.color) );
    // });
    // return arrColorsId;
  }

  function unsetModelChecked() {
    userGlobal.modelChecked = undefined;
  }



  // With JQuery
  // $('#user_tallaSlider').slider({
  //   formatter: function(value) {
  //     return 'Talla: ' + (value+10);
  //   }
  // });

  // Without JQuery
  // var slider = new Slider('#user_tallaSlider', {
  //   formatter: function(value) {
  //     return 'Current value: ' + value;
  //   }
  // });

// }); // /document