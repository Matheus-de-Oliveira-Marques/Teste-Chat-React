"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChatRooms = void 0;

var _database = require("firebase/database");

var _firestore = require("firebase/firestore");

var _firebaseConfig = require("../firebaseConfig");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var database = (0, _database.getDatabase)();

var getChatRooms = function getChatRooms() {
  var snapshot, chatRooms;
  return regeneratorRuntime.async(function getChatRooms$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _firestore.getDocs)((0, _firestore.collection)(_firebaseConfig.db, 'chatRooms')));

        case 3:
          snapshot = _context.sent;
          chatRooms = [];
          snapshot.forEach(function (doc) {
            chatRooms.push(_objectSpread({
              id: doc.id
            }, doc.data()));
          });
          return _context.abrupt("return", chatRooms);

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error('Erro ao obter salas de chat:', _context.t0);
          throw _context.t0;

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.getChatRooms = getChatRooms;