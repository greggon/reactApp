var dispatcher = require('./../dispatcher.js');

function GroceryItemStore(){
    //var items = [];

    var items = [{
        name:"Ice Cream"},{
        name:"Waffles"},{
        name:"Candy",
        purchased: true},{
        name:"Snacks"}
    ];

    var listeners = [];

    function getItems(){
        return items;
    }

    function onChange(listener){
        listeners.push(listener);

    }

    function triggerListeners(){
        listeners.forEach(function(listener){
            listener(items);
        })
    };

    function addGroceryItem(item){
        items.push(item);
        triggerListeners();

    }

    dispatcher.register(function(event){
        var split = event.type.split(':');
        if (split[0] === 'groceryItem'){
            switch(split[1]){
                case "add":
                    addGroceryItem(event.payload);
                    break;
            }
        }
    });

    return {
        getItems: getItems,
        onChange: onChange
    }
}

module.exports = new GroceryItemStore();