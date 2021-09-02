class CalcController {

    constructor() {
        this._audio = new Audio('click.mp3');
        this._audioOnOff = false;
        this._lastOperator = '';
        this._lastNumber = '';
        this._operation = [];
        this._lacale = 'pt-BR';
        this._displayCalcEl = document.querySelector('#display');
        this._dateEl = document.querySelector('#data');
        this._timeEl = document.querySelector('#hora');
        this,_currentDate;
        this.initialize();
        this.initButtonsEvents();
        this.initKeyboard();

    }

    copyToClipboard() {
        let input = document.createElement('imput');
        input.value = this.displayCalc;
        document.body.appendChild(input);
        input.select();
        document.execCommand('Copy');
        input.remove();
    }

    pasteFromClipboard() {
        document.addEventListener('paste', event => {
            let text = event.clipboardData.getData('Text');
            this.dsplayCalc = parseFloat(text);
        });
    }
}