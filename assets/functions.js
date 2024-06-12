let inventoryLoaded = false;
let inventoryArray = []; // Array to store inventory slots
let checkInterval;
let checkHudInterval;

// Define image blobs and corresponding names
const imageBlobToNameMap = new Map([
    [876, 'mine'],
    [791, 'coop'],
    [1210, 'hutch'],
    [832, 'apiary']
]);

let imageHashMap;
let userPremium;

// Interval
function mainInterval(premium, map) {

    // Timers for actions
    let twentyTimer;
    let marketPlaceLoaded, tasksLoaded = false;
    imageHashMap = map;
    userPremium = premium;

    function checkHudQuantities() {
        const hudQuantities = document.querySelectorAll(nodeNames['hudQuantities']);
        if (hudQuantities.length > 0) {
            clearInterval(checkHudInterval);
            setTimeout(functionWhenLoaded, 400);
            twentyTimer = new Date();
        }
    }

    var lastPriceUpdate = 0;
    function functionWhenLoaded() {

        var currentTime1 = Date.now();

        var elapsedTime = currentTime1 - lastPriceUpdate;
        if (elapsedTime > 2000) {
            loadInventoryPrices(); // Call it immediately before starting the interval
            lastPriceUpdate = currentTime1;
        }

        checkHudInterval = setInterval(() => {

            const hudQuantities = document.querySelectorAll(nodeNames['hudQuantities']);
            if (hudQuantities.length === 0) {

                clearInterval(checkHudInterval);
                checkHudInterval = setInterval(checkHudQuantities, 100);

            } else {
                // Every 0.5s
                var currentTime2 = Date.now();
                // Check for existing inventory
                if (!location.href.endsWith('/gridcraft')) {
                    const existingInventory = document.querySelectorAll('.voxels-inventory-price');

                    if (existingInventory.length === 0) {
                        var elapsedTime = currentTime2 - lastPriceUpdate;
                        if (elapsedTime > 10000) {
                            loadInventoryPrices();
                            lastPriceUpdate = currentTime2;
                        }
                    }
                }

                // Check if in market
                marketPlaceLoaded = checkForWindow(marketPlaceLoaded, nodeNames['market_place'], '.voxels-market-create-price', fetchMarketPrices);

                // Check for about page
                checkForAboutPage();

                // Premium features
                if (userPremium) {
                    // Check if in task overview
                    tasksLoaded = checkForWindow(tasksLoaded, nodeNames['tasksCard'], '.voxels-tasks-prices', addTaskPrices);
                    checkInventoryChange();
                    checkEnergyChange();
                    if (tasksLoaded) {
                        checkTasks();
                    }
                } else {
                    if (loadTasksF) {
                        tasksLoaded = checkForWindow(tasksLoaded, nodeNames['tasksCard'], '.voxels-tasks-prices', addTaskPrices);
                        if (tasksLoaded) {
                            checkTasks();
                        }
                    }
                }

                // Every 50s
                const currentTime = new Date();
                const timeDifference = (currentTime - twentyTimer) / 1000;

                if (timeDifference >= 50) {
                    twentyTimer = new Date();

                    // Reload inventory prices
                    loadInventoryPrices();

                    // If in market reload prices
                    if (marketPlaceLoaded)
                        fetchMarketPrices('.voxels-market-create-price');

                    // If in tasks
                    if (tasksLoaded)
                        addTaskPrices('.voxels-tasks-prices');

                    if (userPremium) {
                        setTasksCost();
                    }
                }

            }
        }, 500);
    }


    checkHudInterval = setInterval(checkHudQuantities, 100);
}

// Function checking for current screen
function checkForWindow(switch_var, ingame_node, created_node, action) {
    const ingameElements = document.querySelectorAll(ingame_node);
    if (!switch_var) {
        if (ingameElements.length > 0) {
            action(created_node);
            return true;
        }
        return false;
    } else {
        if (ingameElements.length === 0) {
            return false;
        }
        const createdElement = document.querySelectorAll(created_node);
        if (createdElement.length === 0) {
            action(created_node);
        }
        return true;
    }
}

