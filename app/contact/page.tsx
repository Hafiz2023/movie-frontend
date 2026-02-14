'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, MapPin, Send } from 'lucide-react';
import InfoPageLayout from '@/components/layout/InfoPageLayout';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function ContactPage() {
    return (
        <InfoPageLayout title="Contact Support">
            <p className="text-xl text-muted-foreground mb-8">
                We're here to help. Whether you have a question about our premium plans, need technical assistance, or want to report an issue, our team is ready to assist you.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="flex items-start gap-4 p-6 bg-secondary/20 rounded-xl border border-border">
                        <Mail className="w-8 h-8 text-primary mt-1" />
                        <div>
                            <h3 className="text-lg font-bold mb-1">Email Us</h3>
                            <p className="text-muted-foreground mb-2">For general inquiries and support.</p>
                            <a href="mailto:support@movieapp.com" className="text-primary hover:underline font-semibold">support@movieapp.com</a>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 bg-secondary/20 rounded-xl border border-border">
                        <Phone className="w-8 h-8 text-primary mt-1" />
                        <div>
                            <h3 className="text-lg font-bold mb-1">Call Us</h3>
                            <p className="text-muted-foreground mb-2">Mon-Fri from 9am to 6pm.</p>
                            <a href="tel:+15550000000" className="text-primary hover:underline font-semibold">+1 (555) 000-0000</a>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 bg-secondary/20 rounded-xl border border-border">
                        <MessageSquare className="w-8 h-8 text-primary mt-1" />
                        <div>
                            <h3 className="text-lg font-bold mb-1">Live Chat</h3>
                            <p className="text-muted-foreground mb-2">Chat with our support team in real-time.</p>
                            <button className="text-primary hover:underline font-semibold">Start Chat</button>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 bg-secondary/20 rounded-xl border border-border">
                        <MapPin className="w-8 h-8 text-primary mt-1" />
                        <div>
                            <h3 className="text-lg font-bold mb-1">Corporate Office</h3>
                            <p className="text-muted-foreground">
                                123 Premium Content Blvd<br />
                                Los Angeles, CA 90028<br />
                                USA
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-border p-8 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold mb-6">Send us a Message</h3>
                    <ContactForm />
                </div>
            </div>
        </InfoPageLayout>
    );
}

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axios.post('/api/contact', formData);
            toast.success('Message sent successfully!');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: 'General Inquiry',
                message: ''
            });
        } catch (error) {
            console.error(error);
            toast.error('Failed to send message. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        type="text"
                        className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm focus:border-primary outline-none"
                        placeholder="Your name"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        type="email"
                        className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm focus:border-primary outline-none"
                        placeholder="your@email.com"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel"
                    className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm focus:border-primary outline-none"
                    placeholder="+1 (555) 000-0000"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm focus:border-primary outline-none"
                >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Billing Issue">Billing Issue</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Content Report">Content Report</option>
                    <option value="Partnership">Partnership</option>
                </select>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm focus:border-primary outline-none min-h-[150px]"
                    placeholder="How can we help you?..."
                ></textarea>
            </div>

            <button
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
                <Send className="w-4 h-4" /> {isLoading ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    );
}
