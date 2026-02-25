
import fs from 'fs';
import path from 'path';

// ─── Types ───────────────────────────────────────────────
interface MockUser {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    avatar: string;
    createdAt: string;
}

interface MockMessage {
    id?: number;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    createdAt?: string;
}

interface MockOrder {
    id?: number;
    userId?: number;
    plan: string;
    price?: number | string;
    amount?: number;
    cycle?: string;
    paymentMethod: string;
    status: string;
    user?: Record<string, string>;
    createdAt?: string;
}

// ─── Users ───────────────────────────────────────────────
const dbPath = path.join(process.cwd(), 'data', 'users.json');

// Ensure data directory exists
if (!fs.existsSync(path.dirname(dbPath))) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, '[]');
}

export const getUsers = (): MockUser[] => {
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(data) as MockUser[];
    } catch {
        return [];
    }
};

export const saveUser = (user: MockUser): MockUser => {
    const users = getUsers();
    users.push(user);
    fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
    return user;
};

export const findUserByEmail = (email: string): MockUser | undefined => {
    const users = getUsers();
    return users.find((u) => u.email === email);
};

// ─── Messages ────────────────────────────────────────────
const messagesPath = path.join(process.cwd(), 'data', 'messages.json');

export const getMessages = (): (MockMessage & { id: number; createdAt: string })[] => {
    try {
        if (!fs.existsSync(messagesPath)) return [];
        const data = fs.readFileSync(messagesPath, 'utf8');
        return JSON.parse(data);
    } catch {
        return [];
    }
};

export const saveMessage = (message: MockMessage) => {
    const messages = getMessages();
    const newMessage = { ...message, id: Date.now(), createdAt: new Date().toISOString() };
    messages.push(newMessage);

    if (!fs.existsSync(path.dirname(messagesPath))) {
        fs.mkdirSync(path.dirname(messagesPath), { recursive: true });
    }

    fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2));
    return newMessage;
};

// ─── Orders ──────────────────────────────────────────────
const ordersPath = path.join(process.cwd(), 'data', 'orders.json');

export const getOrders = (): (MockOrder & { id: number; createdAt: string })[] => {
    try {
        if (!fs.existsSync(ordersPath)) return [];
        const data = fs.readFileSync(ordersPath, 'utf8');
        return JSON.parse(data);
    } catch {
        return [];
    }
};

export const saveOrder = (order: MockOrder) => {
    const orders = getOrders();
    const newOrder = { ...order, id: Date.now(), createdAt: new Date().toISOString() };
    orders.push(newOrder);

    if (!fs.existsSync(path.dirname(ordersPath))) {
        fs.mkdirSync(path.dirname(ordersPath), { recursive: true });
    }

    fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));
    return newOrder;
};
