(function() {

// compiled from Hot Cocoa Lisp

var canvas, ctx, mandelbrot, format = function(f,v){var i=0;return f.replace(/~([a-zA-Z0-9_]*)~/g,function(_,k){if(k===''){k=i;i++;}if(v[k]===undefined){return'';}return v[k];})}, color, params, draw;

// (def canvas (first (document.getElementsByTagName "canvas")))

canvas = document["getElementsByTagName"]("canvas")[0];

// (def ctx (canvas.getContext "2d"))

ctx = canvas["getContext"]("2d");

// (set canvas.height window.innerHeight)

(canvas["height"] = window["innerHeight"]);

// (set canvas.width window.innerWidth)

(canvas["width"] = window["innerWidth"]);

// (def mandelbrot
//      (# (r i maxIter)
//         (var iter 0)
//         (var zr r) (var zi i) ; z = c
//         (var zr^2 (square r)) (var zi^2 (square i)) ; zi^2 and zr^2
//         (var loop 1) ; max orbit size to check for
//         (var lr 0) (var li 0) ; orbit checker
//         (until (or (= iter maxIter) (and (= lr zr) (= li zi))
//                    (<= 4 (+ zr^2 zi^2)))
//                (++ iter)
//                (when (= loop iter) (set lr zr) (set li zi) (set+ loop loop)) ; grow loop
//                (set zr^2 (square zr)) (set zi^2 (square zi)) ; zi^2 and zr^2
//                (set* zi zr) (set+ zi zi) (set+ zi i) ; zi = 2*zi*zr + ci
//                (set zr (- zr^2 zi^2)) (set+ zr r)) ; zr = zr^2 - zi^2 + cr
//         (if (or (= iter maxIter) (and (= lr zr) (= li zi))) null iter)))

mandelbrot = (function (r, i, maxIter) {var iter, zr, zi, zr_caret_2, zi_caret_2, loop, lr, li; iter = 0; zr = r; zi = i; zr_caret_2 = (r * r); zi_caret_2 = (i * i); loop = 1; lr = 0; li = 0; (function() {while (! (((iter === maxIter)) || (((lr === zr)) && ((li === zi))) || ((4 <= (zr_caret_2 + zi_caret_2))))) { iter++; (((loop === iter)) && (function() { (lr = zr); (li = zi); return (loop += loop); }).call(this)); (zr_caret_2 = (zr * zr)); (zi_caret_2 = (zi * zi)); (zi *= zr); (zi += zi); (zi += i); (zr = (zr_caret_2 - zi_caret_2)); (zr += r); }}).call(this); return ((((iter === maxIter)) || (((lr === zr)) && ((li === zi)))) ? null : iter); });

// (def color
//      (# (n)
//         (if (nil? n) "rgb(0,0,0)"
//           (begin
//            (set n (mod (* 32 n) 768))
//            (format "rgb(~~,~~,~~)"
//                    (cond
//                     ((< n 256) [ (- 255 n) n 0 ])
//                     ((< n 512) [ 0 (- 511 n) (- n 256) ])
//                     (true [ (- n 512) 0 (- 767 n) ])))))))

color = (function (n) {  return ((n === null || n === undefined) ? "rgb(0,0,0)" : (function() { (n = ((32 * n) % 768)); return format("rgb(~~,~~,~~)", (((n < 256)) ? [(255 - n), n, 0] : ((n < 512)) ? [0, (511 - n), (n - 256)] : true ? [(n - 512), 0, (767 - n)] : undefined)); }).call(this)); });

// (var params { r 0 i 0 range 4 maxIter 30 })

params = { "r": 0, "i": 0, "range": 4, "maxIter": 30 };

// (def draw
//      (# ()
//         (times (r canvas.width)
//                (times (i canvas.height)
//                       (var calc (mandelbrot
//                                  (+ (/ (* params.range r) canvas.width)
//                                     (- (half params.range)) params.r)
//                                  (+ (/ (* params.range i) canvas.height)
//                                     (- (half params.range)) params.i)
//                                  params.maxIter))
//                       (set ctx.fillStyle (color calc))
//                       (ctx.fillRect r i 1 1)))))

draw = (function () {var r, i, calc;  return (function() {for (r = 0; r < canvas["width"]; r++) { (function() {for (i = 0; i < canvas["height"]; i++) { calc = mandelbrot((((params["range"] * r) / canvas["width"]) + (- (params["range"] / 2)) + params["r"]), (((params["range"] * i) / canvas["height"]) + (- (params["range"] / 2)) + params["i"]), params["maxIter"]); (ctx["fillStyle"] = color(calc)); ctx["fillRect"](r, i, 1, 1); }}).call(this); }}).call(this); });

// (draw)

draw();

// (document.addEventListener "keyup"
//                            (# (e)
//                               (cond
//                                ((= e.keyCode 81) ; q
//                                 (begin
//                                  (set* params.range 2/3)
//                                  (++ params.maxIter)
//                                  (draw)))
//                                ((= e.keyCode 87) ; w
//                                 (begin
//                                  (set- params.i (/ params.range 3))
//                                  (draw)))
//                                ((= e.keyCode 69) ; e
//                                 (begin
//                                  (set* params.range 3/2)
//                                  (-- params.maxIter)
//                                  (draw)))
//                                ((= e.keyCode 65) ; a
//                                 (begin
//                                  (set- params.r (/ params.range 3))
//                                  (draw)))
//                                ((= e.keyCode 83) ; s
//                                 (begin
//                                  (set+ params.i (/ params.range 3))
//                                  (draw)))
//                                ((= e.keyCode 68) ; d
//                                 (begin
//                                  (set+ params.r (/ params.range 3))
//                                  (draw))))))

document["addEventListener"]("keyup", (function (e) {  return (((e["keyCode"] === 81)) ? (function() { (params["range"] *= (2/3)); params["maxIter"]++; return draw(); }).call(this) : ((e["keyCode"] === 87)) ? (function() { (params["i"] -= (params["range"] / 3)); return draw(); }).call(this) : ((e["keyCode"] === 69)) ? (function() { (params["range"] *= (3/2)); params["maxIter"]--; return draw(); }).call(this) : ((e["keyCode"] === 65)) ? (function() { (params["r"] -= (params["range"] / 3)); return draw(); }).call(this) : ((e["keyCode"] === 83)) ? (function() { (params["i"] += (params["range"] / 3)); return draw(); }).call(this) : ((e["keyCode"] === 68)) ? (function() { (params["r"] += (params["range"] / 3)); return draw(); }).call(this) : undefined); }));

}).call(this);