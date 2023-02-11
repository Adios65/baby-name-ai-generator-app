import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWo3BJm6-0VXuIs_95XHQo7dun5iU6PW8",
  authDomain: "baby-name-ai-generator.firebaseapp.com",
  projectId: "baby-name-ai-generator",
  storageBucket: "baby-name-ai-generator.appspot.com",
  messagingSenderId: "433609035863",
  appId: "1:433609035863:web:a85c534dffee5d07da1312"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Importing the Head component from the next/head library to use in the <Head> tag
// Importing the useState hook from the React library
// Importing the styles module from the index.module.css file

// Exporting the Home component as the default export of this file
export default function Home() {
  // Using the useState hook to create state variables and functions to update them
  const [countryInput, setCountryInput] = useState("");
  const [firstLetterInput, setFirstLetterInput] = useState("");
  const [genderInput, setGenderInput] = useState("Boy");
  const [result, setResult] = useState();

  // Async function that handles form submission
  async function onSubmit(event) {
    // Preventing the default behavior of the form submit event
    event.preventDefault();
    try {
      // Making a POST request to the /api/generate endpoint with the form data as the request body
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ first_letter: firstLetterInput, country: countryInput, gender: genderInput }),
      });

      // Parsing the JSON response from the server
      const data = await response.json();
      // Checking if the status code is not 200
      if (response.status !== 200) {
        // Throwing an error with the error message from the server or a default error message
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      // Setting the result state variable to the result from the server
      setResult(data.result);

    } catch (error) {
      // Logging the error to the console
      console.error(error);
      // Showing an alert with the error message
      alert(error.message);
    }
  }

  // Returning the JSX code for the component
  return (
    <div>
      {/* Setting the title of the page */}
      <Head>
        <title>Baby Names Genrator</title>
      </Head>

      {/* Main container for the component */}
      <main className={styles.main}>
        {/* Displaying the logo image */}
        <img src="/baby-logo.png" width="150" style={{ marginTop: "0" }} />
        {/* Displaying the header text */}
        <h3 style={{ color: "#8DDBF8", marginBottom: "0" }}> Baby Names Generator</h3>
        {/* Displaying the description text */}
        <p style={{ textAlign: "center" }}>Using OpenAI Davinci model <br /> & <br /> Basic Prompt Engineering <br /><br /></p>
        {/* The form for entering the input */}
        <form onSubmit={onSubmit}>
          {/* First letter input label */}
          <label htmlFor="first_letter">First Letter:</label>
          {/* First letter input field */}
          <input
            type="text"
            name="first_letter"
            id="first_letter"
            placeholder="Enter the first letter"
            value={firstLetterInput}
            style={{ borderColor: "#8DDBF8" }}
            onChange={(e) => setFirstLetterInput(e.target.value)}
          />
          <br />
          {/* label for the country or ethnicity input */}
          <label htmlFor="country">Country or Ethnicity:</label>

          {/* input field for country or ethnicity */}
          <input
            type="text"
            name="country"
            id="country"
            placeholder="Enter a Country or an Ethnicity"
            value={countryInput}
            style={{ borderColor: "#8DDBF8" }}
            onChange={(e) => setCountryInput(e.target.value)}
          />
          <br />

          {/* container div for the radio buttons for gender selection */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>

            {/* div for the boy radio button */}
            <div style={{ marginRight: "30px" }}>
              <input
                type="radio"
                id="boy"
                name="gender"
                value="Boy"
                checked={genderInput === "Boy"}
                onChange={(e) => setGenderInput(e.target.value)}
                style={{ height: "20px", width: "20px" }}
              />
              <label htmlFor="boy" style={{ fontSize: "20px" }}>
                Boy
              </label>
            </div>

            {/* div for the girl radio button */}
            <div>
              <input
                type="radio"
                id="girl"
                name="gender"
                value="Girl"
                checked={genderInput === "Girl"}
                onChange={(e) => setGenderInput(e.target.value)}
                style={{ height: "20px", width: "20px" }}
              />
              <label htmlFor="girl" style={{ fontSize: "20px" }}>
                Girl
              </label>
            </div>
          </div>

          {/* submit button for generating names */}
          <input type="submit" value="Generate names" style={{ backgroundColor: "#8DDBF8", color: "white", fontWeight: "bold", fontSize: "20px" }} />

          {/* div for displaying the result of generated names */}
        </form>
        <div className={styles.result} style={{ fontSize: "30px", color: "#8DDBF8" }}>{result}</div>

        {/* baby crawling image */}
        <img src="/baby-crawling2.png" width="150" />
      </main>
    </div>
  );
}
