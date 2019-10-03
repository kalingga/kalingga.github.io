! function(e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var o in e) n.d(r, o, function(t) {
                return e[t]
            }.bind(null, o));
        return r
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 358)
}({
    358: function(e, t, n) {
        "use strict";
        console.log("WORKER: executing.");
        var r = "v1::",
            o = ["", "style.css"];
        self.addEventListener("install", function(e) {
            console.log("WORKER: install event in progress."), e.waitUntil(caches.open(r + "fundamentals").then(function(e) {
                return e.addAll(o)
            }).then(function() {
                console.log("WORKER: install completed")
            }))
        }), self.addEventListener("fetch", function(e) {
            console.log("WORKER: fetch event in progress."), "GET" === e.request.method ? e.respondWith(caches.match(e.request).then(function(t) {
                var n = fetch(e.request).then(function(t) {
                    var n = t.clone();
                    return console.log("WORKER: fetch response from network.", e.request.url), caches.open(r + "pages").then(function(t) {
                        return t.put(e.request, n)
                    }).then(function() {
                        console.log("WORKER: fetch response stored in cache.", e.request.url)
                    }), t
                }, o).catch(o);
                return console.log("WORKER: fetch event", t ? "(cached)" : "(network)", e.request.url), t || n;

                function o() {
                    return console.log("WORKER: fetch request failed in both cache and network."), new Response("<h1>Oops..!!!</h1>", {
                        status: 503,
                        statusText: "Oops..!!!, Jaringan Offline",
                        headers: new Headers({
                            "Content-Type": "text/html"
                        })
                    })
                }
            })) : console.log("WORKER: fetch event ignored.", e.request.method, e.request.url)
        }), self.addEventListener("activate", function(e) {
            console.log("WORKER: activate event in progress."), e.waitUntil(caches.keys().then(function(e) {
                return Promise.all(e.filter(function(e) {
                    return !e.startsWith(r)
                }).map(function(e) {
                    return caches.delete(e)
                }))
            }).then(function() {
                console.log("WORKER: activate completed.")
            }))
        })
    }
});