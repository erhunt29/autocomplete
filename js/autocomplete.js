'use strict';

class Autocomplete {

    constructor(arr,placeholder){
        this.arr = arr;
        this.placeholder = placeholder;
        this.render();
    }

    render(){
        let self = this;
        this.el = document.createElement('div');
        this.el.classList.add('autocomplete');
        document.body.append(this.el);
        let input = document.createElement('input');
        input.classList.add('autocomplete__input');
        input.placeholder = this.placeholder;
        this.el.append(input);
        input.addEventListener('focus',  this.createList.bind(this, this.arr));
        input.addEventListener('blur', setTimeout.bind(null, this.removeList.bind(this,input),40));
        input.addEventListener('input',() => {
            let newArr = this.arr.filter(function (value) {

                if(self.searchValue(value,input.value))  return true;
            });
            this.removeList();
            this.createList(newArr);

        });
    }

    searchValue(value, inputValue){
        let val = (value+ '').toLowerCase();
        let inputVal = inputValue.toLowerCase();
        return val.indexOf(inputVal) === 0;
    }

    createList(arr){
        let input = this.el.querySelector('.autocomplete__input');
        let list = document.createElement('div');
        if(arr.length>4) list.style.height = '80px';
        list.classList.add('autocomplete__list');
        list.style.width =input.offsetWidth - 1  + 'px';
        input.parentElement.append(list);

        for(let value of arr) {
            let divLi = document.createElement('div');
            divLi.classList.add('autocomplete__list__li');
            list.append(divLi);

            divLi.innerHTML  = (this.searchValue((value+ ''),input.value) && input.value!=='')?
                `<strong>${(value+ '').slice(0,input.value.length)}</strong>${(value+ '').slice(input.value.length)}`
                : value;

            divLi.addEventListener('click',  () => {
                input.value = value;
            });
        }
    }

    removeList(){
        this.el.querySelector('.autocomplete__list').remove();
    }
}

let carComplete = new Autocomplete(cars,'Select car');

