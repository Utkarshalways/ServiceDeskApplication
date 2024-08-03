// src/components/AdminDashboard.tsx

import React, { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import {firestore} from "./firebaseAuth"; // Ensure this file exports the initialized Firebase app

const AdminDashboard: React.FC = () => {
  const [tickets, setTickets] = useState<
    Array<{ id: string; description: string; status: string }>
  >([]);

  useEffect(() => {
    const db = firestore;
    const ticketsCollection = collection(db, "tickets");
    const unsubscribe = onSnapshot(ticketsCollection, (snapshot) => {
      const ticketsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Array<{ id: string; description: string; status: string }>;
      setTickets(ticketsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <ul className="space-y-4">
        {tickets.map((ticket) => (
          <li key={ticket.id} className="p-4 bg-white rounded-lg shadow-md">
            <p className="font-semibold">{ticket.description}</p>
            <p className="text-gray-500">{ticket.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
