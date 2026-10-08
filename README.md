# Food Ordering App (Expo)

## Setup
```bash
npx create-expo-app@latest food-app --template blank
cd food-app
# copy App.js, theme.js and the src/ folder from this project into it (overwrite App.js)
npx expo install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context @expo/vector-icons
npx expo start
```
Scan the QR code with Expo Go.

## Flow
Home -> Food Details -> Add to Cart -> Cart -> Checkout -> Payment -> Place Order -> Order Tracking

Promo code to try in the cart: FOOD10 (10% off)
