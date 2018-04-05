$('#btn_donar').click(function() {
  // alert('click ftw');
  console.log( $('#donation_name').val() );
  let request = $.ajax(
    {
      url: 'http://localhost:3000/payment',
      type: 'GET',
      data: {
        name: $('#donation_name').val(),
        email: $('#donation_email').val(),
        key: $('#donation_key').val()
      }
    }
  );
  
  request.done(function(data) {
    message = 'success';
    // let userInfo = $.parseJSON(data);
    console.log('my success data: ', data);
    window.open(`/status/${data.state}/${data.message}/${data.detail}`, '_self');
  });
  
  request.fail(function() {
    message = 'fail';
    // window.open('?controller=pages&action=error', '_self');
  });
  
  request.always(function() {
    console.log('ajax message: ', message);
  });
});