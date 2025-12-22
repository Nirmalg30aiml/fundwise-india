import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calculator, IndianRupee, Percent, ArrowRight } from 'lucide-react';

export function DirectVsRegularBanner() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-8 md:p-12">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
                <IndianRupee className="w-4 h-4 text-primary-foreground" />
                <span className="text-sm font-medium text-primary-foreground">Save 0.5-1% Annually</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Direct vs Regular Plans:<br />
                See the Difference
              </h2>
              
              <p className="text-primary-foreground/80 max-w-lg mb-8">
                Direct plans have no distributor commission, which means lower expense ratio 
                and higher returns for you. Our calculator shows exactly how much you can save.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-foreground">0.5-1%</div>
                  <div className="text-sm text-primary-foreground/70">Lower Expense</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-foreground">₹50K+</div>
                  <div className="text-sm text-primary-foreground/70">Potential Savings*</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-foreground">10Y</div>
                  <div className="text-sm text-primary-foreground/70">Investment Period</div>
                </div>
              </div>

              <Link to="/calculator">
                <Button variant="hero-outline" size="xl" className="gap-2">
                  <Calculator className="w-5 h-5" />
                  Calculate Your Savings
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="flex-shrink-0">
              <div className="w-64 h-64 relative">
                {/* Visual representation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center p-6">
                    <Percent className="w-16 h-16 text-primary-foreground mb-4" />
                    <div className="text-2xl font-bold text-primary-foreground">Direct Plan</div>
                    <div className="text-sm text-primary-foreground/70">Lower Costs = Higher Returns</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-primary-foreground/50 mt-6 text-center">
            *Savings calculated on ₹1L investment over 10 years. Actual savings may vary.
          </p>
        </div>
      </div>
    </section>
  );
}
