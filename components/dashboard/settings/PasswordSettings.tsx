import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Lock, ShieldCheck, KeyRound, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

export default function PasswordSettings() {
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdate = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        toast.success('Password updated successfully!');
    };

    return (
        <Card className="border-white/5 bg-card/40 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[50px] pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-500" />
            <CardHeader className="relative z-10 pb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500 border border-blue-500/20">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                        <CardTitle className="text-xl">Security & Password</CardTitle>
                        <CardDescription className="text-sm mt-1">Keep your account secure with a strong password.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10 pt-4">
                <div className="space-y-2">
                    <Label htmlFor="current-password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" /> Current Password
                    </Label>
                    <Input
                        id="current-password"
                        type="password"
                        className="bg-background/50 border-white/10 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium h-11"
                        placeholder="••••••••"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <KeyRound className="w-3.5 h-3.5 text-blue-400" /> New Password
                    </Label>
                    <Input
                        id="new-password"
                        type="password"
                        className="bg-background/50 border-white/10 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium h-11"
                        placeholder="••••••••"
                    />
                </div>
            </CardContent>
            <CardFooter className="bg-background/30 border-t border-white/5 pt-4 mt-2">
                <Button
                    onClick={handleUpdate}
                    disabled={isLoading}
                    variant="outline"
                    className="w-full sm:w-auto gap-2 border-white/10 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/30 transition-all font-semibold"
                >
                    {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Updating...</> : <><ShieldCheck className="w-4 h-4" /> Update Password</>}
                </Button>
            </CardFooter>
        </Card>
    );
}
