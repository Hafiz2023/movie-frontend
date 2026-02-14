
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'users.json');

// Ensure data directory calls
if (!fs.existsSync(path.dirname(dbPath))) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, '[]');
}

export const getUsers = () => {
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

export const saveUser = (user: any) => {
    const users = getUsers();
    users.push(user);
    fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
    return user;
};

export const findUserByEmail = (email: string) => {
    const users = getUsers();
    return users.find((u: any) => u.email === email);
};

const messagesPath = path.join(process.cwd(), 'data', 'messages.json');

if (!fs.existsSync(messagesPath)) {
    // fs.writeFileSync(messagesPath, '[]'); // Don't write immediately on import if not needed, but good for setup
}

export const getMessages = () => {
    try {
        if (!fs.existsSync(messagesPath)) return [];
        const data = fs.readFileSync(messagesPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

export const saveMessage = (message: any) => {
    const messages = getMessages();
    const newMessage = { ...message, id: Date.now(), createdAt: new Date().toISOString() };
    messages.push(newMessage);

    if (!fs.existsSync(path.dirname(messagesPath))) {
        fs.mkdirSync(path.dirname(messagesPath), { recursive: true });
    }

    fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2));
    return newMessage;
};

const ordersPath = path.join(process.cwd(), 'data', 'orders.json');

export const getOrders = () => {
    try {
        if (!fs.existsSync(ordersPath)) return [];
        const data = fs.readFileSync(ordersPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

export const saveOrder = (order: any) => {
    const orders = getOrders();
    const newOrder = { ...order, id: Date.now(), createdAt: new Date().toISOString() };
    orders.push(newOrder);

    if (!fs.existsSync(path.dirname(ordersPath))) {
        fs.mkdirSync(path.dirname(ordersPath), { recursive: true });
    }

    fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));
    return newOrder;
};
