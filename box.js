// Generated by CoffeeScript 1.7.1
(function() {
  var Box, closestMultipleTo, root,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  closestMultipleTo = function(num, mult) {
    return Math.round(num / mult) * mult;
  };

  Box = (function() {
    function Box(container, opts) {
      this.onFront = __bind(this.onFront, this);
      this.onBack = __bind(this.onBack, this);
      this.showFront = __bind(this.showFront, this);
      this.showBack = __bind(this.showBack, this);
      this.flip = __bind(this.flip, this);
      this.turn = __bind(this.turn, this);
      this.setBoxTransform = __bind(this.setBoxTransform, this);
      this.setSize = __bind(this.setSize, this);
      var _ref, _ref1, _ref2;
      this.width = opts.width, this.height = opts.height, this.depth = opts.depth;
      this.container = $(container);
      this.container.css({
        perspective: opts.perspective || 1000,
        position: "relative"
      });
      this.box = this.container.find(".box");
      this.box.css({
        width: "100%",
        height: "100%",
        transformStyle: "preserve-3d"
      });
      this.box.find(".face").css({
        position: "absolute",
        outline: "1px solid transparent"
      });
      this.faces = (function(_this) {
        return function() {
          return {
            front: _this.container.find(".front"),
            rear: _this.container.find(".rear"),
            left: _this.container.find(".left"),
            right: _this.container.find(".right"),
            top: _this.container.find(".top"),
            bottom: _this.container.find(".bottom")
          };
        };
      })(this)();
      this.rotation = {
        x: ((_ref = opts.rotation) != null ? _ref.x : void 0) || 0,
        y: ((_ref1 = opts.rotation) != null ? _ref1.y : void 0) || 0,
        z: ((_ref2 = opts.rotation) != null ? _ref2.z : void 0) || 0
      };
      this.setSize();
      this.setBoxTransform();
    }

    Box.prototype.perspective = function(set) {
      if (set) {
        return this.container.css("perspective", set);
      } else {
        return this.container.css("perspective");
      }
    };

    Box.prototype.setSize = function(opts) {
      var el, face, _ref;
      if (opts) {
        this.width = opts.width, this.height = opts.height, this.depth = opts.depth;
      }
      this.container.css({
        height: this.height,
        width: this.width
      });
      _ref = this.faces;
      for (face in _ref) {
        el = _ref[face];
        switch (face) {
          case "front":
          case "rear":
            el.css({
              height: this.height,
              width: this.width
            });
            break;
          case "right":
          case "left":
            el.css({
              width: this.depth,
              height: this.height,
              left: (this.width / 2) - (this.depth / 2)
            });
            break;
          case "top":
          case "bottom":
            el.css({
              width: this.width,
              height: this.depth,
              top: (this.height / 2) - (this.depth / 2)
            });
        }
      }
      this.faces.front.css("transform", "rotateY(0) translateZ( " + (this.depth / 2) + "px)");
      this.faces.rear.css("transform", "rotateY(180deg) translateZ( " + (this.depth / 2) + "px )");
      this.faces.right.css("transform", "rotateY( 90deg ) translateZ( " + (this.width / 2) + "px )");
      this.faces.left.css("transform", "rotateY( -90deg ) translateZ( " + (this.width / 2) + "px )");
      this.faces.top.css("transform", "rotateX( 90deg ) translateZ( " + (this.height / 2) + "px )");
      return this.faces.bottom.css("transform", "rotateX( -90deg ) translateZ( " + (this.height / 2) + "px )");
    };

    Box.prototype.setBoxTransform = function() {
      return this.box.css("transform", "translateZ( " + (this.depth / -2) + "px ) rotateX( " + this.rotation.x + "deg ) rotateY( " + this.rotation.y + "deg ) rotateZ( " + this.rotation.z + "deg )");
    };

    Box.prototype.turn = function(r) {
      var axis, deg;
      r || (r = {
        y: 0
      });
      for (axis in r) {
        deg = r[axis];
        console.log(axis);
        if (axis === "x" || axis === "y" || axis === "z") {
          this.rotation[axis] += +deg;
        }
      }
      return this.setBoxTransform();
    };

    Box.prototype.flip = function() {
      return this.turn({
        y: 180
      });
    };

    Box.prototype.showBack = function() {
      var tmp;
      if (!(this.rotation.y % 180 === 0 && this.rotation.y % 360 !== 0)) {
        tmp = closestMultipleTo(this.rotation.y, 360);
        if (!(tmp % 360)) {
          if (tmp > this.rotation.y) {
            tmp = tmp - 180;
          } else {
            tmp = tmp + 180;
          }
        }
        this.rotation.y = tmp;
        return this.turn();
      }
    };

    Box.prototype.showFront = function() {
      if (!(this.rotation.y % 360)) {
        this.rotation.y = closestMultipleTo(this.rotation.y, 360);
        return this.turn();
      }
    };

    Box.prototype.onBack = function() {
      return this.rotation.y % 180 === 0 && this.rotation.y % 360 !== 0;
    };

    Box.prototype.onFront = function() {
      return this.rotation.y % 360 === 0;
    };

    return Box;

  })();

  root = (typeof exports !== "undefined" && exports !== null ? exports : this);

  root.Box = Box;

}).call(this);
