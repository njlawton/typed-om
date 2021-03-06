// Copyright 2015 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//     You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//     See the License for the specific language governing permissions and
// limitations under the License.

(function(internal, scope) {

  function Skew(ax, ay) {
    if (arguments.length != 2) {
      throw new TypeError('Skew must have 2 arguments.');
    } else if (typeof ax != 'number' || typeof ay != 'number') {
      throw new TypeError('Skew arguments must be of type \'number\'.');
    }

    this.ax = ax;
    this.ay = ay;

    this._matrix = this._computeMatrix();
    this.cssString = this._generateCssString();
  }
  internal.inherit(Skew, internal.TransformComponent);

  Skew._tanDegrees = function(degrees) {
    var radians = degrees * Math.PI / 180;
    return Math.tan(radians);
  };

  Skew.prototype.asMatrix = function() {
    return this._matrix;
  };

  Skew.prototype._computeMatrix = function() {
    // Skew represented by the 2D matrix:
    //   1     tan(ax)  0
    // tan(ay)    1     0

    var tanAx = Skew._tanDegrees(this.ax);
    var tanAy = Skew._tanDegrees(this.ay);
    return new Matrix(1, tanAy, tanAx, 1, 0, 0);
  };

  Skew.prototype._generateCssString = function() {
    return 'skew(' + this.ax + ', ' + this.ay + ')';
  };

  scope.Skew = Skew;

})(typedOM.internal, window);
