import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PaymentMethodCard() {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-white/5 bg-card/40 backdrop-blur-md relative overflow-hidden group">
                <CardHeader className="relative z-10 pb-4">
                    <CardTitle className="text-xl">Payment Method</CardTitle>
                    <CardDescription>Manage your payment details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10 pt-4">
                    <div className="flex items-center gap-4 p-4 border border-white/10 rounded-xl bg-secondary/10 hover:bg-secondary/30 transition-colors cursor-pointer group/item">
                        <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover/item:border-primary/50 transition-colors">
                            <CreditCard className="w-6 h-6 text-foreground group-hover/item:text-primary transition-colors" />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-foreground">Visa ending in <span className="font-mono bg-white/10 px-1.5 py-0.5 rounded ml-1 tracking-wider">4242</span></p>
                            <p className="text-xs text-muted-foreground mt-0.5 font-medium">Expiry 12/2028</p>
                        </div>
                        <Button variant="ghost" size="sm" className="hover:bg-white/10 text-primary transition-transform duration-300 hover:scale-110 active:scale-95">Edit</Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
