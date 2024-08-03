// src/components/UserDashboard.tsx

import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {firestore,auth} from "./firebaseAuth";

const UserDashboard: React.FC = () => {
  const [tickets, setTickets] = useState<
    Array<{ id: string; description: string; status: string }>
  >([]);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");

  const handleCreateTicket = async () => {
    const db = firestore;
   
    const userId = auth.currentUser?.uid;

    if (!userId) {
      console.error("No user logged in");
      return;
    }

    try {
      await addDoc(collection(db, "tickets"), {
        description,
        priority,
        category,
        status: "Open",
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      // Optionally clear form fields and/or show a success message
      setDescription("");
      setPriority("");
      setCategory("");
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  useEffect(() => {
   const db = firestore;
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        const q = query(
          collection(db, "tickets"),
          where("userId", "==", userId)
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const ticketsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Array<{ id: string; description: string; status: string }>;
          setTickets(ticketsData);
        });

        return () => unsubscribe();
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">My Tickets</h2>

      {/* Ticket Creation Form */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Create New Ticket</h3>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          placeholder="Priority"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleCreateTicket}
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Create Ticket
        </button>
      </div>

      {/* Ticket List */}
      <ul className="space-y-4">
        {tickets.map((ticket) => (
          <li key={ticket.id} className="p-4 bg-white rounded-lg shadow-md">
            <p className="font-semibold">{ticket.description}</p>
            <p className="text-gray-500">Status: {ticket.status}</p>
            <p className="text-gray-500">Priority: {ticket.priority}</p>
            <p className="text-gray-500">Category: {ticket.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
