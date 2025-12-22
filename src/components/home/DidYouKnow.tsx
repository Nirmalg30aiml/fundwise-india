import { useState, useEffect } from 'react';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const facts = [
  {
    fact: "India's first mutual fund, UTI, was launched in 1963 - over 60 years ago!",
    category: "History"
  },
  {
    fact: "SEBI mandates that Large Cap funds must invest at least 80% in the top 100 companies by market capitalization.",
    category: "Regulation"
  },
  {
    fact: "Direct plans can save you 0.5% to 1% annually compared to Regular plans - that's lakhs over your investment lifetime!",
    category: "Savings"
  },
  {
    fact: "ELSS funds have the shortest lock-in period (3 years) among all tax-saving instruments under Section 80C.",
    category: "Tax"
  },
  {
    fact: "Multi Cap funds must invest at least 25% each in large, mid, and small-cap stocks as per SEBI rules.",
    category: "Regulation"
  },
  {
    fact: "The power of compounding means ₹10,000 invested monthly at 12% returns becomes ₹1 Crore in about 20 years!",
    category: "Wealth"
  },
  {
    fact: "Index funds and ETFs typically have expense ratios below 0.5%, making them cost-effective investment options.",
    category: "Costs"
  },
  {
    fact: "SIP allows you to invest as low as ₹100 per month in most mutual funds, making investing accessible to everyone.",
    category: "Accessibility"
  },
  {
    fact: "Sectoral funds concentrate 80% of investments in a single sector, making them high-risk, high-reward options.",
    category: "Risk"
  },
  {
    fact: "The NFO (New Fund Offer) NAV is typically ₹10, but this doesn't make it 'cheap' - what matters is the portfolio quality.",
    category: "Myths"
  }
];

export function DidYouKnow() {
  const [currentFact, setCurrentFact] = useState(facts[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Change fact daily
    const today = new Date().getDate();
    setCurrentFact(facts[today % facts.length]);
  }, []);

  const refreshFact = () => {
    setIsAnimating(true);
    const randomIndex = Math.floor(Math.random() * facts.length);
    setTimeout(() => {
      setCurrentFact(facts[randomIndex]);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="glass-card rounded-2xl p-6 md:p-8 border-l-4 border-l-warning-amber">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-warning-amber/10 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-6 h-6 text-warning-amber" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold">Did You Know?</h3>
                <span className="category-pill bg-warning-amber/10 text-warning-amber">
                  {currentFact.category}
                </span>
              </div>
              
              <p className={`text-muted-foreground transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                {currentFact.fact}
              </p>
            </div>

            <Button 
              variant="ghost" 
              size="icon"
              onClick={refreshFact}
              className="flex-shrink-0"
              disabled={isAnimating}
            >
              <RefreshCw className={`w-5 h-5 ${isAnimating ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
