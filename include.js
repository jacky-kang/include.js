(function ($) {
  var callbacks = []
  window.includeLoaded = function (callback) {
    callbacks.push(callback)
  }

  function includeTask () {
    var includes = $('include')
    var len = includes.length
    if (len) {
      var stats = new Array(len)

      includes.each(function (index) {
        var $this = $(this)
        var src = $this.attr('src')
        var tag = $this.attr('tag')
        var cls = $this.attr('class')
        var dom = document.createElement(tag || 'div')
        $this.replaceWith(dom)
        $this = $(dom)
        if (cls) $this.addClass(cls)
        if (src) {
          $this.load(src, function () {
            stats[index] = true
            var all = true
            $.each(stats, function (index) {
              if (!stats[index]) {
                all = false
                return false
              }
            })
            if (all) {
              includeTask()
            }
          })
        }
      })
    } else {
      $.each(callbacks, function () {
        this()
      })
    }
  }

  $(includeTask)
})(window.$)
