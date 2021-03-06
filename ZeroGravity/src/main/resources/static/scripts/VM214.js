!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self).rexpinchplugin = e()
}(this, function() {
    "use strict";
    function a(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
    function n(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n)
        }
    }
    function t(t, e, i) {
        return e && n(t.prototype, e),
        i && n(t, i),
        t
    }
    function s(t, e) {
        if ("function" != typeof e && null !== e)
            throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                writable: !0,
                configurable: !0
            }
        }),
        e && i(t, e)
    }
    function h(t) {
        return (h = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        }
        )(t)
    }
    function i(t, e) {
        return (i = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e,
            t
        }
        )(t, e)
    }
    function u(t) {
        if (void 0 === t)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
    }
    function c(r) {
        return function() {
            var t, e, i, n = h(r);
            if (function() {
                if ("undefined" != typeof Reflect && Reflect.construct && !Reflect.construct.sham) {
                    if ("function" == typeof Proxy)
                        return 1;
                    try {
                        return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})),
                        1
                    } catch (t) {
                        return
                    }
                }
            }()) {
                var s = h(this).constructor;
                t = Reflect.construct(n, arguments, s)
            } else
                t = n.apply(this, arguments);
            return e = this,
            !(i = t) || "object" != typeof i && "function" != typeof i ? u(e) : i
        }
    }
    function v(t, e, i) {
        return (v = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(t, e, i) {
            var n = function(t, e) {
                for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = h(t)); )
                    ;
                return t
            }(t, e);
            if (n) {
                var s = Object.getOwnPropertyDescriptor(n, e);
                return s.get ? s.get.call(i) : s.value
            }
        }
        )(t, e, i || t)
    }
    function e(t) {
        if (Array.isArray(t))
            t.length = 0;
        else
            for (var e in t)
                delete t[e]
    }
    var r = {
        setEventEmitter: function(t, e) {
            return void 0 === e && (e = Phaser.Events.EventEmitter),
            this._privateEE = void 0 === t,
            this._eventEmitter = this._privateEE ? new e : t,
            this
        },
        destroyEventEmitter: function() {
            return this._eventEmitter && this._privateEE && this._eventEmitter.shutdown(),
            this
        },
        getEventEmitter: function() {
            return this._eventEmitter
        },
        on: function() {
            return this._eventEmitter && this._eventEmitter.on.apply(this._eventEmitter, arguments),
            this
        },
        once: function() {
            return this._eventEmitter && this._eventEmitter.once.apply(this._eventEmitter, arguments),
            this
        },
        off: function() {
            return this._eventEmitter && this._eventEmitter.off.apply(this._eventEmitter, arguments),
            this
        },
        emit: function(t) {
            return this._eventEmitter && t && this._eventEmitter.emit.apply(this._eventEmitter, arguments),
            this
        },
        addListener: function() {
            return this._eventEmitter && this._eventEmitter.addListener.apply(this._eventEmitter, arguments),
            this
        },
        removeListener: function() {
            return this._eventEmitter && this._eventEmitter.removeListener.apply(this._eventEmitter, arguments),
            this
        },
        removeAllListeners: function() {
            return this._eventEmitter && this._eventEmitter.removeAllListeners.apply(this._eventEmitter, arguments),
            this
        },
        listenerCount: function() {
            return this._eventEmitter ? this._eventEmitter.listenerCount.apply(this._eventEmitter, arguments) : 0
        },
        listeners: function() {
            return this._eventEmitter ? this._eventEmitter.listeners.apply(this._eventEmitter, arguments) : []
        }
    }
      , o = Phaser.Utils.Objects.GetValue
      , f = Phaser.Utils.Array.SpliceOne
      , p = Phaser.Math.Distance.Between
      , l = Phaser.Math.Angle.Between
      , d = function() {
        function n(t, e) {
            a(this, n);
            var i = t.input.manager.pointersTotal - 1;
            i < 2 && t.input.addPointer(2 - i),
            this.scene = t,
            this.setEventEmitter(o(e, "eventEmitter", void 0)),
            this.pointers = [],
            this.movedState = {},
            this.resetFromJSON(e),
            this.boot()
        }
        return t(n, [{
            key: "resetFromJSON",
            value: function(t) {
                return this.setEnable(o(t, "enable", !0)),
                this.bounds = o(t, "bounds", void 0),
                this.tracerState = m,
                this.pointers.length = 0,
                e(this.movedState),
                this
            }
        }, {
            key: "boot",
            value: function() {
                this.scene.input.on("pointerdown", this.onPointerDown, this),
                this.scene.input.on("pointerup", this.onPointerUp, this),
                this.scene.input.on("pointermove", this.onPointerMove, this),
                this.scene.events.once("shutdown", this.destroy, this)
            }
        }, {
            key: "shutdown",
            value: function() {
                this.destroyEventEmitter(),
                this.pointers.length = 0,
                e(this.movedState),
                this.scene && (this.scene.input.off("pointerdown", this.onPointerDown, this),
                this.scene.input.off("pointerup", this.onPointerUp, this),
                this.scene.input.off("pointermove", this.onPointerMove, this),
                this.scene.events.off("destroy", this.destroy, this),
                this.scene = void 0),
                this.scene = void 0
            }
        }, {
            key: "destroy",
            value: function() {
                this.shutdown()
            }
        }, {
            key: "setEnable",
            value: function(t) {
                return void 0 === t && (t = !0),
                this.enable === t || (t || this.dragCancel(),
                this.enable = t),
                this
            }
        }, {
            key: "onPointerDown",
            value: function(t) {
                if (this.enable && (2 !== this.pointers.length && (!this.bounds || this.bounds.contains(t.x, t.y)) && -1 === this.pointers.indexOf(t)))
                    switch (this.movedState[t.id] = !1,
                    this.pointers.push(t),
                    this.tracerState) {
                    case m:
                        this.tracerState = g,
                        this.onDrag1Start();
                        break;
                    case g:
                        this.tracerState = E,
                        this.onDrag2Start()
                    }
            }
        }, {
            key: "onPointerUp",
            value: function(t) {
                if (this.enable && (!this.bounds || this.bounds.contains(t.x, t.y))) {
                    var e = this.pointers.indexOf(t);
                    if (-1 !== e)
                        switch (delete this.movedState[t.id],
                        f(this.pointers, e),
                        this.tracerState) {
                        case g:
                            this.tracerState = m,
                            this.onDrag1End();
                            break;
                        case E:
                            this.tracerState = g,
                            this.onDrag2End(),
                            this.onDrag1Start()
                        }
                }
            }
        }, {
            key: "onPointerMove",
            value: function(t) {
                if (this.enable && t.isDown) {
                    var e = !this.bounds || this.bounds.contains(t.x, t.y)
                      , i = -1 !== this.pointers.indexOf(t);
                    if (i || !e)
                        if (i && !e)
                            this.onPointerUp(t);
                        else if (this.movedState[t.id] || (this.movedState[t.id] = t.x !== t.downX || t.y !== t.downY),
                        this.movedState[t.id])
                            switch (this.tracerState) {
                            case g:
                                this.onDrag1();
                                break;
                            case E:
                                this.onDrag2()
                            }
                }
            }
        }, {
            key: "dragCancel",
            value: function() {
                return this.tracerState === E && this.onDrag2End(),
                this.pointers.length = 0,
                e(this.movedState),
                this.tracerState = m,
                this
            }
        }, {
            key: "onDrag1Start",
            value: function() {
                this.emit("drag1start", this)
            }
        }, {
            key: "onDrag1End",
            value: function() {
                this.emit("drag1end", this)
            }
        }, {
            key: "onDrag1",
            value: function() {
                this.emit("drag1", this)
            }
        }, {
            key: "onDrag2Start",
            value: function() {
                this.emit("drag2start", this)
            }
        }, {
            key: "onDrag2End",
            value: function() {
                this.emit("drag2end", this)
            }
        }, {
            key: "onDrag2",
            value: function() {
                this.emit("drag2", this)
            }
        }, {
            key: "setRecongizedStateObject",
            value: function(t) {
                return this.recongizedState = t,
                this
            }
        }, {
            key: "cancel",
            value: function() {
                return this.state = _,
                this
            }
        }, {
            key: "distanceBetween",
            get: function() {
                if (this.tracerState !== E)
                    return 0;
                var t = this.pointers[0]
                  , e = this.pointers[1];
                return p(t.x, t.y, e.x, e.y)
            }
        }, {
            key: "angleBetween",
            get: function() {
                if (this.tracerState !== E)
                    return 0;
                var t = this.pointers[0]
                  , e = this.pointers[1];
                return l(t.x, t.y, e.x, e.y)
            }
        }, {
            key: "drag1Vector",
            get: function() {
                var t = this.pointers[0];
                if (t && this.movedState[t.id]) {
                    var e = t.position
                      , i = t.prevPosition;
                    y.x = e.x - i.x,
                    y.y = e.y - i.y
                } else
                    y.x = 0,
                    y.y = 0;
                return y
            }
        }, {
            key: "centerX",
            get: function() {
                if (this.tracerState !== E)
                    return 0;
                var t = this.pointers[0].position
                  , e = this.pointers[1].position;
                return (t.x + e.x) / 2
            }
        }, {
            key: "centerY",
            get: function() {
                if (this.tracerState !== E)
                    return 0;
                var t = this.pointers[0].position
                  , e = this.pointers[1].position;
                return (t.y + e.y) / 2
            }
        }, {
            key: "prevCenterX",
            get: function() {
                if (this.tracerState !== E)
                    return 0;
                var t = this.movedState[this.pointers[0].id] ? this.pointers[0].prevPosition : this.pointers[0].position
                  , e = this.movedState[this.pointers[1].id] ? this.pointers[1].prevPosition : this.pointers[1].position;
                return (t.x + e.x) / 2
            }
        }, {
            key: "prevCenterY",
            get: function() {
                if (this.tracerState !== E)
                    return 0;
                var t = this.movedState[this.pointers[0].id] ? this.pointers[0].prevPosition : this.pointers[0].position
                  , e = this.movedState[this.pointers[1].id] ? this.pointers[1].prevPosition : this.pointers[1].position;
                return (t.y + e.y) / 2
            }
        }, {
            key: "movementCenterX",
            get: function() {
                return this.centerX - this.prevCenterX
            }
        }, {
            key: "movementCenterY",
            get: function() {
                return this.centerY - this.prevCenterY
            }
        }, {
            key: "state",
            get: function() {
                return this.recongizedState.state
            },
            set: function(t) {
                this.recongizedState.state = t
            }
        }]),
        n
    }();
    Object.assign(d.prototype, r);
    var y = {}
      , m = 0
      , g = 1
      , E = 2
      , _ = "IDLE"
      , S = function(t, e, i) {
        if (t && "number" != typeof t) {
            if (t.hasOwnProperty(e))
                return t[e];
            if (-1 === e.indexOf("."))
                return i;
            for (var n = e.split("."), s = t, r = i, o = 0; o < n.length; o++) {
                if (!s.hasOwnProperty(n[o])) {
                    r = i;
                    break
                }
                r = s[n[o]],
                s = s[n[o]]
            }
            return r
        }
        return i
    }
      , k = function() {
        function o(t) {
            a(this, o);
            var e = S(t, "states", void 0);
            e && this.addStates(e);
            var i = S(t, "extend", void 0);
            if (i)
                for (var n in i)
                    this.hasOwnProperty(n) && void 0 !== this[n] || (this[n] = i[n]);
            var s = S(t, "eventEmitter", void 0)
              , r = S(t, "EventEmitterClass", void 0);
            this.setEventEmitter(s, r),
            this._stateLock = !1,
            this.resetFromJSON(t)
        }
        return t(o, [{
            key: "shutdown",
            value: function() {
                this.destroyEventEmitter()
            }
        }, {
            key: "destroy",
            value: function() {
                this.shutdown()
            }
        }, {
            key: "resetFromJSON",
            value: function(t) {
                this.setEnable(S(t, "enable", !0)),
                this.start(S(t, "start", void 0));
                var e = S(t, "init", void 0);
                return e && e.call(this),
                this
            }
        }, {
            key: "toJSON",
            value: function() {
                return {
                    curState: this.state,
                    prevState: this.prevState,
                    enable: this.enable,
                    start: this._start
                }
            }
        }, {
            key: "setEnable",
            value: function(t) {
                return void 0 === t && (t = !0),
                this.enable = t,
                this
            }
        }, {
            key: "start",
            value: function(t) {
                return this._start = t,
                this._prevState = void 0,
                this._state = t,
                this
            }
        }, {
            key: "goto",
            value: function(t) {
                return null != t && (this.state = t),
                this
            }
        }, {
            key: "next",
            value: function() {
                var t, e = this["next_" + this.state];
                return e && (t = "string" == typeof e ? e : e.call(this)),
                this.goto(t),
                this
            }
        }, {
            key: "addState",
            value: function(t, e) {
                var i = S(e, "next", void 0);
                i && (this["next_" + t] = i);
                var n = S(e, "exit", void 0);
                n && (this["exit_" + t] = n);
                var s = S(e, "enter", void 0);
                return s && (this["enter_" + t] = s),
                this
            }
        }, {
            key: "addStates",
            value: function(t) {
                for (var e in t)
                    this.addState(e, t[e]);
                return this
            }
        }, {
            key: "update",
            value: function(t, e, i) {
                void 0 === i && (i = "update");
                var n = this[i + "_" + this.state];
                n && n.call(this, t, e)
            }
        }, {
            key: "preupdate",
            value: function(t, e) {
                this.update(t, e, "preupdate")
            }
        }, {
            key: "postupdate",
            value: function(t, e) {
                this.update(t, e, "postupdate")
            }
        }, {
            key: "state",
            set: function(t) {
                if (this.enable && !this._stateLock && this._state !== t) {
                    if (this._prevState = this._state,
                    this._state = t,
                    this._stateLock = !0,
                    this.emit("statechange", this),
                    null != this._prevState) {
                        var e = "exit_" + this._prevState
                          , i = this[e];
                        i && i.call(this),
                        this.emit(e, this)
                    }
                    if (this._stateLock = !1,
                    null != this._state) {
                        var n = "enter_" + this._state
                          , s = this[n];
                        s && s.call(this),
                        this.emit(n, this)
                    }
                }
            },
            get: function() {
                return this._state
            }
        }, {
            key: "prevState",
            get: function() {
                return this._prevState
            }
        }]),
        o
    }();
    Object.assign(k.prototype, r);
    var b = Phaser.Utils.Objects.GetValue
      , w = function() {
        s(o, d);
        var r = c(o);
        function o(t, e) {
            var i;
            a(this, o);
            var n = u(i = r.call(this, t, e))
              , s = {
                states: {
                    IDLE: {
                        enter: function() {
                            n.prevDistance = void 0,
                            n.scaleFactor = 1
                        }
                    },
                    BEGIN: {},
                    RECOGNIZED: {
                        enter: function() {
                            n.emit("pinchstart", n)
                        },
                        exit: function() {
                            n.emit("pinchend", n)
                        }
                    }
                },
                init: function() {
                    this.state = D
                },
                eventEmitter: !1
            };
            return i.setRecongizedStateObject(new k(s)),
            i
        }
        return t(o, [{
            key: "resetFromJSON",
            value: function(t) {
                return v(h(o.prototype), "resetFromJSON", this).call(this, t),
                this.setDragThreshold(b(t, "threshold", 0)),
                this
            }
        }, {
            key: "onDrag2Start",
            value: function() {
                this.scaleFactor = 1,
                this.prevDistance = this.distanceBetween,
                this.state = 0 === this.dragThreshold ? P : O
            }
        }, {
            key: "onDrag2End",
            value: function() {
                this.state = D
            }
        }, {
            key: "onDrag2",
            value: function() {
                switch (this.state) {
                case O:
                    if (this.pointers[0].getDistance() >= this.dragThreshold && this.pointers[1].getDistance() >= this.dragThreshold) {
                        var t = this.distanceBetween;
                        this.scaleFactor = t / this.prevDistance,
                        this.prevDistance = t,
                        this.state = P
                    }
                    break;
                case P:
                    t = this.distanceBetween;
                    this.scaleFactor = t / this.prevDistance,
                    this.emit("pinch", this),
                    this.prevDistance = t
                }
            }
        }, {
            key: "setDragThreshold",
            value: function(t) {
                return this.dragThreshold = t,
                this
            }
        }, {
            key: "isPinch",
            get: function() {
                return this.state === P
            }
        }]),
        o
    }()
      , D = "IDLE"
      , O = "BEGIN"
      , P = "RECOGNIZED";
    return function() {
        s(i, Phaser.Plugins.BasePlugin);
        var e = c(i);
        function i(t) {
            return a(this, i),
            e.call(this, t)
        }
        return t(i, [{
            key: "start",
            value: function() {
                this.game.events.on("destroy", this.destroy, this)
            }
        }, {
            key: "add",
            value: function(t, e) {
                return new w(t,e)
            }
        }]),
        i
    }()
});
