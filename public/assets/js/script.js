$(document).ready(getScripts([
  'donaciones'
]));

function getScripts(fileNamesArr){

  fileNamesArr.forEach(fileName => {
    console.log('required from /assets/js/ajax_scripts/');
    $.getScript(`/assets/js/ajax_scripts/${fileName}.js`)
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