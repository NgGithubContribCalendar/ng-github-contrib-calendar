importScripts("workbox-sw.prod.v2.1.2.js");const fileManifest=[{url:"demo.1994ea79a6e18f849a7d828b5fd3b7be.css",revision:"58dba19e8b7f10b8bf50a03a8d6bae3c"},{url:"demo.b629acae0acb86589597.js",revision:"b095df7da3103567398fa508cffac960"},{url:"documentation/1.0/components/Chevron.html",revision:"6f4bd0e078c50e465cd24e81318e4839"},{url:"documentation/1.0/components/DayDetails.html",revision:"9d5046551209886e59830c6886101abb"},{url:"documentation/1.0/components/GhContribCalendarComponent.html",revision:"3ca6418dcb238243f8947d40b156c188"},{url:"documentation/1.0/components/LoadingBar.html",revision:"fe702c8c68b5f27d379ae24e38f0202c"},{url:"documentation/1.0/coverage.html",revision:"bea3928c08cffc033c7b0fa20eba5173"},{url:"documentation/1.0/fonts/fontawesome-webfont.eot",revision:"25a32416abee198dd821b0b17a198a8f"},{url:"documentation/1.0/fonts/fontawesome-webfont.svg",revision:"eea752168a5508c0fc11d5f494826d30"},{url:"documentation/1.0/fonts/fontawesome-webfont.ttf",revision:"1dc35d25e61d819a9c357074014867ab"},{url:"documentation/1.0/fonts/fontawesome-webfont.woff",revision:"c8ddf1e5e5bf3682bc7bebf30f394148"},{url:"documentation/1.0/fonts/fontawesome-webfont.woff2",revision:"e6cf7c6ec7c2d6f670ae9d762604cb0b"},{url:"documentation/1.0/fonts/FontAwesome.otf",revision:"5dc41d8fe329a22fa1ee9225571c843e"},{url:"documentation/1.0/fonts/roboto-v15-latin-300.eot",revision:"c3547b2ec6f5eb324b44d8a0c6b2dd31"},{url:"documentation/1.0/fonts/roboto-v15-latin-300.svg",revision:"8c34a31d15aa18d1a3929a23f28aa276"},{url:"documentation/1.0/fonts/roboto-v15-latin-300.ttf",revision:"634f53eb79efa455a9e9d85d608b3447"},{url:"documentation/1.0/fonts/roboto-v15-latin-300.woff",revision:"ecce92d0b0ff17197f29e7db6397bf0a"},{url:"documentation/1.0/fonts/roboto-v15-latin-300.woff2",revision:"16ddb1541046ada9b90cacf4adec839a"},{url:"documentation/1.0/fonts/roboto-v15-latin-700.eot",revision:"128879da78c6c8eb4e2c07fa3732cea7"},{url:"documentation/1.0/fonts/roboto-v15-latin-700.svg",revision:"6d232a2a5da5e2f86fcf923000430d39"},{url:"documentation/1.0/fonts/roboto-v15-latin-700.ttf",revision:"ad97d029a11d8b39692037e753d23d1f"},{url:"documentation/1.0/fonts/roboto-v15-latin-700.woff",revision:"525d5b452809b3172a2a34e26d9db546"},{url:"documentation/1.0/fonts/roboto-v15-latin-700.woff2",revision:"0d7e71f2b5cc1ddab837f72e1fe52f3f"},{url:"documentation/1.0/fonts/roboto-v15-latin-regular.eot",revision:"9f916e330c478bbfa2a0dd6614042046"},{url:"documentation/1.0/fonts/roboto-v15-latin-regular.svg",revision:"4cba0aa487900af6171db189cca480b7"},{url:"documentation/1.0/fonts/roboto-v15-latin-regular.ttf",revision:"38861cba61c66739c1452c3a71e39852"},{url:"documentation/1.0/fonts/roboto-v15-latin-regular.woff",revision:"16e1d930cf13fb7a956372044b6d02d0"},{url:"documentation/1.0/fonts/roboto-v15-latin-regular.woff2",revision:"7e367be02cd17a96d513ab74846bafb3"},{url:"documentation/1.0/graph/dependencies.svg",revision:"fdea46418c6752df806a1f2107ca746b"},{url:"documentation/1.0/images/compodoc-vectorise-inverted.svg",revision:"18383d1aada70a782c9f63f7da384163"},{url:"documentation/1.0/images/compodoc-vectorise.svg",revision:"9b216d832b703ab1b3b74cfc22c1443c"},{url:"documentation/1.0/images/coverage-badge.svg",revision:"2f5dead7d27753cf3e73e1ddb48bde8c"},{url:"documentation/1.0/images/favicon.ico",revision:"d23a3a64b77c77b9df791fe043a825d0"},{url:"documentation/1.0/index.html",revision:"19b116ad1cab308949c7507af2a69d0a"},{url:"documentation/1.0/injectables/CalendarFetcher.html",revision:"b2c07db8f473e2513c77501b4ce2daa6"},{url:"documentation/1.0/injectables/Translator.html",revision:"04a1b385129d14a7a9a870bc43f9fa94"},{url:"documentation/1.0/interfaces/DynamicTranslation.html",revision:"16fcd53a840a167b1709bc0b599fa200"},{url:"documentation/1.0/interfaces/FormattedPayload.html",revision:"05d898d863c3bde56d6f3c9bbf60044f"},{url:"documentation/1.0/interfaces/FormattedRect.html",revision:"c4ee23f68ad01931e2cecef3be7bbb20"},{url:"documentation/1.0/interfaces/ProxyURLFormatterFunction.html",revision:"edbd1a82098769d5738f23d1caafe8dc"},{url:"documentation/1.0/interfaces/Translations.html",revision:"0f09c623b18914bc84298016149bdc9a"},{url:"documentation/1.0/interfaces/TranslationSpec.html",revision:"77226889bcc25ca3a85cf5a168f4452f"},{url:"documentation/1.0/js/compodoc.js",revision:"e68075016adca040e276e057607f5ffb"},{url:"documentation/1.0/js/libs/bootstrap-native.js",revision:"7174587d4933484912b434e513f6964d"},{url:"documentation/1.0/js/libs/d3.v3.min.js",revision:"6091eeaf1ec48caf8e4382d27dd01e65"},{url:"documentation/1.0/js/libs/deep-iterator.js",revision:"4d3a557fe0c7680061028155651d4820"},{url:"documentation/1.0/js/libs/es6-shim.min.js",revision:"7e7dbebe7869afe7cb2a77575e4aa158"},{url:"documentation/1.0/js/libs/EventDispatcher.js",revision:"fd508347fb52cde6c9a7cb7780f1f86e"},{url:"documentation/1.0/js/libs/htmlparser.js",revision:"840f44238842f6d28cfb65343a5bc67d"},{url:"documentation/1.0/js/libs/innersvg.js",revision:"ee495cbea7465ba0cc1167857938a67f"},{url:"documentation/1.0/js/libs/prism.js",revision:"49c4a2d8b6302352b240183ef4f92df9"},{url:"documentation/1.0/js/libs/promise.min.js",revision:"4143e3103edfe93aee208a7351743fc9"},{url:"documentation/1.0/js/libs/svg-pan-zoom.min.js",revision:"dd5d110652fd91521ed7a0a2202461b0"},{url:"documentation/1.0/js/libs/tablesort.min.js",revision:"3c6595ad306d2bd135d1b43deaa0860f"},{url:"documentation/1.0/js/libs/tablesort.number.min.js",revision:"2f9d62e76674bfe2044b13089cb6a83a"},{url:"documentation/1.0/js/libs/vis.min.js",revision:"228eccb038454056a2540bdb8bc21a68"},{url:"documentation/1.0/js/libs/zepto.min.js",revision:"3c12ab22bff9e663f497b13547db96f9"},{url:"documentation/1.0/js/menu.js",revision:"137ecabe7f08c0c2aad2949972bdecd3"},{url:"documentation/1.0/js/routes.js",revision:"0c1c4146ec7111f79a99000a61501306"},{url:"documentation/1.0/js/search/lunr.min.js",revision:"0ff7af864cb5bb5f2a77686c16ba5cb0"},{url:"documentation/1.0/js/search/search_index.js",revision:"c10b94a832180d8ba0a5013bf4332845"},{url:"documentation/1.0/js/search/search-lunr.js",revision:"c84070d96fc0352ef35aa7c9865c9656"},{url:"documentation/1.0/js/search/search.js",revision:"1c92bf691b13ddc7c1c2ea6de0a0b0b9"},{url:"documentation/1.0/js/sourceCode.js",revision:"12e956dc3477c0c954ed40a5b61cdc2d"},{url:"documentation/1.0/js/svg-pan-zoom.controls.js",revision:"7ee695d17313e1bf6dcd0a2d35219853"},{url:"documentation/1.0/js/tabs.js",revision:"77c5531367e3b9cd0cee577b59d368da"},{url:"documentation/1.0/js/tree.js",revision:"f49839247a1c3a4400630a7958596cca"},{url:"documentation/1.0/license.html",revision:"0653f15a3ad6c29a462ea17b09f1c7e7"},{url:"documentation/1.0/miscellaneous/enumerations.html",revision:"44940f1baf175ca9fa0e6b7c9ab0b49f"},{url:"documentation/1.0/miscellaneous/typealiases.html",revision:"9eb315e5f2fc52c462156eb576e278c6"},{url:"documentation/1.0/miscellaneous/variables.html",revision:"ae1ce69bacde9c47b9cd4d1c1b5eccb9"},{url:"documentation/1.0/modules.html",revision:"e19d60ab2d080f38aefe8f194acf06ab"},{url:"documentation/1.0/modules/GhContribCalendarModule.html",revision:"4d6664491a7d500a4ced4c809b5b9e90"},{url:"documentation/1.0/modules/GhContribCalendarModule/dependencies.svg",revision:"fdea46418c6752df806a1f2107ca746b"},{url:"documentation/1.0/overview.html",revision:"dfda04cd9f2475e8dc904796f901889f"},{url:"documentation/1.0/styles/laravel.css",revision:"b5299b6467adb47374bafadd4e1b42ba"},{url:"documentation/1.0/styles/style.css",revision:"c688f73978548b426b443dbf178ae378"},{url:"ico-dc78e434d769221cc9414c46da218692-favicon-16x16.png",revision:"2a4d103910de4f12322edcab3f01518d"},{url:"ico-dc78e434d769221cc9414c46da218692-favicon-32x32.png",revision:"c48227bb6f03a5de6fc9705f0a3df2dd"},{url:"ico-dc78e434d769221cc9414c46da218692-favicon.ico",revision:"c54126e9c902c7ec549021793311fb10"},{url:"icon_1024x1024.8b2c91eda5fc74d8b7b616f7f8c63b93.png",revision:"8b2c91eda5fc74d8b7b616f7f8c63b93"},{url:"icon_128x128.a2b76f7deb2e7ccf49da06a083c51fab.png",revision:"a2b76f7deb2e7ccf49da06a083c51fab"},{url:"icon_16x16.3be9e2630d7fd2905af0f036ee796abc.png",revision:"3be9e2630d7fd2905af0f036ee796abc"},{url:"icon_2048x2048.f68dfe36715aa80a995823cb27e51c60.png",revision:"f68dfe36715aa80a995823cb27e51c60"},{url:"icon_256x256.6aec2b6b2c4c30e64ec46372a35424b8.png",revision:"6aec2b6b2c4c30e64ec46372a35424b8"},{url:"icon_32x32.d4a616e8b743136717f38bacbf6e5d1e.png",revision:"d4a616e8b743136717f38bacbf6e5d1e"},{url:"icon_512x512.15e92e6458e3ae655674169a10c728af.png",revision:"15e92e6458e3ae655674169a10c728af"},{url:"icon_64x64.36a5318334b82cf8b41b79b2a82497fb.png",revision:"36a5318334b82cf8b41b79b2a82497fb"},{url:"index.html",revision:"68c3a6d54841f753a9e7ca4fe593d037"},{url:"manifest.dfcf27de8ed6c61516bfebd9d4cc75e1.json",revision:"dfcf27de8ed6c61516bfebd9d4cc75e1"},{url:"vendor.1895239b781ca205600f.js",revision:"ed8e6ae81ec98247e60544825d999a5a"}],workboxSW=new self.WorkboxSW({directoryIndex:"index.html"});workboxSW.precache(fileManifest),workboxSW.router.registerRoute(/cdn\.polyfill\.io/i,workboxSW.strategies.cacheFirst({}),"GET"),workboxSW.router.registerRoute(/fonts\.googleapis\.com/i,workboxSW.strategies.cacheFirst({}),"GET"),workboxSW.router.registerRoute(/fonts\.gstatic\.com/i,workboxSW.strategies.staleWhileRevalidate({}),"GET"),workboxSW.router.registerRoute(/travis-ci\.org\/Alorel\/ngforage/i,workboxSW.strategies.networkFirst({}),"GET"),workboxSW.router.registerRoute(/img\.shields\.io/i,workboxSW.strategies.networkFirst({}),"GET"),workboxSW.router.registerRoute(/coveralls\.io/i,workboxSW.strategies.networkFirst({}),"GET"),workboxSW.router.registerRoute(/badges\.greenkeeper\.io/i,workboxSW.strategies.networkFirst({}),"GET");