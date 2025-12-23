import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { Phone, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PhoneAuthGuardProps {
  children: React.ReactNode;
}

export function PhoneAuthGuard({ children }: PhoneAuthGuardProps) {
  const { user, isLoading } = useAuth();

  // Check if user signed up with phone
  const isPhoneUser = user?.phone ? true : false;

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </Layout>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <Layout>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Lock className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mb-4">Sign In Required</h1>
              <p className="text-muted-foreground mb-6">
                Goal-based investing is available for registered users. 
                Sign in with your phone number to access personalized goal planning.
              </p>
              <Button asChild size="lg" className="gap-2">
                <Link to="/auth">
                  <Phone className="w-4 h-4" />
                  Sign In with Phone
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // Logged in but NOT with phone
  if (!isPhoneUser) {
    return (
      <Layout>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-warning-amber/10 flex items-center justify-center mx-auto mb-6">
                <Phone className="w-10 h-10 text-warning-amber" />
              </div>
              <h1 className="text-2xl font-bold mb-4">Phone Verification Required</h1>
              <p className="text-muted-foreground mb-6">
                Goal-based investing is available only for users registered via phone number. 
                This helps us provide personalized reminders and secure your financial goals.
              </p>
              
              <div className="glass-card rounded-xl p-6 mb-6 text-left">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-primary" />
                  Why phone verification?
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">✓</span>
                    Secure OTP-based authentication
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">✓</span>
                    Receive SIP reminders and goal updates
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">✓</span>
                    Better protection for your financial data
                  </li>
                </ul>
              </div>

              <Button asChild size="lg" className="gap-2">
                <Link to="/auth">
                  <Phone className="w-4 h-4" />
                  Add Phone Number
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // Phone user - allow access
  return <>{children}</>;
}
