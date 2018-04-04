    
$(document).ready(function() {
  
  let touchtime = 0;

  /* addNewUser form */
  $('.order-row').click(function(event) {
    event.preventDefault();
    // console.log('email data: ', $(this).data('email')) ;
    console.log('select options: ', $('#pedido_detalle_estatus > option') );
    $('#pedido_detalle_estatus > option').each(function(opt){
      // opt.attr('disabled');
      console.log('option: ', opt );
      
    })
    if (touchtime == 0) {
      // set first click
      touchtime = new Date().getTime();
    } else {
      // compare first click to this click and see if they occurred within double click threshold
      if (((new Date().getTime()) - touchtime) < 500) {
        console.log('order.data: ', $(this).data()) ;
        let order = $(this).data();
        $('#pedido_detalle_nombre')   .text(order.nombre);
        $('#pedido_detalle_email')    .text(order.email);
        $('#pedido_detalle_numOrden') .text(order.numOrden);
        $('#pedido_detalle_fecha')    .text(order.fecha);
        $('#pedido_detalle_estatus')  .val(order.estatus);
        $('#pedido_detalle_title')    .text( order.numOrden + ' - ' + order.nombre);


        $('#pedido_detalle_estatus > option').each(function(){
          if( $(this).val() < order.estatus ){
            $(this).attr('disabled', 'disabled');
            console.log('option: ', this);
          }
        });
    
        $('#modal-order-detail').modal('show');
        touchtime = 0;
        } else {
            // not a double click so set as a new first click
            touchtime = new Date().getTime();
        }
    }
    
  });

  $('#testBtn').click(function() {
    console.log('clicked for the win');
    console.log('val: ', $('#pedido_detalle_test').text());

    $('#pedido_detalle_test').text('win');
  });


  /* Ajax load */
  
  $(this).ajaxStart(function () {
    // $loading.show();
    $('#addNewUser_loader').removeClass('hide');
    // console.log(' --- ajax Started --- ');
  })
  $(this).ajaxStop(function () {
    $('#addNewUser_loader').addClass('hide');
    // console.log(' --- ajax ended --- ');
  });


});