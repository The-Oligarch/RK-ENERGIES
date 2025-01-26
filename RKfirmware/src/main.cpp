#include <Arduino.h>
#include <Keypad.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <HTTPClient.h>
#include <WiFi.h>
#include <ArduinoJson.h>

// WiFi credentials
const char* ssid = "Nyakanga";
const char* password = "everydayiambuffering";

// Define the rows and columns for the keypad
const byte ROWS = 4;
const byte COLS = 4;

// Define the keymap
char keys[ROWS][COLS] = {
  {'1', '2', '3', 'A'},
  {'4', '5', '6', 'B'},
  {'7', '8', '9', 'C'},
  {'*', '0', '#', 'D'}
};

// Connect the keypad rows and columns to these pins on the ESP32
byte rowPins[ROWS] = {12, 14, 27, 26}; // Connect to the row pinouts of the keypad
byte colPins[COLS] = {25, 33, 32, 13}; // Connect to the column pinouts of the keypad

// Create the Keypad object
Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);

// Initialize the LCD with I2C address 0x27 and 16 columns x 2 rows
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Global variables
const int MAX_STATIONS = 4;
String fuelStations[MAX_STATIONS];
int stationCount = 0;
int currentStationIndex = 0;

// Fuel type options
const char* FUEL_TYPES[] = {"1) Petrol", "2) Diesel"};  // Petrol first
const int NUM_FUEL_TYPES = 2;
int currentFuelTypeIndex = 0;
unsigned long lastScrollTime = 0;
const int SCROLL_INTERVAL = 2000; // Scroll every 2 seconds

// Backend API URLs
const char* stationsUrl = "https://rk-energies-u9cj.onrender.com/backendapi/stations/";
const char* espPayloadUrl = "https://rk-energies-u9cj.onrender.com/backendapi/esppayload/";

// State variables
enum SystemState {
  STATE_WAITING,
  STATE_FUEL_TYPE,
  STATE_AMOUNT,
  STATE_PHONE,
  STATE_STATION_SELECT,
  STATE_PROCESSING
};

SystemState currentState = STATE_WAITING;
String selectedFuelType = "";
String amount = "";
String phoneNumber = "";
String inputBuffer = "";

// Function declarations
void displayWaitingMessage();
void displayFuelTypes();
void displayStationSelect();
void displayConfirmationMessage();
void sendPayload();
void handleInput(char key);
void connectToWiFi();
void getFuelStations();

void connectToWiFi() {
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi connected!");
  } else {
    Serial.println("\nWiFi connection failed!");
  }
}

void getFuelStations() {
  if (WiFi.status() != WL_CONNECTED) return;

  HTTPClient http;
  http.begin(stationsUrl);
  
  int httpCode = http.GET();
  
  if (httpCode > 0) {
    String payload = http.getString();
    DynamicJsonDocument doc(1024);
    DeserializationError error = deserializeJson(doc, payload);
    
    if (!error) {
      JsonArray stations = doc.as<JsonArray>();
      stationCount = 0;
      
      for(JsonVariant station : stations) {
        if (stationCount < MAX_STATIONS) {
          fuelStations[stationCount] = station.as<String>();
          stationCount++;
        }
      }
      
      if (stationCount > 0) {
        Serial.println("Stations loaded successfully");
      }
    }
  }
  
  http.end();
}

void sendPayload() {
  if (WiFi.status() != WL_CONNECTED) {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("No connection");
    delay(2000);
    displayWaitingMessage();
    return;
  }

  // Show processing message
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Processing...");

  HTTPClient http;
  http.begin(espPayloadUrl);
  http.addHeader("Content-Type", "application/json");
  
  // Create JSON payload
  DynamicJsonDocument doc(1024);
  doc["fuelstation"] = fuelStations[currentStationIndex];
  doc["fuel"] = selectedFuelType;  // Now sending "petrol" or "diesel"
  doc["amount"] = amount.toFloat();
  doc["phone"] = phoneNumber;  // Send phone as string to preserve leading zeros
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  Serial.println("Sending payload: " + jsonString);
  int httpCode = http.POST(jsonString);
  
  if (httpCode > 0) {
    String response = http.getString();
    Serial.println("API Response: " + response);
    currentState = STATE_PROCESSING;
  } else {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Send failed");
    lcd.setCursor(0, 1);
    lcd.print("Try again");
    delay(2000);
    currentState = STATE_WAITING;
    displayWaitingMessage();
  }
  
  http.end();
}

void displayFuelTypes() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Select fuel type:");
  lcd.setCursor(0, 1);
  lcd.print(FUEL_TYPES[currentFuelTypeIndex]);
}

void displayWaitingMessage() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("RK Energies");
  lcd.setCursor(0, 1);
  lcd.print("Press # to fuel");
}

void displayConfirmationMessage() {
  String fuelTypeStr = selectedFuelType == "1" ? "Petrol" : "Diesel";
  
  // First screen: Transaction details
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Pay for " + fuelTypeStr);
  lcd.setCursor(0, 1);
  lcd.print("KSh " + amount);
  delay(2000);  // Show first screen for 2 seconds
  
  // Second screen: Phone and confirmation
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("from " + phoneNumber);
  lcd.setCursor(0, 1);
  lcd.print("# OK  * Restart");
}

void displayStationSelect() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Select station 1-");
  lcd.print(stationCount);
  lcd.setCursor(0, 1);
  if (stationCount > 0) {
    lcd.print(String(currentStationIndex + 1) + ") ");
    lcd.print(fuelStations[currentStationIndex]);
  } else {
    lcd.print("No stations");
  }
}

