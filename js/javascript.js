var macAddress = "00:06:66:8E:23:C9"; //BLuetooth Mate mac adress, pasword 1234
var forwardButton, backwardButton, rightButton, leftButton, increaseButton, decreaseButton, speedCounterDiv; //Declaration of variables containing html elements
var speed = 115; //Robot default speed
var themeButtonClicked = false; //variable containing information on whether or not the theme button is clicked
var menuButtonClicked = false; //variable containing information on whether or not the menu button is clicked
var automaticDriveState = false; 

/*
 *  These are the objects containing theme colors
 */
var blueTheme = {
    darkPrimary: "#1976D2",
    primary: "#2196F3",
    lightPrimary: "#BBDEFB",
    accent: "#607D8B"
};
var orangeTheme = {
    darkPrimary: "#F57C00",
    primary: "#FF9800",
    lightPrimary: "#FFE0B2",
    accent: "#FF5252"
};
var indigoTheme = {
    darkPrimary: "#303F9F",
    primary: "#3F51B5",
    lightPrimary: "#C5CAE9",
    accent: "#FF4081"
};
var purpleTheme = {
    darkPrimary: "#512DA8",
    primary: "#673AB7",
    lightPrimary: "#D1C4E9",
    accent: "#E040FB"
};
var greenTheme = {
    darkPrimary: "#388E3C",
    primary: "#4CAF50",
    lightPrimary: "#C8E6C9",
    accent: "#CDDC39"
};
var tealTheme = {
    darkPrimary: "#00796B",
    primary: "#009688",
    lightPrimary: "#B2DFDB",
    accent: "#FFC107"
};


/*
 * Configures the app
 * Called when body is loaded
 */
function onLoad() {
    changeStateButton = document.getElementById("changeStateButton") //Gets the change state element
    
    forwardButton = document.getElementById("forwardButton"); //Gets the foward button element
    backwardButton = document.getElementById("backwardButton"); //Gets the backward button element
    rightButton = document.getElementById("rightButton"); //Gets the right button element
    leftButton = document.getElementById("leftButton"); //Gets the left button element

    increaseButton = document.getElementById("increaseButton"); //Gets the increase button element
    decreaseButton = document.getElementById("decreaseButton"); //Gets the decrease button element
    speedCounterDiv = document.getElementById("speedCounterDiv"); //Gets the speed count div element
    
    fireMissileButton = document.getElementById("fireMissileButton"); //Gets the fire missile div

    
    var controllerWidth = document.getElementById("controllerDiv").offsetWidth; //This retrieves the width of the controllerDiv
    console.log(controllerWidth); //prints controllerWidth to console. Useful for testing and debugging

    rightButton.style.marginLeft = (controllerWidth - 48) / 2 + 48 + "px"; //The right button is placed right of the center
    leftButton.style.marginLeft = (controllerWidth - 48) / 2 - 48 + "px"; //The left button is placed left to the center

    decreaseButton.style.marginLeft = (controllerWidth - 3 * 48) / 2 + "px"; //Positions the decreasebutton element

    fireMissileButton.style.marginLeft = (controllerWidth - 1 * 48) / 2 + "px";
    changeStateButton.style.marginLeft = (controllerWidth - 1 * 134) / 2 + "px";
    
    console.log(macAddress); //prints the macAddress to console. Used for bug fixing
    document.getElementById("macAddressChangerDiv").innerHTML = "BT device mac address: <br>'" + macAddress + "'"; //Message to be shown in menu maccadress changer button


    document.addEventListener("deviceready", onDeviceReady, false); //eventlistener; calls the onDeviceReady() function, when device is ready

    forwardButton.addEventListener("touchstart", moveForward, false); //calls the moveForward() function on touchstart
    forwardButton.addEventListener("touchend", stopMove, false); //calls the stopMove() function on touchend
    backwardButton.addEventListener("touchstart", moveBackward, false); //calls the moveBackward() function on touchstart
    backwardButton.addEventListener("touchend", stopMove, false); //calls the stopMove() function on touchend
    rightButton.addEventListener("touchstart", moveRight, false); //calls the moveRight() function on touchstart
    rightButton.addEventListener("touchend", stopMove, false); //calls the stopMove() function on touchend
    leftButton.addEventListener("touchstart", moveLeft, false); //calls the moveLeft() functionon on touchstart
    leftButton.addEventListener("touchend", stopMove, false); //calls the stopMove() function on touchend

    increaseButton.addEventListener("touchstart", increaseSpeed, false); //calls the increaseSpeed() function on touchstart
    increaseButton.addEventListener("touchend", setButtonStyleDefault, false); //calls the setButtonStyleDefault() function on touchend

    decreaseButton.addEventListener("touchstart", decreaseSpeed, false); //calls the decreaseSpeed() function on touchstart
    decreaseButton.addEventListener("touchend", setButtonStyleDefault, false); //calls the setButtonStyleDefault() function on touchend

    fireMissileButton.addEventListener("touchstart", fireMissile, false);
    fireMissileButton.addEventListener("touchend", setButtonStyleDefault, false);
    
    changeStateButton.addEventListener("touchstart", changeState, false);
}

