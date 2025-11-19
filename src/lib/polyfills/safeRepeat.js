/* Safe seatbelt for String.repeat: clamps negative counts to 0 */
(function () {
  if (typeof String.prototype.repeat !== "function") return;
  if (String.prototype.__safeWrapped) return;
  const _orig = String.prototype.repeat;
  Object.defineProperty(String.prototype, "__origRepeat__", { value: _orig });
  String.prototype.repeat = function (count) {
    const n = Number.isFinite(count) ? Math.floor(count) : 0;
    const safe = Math.max(0, n);
    return _orig.call(this, safe);
  };
  Object.defineProperty(String.prototype, "__safeWrapped", { value: true });
})();
