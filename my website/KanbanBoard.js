import React, { useEffect, useState } from 'react';
import './App.css';

const statuses = ["Todo", "In Progress", "Done"];
const priorities = { 4: "Urgent", 3: "High", 2: "Medium", 1: "Low", 0: "No priority" };

const Ticket = ({ ticket }) => (
  <div className={`ticket priority-${ticket.priority}`}>
    <h3>{ticket.title}</h3>
    <p>{ticket.description}</p>
    <p>Priority: {priorities[ticket.priority]}</p>
    <p>Assigned to: {ticket.assignedUser}</p>
  </div>
);

const SortingAndGrouping = ({ onGroupChange, onSortChange }) => (
  <div className="controls">
    <select onChange={(e) => onGroupChange(e.target.value)}>
      <option value="status">Group by Status</option>
      <option value="user">Group by User</option>
      <option value="priority">Group by Priority</option>
    </select>
    <select onChange={(e) => onSortChange(e.target.value)}>
      <option value="priority">Sort by Priority</option>
      <option value="title">Sort by Title</option>
    </select>
  </div>
);

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [groupBy, setGroupBy] = useState("status");
  const [sortBy, setSortBy] = useState("priority");

  useEffect(() => {
    // Mock data for testing purposes
    const data = [
      { id: 1, title: "Sample Task", description: "A sample task", priority: 3, status: "Todo", assignedUser: "John Doe" }
      // Add more mock tickets as required
    ];
    setTickets(data);
    const savedState = JSON.parse(localStorage.getItem("kanbanState"));
    if (savedState) {
      setGroupBy(savedState.groupBy);
      setSortBy(savedState.sortBy);
    }
  }, []);

  const sortedTickets = tickets.sort((a, b) => {
    return sortBy === "priority" ? b.priority - a.priority : a.title.localeCompare(b.title);
  });

  const groupedTickets = sortedTickets.reduce((acc, ticket) => {
    const key = groupBy === "status" ? ticket.status : groupBy === "user" ? ticket.assignedUser : priorities[ticket.priority];
    if (!acc[key]) acc[key] = [];
    acc[key].push(ticket);
    return acc;
  }, {});

  useEffect(() => {
    localStorage.setItem("kanbanState", JSON.stringify({ groupBy, sortBy }));
  }, [groupBy, sortBy]);

  return (
    <div className="kanban-board">
      <SortingAndGrouping onGroupChange={setGroupBy} onSortChange={setSortBy} />
      <div className="columns">
        {Object.keys(groupedTickets).map((key) => (
          <div key={key} className="column">
            <h2>{key}</h2>
            {groupedTickets[key].map((ticket) => (
              <Ticket key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
