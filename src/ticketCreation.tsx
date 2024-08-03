// src/components/CreateTicket.tsx

import React, { useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import{ auth} from "./firebaseAuth";
import { getAuth } from "firebase/auth";
import {firestore} from "./firebaseAuth"; // Ensure this file exports the initialized Firebase app

const CreateTicket: React.FC = () => {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");

  const handleCreateTicket = async () => {
    const db = firestore;
    

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated");
      }

      await addDoc(collection(db, "tickets"), {
        description,
        priority,
        category,
        status: "Open",
        userId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      // Show success message or redirect to tickets list
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  return (
    <div>
      <h2>Create Ticket</h2>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="text"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        placeholder="Priority"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
      />
      <button onClick={handleCreateTicket}>Create Ticket</button>
    </div>
  );
};

export default CreateTicket;
