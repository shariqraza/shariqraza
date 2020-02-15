/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // andthat the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
          /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );
  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
        .then(function(registration) {
          // updatefound is fired if service-worker.js changes.
          registration.onupdatefound = function() {
            // updatefound is also fired the very first time the SW is installed,
            // and there's no need to prompt for a reload at that point.
            // So check here to see if the page is already controlled,
            // i.e. whether there's an existing service worker.
            if (navigator.serviceWorker.controller) {
              // The updatefound event implies that registration.installing is set:
              // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
              var installingWorker = registration.installing;

              installingWorker.onstatechange = function() {
                switch (installingWorker.state) {
                  case 'installed':
                    // At this point, the old content will have been purged and the
                    // fresh content will have been added to the cache.
                    // It's the perfect time to display a "New content is
                    // available; please refresh." message in the page's interface.
                    break;

                  case 'redundant':
                    throw new Error('The installing ' +
                        'service worker became redundant.');

                  default:
                    // Ignore
                }
              };
            }
          };
        }).catch(function(e) {
          console.error('Error during service worker registration:', e);
        });
  }
  // testing comment
  // custom
  (function(global) {
  /**
     * Generates random stars using canvas
     * @class Stars
     * @constructor
     */
    function Stars() {
      this.colors = [
        '255, 255, 255',
        '119, 221, 255'
      ];
      this.minRadius = 0.3;
      this.maxRadius = 1.3;
      // 0.05, fast -> 5
      this.minSpeed = 0.09;
      // 0.15, fast -> 20
      this.maxSpeed = 0.21;
      this.fps = 30;
      this.numStars = 400;
      this.canvas = document.getElementById('canvas');
      this.ctx = this.canvas.getContext('2d');
    }

    /**
     * Initializes everything
     * @method init
     */
    Stars.prototype.init = function() {
      this.render();
      this.createCircle();
    };
    /**
     * generates random number between min and max values
     * @param  {number} min value
     * @param  {number} max malue
     * @return {number} random number between min and max
     * @method _rand
     */
    Stars.prototype._rand = function(min, max) {
      return Math.random() * (max - min) + min;
    };
    /**
     * Sets canvas size and updates values on resize
     * @method render
     */
    Stars.prototype.render = function() {
      var self = this, wHeight = window.innerHeight, wWidth = window.innerWidth;
      self.canvas.width = wWidth;
      self.canvas.height = wHeight;
      window.addEventListener('resize', self.render);
    };
    /**
     * Randomly creates star attributes
     * @method createCircle
     */
    Stars.prototype.createCircle = function() {
      var star = [];
      var myStar = this;
      for (var i = 0; i < this.numStars; i++) {
        var self = this;
        var color = self.colors[~~(self._rand(0, self.colors.length))];
        star[i] = {
          radius: self._rand(self.minRadius, self.maxRadius),
          xPos: self._rand(0, self.canvas.width),
          yPos: self._rand(0, self.canvas.height),
          xVelocity: self._rand(self.minSpeed, self.maxSpeed),
          yVelocity: self._rand(self.minSpeed, self.maxSpeed),
          color: 'rgba(' + color + ',' + 1 + ')'
        };
        // once values are determined, draw star on canvas
        self.draw(star, i);
      }
      // ...and once drawn, animate the star
      myStar.animate(star);
    };
    /**
     * Draws stars on canvas
     * @param  {array} star array from createCircle method
     * @param  {number} i value from createCircle method
     * @method draw
     */
    Stars.prototype.draw = function(star, i) {
      var self = this, ctx = self.ctx;
      ctx.fillStyle = star[i].color;
      ctx.beginPath();
      ctx.arc(star[i].xPos, star[i].yPos, star[i].radius, 0, 2 * Math.PI, false);
      ctx.fill();
    };
    /**
     * Animates stars
     * @param  {array} star value from createCircle & draw methods
     * @method animate
     */
    Stars.prototype.animate = function(star) {
      var self = this;
      setInterval(function() {
        // clears canvas self.numStars;
        self.clearCanvas();
        // then redraws stars in new positions based on velocity
        for (var i = 0; i < self.numStars; i++) {
          star[i].xPos -= star[i].xVelocity;
          // if star goes off screen call reset method to place it offscreen to the right
          if (star[i].xPos < 0) {
            self.resetStar(star, i);
          } else {
            self.draw(star, i);
          }
        }
      }, 1000 / self.fps);
    };
    /**
     * Resets position of star when it goes off screen
     * @param  {array} star value from createCircle & draw methods
     * @param  {number} i value from createCircle method
     * @method resetStar
     */
    Stars.prototype.resetStar = function(star, i) {
      var self = this;
      star[i].xPos += self.canvas.width + star[i].radius;
      star[i].yPos = self._rand(0, self.canvas.height);
      self.draw(star, i);
    };
    /**
     * Clears canvas between animation frames
     * @method clearCanvas
     */
    Stars.prototype.clearCanvas = function() {
      var self = this;
      this.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
    };
  // go go go!
  // RESET THE BELOW LINE
    var Allstars = new Stars().init();
  })(window);
  /**
   * Imagesloaded init
   */
})();
