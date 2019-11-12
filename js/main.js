window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js');
  }
}

$(document).ready(function(){
  // Stuff to do as soon as the DOM is ready;
  var currentYear = (new Date).getFullYear();
  $(".c-year").text( currentYear );

  // login and sign up modal

  $('#modalLogin').on('shown.bs.modal', function (e) {
      $("#modalSignup").modal('hide');
      setTimeout(function(){
          $("body").addClass("modal-open");
          $("#modalLogin").modal('show');
          $(".modal").scrollTop(0);
      }, 500);
  })

  $('#modalSignup').on('shown.bs.modal', function (e) {
      $("#modalLogin").modal('hide');
      setTimeout(function(){
          $("body").addClass("modal-open");
          $("#modalSignup").modal('show');
          $(".modal").scrollTop(0);
      }, 500);
  })

  // menu in mobile
  var winWidth = $(window).width();
  if(winWidth < 992){
      
      $(".navbar-nav .nav-item .nav-link").click(function(){
          $(this).siblings(".sub-menu").slideToggle();
      });

      // toggle categories
      $(".sub-menu-level-1 > li > a, .head-v2 .sub-menu-level-1 > .mCustomScrollBox > .mCSB_container > li > a").click(function(){
              $(".sub-menu-level-2").hide();
              var hasShown = $(this).hasClass("show");
              if(hasShown){
                  $(".sub-menu-level-1 > li > a, .head-v2 .sub-menu-level-1 > .mCustomScrollBox > .mCSB_container > li > a").removeClass("show");
                  $(this).siblings(".sub-menu-level-2").slideUp();
              }
              else{
                  $(".sub-menu-level-1 > li > a, .head-v2 .sub-menu-level-1 > .mCustomScrollBox > .mCSB_container > li > a").removeClass("show");
                  $(this).addClass("show");
                  $(this).siblings(".sub-menu-level-2").slideDown();
              }
      });

      // show mobile menu
      $(".navbar-toggler").click(function(){
          $(".navbar-collapse").slideDown("fast");
          $(".navbar-collapse").addClass("menu-fixed");
          $("body").addClass("remove-scroll");
      });

      // message UI
      $(".single-mail .nav-link").click(function(){
          $(".message-list").hide()
          $(".message-content").show();
      });

      $(".back-msg").click(function(){
          $(".message-content").hide();
          $(".message-list").show()
      });

      // product detail popup
      var getProductThumbLength = $(".mob-thumb .nav-tabs li").length;
      var getProductThumbWidth = $(".mob-thumb .nav-tabs li").width();
      var getNetProductContainer = (getProductThumbWidth * getProductThumbLength) + (getProductThumbLength*10);

      $(".mob-thumb-wrapper .nav-tabs").width(getNetProductContainer);
      $(".product-arrow-left").click(function(){
          var scrolledDiv = $(".mob-thumb-wrapper").scrollLeft();
          var getSubWidth = $(".mob-thumb .nav-tabs li").width();
          $(".mob-thumb-wrapper").animate({
              scrollLeft: scrolledDiv - getSubWidth
          }, 800);
      });

      $(".product-arrow-right").click(function(){
          var scrolledDiv = $(".mob-thumb-wrapper").scrollLeft();
          var getSubWidth = $(".mob-thumb .nav-tabs li").width();
          $(".mob-thumb-wrapper").animate({
              scrollLeft: scrolledDiv + getSubWidth
          }, 800);
      });
  };

  // web menu categories
  if(winWidth > 992){
      $(".navbar-nav .nav-item .nav-link").hover(function(){
          $(".sub-menu-level-2").hide();

          // hide select2 dropdown to avoid overlaping issue with menu
          $(".js-select2").select2('close');
      });

      $(".sub-menu-level-1 > li > a, .head-v2 .sub-menu-level-1 > .mCustomScrollBox > .mCSB_container > li > a").hover(function(){
          $(".sub-menu-level-2").hide();
          $(this).next(".sub-menu-level-2").show();
      });
  }

  // hide responsive menu
  $(".close-menu").click(function(){
      $("body").removeClass("remove-scroll");
      $(".navbar-collapse").slideUp("fast");
  });

  // language select2
  function setLanguage (language) {
  if (!language.id) { return language.text; }
      var $language = $('<span><img class="flag" src="images/flag.png"/>' + language.text + '</span>');
      return $language;
  };
  $("#language, .language-inner").select2({
      placeholder: "Language", //placeholder
      templateResult: setLanguage,
      templateSelection: setLanguage,
      dropdownAutoWidth : true,
      width: 'auto',
      dropdownCssClass: "language-open"
  });

  // for currency icon
  function formatCurrency(icon) {
      var originalOption = icon.element;
      return $('<span><span class="curr-icn"><i class="fa ' + $(originalOption).data('icon') + '"></i></span> ' + icon.text + '</span>');
  }

  $("#currency, .currency-inner").select2({
      placeholder: "currency", //placeholder
      dropdownAutoWidth : true,
      width: 'auto',
      dropdownCssClass: "currency-open",
      templateSelection: formatCurrency,
      templateResult: formatCurrency,
      allowHtml: true
  });

  $(".js-select2").select2({});

  $("#location").select2({
      placeholder: "Select city, state or country", //placeholder
  });

  // bookmark 
  $(".pr-actions .bookmark").click(function(){
      $(this).toggleClass("active");
  });

  // grid view
  $(".grid-title").click(function(){
      $(".products-lists").removeClass("list-view");
      $(".products-lists").addClass("grid-view");
  });
  $(".list-title").click(function(){
      $(".products-lists").removeClass("grid-view");
      $(".products-lists").addClass("list-view");
  });
  $(".pr-views li").click(function(){
      $(".pr-views li").removeClass("active");
      $(this).addClass("active");
  });

  // range slider GEOGRAPHY
  $(".slider-geo").each(function () {
      var $key = $(this).prev('h4').text(),
          datamax = $(this).data('max'),
          datamin = $(this).data('min'),
          amount = $(this).next('#amount'),
          values = [datamin, datamax];
          // if (localStorage[$key]) {
          //     try {
          //         values = JSON.parse(localStorage[$key])
          //     } catch (e) {
          //         console.log(e)
          //     }
          // }
      $(this).slider({
          range: true,
          min: 0,
          max: datamax,
          values: values,
          slide: function (event, ui) {
              amount.text(ui.values[1] + " kilometers");
          },
          stop: function (event, ui) {
              localStorage[$key] = JSON.stringify(ui.values);
          }
      });

      // amount.text($(this).slider("values", 0) + " - " + $(this).slider("values", 1) + " kilometers");
      amount.text($(this).slider("values", 1) + " kilometers");

      
  });

  // range slider YEAR
  $(".slider-year").each(function () {
      var $key = $(this).prev('h4').text(),
          datamax = $(this).data('max'),
          datamin = $(this).data('min'),
          amount = $(this).next('#amount'),
          values = [datamin, datamax];
      $(this).slider({
          range: true,
          min: 1995,
          max: datamax,
          values: values,
          slide: function (event, ui) {
              amount.text(ui.values.join(" to "));
          },
          stop: function (event, ui) {
              localStorage[$key] = JSON.stringify(ui.values);
          }
      });

      amount.text($(this).slider("values", 0) + " to " + $(this).slider("values", 1));

      
  });

  // range slider USAGE
  $(".slider-usage").each(function () {
      var $key1 = $(this).prev('h4').text(),
          datamax = $(this).data('max'),
          datamin = $(this).data('min'),
          amount = $(this).next('#amount'),
          values = [datamin, datamax];
          $(this).slider({
              range: true,
              min: 20,
              max: datamax,
              values: values,
              slide: function (event, ui) {
                  amount.text(ui.values.join("mi - ") + " mi");
              },
              stop: function (event, ui) {
                  localStorage[$key] = JSON.stringify(ui.values);
              }
          });

      amount.text($(this).slider("values", 0) + "mi - " + $(this).slider("values", 1) + " mi");

      
  });

  // range slider PRICE
  $(".slider-price").each(function () {
      var $key = $(this).prev('h4').text(),
          datamax = $(this).data('max'),
          datamin = $(this).data('min'),
          amount = $(this).next('#amount'),
          values = [datamin, datamax];
      $(this).slider({
          range: true,
          min: 25,
          max: datamax,
          values: values,
          slide: function (event, ui) {
              amount.text(ui.values.join("k - ") + " k");
          },
          stop: function (event, ui) {
              localStorage[$key] = JSON.stringify(ui.values);
          }
      });

      amount.text($(this).slider("values", 0) + "k - " + $(this).slider("values", 1) + " k");

      
  });

  // show filter popup in mobile
  $(".pr-filter-icn").click(function(){
      // $(".product-filter").slideDown();
      // $(".close-filter, .filter-button").fadeIn();
      // $("body").addClass("remove-scroll");

      $(".product-filter").animate({
          width: 'toggle'
      });
      $(".close-filter, .filter-button").fadeIn();
      $("body").addClass("remove-scroll");
  });

  $(".close-filter, .filter-button").click(function(){
      // $(".close-filter, .filter-button").fadeOut();
      // $(".product-filter").slideUp();
      // $("body").removeClass("remove-scroll");
      $(".product-filter").animate({
          width: 'toggle'
      });
      $("body").removeClass("remove-scroll");
      $(".close-filter, .filter-button").fadeOut();
  });

  // subscription scroll
  $(".sub-arrow-left").on("click",function(){
      var scrolledDiv = $(".sub-body-col").scrollLeft();
      var getSubWidth = $(".subscription-body").width();
      
      $(".sub-body-col").animate({
          scrollLeft: scrolledDiv - getSubWidth
      }, 800);
      
  });
  $(".sub-arrow-right").click(function(){
      var scrolledDiv = $(".sub-body-col").scrollLeft();
      var getSubWidth = $(".subscription-body").width();
      $(".sub-body-col").animate({
          scrollLeft: getSubWidth + scrolledDiv
      }, 800);
  });

  // active class in message list
  $(".single-mail .nav-link").click(function(){
      $(".single-mail .nav-link").removeClass("active");
      $(this).addClass("active");
  });

  // set type message at bottom in desktop
  if(winWidth > 992){
      function setEmailBodyHeight(){
          var getEmailMessageHeight = $(".message-content").innerHeight();
          var setEmailHeaderHeight = $(".content-head").innerHeight();
          $(".message-content .content-body").innerHeight(getEmailMessageHeight - setEmailHeaderHeight);
      };
  
      setEmailBodyHeight()
  
      $(".msg-link").click(function(){
          setTimeout(function(){
              setEmailBodyHeight();
          }, 50);
      });
  };

  // scroll to smoothly
  $(".list-unstyled li a").click(function() {
      var getScrollToDiv = $(this).attr('href');
      console.log(getScrollToDiv);
      $('html, body').animate({
          scrollTop: $(getScrollToDiv).offset().top
      }, 500);
  });

  // product add new
  $(".go-to-add-product").click(function(){
      $(".product-datatable").addClass("d-none");
      $(".add-product").removeClass("d-none");
  });

  $(".go-to-product-preview").click(function(){
      $(".add-product").addClass("d-none");
      $(".uploaded-product").removeClass("d-none");
  });

  $(".go-to-product-datatable").click(function(){
      $(".uploaded-product").addClass("d-none");
      $(".product-datatable").removeClass("d-none");
  });

  // product-preview-images more images
  // $(".uploaded-product .category-listing .row > .col-sm-3").each(function(){
  //     var getTotalPreviewImages = $(this).find(".product-preview-images > ul > li:not(.upload-preview)").length;
  //     if(getTotalPreviewImages > 5){
  //         $(".product-preview-images li:nth-child(5):not(.upload-preview)").addClass("more-preview");
  //         $(this).find(".product-preview-images > ul > li").attr("data-attr",getTotalPreviewImages);
  //     }
  // });

   // loader
  //  setTimeout(function(){
  //     $(".bs-loader").css({"display": "none"});
  // }, 1500);
});