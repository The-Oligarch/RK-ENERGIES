#include <Arduino.h>
#include <Keypad.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <HTTPClient.h>
#include <WiFi.h>

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

// FreeRTOS task handles
TaskHandle_t TaskUserMode;
TaskHandle_t TaskAPI;

// Global variables for mode selection and task control
volatile bool isUserMode = false;
volatile bool isCancelRequested = false;
volatile bool isSelectingStation = false;
String selectedStation = "";
String fuelStations[] = {"Station 1", "Station 2", "Station 3"};
int stationCount = 3;
int currentStationIndex = 0;

// Function declarations
void TaskUserModeFunction(void *pvParameters);
void TaskAPIFunction(void *pvParameters);
void displayModeSelection();
String getFuelStationsFromAPI();
void sendToAPI(String station, String fuelType, String amount, String phoneNumber);
bool waitForConfirmation();
void displayCurrentStation();
void handleKeypadInput();
void connectToWiFi();

void setup() {
  Serial.begin(9600);
  Serial.println("Initializing");

  // Initialize the LCD
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("RK Energies");
  delay(2000);
  lcd.clear();

  // Connect to WiFi
  connectToWiFi();

  // Create tasks
  xTaskCreate(TaskUserModeFunction, "User Mode Task", 2048, NULL, 1, &TaskUserMode);
  xTaskCreate(TaskAPIFunction, "API Task", 2048, NULL, 1, &TaskAPI);

  // Display mode selection
  displayModeSelection();
}

void loop() {
  handleKeypadInput();
}

void handleKeypadInput() {
  char key = keypad.getKey();
  if (key) {
    Serial.print("Key pressed: ");
    Serial.println(key);

    if (key == '#') {
      isUserMode = true;
    } else if (key == 'C') {
      isSelectingStation = true;
    }
  }
}

void TaskAPIFunction(void *pvParameters) {
  while (1) {
    if (isSelectingStation) {
      // Simulate API call to get fuel stations
      String fuelStationsData = getFuelStationsFromAPI();

      // Display the first station
      displayCurrentStation();

      while (isSelectingStation) {
        char key = keypad.getKey();
        if (key) {
          Serial.print("Key pressed: ");
          Serial.println(key);

          if (key == 'D') {
            // Move to the next station
            currentStationIndex = (currentStationIndex + 1) % stationCount;
            displayCurrentStation();
          } else if (key == '*') {
            // Select the current station
            selectedStation = fuelStations[currentStationIndex];
            Serial.print("Selected Station: ");
            Serial.println(selectedStation);
            lcd.clear();
            lcd.setCursor(0, 0);
            lcd.print("Station Selected:");
            lcd.setCursor(0, 1);
            lcd.print(selectedStation);
            delay(2000);
            // Exit initial station selection
            displayModeSelection();
            isSelectingStation = false;
          }
        }
        vTaskDelay(100 / portTICK_PERIOD_MS);
      }
    }
    vTaskDelay(100 / portTICK_PERIOD_MS);
  }
}

void TaskUserModeFunction(void *pvParameters) {
  while (1) {
    if (isUserMode) {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Select fuel type:");
      lcd.setCursor(0, 1);
      lcd.print("1: Petrol 2: Diesel");

      // Wait for fuel type selection or cancel
      String fuelType = "";
      while (true) {
        char key = keypad.getKey();
        if (key == '1' || key == '2') {
          fuelType = key;
          break;
        }
        vTaskDelay(10 / portTICK_PERIOD_MS);
      }

      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Enter amount:");

      // Wait for amount input or cancel
      String amount = "";
      while (true) {
        char key = keypad.getKey();
        if (key == '*') {
          break;
        }
        if (key != NO_KEY) {
          amount += key;
          lcd.setCursor(0, 1);
          lcd.print(amount);
        }
        vTaskDelay(10 / portTICK_PERIOD_MS);
      }

      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Enter phone num:");

      // Wait for phone number input or cancel
      String phoneNumber = "";
      while (true) {
        char key = keypad.getKey();
        if (key == '*' && phoneNumber.length() == 10) {
          break;
        }
        if (key != NO_KEY) {
          phoneNumber += key;
          lcd.setCursor(0, 1);
          lcd.print(phoneNumber);
        }
        vTaskDelay(10 / portTICK_PERIOD_MS);
      }

      // Send data to API
      sendToAPI(selectedStation, fuelType, amount, phoneNumber);

      // Wait for confirmation
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Waiting for");
      lcd.setCursor(0, 1);
      lcd.print("confirmation...");
      if (waitForConfirmation()) {
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("Refuel complete");
        lcd.setCursor(0, 1);
        lcd.print(phoneNumber);
      } else {
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("Failed to refuel");
      }
      vTaskDelay(5000 / portTICK_PERIOD_MS);

      isUserMode = false;
      displayModeSelection();
    }
    vTaskDelay(10 / portTICK_PERIOD_MS);
  }
}

void displayModeSelection() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Press # to fuel");
}

String getFuelStationsFromAPI() {
  // Simulate API call to get fuel stations
  // Replace with actual HTTP GET request
  vTaskDelay(2000 / portTICK_PERIOD_MS); // Simulate network delay
  return "Station 1, Station 2, Station 3";
}

void sendToAPI(String station, String fuelType, String amount, String phoneNumber) {
  // Simulate sending data to API as JSON
  HTTPClient http;
  http.begin("http://example.com/api/refuel"); // Replace with actual API URL
  http.addHeader("Content-Type", "application/json");

  String jsonPayload = "{\"station\":\"" + station + "\", \"fuelType\":\"" + fuelType + "\", \"amount\":\"" + amount + "\", \"phoneNumber\":\"" + phoneNumber + "\"}";

  int httpResponseCode = http.POST(jsonPayload);

  Serial.print("HTTP Response code: ");
  Serial.println(httpResponseCode);

  http.end();
}

bool waitForConfirmation() {
  // Simulate waiting for confirmation from API
  // Replace with actual HTTP GET request to check status
  vTaskDelay(5000 / portTICK_PERIOD_MS); // Simulate waiting period

  // Simulate success response
  return true;
}

void displayCurrentStation() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Fuel Station:");
  lcd.setCursor(0, 1);
  lcd.print(fuelStations[currentStationIndex]);
}

void connectToWiFi() {
  WiFi.begin(ssid, password);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Connecting to WiFi");
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    lcd.setCursor(0, 1);
    lcd.print(".");
  }
  
  Serial.println("Connected to WiFi");
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("WiFi Connected");
  delay(2000);
  lcd.clear();
}