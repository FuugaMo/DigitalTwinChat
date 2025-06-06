export const firebaseConfig = {
  apiKey: "AIzaSyAPU9cK3kL6DvM-jUQgdpFAaIE0Vq7I5Cs",
  authDomain: "chat-dev-ef456.firebaseapp.com",
  databaseURL: "https://chat-dev-ef456-default-rtdb.firebaseio.com",
  projectId: "chat-dev-ef456",
  storageBucket: "chat-dev-ef456.firebasestorage.app",
  messagingSenderId: "197003786562",
  appId: "1:197003786562:web:b15bb9b08b0a75f4e870db",
  measurementId: "G-VG7VWKBF3Y",
};

export const TWIN_CODE = "123";
export const ASSISTANT_CODE = "321";

export const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:8000"
    : "https://digitaltwin.vercel.app/api";
