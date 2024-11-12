import axios from 'axios';

var DATA = {};

await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
    .then(function (response) {
        var items = response.data.tickets;
        var users = response.data.users;

        const status = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'].map(e => {
            return {
                title: e,
                tickets: items.filter(item => item.status === e),
            };
        });
    
        const user = users.map(e => {
            return {
                title: e.name,
                tickets: items.filter(item => item.userId === e.id),
            };
        });

        // Define priority levels and sort by level in descending order
        const priorityLevels = [
            { priority: 'No priority', level: 0 },
            { priority: 'Low', level: 1 },
            { priority: 'Medium', level: 2 },
            { priority: 'High', level: 3 },
            { priority: 'Urgent', level: 4 }
        ];

        const priority = priorityLevels
            .sort((a, b) => b.level - a.level) // Sort from high to low priority level
            .map(e => {
                return {
                    title: e.priority,
                    tickets: items.filter(item => item.priority === e.level),
                };
            });

        DATA = { status: status, user: user, priority: priority, users: users };
    })
    .catch(function (response) {
        DATA = { status: [], user: [], priority: [], users: [] };
    });

export default DATA;
