<?php use Core\Session; ?>
<?php use Core\Lib\React\Vite; ?>
<?php $isDev = Vite::isDev(); ?>
<!DOCTYPE html>

<html lang="en">
  <head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title><?= $this->siteTitle() ?></title>
  <link rel="icon" href="<?= env('APP_DOMAIN', '/') ?>public/weather-sunny.svg" />

  <?php if ($isDev): ?>
  <script type="module">
    import RefreshRuntime from 'http://localhost:5173/@react-refresh'
    RefreshRuntime.injectIntoGlobalHook(window)
    window.$RefreshReg$ = () => {}
    window.$RefreshSig$ = () => (type) => type
    window.__vite_plugin_react_preamble_installed__ = true
  </script>
  <script type="module" src="http://localhost:5173/@vite/client"></script>
  <script type="module" src="<?= Vite::asset('resources/js/app.jsx') ?>"></script>
<?php else: ?>
  <?php foreach (Vite::css('resources/js/app.jsx') as $href): ?>
    <link rel="stylesheet" href="<?= $href ?>">
  <?php endforeach; ?>
  <script type="module" src="<?= Vite::asset('resources/js/app.jsx') ?>"></script>
<?php endif; ?>

  <!-- REMOVE these node_modules links; bundle them through Vite instead -->
  <!-- <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.min.css"> -->
  <!-- <link rel="stylesheet" href="/node_modules/@fortawesome/fontawesome-free/css/all.min.css"> -->
  <!-- <script src="/node_modules/jquery/dist/jquery.min.js"></script> -->
  <!-- <script src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script> -->

  <!-- If you have project CSS/JS outside Vite, either serve from /public or import via Vite -->
  <link rel="stylesheet" href="<?= env('APP_DOMAIN', '/') ?>resources/css/alerts/alertMsg.min.css?v=<?= config('config.version') ?>" />
  <script src="<?= env('APP_DOMAIN', '/') ?>resources/js/alerts/alertMsg.min.js?v=<?= config('config.version') ?>"></script>

  <?= $this->content('head'); ?>
</head>
  <body class="d-flex flex-column min-vh-100">
    <?php $this->component('main_menu') ?>
    <div class="container-fluid" style="min-height:calc(100% - 125px);">
      <?= Session::displayMessage() ?>
      <?= $this->content('body'); ?>
    </div>
  </body>
</html>