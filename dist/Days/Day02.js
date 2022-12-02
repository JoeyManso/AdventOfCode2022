"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day02 = void 0;
const Day_1 = require("./Day");
var ERPSTurn;
(function (ERPSTurn) {
    ERPSTurn[ERPSTurn["Rock"] = 1] = "Rock";
    ERPSTurn[ERPSTurn["Paper"] = 2] = "Paper";
    ERPSTurn[ERPSTurn["Scissors"] = 3] = "Scissors";
})(ERPSTurn || (ERPSTurn = {}));
var ERPSGameResult;
(function (ERPSGameResult) {
    ERPSGameResult[ERPSGameResult["Lose"] = 0] = "Lose";
    ERPSGameResult[ERPSGameResult["Draw"] = 3] = "Draw";
    ERPSGameResult[ERPSGameResult["Win"] = 6] = "Win";
})(ERPSGameResult || (ERPSGameResult = {}));
class Day02 extends Day_1.Day {
    Run(_part) {
        let totalScore = 0;
        for (const inputLine of this.inputArray) {
            if (_part === Day_1.Part.Part01) {
                const opponentTurn = this.GetTurn(inputLine.charAt(0));
                const playerTurn = this.GetTurn(inputLine.charAt(2));
                totalScore += playerTurn + this.GetResult(playerTurn, opponentTurn);
            }
            else if (_part === Day_1.Part.Part02) {
                const desiredResult = this.GetDesiredResult(inputLine.charAt(2));
                const opponentTurn = this.GetTurn(inputLine.charAt(0));
                const playerTurn = this.GetTurnForDesiredResult(desiredResult, opponentTurn);
                totalScore += playerTurn + this.GetResult(playerTurn, opponentTurn);
            }
        }
        console.log(totalScore);
    }
    GetResult(_playerTurn, _opponentTurn) {
        if (_playerTurn === _opponentTurn) {
            return ERPSGameResult.Draw;
        }
        switch (_playerTurn) {
            case ERPSTurn.Rock:
                return _opponentTurn == ERPSTurn.Scissors ? ERPSGameResult.Win : ERPSGameResult.Lose;
            case ERPSTurn.Paper:
                return _opponentTurn == ERPSTurn.Rock ? ERPSGameResult.Win : ERPSGameResult.Lose;
            case ERPSTurn.Scissors:
                return _opponentTurn == ERPSTurn.Paper ? ERPSGameResult.Win : ERPSGameResult.Lose;
        }
    }
    GetTurnForDesiredResult(_result, _opponentTurn) {
        if (_result === ERPSGameResult.Draw) {
            return _opponentTurn;
        }
        switch (_opponentTurn) {
            case ERPSTurn.Rock:
                return _result == ERPSGameResult.Win ? ERPSTurn.Paper : ERPSTurn.Scissors;
            case ERPSTurn.Paper:
                return _result == ERPSGameResult.Win ? ERPSTurn.Scissors : ERPSTurn.Rock;
            case ERPSTurn.Scissors:
                return _result == ERPSGameResult.Win ? ERPSTurn.Rock : ERPSTurn.Paper;
        }
    }
    GetTurn(_turn) {
        switch (_turn) {
            case 'A':
            case 'X':
                return ERPSTurn.Rock;
            case 'B':
            case 'Y':
                return ERPSTurn.Paper;
            case 'C':
            case 'Z':
                return ERPSTurn.Scissors;
        }
        throw new Error(`Unknown Turn ${_turn}`);
    }
    GetDesiredResult(_turn) {
        switch (_turn) {
            case 'X':
                return ERPSGameResult.Lose;
            case 'Y':
                return ERPSGameResult.Draw;
            case 'Z':
                return ERPSGameResult.Win;
        }
        throw new Error(`Unknown Turn ${_turn}`);
    }
}
exports.Day02 = Day02;
//# sourceMappingURL=Day02.js.map