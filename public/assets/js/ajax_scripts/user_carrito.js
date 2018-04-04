module.exports = {
  addItemToCard,
  revomeItemFromCard,
};



let userColors = require('./user_colors.js');
let userPreview = require('./user_preview.js');
let userGlobal = require('./user_global.js');
// let swal =  require('sweetalert');


$(document).on("click", ".user-pedido-trash", function(){
  let itemToDelete = $(this);
  revomeItemFromCard(itemToDelete);
});


function addItemToCard() {
  console.log('############### item added');
  let carritoTableItems = $('#user_carrito_table_items');
  
  // dynamic value
  let pedidoId = $('.user-pedido-item').length + 1; // gets the length

  // this are objects with different values
  let pedidoModelo = $('.model-checked');
  let pedidoColor = $('.color-checked');
  let pedidoTalla = $('#user_talla option:selected');

  // this are direct values
  let pedidoCantidadPares = $('#user_prev_pares').val();
  let pedidoSubtotal = $('#user_prev_subtotal').text();
  let pedidoImg = $('#user_prev_img').attr('src');

  let previewModel = userGlobal.modelChecked;
  let previewColor = userGlobal.colorChecked;
  let modelSelected = userGlobal.catFiltered.filter(function(mod) {
    return mod.model == previewModel.cardModelId;
  })[0];
  let pedidoPrecioUnitario = modelSelected.precios[modelSelected.colors.indexOf( String(previewColor.colorId) )];

  console.log('pedidoId', pedidoId);
  console.log('pedidoModelo', pedidoModelo.data() );
  console.log('pedidoColor', pedidoColor.data() );
  console.log('pedidoTalla', pedidoTalla.data() );
  console.log('pedidoCantidadPares', pedidoCantidadPares);
  console.log('pedidoPrecioUnitario', pedidoPrecioUnitario);
  console.log('pedidoSubtotal', pedidoSubtotal);
  console.log('pedidoImg', pedidoImg);  

  let newItemTemp = `<tr class='align-items-center user-pedido-item' 
                      data-pedido-id='${pedidoId}' 
                      data-pedido-modelo-id='${pedidoModelo.data('cardModelId')}' 
                      data-pedido-color-id='${pedidoColor.data('colorId')}' 
                      data-pedido-talla-id='${pedidoTalla.val()}'
                      data-pedido-cantidad-pares='${pedidoCantidadPares}'
                      data-pedido-subtotal='${pedidoSubtotal}'
                      data-pedido-precio-unitario='${pedidoPrecioUnitario}'
                      >
                      <td class='p-0'> 
                        <div class='view mx-auto' style='width: 120px;'>
                          <img src='${pedidoImg}' class='img-fluid mx-auto' alt='Img ${pedidoModelo.data('cardModelCode')} ${pedidoColor.data('colorCode')}'>
                        </div>  
                      </td>
                      <td class='d-block'>${pedidoModelo.data('cardModelName')}</td>
                      <td>${pedidoColor.data('colorName')}</td>
                      <td>${pedidoTalla.text()}</td>
                      <td class='text-center'>${pedidoCantidadPares}</td>
                      <td class='text-center'>${pedidoSubtotal}</td>
                      <td class='text-center px-0 pt-0'> 
                        <button type='button' class='user-pedido-trash btn btn-danger waves-effect waves-light p-2 user-pedido-trash'>
                          <i class='fa fa-trash-o white-text'></i>
                        </button>
                      </td>
                    </tr>`;
  carritoTableItems.append( $(newItemTemp) );
  userPreview.hidePreview(); 
  calcTotal();
} // .addItemToCard()


function revomeItemFromCard(element) {
  // console.log('###### item canceled'); console.log('element ', element.parents('tr'));
  element.parents('tr.user-pedido-item').remove();
  orderPedidosId();
  calcTotal();
}

function orderPedidosId() {
  // map items if one is deleted to reset ID's
  let pedidos = $('.user-pedido-item');
  console.log('user pedidos', pedidos);

  // for (let i = 0; i < pedidos.length; i++) {
  //   let pedido = $(pedidos[i]);
  //   pedido.attr( 'data-pedido-id', i + 1 );
  //   // console.log('$pedido', pedido); console.log('updated userPedido', pedido.data('pedidoId'));
  // }

  pedidos.each(function(i, pedido){
    $(pedido).attr( 'data-pedido-id', i + 1 );
  });

  console.log('user pedidos edited', pedidos);
}


function calcTotal() {
  let pedidos = $('.user-pedido-item');
  let paresTotales = 0;
  let pagoTotal = 0.00;

  pedidos.each(function(i, pedido){
    paresTotales += parseInt( $(pedido).data('pedidoCantidadPares') );
    pagoTotal += parseFloat( $(pedido).data('pedidoSubtotal') );
  });
  
  updateNavbarSummary(pedidos.length);
  $('#user_carrito_pares_totales').text(paresTotales);
  $('#user_carrito_total').text(pagoTotal.toFixed(2));
}

function updateNavbarSummary(items) {
  // let pedidos = $('.user-pedido-item');
  $('#user_navbar_summary_pedidos').text(items);
}