(function(){

  function Paging($el, option) {
    this.total = option.total || 10;
    this.cur = option.cur || 1;
    this.cb = option.cb || function(index){return false;};
    this.$el = $el;

    this.init();
  }

  Paging.prototype = {
    init: function() {
      this.show();
    },
    show: function() {
      var $ul = $('<ul>').attr('class', 'paging-ul');

      this.addItem($ul, -1);
      if(this.total > 8) {
        
        for (var i = 0 ; i < 6; i++) {
          this.addItem($ul, this.cur + i);
        };
        this.addItem($ul, -111);
        this.addItem($ul, this.total);

      } else {

        for (var i = 1 ; i <= this.total; i++) {
          this.addItem($ul, this.cur + i);
        };
      }
      this.addItem($ul, -11);

      this.$el.empty();
      this.$el.append($ul);
      this.cb(this.cur);
    },
    addItem: function($ul, index) {
      var $item = null;
      var _this = this;

      if (index == -1) {

        if (_this.cur === 1) {
          $item = $('<li>&lt</li>')
                    .attr('class', 'paging-prev paging-prev-disable');;
        } else {
          $item = $('<a><li>&lt</li></a>')
                  .bind('click', function(){_this.prev()})
                    .attr('href', 'javascript:void(0)')
                      .attr('class', 'paging-prev');
        }

      } else if (index === -11) {

        if (_this.cur === this.total) {
          $item = $('<li>&gt</li>')
                    .attr('class', 'paging-next paging-next-disable');
        } else {
          $item = $('<a><li>&gt</li></a>')
                  .bind('click', function(){_this.next()})
                    .attr('href', 'javascript:void(0)')
                      .attr('class', 'paging-next');
        }

      } else if (index === -111) {

          $item = $('<li>...</li>');

      } else if (index === _this.cur) {

        $item = $('<li>' + index + '</li>')
                  .attr('class', 'paging-cur');

      } else {

        $item = $('<a><li>' + index + '</li></a>')
                .bind('click', function(){_this.goto(index)})
                  .attr('href', 'javascript:void(0)');

      };

      $ul.append($item);
    },
    goto: function(index) {
      this.cur = index;
      this.init();
    },
    prev: function() {
      this.cur--;
      this.init();
    },
    next: function() {
      this.cur++;
      this.init();
    },
  }

  $.fn.paging = function(opt) {
    return new Paging(this, opt);
  }
}())