/*
 * Configures the bluetooth plugin, when device is ready
 * Plugin by Don is used: https://github.com/don/BluetoothSerial
 */
function onDeviceReady() {
    bluetoothSerial.connect(macAddress, onConnect, onDisconnect);
}

/*
 * Subscribes to bluetooth signal and displays the macAdress
 */
function onConnect() {
    alert("connected"); //Alerts user when connected
    bluetoothSerial.clear(success, failure);
    bluetoothSerial.subscribe("\n", onMessage, subscribeFailed); //subscribes to bluetooth
    statusDiv.innerHTML = "Connected to " + macAddress + "."; //Displays the mac address when connected       		
}

/*
 * Data is shown in message div
 * param data contains a single char received from Arduino
 */
function onMessage(data) {
    statusDiv.innerHTML = "hastighed" + data;
}

/*
 * Called if subscriptio to BLuetooth device failed
 */
function subscribeFailed() {
    alert("failed to receive data from Arduino");
}


/*
 * Send data to arduino
 * Param data contains a single character 'char'
 */
function sendToArduino(data) {
    bluetoothSerial.write(data);
}


/*
 * Robot is disconnected
 */
function onDisconnect() {
    alert("Disconnected");
    statusDiv.innerHTML = "Disconnected.";
}

/*
 * Makes the robot drive forward
 */
function moveForward() {
    sendToArduino("a"); //The character 'a' is sent to Arduino, which makes it move forward
    forwardButton.style.color = "rgba(255, 255, 255, 0.5)"; //Button icon color is changed
    forwardButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.3)"; //Button shadow is changed
}

/*
 * Makes the robot reverse
 */
function moveBackward() {
    sendToArduino("b"); //The character 'b' is sent to Arduino, which makes it move backward
    backwardButton.style.color = "rgba(255, 255, 255, 0.5)"; //Button icon color is changed
    backwardButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.3)"; //Button shadow is changed
}


/*
 * Makes the robot turn right
 */
function moveRight() {
    sendToArduino("r"); //The character 'r' is sent to Arduino, which makes it turn right
    rightButton.style.color = "rgba(255, 255, 255, 0.5)"; //Button icon color is changed
    rightButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.3)"; //Button shadow is changed
}

/*
 * Makes the robot turn left
 */
function moveLeft() {
    sendToArduino("l"); //The character 'l' is sent to Arduino, which makes it left right
    leftButton.style.color = "rgba(255, 255, 255, 0.5)"; //Button icon color is changed
    leftButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.3)"; //Button shadow is changed
}

/*
 * Stops the robot. Executed on touchend
 */
function stopMove() {
    sendToArduino("s"); //The character 's' is sent to Arduino, which makes it stop
    setButtonStyleDefault(); //Changes the button style back to default
}

/*
 * This function increases the robot speed
 */
function increaseSpeed() {
    /*The speed will only increase if it is below the maximum*/
    if (speed < 250) {
        sendToArduino("+"); //The character 'i' is sent to Arduino, which increases the speed
        speed = speed + 15; //Increses speed by 15
        var s = (speed - 100) / 1.5; //Converts the speed increase to percentage
        speedCounterDiv.innerHTML = s + " %"; //Shows the percentage
    }

    increaseButton.style.color = "rgba(255, 255, 255, 0.5)"; //Button icon color is changed
    increaseButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.3)"; //Button shadow is changed

}

/*
 * This function decreases the robot speed
 */
function decreaseSpeed() {

    /*The speed will only decrease if it is above the minimum*/
    if (speed > 100) {
        sendToArduino("-"); //The character 'd' is sent to Arduino, which decreases the speeed 
        speed = speed - 15; //Decreases the speed by 15
        var s = (speed - 100) / 1.5; //Converts the speed increase to percentage
        speedCounterDiv.innerHTML = s + " %"; //Shows the percentage
    }

    decreaseButton.style.color = "rgba(255, 255, 255, 0.5)"; //Button icon color is changed
    decreaseButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.3)"; //Button shadow is changed



}


function fireMissile() {
    fireMissileButton.style.color = "rgba(255, 255, 255, 0.5)"; //Button icon color is changed
    fireMissileButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.3)"; //Button shadow is changed
    sendToArduino("f"); 
    
}

