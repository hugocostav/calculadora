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

    initialize() {
        this.setDisplayDateTime();
        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);
        this.setLastNumberToDisplay();
        this.pasteFromClipboard();
        document.querySelector('.btn-ac').forEach(btn => {
            btn.addEventListener('dbclick', event => {
                this.toggleAudio();
            });
        });
    }

    toggleAudio() {
        this._audioOnOff = !this._audioOnOff;
    }

    playAudio() {
        if(this._audioOnOff) {
            this._audio.currentTime = 0;
            this._audio.play();
        }
    }

    initKeyboard() {
        document.addEventListener('keyup', event => {
            this.playAudio();
            switch (event.key) {
                case 'Escape':
                    this.clearAll();
                    break;
                case 'Backspace':
                    this.clearAll();
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                    this.addOperation(event.key);
                    break;
                case 'Enter':
                case '=':
                    this.calc();
                    break;
                case '.':
                case ',':
                    this.addDot();
                    break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.addOperation(parseInt(event.key));
                    break;
                case 'c':
                    if(event.ctrlKey) this.copyToClipboard();
                    break;
            }
        })
    }

    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }

    clearAll() {
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';

        this.setLastNumberToDisplay();
    }
}