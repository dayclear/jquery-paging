(function(){

  function Paging($el, options) {
    
    var options = options || {};
    this.total = options.total || 10;
    this.cur = options.cur || 1;
    this.max = options.max ? options.max > 5 ? options.max : 5 : 8;
    this.prevText = options.prev_text || '<',
    this.nextText = options.next_text || '>',
    this.cb = options.cb || function(index){return false;};
    this.$el = $el;

    this.init();
  }

  Paging.prototype = {

    // 初始化
    init: function() {
      this.show();
    },
    //显示页标签
    show: function() {
      var $ul = $('<ul>').attr('class', 'paging-ul');
      var _this = this;
      var t = _this.total;
      var c = _this.cur;
      var m = _this.max;

      _this.addItem($ul, -1);

      if (t > m) {
        
        if (t - c < m - 2) {
          _this.addItem($ul, 1).addItem($ul, -111);
          for (var i = t - m + 3 ; i <= t; i++) {
            _this.addItem($ul, i);
          };
        } else if (c - 1 < m - 2) {
          for (var i = 1 ; i <= m - 2; i++) {
            _this.addItem($ul, i);
          };
          _this.addItem($ul, -111).addItem($ul, t);
        } else {
          _this.addItem($ul, 1).addItem($ul, -111);
          for (var i = -Math.floor((m - 5)/2)  ; i <= Math.ceil((m - 5)/2); i++) {
            _this.addItem($ul, c + i);
          };
          _this.addItem($ul, -111).addItem($ul, t);
        }

      } else {

        for (var i = 1 ; i <= this.total; i++) {
          _this.addItem($ul, i);
        };
      }

      _this.addItem($ul, -11);

      _this.$el.empty();
      _this.$el.append($ul);
      _this.cb(this.cur);
    },

    // 数组里面添加页标签
    addItem: function($ul, index) {
      var $item = null;
      var _this = this;

      if (index == -1) {

        if (_this.cur === 1) {
          $item = $('<li>' + _this.prevText + '</li>')
                    .attr('class', 'paging-prev paging-prev-disable');;
        } else {
          $item = $('<a><li>' + _this.prevText + '</li></a>')
                  .bind('click', function(){_this.prev()})
                    .attr('href', 'javascript:void(0)')
                      .attr('class', 'paging-prev');
        }

      } else if (index === -11) {

        if (_this.cur === _this.total) {
          $item = $('<li>' + _this.nextText + '</li>')
                    .attr('class', 'paging-next paging-next-disable');
        } else {
          $item = $('<a><li>' + _this.nextText + '</li></a>')
                  .bind('click', function(){_this.next()})
                    .attr('href', 'javascript:void(0)')
                      .attr('class', 'paging-next');
        }

      } else if (index === -111) {

          $item = $('<li>...</li>')
                    .attr('class', 'paging-ellipsis');

      } else if (index === _this.cur) {

        $item = $('<li>' + index + '</li>')
                  .attr('class', 'paging-cur');

      } else {

        $item = $('<a><li>' + index + '</li></a>')
                .bind('click', function(){_this.goto(index)})
                  .attr('href', 'javascript:void(0)');

      };

      $ul.append($item);
      return _this;
    },

    // 跳转至具体页面
    goto: function(index) {
      this.cur = index;
      this.init();
    },

    // 上一页
    prev: function() {
      this.cur--;
      this.init();
    },

    // 下一页
    next: function() {
      this.cur++;
      this.init();
    },
  }

  $.fn.paging = function(opt) {
    return new Paging(this, opt);
  }
}())