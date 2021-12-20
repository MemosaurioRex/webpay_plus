"use strict";

var WebpayPlus = require("transbank-sdk").WebpayPlus;

var asyncHandler = require("../utils/async_handler");

exports.create = asyncHandler(function _callee(request, response, next) {
  var buyOrder, sessionId, amount, returnUrl, createResponse, token, url, viewData;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          buyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;
          sessionId = "S-" + Math.floor(Math.random() * 10000) + 1; //let amount = Math.floor(Math.random() * 1000) + 1001;

          amount = 1000;
          returnUrl = request.protocol + "://" + request.get("host") + "/webpay_plus/commit";
          _context.next = 6;
          return regeneratorRuntime.awrap(WebpayPlus.Transaction.create(buyOrder, sessionId, amount, returnUrl));

        case 6:
          createResponse = _context.sent;
          token = createResponse.token;
          url = createResponse.url;
          viewData = {
            buyOrder: buyOrder,
            sessionId: sessionId,
            amount: amount,
            returnUrl: returnUrl,
            token: token,
            url: url
          };
          response.render("webpay_plus/create", {
            step: "Crear Transacción",
            stepDescription: "En este paso crearemos la transacción con el objetivo de obtener un identificador unico y " + "poder en el siguiente paso redirigir al Tarjetahabiente hacia el formulario de pago",
            viewData: viewData
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.commit = asyncHandler(function _callee2(request, response, next) {
  var token, commitResponse, viewData;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          token = request.body.token_ws;
          _context2.next = 3;
          return regeneratorRuntime.awrap(WebpayPlus.Transaction.commit(token));

        case 3:
          commitResponse = _context2.sent;
          viewData = {
            token: token,
            commitResponse: commitResponse
          };
          response.render("webpay_plus/commit", {
            step: "Confirmar Transacción",
            stepDescription: "En este paso tenemos que confirmar la transacción con el objetivo de avisar a " + "Transbank que hemos recibido la transacción ha sido recibida exitosamente. En caso de que " + "no se confirme la transacción, ésta será reversada.",
            viewData: viewData
          });

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.status = asyncHandler(function _callee3(request, response, next) {
  var token, statusResponse, viewData;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          token = request.body.token;
          _context3.next = 3;
          return regeneratorRuntime.awrap(WebpayPlus.Transaction.status(token));

        case 3:
          statusResponse = _context3.sent;
          viewData = {
            token: token,
            statusResponse: statusResponse
          };
          response.render("webpay_plus/status", {
            step: "Estado de Transacción",
            stepDescription: "Puedes solicitar el estado de una transacción hasta 7 días despues de que haya sido" + " realizada. No hay limite de solicitudes de este tipo, sin embargo, una vez pasados los " + "7 días ya no podrás revisar su estado.",
            viewData: viewData
          });

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.refund = asyncHandler(function _callee4(request, response, next) {
  var _request$body, token, amount, refundResponse, viewData;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _request$body = request.body, token = _request$body.token, amount = _request$body.amount;
          _context4.next = 3;
          return regeneratorRuntime.awrap(WebpayPlus.Transaction.refund(token, amount));

        case 3:
          refundResponse = _context4.sent;
          viewData = {
            token: token,
            amount: amount,
            refundResponse: refundResponse
          };
          response.render("webpay_plus/refund", {
            step: "Reembolso de Transacción",
            stepDescription: "Podrás pedir el reembolso del dinero al tarjeta habiente, dependiendo del monto " + "y el tiempo transacurrido será una Reversa, Anulación o Anulación parcial.",
            viewData: viewData
          });

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
});
//# sourceMappingURL=webpay_plus.dev.js.map
