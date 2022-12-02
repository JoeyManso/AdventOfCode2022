import {Day, Part} from "./Day";

enum ERPSTurn {
    Rock= 1,
    Paper= 2,
    Scissors = 3
}

enum ERPSGameResult {
    Lose = 0,
    Draw = 3,
    Win = 6,
}

export class Day02 extends Day {
    public Run(_part: Part) {
        let totalScore = 0;
        for (const inputLine of this.inputArray) {
            if (_part === Part.Part01) {
                const opponentTurn: ERPSTurn = this.GetTurn(inputLine.charAt(0));
                const playerTurn: ERPSTurn = this.GetTurn(inputLine.charAt(2));
                totalScore += playerTurn + this.GetResult(playerTurn, opponentTurn);
            }
            else if (_part === Part.Part02) {
                const desiredResult: ERPSGameResult = this.GetDesiredResult(inputLine.charAt(2));
                const opponentTurn: ERPSTurn = this.GetTurn(inputLine.charAt(0));
                const playerTurn: ERPSTurn = this.GetTurnForDesiredResult(desiredResult, opponentTurn);
                totalScore += playerTurn + this.GetResult(playerTurn, opponentTurn);
            }
        }
        console.log(totalScore);
    }

    private GetResult(_playerTurn: ERPSTurn, _opponentTurn: ERPSTurn): ERPSGameResult {
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

    private GetTurnForDesiredResult(_result: ERPSGameResult, _opponentTurn: ERPSTurn): ERPSTurn {
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

    private GetTurn(_turn: string): ERPSTurn {
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
        throw new Error (`Unknown Turn ${_turn}`);
    }

    private GetDesiredResult(_turn: string): ERPSGameResult {
        switch (_turn) {
            case 'X':
                return ERPSGameResult.Lose;
            case 'Y':
                return ERPSGameResult.Draw;
            case 'Z':
                return ERPSGameResult.Win;
        }
        throw new Error (`Unknown Turn ${_turn}`);
    }
}