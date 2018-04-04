module.exports = {
  createPreview,
  hidePreview,
  updateSubtotal,
  showPreviewMsg,
  hidePreviewMsg,
};

let userGlobal = require('./user_global.js');
let userColors = require('./user_colors.js');
let userCarrito = require('./user_carrito.js');
let userModels = require('./user_models.js');
let scroll = require('./pages_scroll.js');


$('#user_prev_addPair').click(function() {
  changePairs('add');
});

$('#user_prev_subsPair').click(function() {
  changePairs('sub');
});

$('#user_prev_btnAddCard').click(function() {
  // console.log('userCarrito in preview', userCarrito);
  userCarrito.addItemToCard();
  userModels.clearCheckedModel(); 
  userColors.clearCheckedColor();
  scroll.smoothScrollTo('section','_carrito');

  showPreviewMsg('* Seleccionar un modelo<br>* Seleccionar un color');

});


$('#user_prev_btnCancel').click(function() {
  // console.log('userColors in preview', userColors);
  swal({
    title: "¿Deseas cancelar?",
    text: "Se borraran los datos en pantalla",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      userColors.clearCheckedColor();
      hidePreview();
      showPreviewMsg('* Seleccionar un modelo<br>* Seleccionar un color');
    }
  });
});



function changePairs(op) {
  let pairs = $('#user_prev_pares');
  let pairsCuantity = parseInt(pairs.val());

  
  if(op == 'add'){
    if(pairsCuantity < 10){
      pairs.val( pairsCuantity + 1 );
    }
  } else if ( op == 'sub'){
    if( pairsCuantity > 1){
      pairs.val( pairsCuantity - 1 );
    }
  } else {
    alert('not availabe option [add, sub]');
  }
  
  updateSubtotal();
}



function updateSubtotal() {
  // console.log('price', price); console.log('pairs', pairs);
  let price = $('#user_prev_precio').text();
  price = parseFloat(price);
  let pairs = parseInt($('#user_prev_pares').val());
  $('#user_prev_subtotal').text( parseFloat(price * pairs).toFixed(2) );
}


function createPreview() {
  console.log('creating preview');
  $('#user_prev_pares').val('1'); // resets the cantidad Pares
  let previewTalla = $('#user_talla option:selected').text();
  let previewTallaId = $('#user_talla option:selected').val();
  let previewModel = userGlobal.modelChecked;
  let previewColor = userGlobal.colorChecked;
  let previewPrecio;

  let modelSelected = userGlobal.catFiltered.filter(function(mod) {
    return mod.model == previewModel.cardModelId;
  })[0];

  previewPrecio = modelSelected.precios[modelSelected.colors.indexOf( String(previewColor.colorId) )];
  
  // console.log('catFiltered', userGlobal.catFiltered);
  // console.log('modelSelected', modelSelected);
  // console.log('previewTalla', previewTalla);
  // console.log('previewModel', previewModel);
  // console.log('previewColor', previewColor);
  // console.log('precios index', modelSelected.colors.indexOf( String(previewColor.colorId) ));
  // console.log('previewPrecio', previewPrecio);
  
  // console.log('modelCode', previewModel.cardModelCode);
  // console.log('colorCode', previewColor.colorCode);
  
  $('#user_prev_img').attr('src', 'material/cat_model/' + previewModel.cardModelCode.toLowerCase() + '-' + previewColor.colorCode.toLowerCase() + '.jpg');
  $('#user_prev_model').text(previewModel.cardModelName);
  $('#user_prev_color').text(previewColor.colorName);
  $('#user_prev_talla').text(previewTalla);
  $('#user_prev_precio').text(previewPrecio);
  // $('#user_prev_').text(preview);
  updateSubtotal();

  // $('#user_prev_card').removeClass('d-none');
  renderPreview();
} // .createPreview();

function renderPreview() {
  // $('#user_prev_card').addClass('d-none');
  $('#user_prev_card').removeClass('d-none');
  $('#user_prev_btns').removeClass('d-none');
}

function hidePreview() {
  // $('#user_prev_card').addClass('d-none');
  $('#user_prev_card').addClass('d-none');
  $('#user_prev_btns').addClass('d-none');
  // userColors.clearCheckedColor();
  // userModels.resetModels(); 
}

function showPreviewMsg(msg) {
  $('#preview-container-message').find('p').removeClass('d-none');
  $('#preview-container-message').find('p').html(msg);
}

function hidePreviewMsg() {
  $('#preview-container-message').find('p').addClass('d-none');
  $('#preview-container-message').find('p').text('Message goes here');
}