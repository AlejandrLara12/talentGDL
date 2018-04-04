
$(document).ready(function() {


    /* login form */
    $('#submitLogin').click(function(event) {
      event.preventDefault();
      console.log('loginClicked');

      let user = $('#userAcc').val();
      let pass = $('#userPass').val();

      let message;

      console.log('user: ', user);
      console.log('pass: ', pass);
      let request = $.ajax(
        {
          url: 'ajax/pages_ajax.php',
          type: 'GET',
          data: {
            action: 'login',
            user: user,
            pass: pass
          }
        }
      );
      
      request.done(function(data) {
        message = 'success';
        let userInfo = $.parseJSON(data);
        console.log('my success data: ', userInfo);

        switch (userInfo.userPermiso) {
          case '1': case '2':
            window.open('?controller=admin&action=index', '_self');
            break;
          case '3':
            window.open('?controller=user&action=index', '_self');
            break;
        
          default:
            window.open('?controller=pages&action=error', '_self');
            break;
        }
        
      });

      request.fail(function() {
        message = 'fail';
        window.open('?controller=pages&action=error', '_self');
      });

      request.always(function() {
        console.log('ajax message: ', message);
      });
    });


});