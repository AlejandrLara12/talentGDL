// Google maps
/*
  function regular_map() {
    var var_location = new google.maps.LalLng(25.4397042, -100.8975521);

    var var_mapoptions = {
      center: var_location,
      zoom: 14
    };

    var var_map = new google.maps.Map(document.getElementById('#map-container'), var_mapoptions );

    var var_maker = new google.maps.Maker({
      position: var_location,
      map: var_map,
      title: "GST Autoleather"
    });
  }
  google.maps.event.addDomListener(window, 'load', regular_map);
*/

// alert('in script.js file');

// $(document).ready(function() {
//     // alert('in script.js ready');

//     /* Add smooth transition on changing links */
//     // $('a[href^="#"]').on('click', function(event) {
//     //   //alert('on smooth');
//     //   var target = $( $(this).attr('href') );      
//     //   var dist = target.offset().top - 100;

//     //   if(target.length) {
//     //     event.preventDefault();
//     //     $('html, body').animate({
//     //       scrollTop: dist
//     //     }, 500);
//     //   }
//     //   // $('#menuBtn').addClass('collapse');
//     //   $('#navbarSupportedContent').removeClass('show');
//     // });



    

//     /* pages login */
//     $.getScript("views/assets/js/ajax_scripts/pages_login.js")
//       .done(function( script, textStatus ) {
//         console.log(`required views/assets/js/ajax_scripts/pages_login.js ${textStatus}`);
//       })
//       .fail(function( jqxhr, settings, exception ) {
//         // console.log('jqxhr: '     , jqxhr );
//         // console.log('settings: '  , settings );
//         // console.log('exception: ' , settings );
//         console.log(`Error: required views/assets/js/ajax_scripts/pages_login.js jqxhr: ${jqxhr}, settings:${settings}, settings: ${settings}`);
//     });


//     /* admin addUser */
//     $.getScript("views/assets/js/ajax_scripts/admin_addUser.js")
//       .done(function( script, textStatus ) {
//         console.log(`required views/assets/js/ajax_scripts/admin_addUser.js ${textStatus}`);
//       })
//       .fail(function( jqxhr, settings, exception ) {
//         // console.log('jqxhr: '     , jqxhr );
//         // console.log('settings: '  , settings );
//         // console.log('exception: ' , settings );
//         console.log(`Error: required views/assets/js/ajax_scripts/admin_addUser.js jqxhr: ${jqxhr}, settings:${settings}, settings: ${settings}`);
//     });


// });

$(document).ready(getScripts([
  'pages_login',
  'admin_addUser',
  'admin_pedidos',
  'user_index',
  'user_addOrder',
  'user_models',
  'user_colors',
  'user_talla'
]));

function getScripts(fileNamesArr){

  fileNamesArr.forEach(fileName => {
    console.log('required from views/assets/js/ajax_scripts/');
    $.getScript(`views/assets/js/ajax_scripts/${fileName}.js`)
      .done(function( script, textStatus ) {
        console.log(`${textStatus}: ${fileName}.js`);
      })
      .fail(function( jqxhr, settings, exception ) {
        // console.log('jqxhr: '     , jqxhr );
        // console.log('settings: '  , settings );
        // console.log('exception: ' , settings );
        console.log(`Error: ${fileName}.js jqxhr: ${jqxhr}, settings:${settings}, settings: ${settings}`);
    });
  });

}