function changeState() {
    
    sendToArduino("c");
    
    if(automaticDriveState == false){
        
        changeStateButton.style.color = "rgba(255, 255, 255, 0.5)"; //Button icon color is changed
        changeStateButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.3)"; //Button shadow is changed
        automaticDriveState = true;
       }
    else{
        
        setButtonStyleDefault();
        automaticDriveState = false;
    }
    
   
}


/*
 * Changes the button style back to default. 
 * Called by stopMove(), which is executed on 'touchend'
 */
function setButtonStyleDefault() {

    /*Changes all icon colors and shadows back to default*/
    forwardButton.style.color = "#FFFFFF";
    forwardButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.15)";
    backwardButton.style.color = "#FFFFFF";
    backwardButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.15)";
    rightButton.style.color = "#FFFFFF";
    rightButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.15)";
    leftButton.style.color = "#FFFFFF";
    leftButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.15)";
    fireMissileButton.style.color = "#FFFFFF";
    fireMissileButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.15)";
    changeStateButton.style.color = "#FFFFFF";
    changeStateButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.15)";
    
    
    /*Makes sure the buttons will still be greyed out if it cannot go higher*/
    if (speed > 100 && speed < 250) {
        increaseButton.style.color = "#FFFFFF";
        increaseButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.15)";
        decreaseButton.style.color = "#FFFFFF";
        decreaseButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.15)";
    }
}

/*
 * This function opens or closes the themeMenu
 */
function openThemeMenu() {

    /*If the theme button is not clicked the menu will open, else it will close*/
    if (themeButtonClicked == false) {
        document.getElementById("themeMenu").style.height = "48px"; //changes the height to 48px, which makes it visible 
        document.getElementById("content").style.backgroundColor = "rgba(0, 0, 0, 0.5)"; //puts a shade on top of the content
        themeButtonClicked = true; //button is now clicked and the menu is open
    } else if (themeButtonClicked == true) {
        document.getElementById("themeMenu").style.height = "0px"; //changes the heigth to 0px, which makes it invisisble
        document.getElementById("content").style.backgroundColor = "rgba(0, 0, 0, 0)"; //removes the shade on top of content
        themeButtonClicked = false; //button is now uncklicked and the menu is closed
    }

}


/*
 * This function changes the app theme
 *
 * param desired theme
 */
function changeTheme(theme) {
    document.getElementById("body").style.backgroundColor = theme.primary; //set body bg-color to the primary color of the theme
    document.getElementById("menuBar").style.backgroundColor = theme.darkPrimary; //sets menuBar bg-color to the darkPrimary of the theme
    document.getElementById("macAddressChangerDiv").style.backgroundColor = theme.accent; //sets macAddressChangerDiv bg-color to accent color of the theme

    var leftMenuButtonClass = document.getElementsByClassName("leftMenuButton"); //creates a variable containing all elements with the leftMenuButtonClass class
    for (var i = 0; i < leftMenuButtonClass.length; i++) { //Loop needed to apply new color to all elements with the class
        leftMenuButtonClass[i].style.backgroundColor = theme.accent; //changes element number i to the new theme
    }

    var buttonClass = document.getElementsByClassName("button"); //creates a variable containing all elements with the button class
    for (var i = 0; i < buttonClass.length; i++) { //Loop needed to apply new color to all elements with the class
        buttonClass[i].style.backgroundColor = theme.accent; //changes element number i to the new theme
    }
}

/*
 * This function opens or closes the left menu
 */
function openMenu() {
    /*If the menu button is not clicked the menu will open, else it will close*/
    if (menuButtonClicked == false) {
        document.getElementById("leftMenu").style.width = "250px"; //width is 250px which makes it visible
        document.getElementById("content").style.backgroundColor = "rgba(0, 0, 0, 0.5)"; //adds a shade to the content
        menuButtonClicked = true; //menu button is clicked and menu is open
    } else if (menuButtonClicked == true) {
        document.getElementById("leftMenu").style.width = "0px"; //width is changed to 0px, which makes it invisible
        document.getElementById("content").style.backgroundColor = "rgba(0, 0, 0, 0)"; //removes the shade from the content
        menuButtonClicked = false; //menu button is unclicked and menu is closed
    }

}

/*
 * This function changes the mac address
 * Is called when macAdddresChanger button is clicked 
 */
function changeMacAddress() {
    var mac = prompt("Enter a mac address to connect to another bluetooth device", macAddress); //Prompt which allows the user to enter a new mac address

    /*If a mac address is entered the following code will execute*/
    if (mac != null) {
        if (confirm("Are you sure you want to change the mac address to the following: '" + mac + "'") == true) { //Asks user to confirm mac address change
            macAddress = mac; //Mac address is changed
            onLoad(); //onLoad is called to apply changes
        } else { //If user does not confirm nothing happens

        }
    }

}