# HCL Canvas Mandelbrot Explorer #

I've written a mandelbrot set explorer for the HTML5 canvas in [Hot Cocoa Lisp](https://github.com/olleicua/hcl)

## Setup ##

### To use the explorer ###

1. `git clone git@github.com:olleicua/hcl-canvas-mandelbrot.git`
2. open hcl-canvas-mandelbrot/mandelbrot.html in a web browser
3. use `w`, `a`, `s`, and `d` to move around, `q` to zoom in, and `e` to zoom out

### For devs ###

Install:

1. `npm -g install hot-cocoa-lisp`
2. `git clone git@github.com:olleicua/hcl-canvas-mandelbrot.git`
3. `cd hcl-canvas-mandelbrot`

And compile:

1. `hcl -b mandelbrot.hcl`

## Optimizations ##

I'm using two notable optimizations so far:

### Only multiply three times per loop ###

Without this optimization we would have:

```
While (zr * zr) + (zi * zi) < 4
  zr = (zr * zr) - (zi * zi) + cr
  zi = (2 * zr * zi) + ci
```

Multiplication is expensive and there are six of them here.  Instead I used an optimization I found here: http://randomascii.wordpress.com/2011/08/13/faster-fractals-through-algebra/

```
zrsqr = zr * zr;
zisqr = zi * zi;
While zrsqr + zisqr < 4
  zi *= zr
  zi += zi
  zi += ci;
  zr = zrsqr – zisqr + cr
  zrsqr = (zr * zr)
  zisqr = (zi * zi)
}
```

### Check for periodic behaviour ###

I used a technique described here (http://locklessinc.com/articles/mandelbrot/) to check whether the cycle of `z`s enters a loop and stop immediately if it does rather than continuing on to `maxIter`

## Screenshots ##

![alt tag](https://github.com/olleicua/hcl-canvas-mandelbrot/blob/master/image1.png)
![alt tag](https://github.com/olleicua/hcl-canvas-mandelbrot/blob/master/image2.png)
![alt tag](https://github.com/olleicua/hcl-canvas-mandelbrot/blob/master/image3.png)
![alt tag](https://github.com/olleicua/hcl-canvas-mandelbrot/blob/master/image4.png)
