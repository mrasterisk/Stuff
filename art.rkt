;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-advanced-reader.ss" "lang")((modname art) (read-case-sensitive #t) (teachpacks ()) (htdp-settings #(#t constructor repeating-decimal #t #t none #f () #f)))
(require picturing-programs)
(require racket)

(define size 256)
(define height (* (/ size 2) (sqrt 3)))

(define tri (triangle size "solid" "black"))

(define steps 5)
(define (flake brightness)
  (for/fold ((img (triangle 256 "solid" (make-color (round brightness) (round brightness) (round brightness) 255))))
            ([i steps])
    (scale (expt 3 -1)
           (rotate -60
                   (above img
                          (rotate 120
                                  (above img
                                         (scale 3
                                                (rotate-180 (triangle 256 "solid" (make-color (round brightness) (round brightness) (round brightness) 255)))))))))))


(define (layer depth time)
  (shift (scale (/ 1 (+ 1 depth))
                    (beside (above (flip-vertical (flake (- 255 (/ 255 (+ 1 depth)))))
                                   (flake (- 255 (/ 255 (+ 1 depth)))))
                            (above (flip-vertical (flake (- 255 (/ 255 (+ 1 depth)))))
                                   (flake (- 255 (/ 255 (+ 1 depth)))))))
             (round (/ (* time (/ size 64)) (+ 1 depth)))))

(define (shift image dist)
  (crop-left (crop-right (beside image image)
                         (- (image-width image) (modulo dist (image-width image))))
             (modulo dist (image-width image))))

(define layers 20)

(define (frame time)
  (for/fold ((img (layer 0 time)))
            ([i layers])
    (overlay img
             (above (above (rectangle (* 2 size) (/ height 2) "solid" (make-color (round (- 255 (/ 255 (+ 1 i)))) (round (- 255 (/ 255 (+ 1 i)))) (round (- 255 (/ 255 (+ 1 i)))) 255))
                           (for/fold ((img2 (layer i time)))
                                     ([j i])
                             (beside img2 (layer i time))))
                    (rectangle (* 2 size) (/ height 2) "solid" (make-color (round (- 255 (/ 255 (+ 1 i)))) (round (- 255 (/ 255 (+ 1 i)))) (round (- 255 (/ 255 (+ 1 i)))) 255))))))

(animate frame)

;Record frames
#|
(for ([k 64])
  (save-image (overlay (frame k) (rectangle (* 2 size) (* 2 height) "solid" "white")) (string-append (~a k) ".png")))
|#