void handleInput(char key) {
  switch(currentState) {
    case STATE_WAITING:
      if (key == '#') {
        currentState = STATE_FUEL_TYPE;
        currentFuelTypeIndex = 0;  // Start with Petrol
        displayFuelTypes();
        inputBuffer = "";
      } else if (key == 'C') {
        currentState = STATE_STATION_SELECT;
        currentStationIndex = 0;
        getFuelStations();  // Refresh stations list
        displayStationSelect();
      }
      break;

    case STATE_STATION_SELECT:
      if (key == 'D') {
        currentState = STATE_WAITING;
        displayWaitingMessage();
      } else if (key >= '1' && key <= '9') {
        int selected = key - '1';  // Convert char to int (0-based index)
        if (selected < stationCount) {
          currentStationIndex = selected;
          lcd.clear();
          lcd.setCursor(0, 0);
          lcd.print("Station selected:");
          lcd.setCursor(0, 1);
          lcd.print(fuelStations[currentStationIndex]);
          delay(1500);
          currentState = STATE_WAITING;
          displayWaitingMessage();
        }
      } else if (key == '#' && stationCount > 0) {
        currentStationIndex = (currentStationIndex + 1) % stationCount;
        displayStationSelect();
      }
      break;
      
    case STATE_FUEL_TYPE:
      if (key == '1' || key == '2') {
        selectedFuelType = key == '1' ? "petrol" : "diesel";  // Store as string
        currentState = STATE_AMOUNT;
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("Enter amount:");
        inputBuffer = "";
      } else if (key == 'D') {  // Use 'D' key to manually scroll
        currentFuelTypeIndex = (currentFuelTypeIndex + 1) % NUM_FUEL_TYPES;
        displayFuelTypes();
      } else if (key == '*') {
        currentState = STATE_FUEL_TYPE;
        currentFuelTypeIndex = 0;  // Reset to Petrol
        displayFuelTypes();
        inputBuffer = "";
      }
      break;
      
    case STATE_AMOUNT:
      if (key >= '0' && key <= '9') {
        if (inputBuffer.length() < 8) {  // Limit amount length
          inputBuffer += key;
          lcd.setCursor(0, 1);
          lcd.print(inputBuffer);
        }
      } else if (key == '#') {
        amount = inputBuffer;
        currentState = STATE_PHONE;
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("Enter phone:");
        inputBuffer = "";
      } else if (key == '*') {
        currentState = STATE_FUEL_TYPE;
        currentFuelTypeIndex = 0;  // Reset to Petrol
        displayFuelTypes();
        inputBuffer = "";
      }
      break;
      
    case STATE_PHONE:
      if (key >= '0' && key <= '9') {
        if (inputBuffer.length() < 10) {  // Limit phone number to 10 digits
          inputBuffer += key;
          lcd.setCursor(0, 1);
          lcd.print(inputBuffer);
          if (inputBuffer.length() == 10) {
            phoneNumber = inputBuffer;
            displayConfirmationMessage();
          }
        }
      } else if (key == '#' && inputBuffer.length() == 10) {
        phoneNumber = inputBuffer;
        inputBuffer = "";
        sendPayload();
      } else if (key == '*') {
        currentState = STATE_FUEL_TYPE;
        currentFuelTypeIndex = 0;  // Reset to Petrol
        displayFuelTypes();
        inputBuffer = "";
        phoneNumber = "";
        amount = "";
        selectedFuelType = "";
      }
      break;

    case STATE_PROCESSING:
      // No input handling in processing state
      // Will be updated when we implement the second API
      break;
  }
}

void setup() {
  Serial.begin(9600);
  
  // Initialize LCD
  Wire.begin();
  lcd.init();
  lcd.backlight();
  
  // Show initial message immediately
  displayWaitingMessage();
  
  // Connect to WiFi in background
  connectToWiFi();
  
  // Get initial stations list
  if (WiFi.status() == WL_CONNECTED) {
    getFuelStations();
  }
}

void loop() {
  char key = keypad.getKey();
  
  if (key) {
    Serial.println(key);
    handleInput(key);
  }
  
  // Auto-scroll stations in station select mode
  static unsigned long lastStationScrollTime = 0;
  if (currentState == STATE_STATION_SELECT && stationCount > 0 && 
      millis() - lastStationScrollTime >= SCROLL_INTERVAL) {
    currentStationIndex = (currentStationIndex + 1) % stationCount;
    displayStationSelect();
    lastStationScrollTime = millis();
  }
  
  // Auto-scroll fuel types
  if (currentState == STATE_FUEL_TYPE && millis() - lastScrollTime >= SCROLL_INTERVAL) {
    currentFuelTypeIndex = (currentFuelTypeIndex + 1) % NUM_FUEL_TYPES;
    displayFuelTypes();
    lastScrollTime = millis();
  }
  
  // Add processing animation if needed
  static unsigned long lastDotTime = 0;
  static int dots = 0;
  if (currentState == STATE_PROCESSING && millis() - lastDotTime >= 500) {
    lcd.setCursor(11, 0);  // Position after "Processing"
    for (int i = 0; i < 3; i++) {
      lcd.print(i < dots ? '.' : ' ');
    }
    dots = (dots + 1) % 4;
    lastDotTime = millis();
  }
  
  // Periodically check WiFi and refresh stations list
  static unsigned long lastCheck = 0;
  if (millis() - lastCheck >= 300000) { // Every 5 minutes
    if (WiFi.status() != WL_CONNECTED) {
      connectToWiFi();
    }
    if (WiFi.status() == WL_CONNECTED) {
      getFuelStations();
    }
    lastCheck = millis();
  }
}