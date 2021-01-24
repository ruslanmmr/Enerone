"use strict";

$(document).ready(function () {
  toggle();
  calendar();
  formElements();
});

function toggle() {
  var $section = $('.toggle-section'),
      speed = 150;
  $section.each(function () {
    var $this = $(this),
        $toggle = $this.children('.toggle-section__trigger'),
        $content = $this.children('.toggle-section__content'),
        state = $this.hasClass('active') ? true : false,
        initialized;
    $toggle.on('click', function () {
      state = !state ? true : false;
      check();
    });

    if ($this.is('[data-hover]')) {
      var timeout;
      $toggle.add($content).on('mouseenter', function (event) {
        if (!TouchHoverEvents.touched) {
          if (timeout) clearTimeout(timeout);
          state = true;
          check();
        }
      });
      $toggle.add($content).on('mouseleave', function (event) {
        if (!TouchHoverEvents.touched) {
          var delay;

          if ($(this).is($toggle)) {
            delay = 500;
          } else {
            delay = 100;
          }

          timeout = setTimeout(function () {
            state = false;
            check();
          }, delay);
        }
      });
    }

    if ($this.is('[data-out-hide]') || $this.is('[data-hover]')) {
      $(document).on('click touchstart', function (event) {
        var $target = $(event.target);

        if (!$target.closest($content).length && !$target.closest($toggle).length && state) {
          state = false;
          check();
        }
      });
    }

    function check() {
      if (state) {
        $this.add($content).add($toggle).addClass('active');

        if ($this.is('[data-slide]')) {
          $content.show(speed);
        }
      } else {
        $this.add($toggle).add($content).removeClass('active');

        if ($this.is('[data-slide]')) {
          if (initialized) {
            $content.stop().slideUp(speed);
          }
        }
      }
    }

    check();
    initialized = true;
  });
}

function calendar() {
  var $calendar = $('.js-calendar__input');
  $calendar.each(function () {
    console.log($(this));
    var $this = $(this),
        $parent = $this.parents('.js-calendar');
    flatpickr($this, {
      "locale": "ru",
      disableMobile: "true",
      dateFormat: "d.m.Y",
      appendTo: $parent[0],
      mode: "range",
      nextArrow: '<svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.97652 0.325817C1.76125 0.114994 1.48728 0 1.16438 0C0.518591 0 0 0.49831 0 1.13078C0 1.44701 0.136987 1.7345 0.362036 1.9549L7.21135 8.50958L0.362036 15.0451C0.136987 15.2655 0 15.5626 0 15.8692C0 16.5017 0.518591 17 1.16438 17C1.48728 17 1.76125 16.885 1.97652 16.6742L9.58904 9.39121C9.86301 9.14205 9.99022 8.8354 10 8.5C10 8.1646 9.86301 7.87711 9.58904 7.61838L1.97652 0.325817Z" fill="currentColor"/></svg>',
      prevArrow: '<svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.02348 16.6742C8.23875 16.885 8.51272 17 8.83562 17C9.48141 17 10 16.5017 10 15.8692C10 15.553 9.86301 15.2655 9.63796 15.0451L2.78865 8.49042L9.63796 1.9549C9.86301 1.7345 10 1.43743 10 1.13078C10 0.498309 9.48141 0 8.83562 0C8.51272 0 8.23875 0.114994 8.02348 0.325817L0.410959 7.60879C0.136986 7.85795 0.00978474 8.1646 0 8.5C0 8.8354 0.136986 9.12289 0.410959 9.38162L8.02348 16.6742Z" fill="currentColor"/></svg>',
      onOpen: function onOpen() {
        $parent.addClass('active');
      },
      onClose: function onClose() {
        $parent.removeClass('active');
      }
    });
  });
}

function formElements() {
  var $inputs = document.querySelectorAll('.form-element__input');
  document.addEventListener('focus', function (event) {
    inputEvents(event);
  }, true);
  document.addEventListener('blur', function (event) {
    inputEvents(event);
  }, true);
  document.addEventListener('input', function (event) {
    inputEvents(event);
  }, true);

  var inputEvents = function inputEvents(event) {
    var $element = event.target,
        $parent = event.target.parentNode;

    if ($parent && $parent.classList.contains('form-element')) {
      if (event.type == 'focus') {
        $parent.classList.add('focus');
      } else if (event.type == 'blur') {
        $parent.classList.remove('focus');
      } else {
        checkInput($element); //remove errors

        if ($parent.classList.contains('error')) {
          $parent.classList.remove('error');
          var $messages = $parent.querySelector('.errorlist');
          if ($messages) $messages.remove();
        }
      }
    }
  };

  var checkInput = function checkInput($element) {
    var value = $element.value.replace(/^\s+|\s+$/g, ''),
        $parent = $element.parentNode;

    if (value !== '') {
      $parent.classList.add('filled');
    } else {
      $parent.classList.remove('filled');
    }
  };

  $inputs.forEach(function ($element) {
    checkInput($element);
  }); //selects

  var $selects = $('.form-element__select');
  $selects.select2({
    theme: 'new-select',
    minimumResultsForSearch: Infinity,
    placeholder: {
      id: '',
      text: ''
    },
    allowClear: true
  });
  $selects.on('select2:select select2:open select2:close', function (event) {
    var $this = $(event.target),
        $parent = $this.parents('.form-element');

    if (event.type == 'select2:open') {
      $parent.addClass('focus');
    } else if (event.type == 'select2:close') {
      $parent.removeClass('focus');
    } else {
      $parent.addClass('filled'); //remove errors

      if ($parent.hasClass('error')) {
        $parent.removeClass('error');
        var $messages = $parent.find('.errorlist');
        if ($messages) $messages.remove();
      }
    }
  });
  $selects.each(function () {
    var $this = $(this),
        $parent = $this.parents('.form-element');

    if ($this.val().replace(/^\s+|\s+$/g, '') !== '') {
      $parent.addClass('filled');
    }
  });
} //checkboxes 


$(document).on('change', '[data-checkbox-group]', function (event) {
  var $target = $(event.target),
      type = $target.attr('data-checkbox-type'),
      group = $target.attr('data-checkbox-group'),
      $targets = $("[data-checkbox-group='".concat(group, "']"));

  if ($target.is(':checked')) {
    $targets.each(function () {
      var $this = $(this),
          self_type = $this.attr('data-checkbox-type');

      if (self_type !== type) {
        $this.prop('checked', false);
      }
    });
  }
});
//# sourceMappingURL=maps/lk.js.map
