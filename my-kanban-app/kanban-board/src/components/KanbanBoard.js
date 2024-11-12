import React, { useState, useEffect } from 'react';

const mockData = [
  {
    id: "CAM-1",
    title: "Update User Profile Page UI",
    description: "Update the user profile page UI",
    status: "Todo",
    priority: 1,
    assignedUser: "Harsh Navani"
  },
  {
    id: "CAM-2",
    title: "Implement Email Notification System",
    description: "Add email notification functionality",
    status: "Todo",
    priority: 0,
    assignedUser: "Arbaaz Sayyed"
  },
  {
    id: "CAM-3",
    title: "Optimize Database Queries for Performance",
    description: "Improve database query performance",
    status: "Done",
    priority: 0,
    assignedUser: "User3"
  },
  {
    id: "CAM-4",
    title: "Add Multi-Language Support",
    description: "Implement multi-language support",
    status: "Todo",
    priority: 4,
    assignedUser: "Anoop Sharma"
  },
  {
    id: "CAM-5",
    title: "Add Multi-Language Support - Enable multi-language support within the...",
    description: "Enable multi-language support",
    status: "Todo",
    priority: 1,
    assignedUser: "Akanksha Punjabi"
  },
  {
    id: "CAM-6",
    title: "Enhance Search Functionality",
    description: "Improve search features",
    status: "Done",
    priority: 3,
    assignedUser: "User6"
  },
  {
    id: "CAM-7",
    title: "Integrate Third-Party Payment Gateway",
    description: "Add payment gateway integration",
    status: "Done",
    priority: 2,
    assignedUser: "Arbaaz Sayyed"
  },
  {
    id: "CAM-8",
    title: "Create Onboarding Tutorial for New Users",
    description: "Design and implement user onboarding",
    status: "Todo",
    priority: 3,
    assignedUser: "Abhideep Maity"
  },
  {
    id: "CAM-9",
    title: "Implement Role-Based Access Control (RBAC)",
    description: "Add RBAC system",
    status: "Done",
    priority: 2,
    assignedUser: "User9"
  },
  {
    id: "CAM-10",
    title: "Upgrade Server Infrastructure",
    description: "Server infrastructure upgrade",
    status: "Done",
    priority: 1,
    assignedUser: "User10"
  },
  {
    id: "CAM-11",
    title: "Conduct Security Vulnerability Assessment",
    description: "Security assessment and fixes",
    status: "Done",
    priority: 4,
    assignedUser: "User11"
  }
];

const priorities = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No priority"
};

const Ticket = ({ ticket }) => (
  <div className={`ticket priority-${ticket.priority}`}>
    <h3>{ticket.id}</h3>
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
  const [tickets, setTickets] = useState(mockData);
  const [groupBy, setGroupBy] = useState("status");
  const [sortBy, setSortBy] = useState("priority");

  useEffect(() => {
    const savedState = localStorage.getItem("kanbanState");
    if (savedState) {
      const { groupBy: savedGroupBy, sortBy: savedSortBy } = JSON.parse(savedState);
      setGroupBy(savedGroupBy);
      setSortBy(savedSortBy);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("kanbanState", JSON.stringify({ groupBy, sortBy }));
  }, [groupBy, sortBy]);

  const sortedTickets = [...tickets].sort((a, b) => {
    if (sortBy === "priority") {
      return b.priority - a.priority;
    }
    return a.title.localeCompare(b.title);
  });

  const groupedTickets = sortedTickets.reduce((acc, ticket) => {
    const key = groupBy === "status" ? ticket.status : 
                groupBy === "user" ? ticket.assignedUser : 
                priorities[ticket.priority];
    if (!acc[key]) acc[key] = [];
    acc[key].push(ticket);
    return acc;
  }, {});

  return (
    <div className="kanban-board">
      <SortingAndGrouping onGroupChange={setGroupBy} onSortChange={setSortBy} />
      <div className="columns">
        {Object.entries(groupedTickets).map(([key, tickets]) => (
          <div key={key} className="column">
            <h2>{key} {tickets.length}</h2>
            {tickets.map((ticket) => (
              <Ticket key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
