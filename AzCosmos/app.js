"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var config_1 = require("./config");
var cosmos_1 = require("@azure/cosmos");
var dbConnection = require("./dbConnection");
var newItem = {
    id: "3",
    brand: "Tesla",
    name: "Model Y",
    desc: "Electronic",
    price: 42000
};
function doCrud() {
    return __awaiter(this, void 0, void 0, function () {
        var client, database, container, querySpec, items, createdItem, updateItem, updatedItem, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new cosmos_1.CosmosClient({
                        endpoint: config_1.config.endpoint,
                        key: config_1.config.key
                    });
                    database = client.database(config_1.config.databaseId);
                    container = database.container(config_1.config.containerId);
                    return [4 /*yield*/, dbConnection.create(client, config_1.config.databaseId, config_1.config.containerId)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 6, , 7]);
                    querySpec = {
                        query: "SELECT * from c"
                    };
                    return [4 /*yield*/, container.items.query(querySpec).fetchAll()];
                case 3:
                    items = (_a.sent()).resources;
                    items.forEach(function (item) {
                        console.log("".concat(item.id, ": ").concat(item.brand, " ").concat(item.name));
                    });
                    return [4 /*yield*/, container.items.create(newItem).then(function (data) {
                            if (data.resource) {
                                var item = data.resource;
                                console.log("\nCreated new item ".concat(item.id, " - ").concat(item.brand, " ").concat(item.name, "\n"));
                                return item;
                            }
                        })];
                case 4:
                    createdItem = _a.sent();
                    updateItem = {
                        id: "3",
                        brand: "Toyota",
                        name: "RAV4",
                        desc: "TO",
                        price: 28000
                    };
                    return [4 /*yield*/, container.item(updateItem.id, updateItem.brand).replace(updateItem).then(function (data) {
                            var item = data.resource;
                            return item;
                        })];
                case 5:
                    updatedItem = _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    e_1 = _a.sent();
                    console.log(e_1.message);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
;
doCrud();
