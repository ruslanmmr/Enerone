"use strict";

$(document).ready(function () {
  setTimeout(function () {
    calendar();
  }, 500);
});

var yearDropdownPlugin = function yearDropdownPlugin(pluginConfig) {
  var defaultConfig = {
    text: '',
    theme: "light",
    date: new Date(),
    yearStart: 10,
    yearEnd: 10
  };
  var config = {};

  for (var key in defaultConfig) {
    config[key] = pluginConfig && pluginConfig[key] !== undefined ? pluginConfig[key] : defaultConfig[key];
  }

  var getYear = function getYear(value) {
    var date = value.split(".");
    return parseInt(date[2], 10);
  };

  var currYear = new Date().getFullYear();
  var selectedYear = getYear(config.date);
  var yearDropdown = document.createElement("select");

  var createSelectElement = function createSelectElement(year) {
    var start = new Date().getFullYear() - config.yearStart;
    var end = currYear + config.yearEnd;

    for (var i = end; i >= start; i--) {
      var option = document.createElement("option");
      option.value = i;
      option.text = i;
      yearDropdown.appendChild(option);
    }

    if (selectedYear) {
      yearDropdown.value = selectedYear;
    } else {
      yearDropdown.value = currYear;
    }
  };

  return function (fp) {
    fp.yearSelectContainer = fp._createElement("div", "flatpickr-year-select " + config.theme + "Theme", config.text);
    fp.yearSelectContainer.tabIndex = -1;
    createSelectElement(selectedYear);
    yearDropdown.addEventListener('change', function (evt) {
      var year = +evt.target.options[evt.target.selectedIndex].value;
      fp.changeYear(year);
    });
    fp.yearSelectContainer.append(yearDropdown);
    return {
      onReady: function onReady() {
        var name = fp.monthNav.className;
        var yearInputCollection = fp.calendarContainer.getElementsByClassName(name);
        var el = yearInputCollection[0];
        el.parentNode.insertBefore(fp.yearSelectContainer, el.parentNode.firstChild);
      }
    };
  };
};

function calendar() {
  var $calendar = $('.js-calendar__input');
  $calendar.each(function () {
    var $this = $(this),
        $parent = $this.parents('.js-calendar'),
        mode = $this.attr('data-mode'),
        mvalue = mode ? mode : 'range';
    var mind = new Date(),
        maxd = new Date();
    mind.setFullYear(mind.getFullYear() - 10);
    maxd.setFullYear(maxd.getFullYear() + 0);
    flatpickr($this, {
      "locale": "ru",
      disableMobile: "true",
      maxDate: 'today',
      minDate: mind,
      dateFormat: "d.m.Y",
      position: 'auto',
      mode: mvalue,
      nextArrow: '<svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.97652 0.325817C1.76125 0.114994 1.48728 0 1.16438 0C0.518591 0 0 0.49831 0 1.13078C0 1.44701 0.136987 1.7345 0.362036 1.9549L7.21135 8.50958L0.362036 15.0451C0.136987 15.2655 0 15.5626 0 15.8692C0 16.5017 0.518591 17 1.16438 17C1.48728 17 1.76125 16.885 1.97652 16.6742L9.58904 9.39121C9.86301 9.14205 9.99022 8.8354 10 8.5C10 8.1646 9.86301 7.87711 9.58904 7.61838L1.97652 0.325817Z" fill="currentColor"/></svg>',
      prevArrow: '<svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.02348 16.6742C8.23875 16.885 8.51272 17 8.83562 17C9.48141 17 10 16.5017 10 15.8692C10 15.553 9.86301 15.2655 9.63796 15.0451L2.78865 8.49042L9.63796 1.9549C9.86301 1.7345 10 1.43743 10 1.13078C10 0.498309 9.48141 0 8.83562 0C8.51272 0 8.23875 0.114994 8.02348 0.325817L0.410959 7.60879C0.136986 7.85795 0.00978474 8.1646 0 8.5C0 8.8354 0.136986 9.12289 0.410959 9.38162L8.02348 16.6742Z" fill="currentColor"/></svg>',
      plugins: [new yearDropdownPlugin({
        date: this.value,
        yearStart: Math.abs(mind.getFullYear() - new Date().getFullYear()),
        yearEnd: Math.abs(maxd.getFullYear() - new Date().getFullYear())
      })],
      onOpen: function onOpen() {
        $parent.addClass('active');
      },
      onClose: function onClose() {
        $parent.removeClass('active');
      },
      onYearChange: function onYearChange(selectedDates, dateStr, instance) {
        var $year = instance.calendarContainer.querySelector('.flatpickr-year-select select');
        $year.value = instance.currentYear;
      }
    });
  });
}
//# sourceMappingURL=maps/calendar.js.map
