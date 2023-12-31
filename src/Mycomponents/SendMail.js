import { Button } from "@mui/material";
import React from "react";
import "./SendMail.css";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { closeSendMessage } from "../features/mailSlice";
import { db } from "../firebase"
import firebase from "firebase/compat/app";


function SendMail() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);
    db.collection("emails").add({
      to: formData.to,
      subject: formData.subject,
      message: formData.message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    dispatch(closeSendMessage());

  };

  return (
    <div className="sendMail">
      <div className="sendMail_header">
        <h3>New Message</h3>
        <CloseIcon
          onClick={() => dispatch(closeSendMessage())}
          className="sendMail_close"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("to", { required: true })}
          placeholder="To"
          type="text"
        />
        {errors.to && <p className="sendMail_error">To is required!</p>}

        <input
          {...register("subject", { required: true })}
          placeholder="Subject"
          type="text"
        />
        {errors.subject && (
          <p className="sendMail_error">Subject is required!</p>
        )}

        <input
          {...register("message", { required: true })}
          type="text"
          placeholder="Message..."
          className="sendMail_message"
        />
        {errors.message && (
          <p className="sendMail_error">Message is required!</p>
        )}

        <div className="sendMail_options">
          <Button
            className="sendMail_send"
            variant="contained"
            color="primary"
            type="submit"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SendMail;
