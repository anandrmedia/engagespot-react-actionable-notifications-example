import "./styles.css";
import { Engagespot } from "@engagespot/react-component";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [selectedOption, setSelectedOption] = useState("");
  const [title, setTitle] = useState("<b>You have a new message!</b>");
  const [message, setMessage] = useState("This is cool!");
  const [actionUrl, setActionUrl] = useState("https://google.com");
  const [icon, setIcon] = useState(
    "https://cdn.engagespot.com/images/engagespot_icon.jpeg"
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value); // Update selectedOption state when the select value changes
    setIsButtonDisabled(event.target.value == "0");
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value); // Update inputValue state when input value changes
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value); // Update inputValue state when input value changes
  };

  const handleIconChange = (event) => {
    setIcon(event.target.value); // Update inputValue state when input value changes
  };

  const handleActionUrlChange = (event) => {
    setIcon(event.target.value); // Update inputValue state when input value changes
  };

  const handleClick = (e: any) => {
    console.log("selectedoption is ", selectedOption);
    const content =
      selectedOption == "templated"
        ? {
            notification: {
              templateIdentifier: "newfriendrequest",
            },
            sendTo: { recipients: ["sample-user"] },
          }
        : selectedOption == "raw"
        ? {
            notification: {
              title: title,
              message: message,
              icon: icon,
              url: actionUrl,
            },
            sendTo: { recipients: ["sample-user"] },
          }
        : {
            notification: {
              templateIdentifier: selectedOption,
            },
            sendTo: { recipients: ["sample-user"] },
          };

    console.log("content is ", content);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-ENGAGESPOT-API-KEY": "i93ln6zoptcofmd2o5bll",
        "X-ENGAGESPOT-API-SECRET":
          "8qlls7fljs1j7nnobe3ra8cje2fi0g7ihi65aea5ji2a001",
      },
      body: JSON.stringify(content),
    };

    fetch("https://api.engagespot.co/v3/notifications", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <div className="App">
        <ToastContainer />
        <h2>Engagespot Actionable Notifications Example</h2>
        <p>Click the button below to trigger a sample In-App notification</p>
      </div>
      <div align="center">
        <select value={selectedOption} onChange={handleChange}>
          <option value="0" defaultChecked>
            Select notification type
          </option>
          <option value="templated">Request accept/reject</option>
          <option value="promo">Promotional message</option>
          <option value="input">Input field</option>
          <option value="raw">Raw content</option>
        </select>
        {selectedOption === "raw" && (
          <div>
            <label>Title</label>
            <input
              placeholder="Title"
              style={{ width: "300px" }}
              type="text"
              value={title}
              onChange={handleTitleChange}
            />{" "}
            <br />
            <label>Message</label>
            <input
              placeholder="Message"
              type="text"
              style={{ width: "300px" }}
              value={message}
              onChange={handleMessageChange}
            />
            <br />
            <label>Icon URL</label>
            <input
              placeholder="Icon URL"
              type="text"
              style={{ width: "300px" }}
              value={icon}
              onChange={handleIconChange}
            />
            <br />
            <label>Action URL</label>
            <input
              placeholder="Action URL"
              type="text"
              style={{ width: "300px" }}
              value={actionUrl}
              onChange={handleActionUrlChange}
            />
          </div>
        )}
        <button onClick={handleClick} disabled={isButtonDisabled}>
          Send Notification
        </button>
      </div>
      <hr />
      <div align="center" style={{ backgroundColor: "black" }}>
        <Engagespot
          apiKey="i93ln6zoptcofmd2o5bll"
          userId="sample-user"
          theme={{
            colors: {
              brandingPrimary: "#e4e4e4",
              colorPrimary: "grey",
            },
            panel: {
              height: "32rem",
              width: "24rem",
            },
            header: {
              height: "25px",
              fontSize: "15px",
              padding: "22px",
            },
          }}
          disableNotificationChime={false}
          notificationChimeSrc="https://engagespot-cdn.s3.us-west-2.amazonaws.com/click.mp3"
          eventListenersToRun={[
            {
              blockId: "newfriendrequest_b0_state_1_i0",
              event: "onClick",
              onEvent: ({ event }) => {
                console.log("Accept button clicked");
                toast(
                  "You can do anything instead of this toast! Check the code"
                );
              },
            },
            {
              blockId: "newfriendrequest_b0_state_1_i1",
              event: "onClick",
              onEvent: ({ event, changeNotificationState }) => {
                console.log("Reject button clicked");
                toast(
                  "You clicked the reject button! The state of the notification will be changed to rejected"
                );
                changeNotificationState({ state: "state_3" });
              },
            },
            {
              blockId: "input_b0_state_1_i1",
              event: "onClick",
              onEvent: ({ event, getValue, changeNotificationState }) => {
                toast("You typed - " + getValue("input_b0_state_1_i0"));
                changeNotificationState({ state: "state_2", delete: true });
              },
            },
          ]}
        />
      </div>
    </>
  );
}
