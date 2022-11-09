"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserStats = exports.getAdminStats = void 0;
var _Score = _interopRequireDefault(require("../models/Score"));
var _User = _interopRequireDefault(require("../models/User"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _config = _interopRequireDefault(require("../config"));
var _School = _interopRequireDefault(require("../models/School"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var getUserStats = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var token, decoded, user;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            token = req.headers["x-access-token"];
            if (token) {
              _context.next = 4;
              break;
            }
            return _context.abrupt("return", res.status(403).json({
              message: "No token provided"
            }));
          case 4:
            _context.next = 6;
            return _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
          case 6:
            decoded = _context.sent;
            _context.next = 9;
            return _User["default"].findById(decoded.id, {
              password: 0,
              roles: 0
            });
          case 9:
            user = _context.sent;
            if (user) {
              _context.next = 12;
              break;
            }
            return _context.abrupt("return", res.status(404).json({
              message: "No user found"
            }));
          case 12:
            res.status(201).json({
              tiempo_total_invertido: user.tiempo_invertido[1] + user.tiempo_invertido[2] + user.tiempo_invertido[3],
              minijuego1: {
                puntaje_maximo: user.puntajes_maximos[1],
                tiempo_invertido: user.tiempo_invertido[1]
              },
              minijuego2: {
                puntaje_maximo: user.puntajes_maximos[2],
                tiempo_invertido: user.tiempo_invertido[2]
              },
              minijuego3: {
                puntaje_maximo: user.puntajes_maximos[3],
                tiempo_invertido: user.tiempo_invertido[3]
              }
            });
            _context.next = 19;
            break;
          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(401).json({
              message: "Unauthorized"
            }));
          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 15]]);
  }));
  return function getUserStats(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getUserStats = getUserStats;
var getAdminStats = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var token, decoded, user;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            token = req.headers["x-access-token"];
            if (token) {
              _context2.next = 4;
              break;
            }
            return _context2.abrupt("return", res.status(403).json({
              message: "No token provided"
            }));
          case 4:
            _context2.next = 6;
            return _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
          case 6:
            decoded = _context2.sent;
            _context2.next = 9;
            return _User["default"].findById(decoded.id, {
              password: 0,
              roles: 0
            });
          case 9:
            user = _context2.sent;
            if (user) {
              _context2.next = 12;
              break;
            }
            return _context2.abrupt("return", res.status(404).json({
              message: "No user found"
            }));
          case 12:
            _context2.t0 = res.status(201);
            _context2.next = 15;
            return _User["default"].find({
              genero: "H"
            });
          case 15:
            _context2.next = 17;
            return _context2.sent.length;
          case 17:
            _context2.t1 = _context2.sent;
            _context2.next = 20;
            return _User["default"].find({
              genero: "M"
            });
          case 20:
            _context2.next = 22;
            return _context2.sent.length;
          case 22:
            _context2.t2 = _context2.sent;
            _context2.t3 = {
              hombres: _context2.t1,
              mujeres: _context2.t2
            };
            _context2.next = 26;
            return getUsersXSchool();
          case 26:
            _context2.t4 = _context2.sent;
            _context2.next = 29;
            return usersAverageScore();
          case 29:
            _context2.t5 = _context2.sent;
            _context2.t6 = {
              hombres_vs_mujeres: _context2.t3,
              usuarios_x_colegio: _context2.t4,
              promedio_puntajes_maximos: _context2.t5
            };
            _context2.t0.json.call(_context2.t0, _context2.t6);
            _context2.next = 38;
            break;
          case 34:
            _context2.prev = 34;
            _context2.t7 = _context2["catch"](0);
            console.log(_context2.t7);
            return _context2.abrupt("return", res.status(401).json({
              message: "Unauthorized"
            }));
          case 38:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 34]]);
  }));
  return function getAdminStats(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getAdminStats = getAdminStats;
var usersAverageScore = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var min1, min2, min3, users, index, element;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            min1 = 0;
            min2 = 0;
            min3 = 0;
            _context3.next = 5;
            return _User["default"].find();
          case 5:
            users = _context3.sent;
            index = 0;
          case 7:
            if (!(index < users.length)) {
              _context3.next = 17;
              break;
            }
            element = users[index];
            if (!(element.id_colegio == undefined)) {
              _context3.next = 11;
              break;
            }
            return _context3.abrupt("continue", 14);
          case 11:
            min1 += element.puntajes_maximos[1];
            min2 += element.puntajes_maximos[2];
            min3 += element.puntajes_maximos[3];
          case 14:
            index++;
            _context3.next = 7;
            break;
          case 17:
            min1 /= users.length - 1;
            min2 /= users.length - 1;
            min3 /= users.length - 1;
            return _context3.abrupt("return", {
              minijuego1: min1,
              minijuego2: min2,
              minijuego3: min3
            });
          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function usersAverageScore(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
function getUsersXSchool() {
  return _getUsersXSchool.apply(this, arguments);
}
function _getUsersXSchool() {
  _getUsersXSchool = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var schools, users, objectSchools, index, element, _index, _element;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _School["default"].find();
          case 2:
            schools = _context4.sent;
            _context4.next = 5;
            return _User["default"].find().populate("id_colegio");
          case 5:
            users = _context4.sent;
            objectSchools = {};
            for (index = 0; index < schools.length; index++) {
              element = schools[index];
              objectSchools[element.name] = 0;
            }
            _index = 0;
          case 9:
            if (!(_index < users.length)) {
              _context4.next = 17;
              break;
            }
            _element = users[_index];
            if (!(_element.id_colegio == undefined)) {
              _context4.next = 13;
              break;
            }
            return _context4.abrupt("continue", 14);
          case 13:
            objectSchools[_element.id_colegio.name]++;
          case 14:
            _index++;
            _context4.next = 9;
            break;
          case 17:
            return _context4.abrupt("return", objectSchools);
          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getUsersXSchool.apply(this, arguments);
}
function userAverageScore(_x7) {
  return _userAverageScore.apply(this, arguments);
}
function _userAverageScore() {
  _userAverageScore = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(userId) {
    var scores, averageScore, index, element;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _Score["default"].find({
              id_usuario: userId
            });
          case 2:
            scores = _context5.sent;
            averageScore = 0;
            for (index = 0; index < scores.length; index++) {
              element = scores[index];
              averageScore += element.respuestas_correctas;
            }
            return _context5.abrupt("return", averageScore /= scores.length);
          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _userAverageScore.apply(this, arguments);
}
function userScoreHistory(_x8) {
  return _userScoreHistory.apply(this, arguments);
}
function _userScoreHistory() {
  _userScoreHistory = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(userId) {
    var scores;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _Score["default"].find({
              id_usuario: userId
            }, {
              _id: 0,
              id_usuario: 0,
              updatedAt: 0
            });
          case 2:
            scores = _context6.sent;
            return _context6.abrupt("return", scores);
          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _userScoreHistory.apply(this, arguments);
}
function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || m === 0 && today.getDate() < birthDate.getDate()) {
    age--;
  }
  return age;
}
function getGuidesXHighScore() {
  return _getGuidesXHighScore.apply(this, arguments);
}
function _getGuidesXHighScore() {
  _getGuidesXHighScore = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    var guides, users, guidesObject, index, position, key, element;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            guides = Guide.find();
            _context7.next = 3;
            return _User["default"].find();
          case 3:
            users = _context7.sent;
            _context7.t0 = createGuidesXHighScoreObject;
            _context7.next = 7;
            return guides;
          case 7:
            _context7.t1 = _context7.sent.length;
            guidesObject = (0, _context7.t0)(_context7.t1);
            for (index = 0; index < users.length; index++) {
              position = users[index].guias_completadas.length;
              guidesObject[position] = {
                num_usuarios: guidesObject[position].num_usuarios + 1,
                sum_high_score: guidesObject[position].sum_high_score + users[index].high_score
              };
            }
            for (key in guidesObject) {
              element = guidesObject[key];
              guidesObject[key] = {
                num_usuarios: element.num_usuarios,
                avg_high_score: element.sum_high_score / (element.num_usuarios == 0 ? 1 : element.num_usuarios)
              };
            }
            return _context7.abrupt("return", guidesObject);
          case 12:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _getGuidesXHighScore.apply(this, arguments);
}
function createGuidesXHighScoreObject(numGuias) {
  var guidesObject = {};
  for (var index = 0; index <= numGuias; index++) {
    guidesObject[index] = {
      num_usuarios: 0,
      sum_high_score: 0
    };
  }
  return guidesObject;
}
function getAgeXHighScore() {
  return _getAgeXHighScore.apply(this, arguments);
}
function _getAgeXHighScore() {
  _getAgeXHighScore = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return getUsersScoresAndAge();
          case 2:
            return _context8.abrupt("return", _context8.sent);
          case 3:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _getAgeXHighScore.apply(this, arguments);
}
function getUsersScoresAndAge() {
  return _getUsersScoresAndAge.apply(this, arguments);
} //numero de intervalos
function _getUsersScoresAndAge() {
  _getUsersScoresAndAge = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
    var users, ageMin, ageMax, index, element, m, r, c, statsObjectj, _index2, _element2, key, value, _element3;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _User["default"].find({}, {
              _id: 0,
              username: 0,
              nombres: 0,
              apellidos: 0,
              email: 0,
              password: 0,
              roles: 0,
              guias_completadas: 0,
              createdAt: 0,
              updatedAt: 0
            });
          case 2:
            users = _context9.sent;
            ageMin = getAge(users[0].fecha_nacimiento);
            ageMax = getAge(users[0].fecha_nacimiento);
            for (index = 0; index < users.length; index++) {
              element = users[index];
              users[index] = {
                high_score: element.high_score,
                age: getAge(element.fecha_nacimiento)
              };
              if (users[index].age > ageMax) ageMax = users[index].age;
              if (users[index].age < ageMin) ageMin = users[index].age;
            }
            m = getNumIntervalos(users.length);
            r = getRango(ageMax, ageMin);
            c = getAmplitud(r, m);
            statsObjectj = crearObjetoIntervalos(ageMax, ageMin, m, r, c);
            _index2 = 0;
          case 11:
            if (!(_index2 < users.length)) {
              _context9.next = 32;
              break;
            }
            _element2 = users[_index2];
            _context9.t0 = _regeneratorRuntime().keys(statsObjectj);
          case 14:
            if ((_context9.t1 = _context9.t0()).done) {
              _context9.next = 29;
              break;
            }
            key = _context9.t1.value;
            value = statsObjectj[key];
            if (!(_element2.age == ageMin)) {
              _context9.next = 22;
              break;
            }
            statsObjectj[key].num_usuarios += 1;
            statsObjectj[key].high_score_avg += _element2.high_score;
            statsObjectj[key].usuarios.push(_element2);
            return _context9.abrupt("break", 29);
          case 22:
            if (!(_element2.age > value.edad_min && _element2.age <= value.edad_max)) {
              _context9.next = 27;
              break;
            }
            statsObjectj[key].num_usuarios += 1;
            statsObjectj[key].high_score_avg += _element2.high_score;
            statsObjectj[key].usuarios.push(_element2);
            return _context9.abrupt("break", 29);
          case 27:
            _context9.next = 14;
            break;
          case 29:
            _index2++;
            _context9.next = 11;
            break;
          case 32:
            for (key in statsObjectj) {
              _element3 = statsObjectj[key];
              statsObjectj[key].high_score_avg = _element3.high_score_avg / (_element3.num_usuarios == 0 ? 1 : _element3.num_usuarios);
            }
            return _context9.abrupt("return", {
              age_min: ageMin,
              age_max: ageMax,
              num_users: users.length,
              stats: statsObjectj
            });
          case 34:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _getUsersScoresAndAge.apply(this, arguments);
}
function getNumIntervalos(n) {
  return Math.ceil(1 + 3.3 * Math.log10(n));
}

//rango
function getRango(xmax, xmin) {
  return xmax - xmin;
}

//amplitud del intervalo
function getAmplitud(r, m) {
  return Math.ceil(r / m);
}
function crearObjetoIntervalos(xmax, xmin, m, r, c) {
  console.log(m * c - r);
  if (m * c > r) xmin -= m * c - r;
  var statsObject = {};
  console.log(xmin);
  statsObject["".concat(xmin, " - ").concat(xmin + c)] = {
    high_score_avg: 0,
    num_usuarios: 0,
    edad_min: xmin,
    edad_max: xmin += c,
    usuarios: []
  };
  for (var index = 1; index < m; index++) {
    statsObject["".concat(xmin, ".1 - ").concat(xmin + c)] = {
      high_score_avg: 0,
      num_usuarios: 0,
      edad_min: xmin,
      edad_max: xmin += c,
      usuarios: []
    };
  }
  console.log(statsObject);
  return statsObject;
}