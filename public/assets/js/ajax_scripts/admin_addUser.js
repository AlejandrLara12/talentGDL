let swal = require('sweetalert');
// $(document).ready(function() {

  
    /* addNewUser form */
    $('#btnAddNewUser').click(function(event) {
      event.preventDefault();
      // console.log('addUserClicked');

      let acc     = $('#addNewUser_acc').val().toLowerCase();
      let name    = $('#addNewUser_name').val().toLowerCase().replace(/\b\w/g, function(l){ return l.toUpperCase() });
      let embId   = $('#addNewUser_embId').val();
      let pass    = $('#addNewUser_pass').val();
      let priv    = $('#addNewUser_priv').val();
      let picUrl  = $('#addNewUser_picUrl').val();
      // let picUrl  = ($('#addNewUser_picUrl').val()) ? $('#addNewUser_picUrl').val() : false ;

      let message;

      if( acc && name && (embId != 0) && pass && (priv != 0)) {

      } else {
        swal({
          title: "Ups...",
          text: "Falta llenar algunos datos",
          icon: "error",
        });
        return;
      }

      // console.log('acc: ', acc);
      // console.log('name: ', name );
      // console.log('embId: ', embId);
      // console.log('pass: ', pass);
      // console.log('priv: ', priv);
      // console.log('picUrl: ', picUrl);

      
      let request = $.ajax(
        {
          url: 'ajax/admin_ajax.php',
          type: 'GET',
          data: {
            action: 'addNewUser',
            acc: acc,
            name: name,
            embId: embId,
            pass: pass,
            priv: priv,
            picUrl: picUrl,
          }
        }
      );
      
      request.done(function(data) {
        message = 'success';
        let resp = $.parseJSON(data); // response
        $('#addNewUser_acc').val('');
        $('#addNewUser_name').val('');
        $('#addNewUser_embId').val(0);
        $('#addNewUser_pass').val('');
        $('#addNewUser_priv').val(0);
        $('#addNewUser_picUrl').val('');

        // console.log('In success > type ofresp: ',typeof resp);
        // console.log('In success > resp: ', resp);

        if( !resp.error ){
          if( resp.exists ){
            // ya existe user
            swal({
              title: "¡Lo sentimos!",
              text: resp.errorMsg,
              icon: "error",
            });
          } else {
            // succes se agrego
            swal({
              title: "¡Listo!",
              text: resp.successMsg,
              icon: "success",
            });
          }
        } else {
          // if data = success
          swal({
            title: "¡Lo sentimos!",
            text: resp.errorMsg,
            icon: "error",
          });
        }

      });

      request.fail(function() {
        message = 'fail';
        // window.open('?controller=pages&action=error', '_self');
      });

      request.always(function() {
        // console.log('ajax message: ', message);
      });

    });




    /* addNewUSer cancel */
    $('#btnAddNewUserCancel').click(function(event) {
      event.preventDefault();

      swal({
        title: "¿Deseas cancelar?",
        text: "Se borraran los datos en pantalla",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          $('#addNewUser_acc').val('');
          $('#addNewUser_name').val('');
          $('#addNewUser_embId').val(0);
          $('#addNewUser_pass').val('');
          $('#addNewUser_priv').val(0);
          $('#addNewUser_picUrl').val('');
        }
      });
    });


    /* Ajax load */
    
    $(this).ajaxStart(function () {
      // $loading.show();
      $('#addNewUser_loader').removeClass('hide');
      console.log(' --- ajax Started --- ');
    })
    $(this).ajaxStop(function () {
      $('#addNewUser_loader').addClass('hide');
      console.log(' --- ajax ended --- ');
    });


// });