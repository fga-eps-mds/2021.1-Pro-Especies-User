"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const databaseConnect = async () => {
    try {
        await mongoose_1.default.connect('mongodb://db/fish', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        }, (err) => {
            if (!err) {
                console.log('Conexão estabelecida com sucesso com o MongoDB');
            }
            else {
                console.log(`Falhou a estabelecer a conexão com o MongoDB, falhou com erro: ${err}`);
            }
        });
    }
    catch (error) {
        console.log('Não foi possível inicicializar corretamente a base de dados!');
        console.log(error);
    }
};
exports.default = databaseConnect;
