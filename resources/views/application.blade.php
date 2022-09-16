<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- <link rel="icon" href="<%= BASE_URL %>favicon.ico"> -->

    <title>Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template</title>
    <!-- Styles -->
    <link rel="stylesheet" href="{{ asset(mix('css/main.css')) }}">
    <link rel="stylesheet" href="{{ asset(mix('css/iconfont.css')) }}">
    <link rel="stylesheet" href="{{ asset(mix('css/material-icons/material-icons.css')) }}">
    <link rel="stylesheet" href="{{ asset(mix('css/vuesax.css')) }}">
    <link rel="stylesheet" href="{{ asset(mix('css/prism-tomorrow.css')) }}">
    <link rel="stylesheet" href="{{ asset(mix('css/app.css')) }}">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Arizonia|Lobster|Rouge+Script|Pacifico|Alex+Brush|Kaushan+Script|Sail|Sacramento|Marck+Script|Sonsie+One|Monsieur+La+Doulaise|Rock+Salt|Rochester|Rancho|Croissant+One|Yesteryear|Courgette|Sofia|Allura|Redressed|Cookie|Amita|Meie+Script|Euphoria+Script|Tangerine|Sevillana">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sora|Hahmlet|JetBrains+Mono|Andada+Pro|Epilogue|Inter|Encode+Sans|Manrope|Lora|BioRhyme|Playfair+Display|Archivo|Roboto|Cormorant|Spectral|Raleway|Work+Sans|Lato|Anton|Old+Standard+TT|Oswald|Montserrat|Poppins|Nunito|Source+Sans+Pro|Oxygen|Open+Sans">

    <!-- Favicon -->
    <link rel="shortcut icon" href="{{ asset('images/logo/favicon.png') }}">
  </head>
  <body>
    <noscript>
      <strong>We're sorry but Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app">
    </div>

    <!-- <script src="js/app.js"></script> -->
    <script src="{{ asset(mix('js/app.js')) }}"></script>

  </body>
</html>
