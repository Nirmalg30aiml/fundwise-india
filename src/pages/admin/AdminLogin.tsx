import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Shield, Phone, KeyRound, ArrowRight, Loader2, AlertTriangle } from 'lucide-react';
import { z } from 'zod';

const phoneSchema = z.string()
  .regex(/^\+91[6-9]\d{9}$/, 'Please enter a valid Indian mobile number');

export default function AdminLogin() {
  const navigate = useNavigate();
  const { user, isAdmin, signInWithOtp, verifyOtp, checkAdminStatus } = useAuth();
  const { toast } = useToast();
  
  const [phone, setPhone] = useState('+91');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [user, isAdmin, navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const checkIfAdmin = async (phoneNumber: string): Promise<boolean> => {
    const { data, error } = await supabase
      .from('admin_users')
      .select('id')
      .eq('phone_number', phoneNumber)
      .maybeSingle();
    
    if (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
    
    return !!data;
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      phoneSchema.parse(phone);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Invalid Phone Number",
          description: error.errors[0].message,
          variant: "destructive"
        });
        return;
      }
    }

    setIsLoading(true);
    
    // First check if this phone number is registered as admin
    const isAdminPhone = await checkIfAdmin(phone);
    
    if (!isAdminPhone) {
      setIsLoading(false);
      toast({
        title: "Not Authorized",
        description: "This phone number is not registered as an admin.",
        variant: "destructive"
      });
      return;
    }

    const { error } = await signInWithOtp(phone);
    setIsLoading(false);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setStep('otp');
      setCountdown(60);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    const { error } = await verifyOtp(phone, otp);
    
    if (error) {
      setIsLoading(false);
      toast({
        title: "Verification Failed",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    // Check admin status after verification
    const adminStatus = await checkAdminStatus();
    setIsLoading(false);
    
    if (adminStatus) {
      navigate('/admin/dashboard');
    } else {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges.",
        variant: "destructive"
      });
    }
  };

  return (
    <Layout hideFooter>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="glass-card rounded-2xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
              <p className="text-muted-foreground text-sm">
                {step === 'phone' 
                  ? 'Enter your registered admin phone number'
                  : `We sent a code to ${phone}`
                }
              </p>
            </div>

            {/* Warning */}
            <div className="p-4 bg-warning-amber/10 rounded-xl border border-warning-amber/20 mb-6">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-warning-amber flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  This area is restricted to authorized administrators only.
                </p>
              </div>
            </div>

            {/* Phone Form */}
            {step === 'phone' && (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <Label htmlFor="phone">Admin Phone Number</Label>
                  <div className="relative mt-1.5">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="pl-10"
                      maxLength={13}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Verify Admin Access
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* OTP Form */}
            {step === 'otp' && (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <Label htmlFor="otp">Enter OTP</Label>
                  <div className="relative mt-1.5">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="Enter 6-digit OTP"
                      className="pl-10 text-center text-lg tracking-widest"
                      maxLength={6}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Access Dashboard
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setStep('phone');
                      setOtp('');
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Change phone number
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
