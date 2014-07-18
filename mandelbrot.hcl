(def canvas (first (document.getElementsByTagName "canvas")))
(def ctx (canvas.getContext "2d"))

(set canvas.height window.innerHeight)
(set canvas.width window.innerWidth)

(def mandelbrot
     (# (r i maxIter)
        (var iter 0)
        (var zr r) (var zi i) ; z = c
        (var zr^2 (square r)) (var zi^2 (square i)) ; zi^2 and zr^2
        (var loop 1) ; max orbit size to check for
        (var lr 0) (var li 0) ; orbit checker
        (until (or (= iter maxIter) (and (= lr zr) (= li zi))
                   (<= 4 (+ zr^2 zi^2)))
               (++ iter)
               (when (= loop iter) (set lr zr) (set li zi) (set+ loop loop)) ; grow loop
               (set zr^2 (square zr)) (set zi^2 (square zi)) ; zi^2 and zr^2
               (set* zi zr) (set+ zi zi) (set+ zi i) ; zi = 2*zi*zr + ci
               (set zr (- zr^2 zi^2)) (set+ zr r)) ; zr = zr^2 - zi^2 + cr
        (if (or (= iter maxIter) (and (= lr zr) (= li zi))) null iter)))

(def color
     (# (n)
        (if (nil? n) "rgb(0,0,0)"
          (begin
           (set n (mod (* 32 n) 768))
           (format "rgb(~~,~~,~~)"
                   (cond
                    ((< n 256) [ (- 255 n) n 0 ])
                    ((< n 512) [ 0 (- 511 n) (- n 256) ])
                    (true [ (- n 512) 0 (- 767 n) ])))))))

(var params { r 0 i 0 range 4 maxIter 30 })

(def draw
     (# ()
        (times (r canvas.width)
               (times (i canvas.height)
                      (var calc (mandelbrot
                                 (+ (/ (* params.range r) canvas.width)
                                    (- (half params.range)) params.r)
                                 (+ (/ (* params.range i) canvas.height)
                                    (- (half params.range)) params.i)
                                 params.maxIter))
                      (set ctx.fillStyle (color calc))
                      (ctx.fillRect r i 1 1)))))

(draw)

(document.addEventListener "keyup"
                           (# (e)
                              (cond
                               ((= e.keyCode 81) ; q
                                (begin
                                 (set* params.range 2/3)
                                 (++ params.maxIter)
                                 (draw)))
                               ((= e.keyCode 87) ; w
                                (begin
                                 (set- params.i (/ params.range 3))
                                 (draw)))
                               ((= e.keyCode 69) ; e
                                (begin
                                 (set* params.range 3/2)
                                 (-- params.maxIter)
                                 (draw)))
                               ((= e.keyCode 65) ; a
                                (begin
                                 (set- params.r (/ params.range 3))
                                 (draw)))
                               ((= e.keyCode 83) ; s
                                (begin
                                 (set+ params.i (/ params.range 3))
                                 (draw)))
                               ((= e.keyCode 68) ; d
                                (begin
                                 (set+ params.r (/ params.range 3))
                                 (draw))))))

