import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

export default function CurrentPlanCard() {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-white/5 bg-card/40 backdrop-blur-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[50px] pointer-events-none group-hover:bg-primary/10 transition-colors duration-500" />
                <CardHeader className="relative z-10 pb-4">
                    <CardTitle className="text-xl">Current Plan</CardTitle>
                    <CardDescription>You are currently on the <span className="font-bold text-primary">Premium Plan</span>.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10 pt-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-white/10 rounded-xl bg-secondary/20 hover:bg-secondary/40 transition-colors gap-4 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl text-primary">
                                <Shield className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="font-bold text-lg text-foreground">Professional Plan</p>
                                <p className="text-sm text-primary font-semibold">$12.00 <span className="text-muted-foreground font-normal">/ month</span></p>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full sm:w-auto border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95" onClick={() => toast.info('Billing portal coming soon!')}>Manage Subscription</Button>
                    </div>
                    <div className="text-sm text-muted-foreground bg-primary/5 p-3 rounded-lg border border-primary/10 inline-block w-full text-center hover:bg-primary/10 transition-colors">
                        Next billing date is <span className="font-bold text-foreground mx-1">March 1, 2026</span>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
