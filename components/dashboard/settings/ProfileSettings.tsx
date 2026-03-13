import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { User, Mail, Save, UserCheck, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

interface ProfileSettingsProps {
    displayUser: { name: string; email: string };
}

export default function ProfileSettings({ displayUser }: ProfileSettingsProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        toast.success('Profile updated successfully!');
    };

    return (
        <Card className="border-white/5 bg-card/40 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[50px] pointer-events-none group-hover:bg-primary/10 transition-colors duration-500" />
            <CardHeader className="relative z-10 pb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <UserCheck className="w-5 h-5" />
                    </div>
                    <div>
                        <CardTitle className="text-xl">Profile Information</CardTitle>
                        <CardDescription className="text-sm mt-1">Update your account&apos;s personal details.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10 pt-4">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" /> Display Name
                    </Label>
                    <Input
                        id="name"
                        defaultValue={displayUser.name}
                        className="bg-background/50 border-white/10 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium h-11"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" /> Email Address
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        defaultValue={displayUser.email}
                        className="bg-background/50 border-white/10 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium h-11"
                    />
                </div>
            </CardContent>
            <CardFooter className="bg-background/30 border-t border-white/5 pt-4 mt-2">
                <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="w-full sm:w-auto gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all font-semibold"
                >
                    {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Changes</>}
                </Button>
            </CardFooter>
        </Card>
    );
}
