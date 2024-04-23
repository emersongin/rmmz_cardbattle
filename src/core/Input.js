Input.isAnyKeyActiveIn = function(keys = []) {
  return keys.some(key => this._latestButton === key);
};