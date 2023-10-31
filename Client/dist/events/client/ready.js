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
const { Events } = require("discord.js");
const colorette_1 = require("colorette");
module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`${(0, colorette_1.green)('Ready! Logged in as ')} ${(0, colorette_1.green)(client.user.tag)}\n`);
        });
    }
};
//# sourceMappingURL=ready.js.map