// Check inventory changes
function checkInventoryChange() {
    const currentInventory = getCurrentInventory(false);

    // Check if either inventoryArray or currentInventory is empty
    if (inventoryArray.length === 0 || currentInventory.length === 0) {
        // If either is empty, set inventoryArray to currentInventory and exit
        inventoryArray = currentInventory;
        return;
    }

    // Compare currentInventory with the stored inventoryArray
    const response = compareInventories(inventoryArray, currentInventory);

    if (response !== false) {
        // Change eligible
        startTimerType(response);
        inventoryArray = getCurrentInventory(true);
    } else {
        inventoryArray = currentInventory;
    }
}

// Get representation of current inventory
function getCurrentInventory(fetchImages) {
    const hudItems = document.querySelectorAll(nodeNames['hudItems']);

    // Reset inventory array
    let newInventoryArray = [];

    // Add observer to each Hud_item element
    hudItems.forEach(item => {
        const imageElement = item.querySelector(nodeNames['hudItemImage']);
        const quantityElement = item.querySelector(nodeNames['hudQuantities']);
        const slotNumber = parseInt(item.querySelector(nodeNames['hudShortcut']).textContent) - 1;

        if (imageElement && quantityElement && fetchImages) {
            const imageSrc = imageElement.src;

            fetch(imageSrc, { method: 'GET' })
                .then(response => response.headers.get('Content-Length'))
                .then(contentLength => {
                    const quantityText = quantityElement.textContent.replace('x', '');
                    const quantity = parseInt(quantityText) || 1;

                    newInventoryArray[slotNumber] = {
                        length: contentLength,
                        quantity: quantity
                    };
                })
                .catch(error => console.error('Error fetching blob:', error));

        } else if (quantityElement) {
            // If fetchImages is false or if imageElement is not present, only fetch quantities
            const quantityText = quantityElement.textContent.replace('x', '');
            const quantity = parseInt(quantityText) || 1;

            newInventoryArray[slotNumber] = {
                length: null,
                quantity: quantity
            };
        } else {
            newInventoryArray[slotNumber] = null;
        }
    });

    // Display the inventory array
    return newInventoryArray;
}

// Function to compare inventories and find differences
function compareInventories(oldInventory, newInventory) {
    for (let i = 0; i < newInventory.length; i++) {
        const newItem = newInventory[i];
        const oldItem = oldInventory[i];

        if (newItem !== null) {
            // Check if the quantities for a slot are within the eligible parameters
            if (
                (oldItem === null && newItem.quantity >= 1 && newItem.quantity <= 10) ||
                (oldItem !== null && newItem.quantity > oldItem.quantity && newItem.quantity <= oldItem.quantity + 10)
            ) {
                // Fetch the file and check if it matches the content length
                const itemName = fetchImageAndCheckContent(i);

                if (itemName !== false) {
                    // At least one eligible change found
                    return itemName;
                }
            }
        }
    }

    // No eligible changes found
    return false;
}

// Function to fetch the file and check if its length is in the imageBlobToNameMap
function fetchImageAndCheckContent(slotNumber) {
    const hudShortcutElement = [].slice.call(document.querySelectorAll(nodeNames['hudShortcut'])).filter(function (div) {
        return div.innerHTML.trim() === String(slotNumber + 1);
    });
    const hudItemElement = hudShortcutElement[0].parentElement;
    const imageElement = hudItemElement.querySelector(nodeNames['hudItemImage']);

    if (imageElement) {
        const color = calculateAverageColor(imageElement);

        if (imageHashMap[color]) {
            // At least one eligible change found
            return imageHashMap[color];
        }
    }

    // No eligible changes found
    return false;
}

// Function to check if two objects are equal
function isEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}