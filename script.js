'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const btnAdd = document.querySelector('.todo_add');
    const btnSave = document.querySelector('.todo_save');
    const btnLoad = document.querySelector('.todo_load');
    const input = document.querySelector('.todo_input');
    const list = document.querySelector('.todo-list');
    const type = document.querySelector('#type');
    const dateInput = document.querySelector('#date');

    initDelete();

    function initDelete() {

        let deleteItems = document.querySelectorAll('.todo_item_delete');

        deleteItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.target.parentNode.remove();
            });
        });
        sortItems();
    }

    function sortItems() {

        const nodeList = document.querySelectorAll('.todo-list__item');
        let listItems = Array.from(nodeList);

        listItems.sort((a, b) => {
            a = Date.parse(a.querySelector('.todo_item_date').innerText);
            b = Date.parse(b.querySelector('.todo_item_date').innerText);
            return a - b;
        });
        for (let i = 0; i < listItems.length; i++) {
            list.append(listItems[i]);
        }
    }

    function addItem(text = input.value, priority = type.value, date = dateInput.value) {

        const item = document.createElement('div');

        item.innerHTML = `
            <div class="todo_item_text">${text}</div>
            <div class="todo_item_date">${date}</div>
            <div class="todo_item_delete"><img src="cross.svg" alt="delte"></div>
        `;
        item.classList.add(`${priority}`, `todo-list__item`);
        list.append(item);
        initDelete();
    }

    btnAdd.addEventListener('click', () => {
        if (input.value == '') {
            input.placeholder = 'Input Text';
            return;
        }
        addItem();
        input.value = '';
    });

    btnLoad.addEventListener('click', () => {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i),
                arg = JSON.parse(localStorage.getItem(key));
            addItem(key, arg.type, arg.date);
        }
    });

    btnSave.addEventListener('click', () => {

        const listItems = document.querySelectorAll('.todo_item');

        for (let i = 0; i < listItems.length; i++) {
            let args = {
                type: checkType(listItems[i]),
                date: listItems[i].querySelector('.todo_item_date').innerText
            }
            localStorage.setItem(
                listItems[i].querySelector('.todo_item_text').innerText,
                JSON.stringify(args));
        }

        function checkType(a) {
            if (a.classList.contains('important')) {
                return 'important';
            } else {
                return 'usual';
            }
        }
    });


});