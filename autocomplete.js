'use strict';

class Autocomplete {

    constructor(arr,placeholder,nameClass){
        this.arr = arr;
        this.placeholder = placeholder;
        this.nameClass = nameClass;
        this.render();
    }

    render(){
        let self = this;
        let div = document.createElement('div');
        div.classList.add('autocomplete');
        div.classList.add(this.nameClass);
        document.body.append(div);
        let input = document.createElement('input');
        input.classList.add('autocomplete__input');
        input.classList.add(this.nameClass);
        input.placeholder = this.placeholder;
        div.append(input);
        input.addEventListener('focus',  this.createList.bind(this, this.arr));
        input.addEventListener('blur', setTimeout.bind(null, this.removeList.bind(this,input),40));
        input.addEventListener('input',() => {
            let newArr = this.arr.filter(function (value) {

                if(self.searchValue(value,input.value)) return true;
            });
            this.removeList();
            this.createList(newArr);
        });
    }

    searchValue(value, inputValue){
        let val = value.toLowerCase();
        let inputVal = inputValue.toLowerCase();
        return val.indexOf(inputVal) === 0;
    }

    createList(arr){
        let input = document.querySelector('.autocomplete__input.'+ this.nameClass);
        let list = document.createElement('div');
        if(arr.length>4) list.style.height = '80px';
        list.classList.add('autocomplete__list');
        list.classList.add(this.nameClass);
        list.style.width =input.offsetWidth - 1  + 'px';
        input.parentElement.append(list);

        for(let value of arr) {
            let divLi = document.createElement('div');
            divLi.classList.add('autocomplete__list__li');
            divLi.classList.add(this.nameClass);
            list.append(divLi);

            divLi.innerHTML  = (this.searchValue(value,input.value) && input.value!=='')?
                `<strong>${value.slice(0,input.value.length)}</strong>${value.slice(input.value.length)}`
                : value;

            divLi.addEventListener('click',  () => {
                input.value = value;
            });
        }
    }

    removeList(){
        document.querySelector('.autocomplete__list.' +this.nameClass).remove();
    }
}

let carComplete = new Autocomplete(cars,'Select car','cars');

