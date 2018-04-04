
$('#user_place_order_email').click(function(event) {
  event.preventDefault();

  let username = $('#user_info_name').val();    // Ricardo Lara
  let useremail = $('#user_info_email').val();  // alejandro.elara@live.com

  // validate email >> if email == valid
  
  if( useremail.length < 5 && useremail.length < 5){
    swal({
      title: "Ups",
      text: 'Ingrese su correo, nombre y apellido', // res.errorMsg
      icon: "error"
    });
  } else {
    // build order
    let dt = new Date();
    let date = dt.getFullYear().toString().substr(-2);   
    date += ('0' + (dt.getMonth()+1).toString()).slice(-2); // January is 0, February is 1, and so on. + 1
    date += ('0' + dt.getDate().toString()).slice(-2);

    //'1-180222-001' = embId(get it in php) - 2018 Feb 22 - consecutivo(este ultimo se inyecta en php)
    let dataPedido = {
      numeroOrden: date,
      nombre: username,
      email: useremail,
      cantidadPares: 0,
      total: 0.0,
      detail: []
    };

    // detalExample = [
    //   {
    //     modelo: 2,
    //     talla: 1,
    //     color: 2,
    //     precioUnitario: 150,
    //     cantidad: 2
    //   },
    //   {
    //     modelo: 1,
    //     talla: 2,
    //     color: 1,
    //     precioUnitario: 100.5,
    //     cantidad: 1
    //   }
    // ];

    let pedidosItems = $('.user-pedido-item');
    for (let i = 0; i < pedidosItems.length; i++) {
      let pedidoItem = $(pedidosItems[i]).data();
      dataPedido.cantidadPares += parseInt(pedidoItem.pedidoCantidadPares);
      dataPedido.total += parseFloat(pedidoItem.pedidoPrecioUnitario) * parseInt(pedidoItem.pedidoCantidadPares);


      dataPedido.detail.push({
        modelo: pedidoItem.pedidoModeloId,
        talla: pedidoItem.pedidoTallaId ,
        color: pedidoItem.pedidoColorId ,
        precioUnitario: pedidoItem.pedidoPrecioUnitario ,
        cantidad: pedidoItem.pedidoCantidadPares,
        subtotal: pedidoItem.pedidoSubtotal
      });
      // console.log(pedidoItem);
    }
    // console.log('total $:', dataPedido.total);
    // console.log('total n:', dataPedido.cantidadPares);


    // console.log('dataPedido:', dataPedido);
    console.log('dataPedido to json:', JSON.stringify(dataPedido));
    /** 
     * elements to add in server side 
     *  - pedidoFecha
     *  - pedidoEstatus
     *  - pedidoEmbajadorId
     *  - confirmado
     */
    $('#user_place_order_email').find('i').removeClass('fa-paper-plane-o').addClass('fa-refresh fa-spin');
    // ajax call to get email
    let request = $.ajax(
      {
        type: 'GET',
        url: 'ajax/email_ajax_server.php', // for the server
        // url: 'ajax/email_ajax.php', // for local
        data: {
          action: 'placeOrder',
          dataPedido: JSON.stringify(dataPedido)
        }
      }
    );
    
    request.done(function(data) {
      message = 'success';
      let resp = $.parseJSON(data); // response
      console.log('###### resp ', resp);

      if(!resp.error){
        swal({
          title: '¡Listo!',
          text: resp.successMsg,
          icon: "success"
        }).then(() => {
          window.open(`?controller=user&action=comprobante&numOrden=${resp.numOrden}&nombre=${resp.nombre}&email=${resp.email}&numOrden=${resp.numOrden}&cantidadPares=${resp.cantidadPares}&total=${resp.total}&embPointer=${resp.embPointer}&detail=${JSON.stringify(resp.detail)}`
          , '_self');
        });

      } else {
        swal({
          title: 'Ups',
          text: resp.errorMsg,
          icon: 'error'
        });
      }
      
    });
  
    request.fail(function() {
      message = 'fail';
      // window.open('?controller=pages&action=error', '_self');
    });
  
    request.always(function() {
      console.log('ajax email status: ', message);
      $('#user_place_order_email').find('i').removeClass('fa-refresh fa-spin').addClass('fa-paper-plane-o');
      // console.log('end of email ajax call');
    });
  }


});


$('#user_comprobante_btn').click(function() {
  // let newWin =  new windoe($('#user_comprobante'));
  window.print();
  // var divToPrint=document.getElementById('user_comprobante');

  // var newWin = window.open('','Print-Window');

  // newWin.document.open();

  // newWin.document.write('<html><body onload="window.print()">'+divToPrint.innerHTML+'</body></html>');

  // newWin.document.close();

  // setTimeout(function(){newWin.close();},10);
});