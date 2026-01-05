import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { 
  Building2, 
  TrendingUp, 
  Rocket, 
  Shuffle, 
  Target,
  Factory,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  BookOpen,
  HelpCircle,
  Lightbulb,
  IndianRupee,
  Percent,
  BarChart3,
  Clock,
  Scale,
  Wallet,
  PiggyBank,
  TrendingDown
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const fundCategories = [
  {
    name: 'Index Funds',
    icon: BarChart3,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
    borderColor: 'border-l-secondary',
    sebiDefinition: 'Passively managed funds that replicate a market index (Nifty 50, Sensex, Nifty Next 50) by holding the same stocks in same proportion.',
    example: 'Instead of a fund manager picking stocks, the fund simply mirrors an index. If Nifty 50 has 50 stocks, the fund holds those exact 50 stocks.',
    riskLevel: 'Low to Moderate',
    suitableFor: 'Beginners and long-term investors who prefer low-cost, hassle-free investing',
    keyPoints: [
      'Lowest expense ratios (0.1-0.5%)',
      'No fund manager bias or stock picking risk',
      'Warren Buffett recommends for most investors',
      'Best for 5+ year investment horizon'
    ]
  },
  {
    name: 'Large Cap Funds',
    icon: Building2,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-l-primary',
    sebiDefinition: 'Funds that invest at least 80% of their assets in top 100 companies by market capitalization.',
    example: 'Think of large cap companies as the "Tata" and "Reliance" of India - big, established giants that have been around for decades.',
    riskLevel: 'Moderate',
    suitableFor: 'Conservative investors looking for stability with moderate growth',
    keyPoints: [
      'Lower volatility compared to mid/small cap',
      'Regular dividend payments common',
      'Better suited for beginners',
      'Ideal for 3-5 year investment horizon'
    ]
  },
  {
    name: 'Mid Cap Funds',
    icon: TrendingUp,
    color: 'text-info-cyan',
    bgColor: 'bg-info-cyan/10',
    borderColor: 'border-l-info-cyan',
    sebiDefinition: 'Funds that invest at least 65% of their assets in companies ranked 101-250 by market capitalization.',
    example: 'Mid cap companies are like growing teenagers - they\'ve proven themselves but still have significant room to grow.',
    riskLevel: 'Moderately High',
    suitableFor: 'Investors willing to take higher risk for potentially higher returns',
    keyPoints: [
      'Higher growth potential than large caps',
      'More volatile during market corrections',
      'Can become tomorrow\'s large caps',
      'Ideal for 5-7 year investment horizon'
    ]
  },
  {
    name: 'Small Cap Funds',
    icon: Rocket,
    color: 'text-warning-amber',
    bgColor: 'bg-warning-amber/10',
    borderColor: 'border-l-warning-amber',
    sebiDefinition: 'Funds that invest at least 65% of their assets in companies ranked 251 and below by market capitalization.',
    example: 'Small cap companies are young, ambitious businesses with high growth potential - think early investors in DMart.',
    riskLevel: 'High',
    suitableFor: 'Aggressive investors with long horizon and high risk appetite',
    keyPoints: [
      'Highest growth potential',
      'Most volatile category',
      'Requires longer holding period',
      'Ideal for 7+ year investment horizon'
    ]
  },
  {
    name: 'Multi Cap Funds',
    icon: Target,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-l-primary',
    sebiDefinition: 'Funds that must invest at least 25% each in large cap, mid cap, and small cap companies (minimum 75% in equity).',
    example: 'Like a balanced meal - you get a fixed portion of each. The 25-25-25 rule ensures exposure to all market segments.',
    riskLevel: 'Moderate to High',
    suitableFor: 'Investors seeking balanced exposure across all market segments',
    keyPoints: [
      'SEBI mandated 25% minimum in each segment',
      'Automatic diversification across caps',
      'Less dependent on fund manager timing',
      'Ideal for 5-7 year investment horizon'
    ]
  },
  {
    name: 'Flexi Cap Funds',
    icon: Shuffle,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
    borderColor: 'border-l-secondary',
    sebiDefinition: 'Funds that invest at least 65% in equity with flexibility to invest across market capitalizations without any minimum allocation.',
    example: 'Like a skilled chef who picks the best ingredients - the fund manager has complete freedom based on market conditions.',
    riskLevel: 'Moderate to High',
    suitableFor: 'Investors who trust fund manager\'s expertise and want diversified exposure',
    keyPoints: [
      'Maximum flexibility for fund manager',
      'Can adapt to market conditions quickly',
      'Diversification across market caps',
      'Ideal for 5+ year investment horizon'
    ]
  },
  {
    name: 'Contra Funds',
    icon: TrendingDown,
    color: 'text-info-cyan',
    bgColor: 'bg-info-cyan/10',
    borderColor: 'border-l-info-cyan',
    sebiDefinition: 'Funds that follow a contrarian investment strategy - buying stocks that are currently out of favor but have potential.',
    example: 'Like buying winter clothes in summer sale - investing in good companies when they\'re temporarily unpopular and cheap.',
    riskLevel: 'High',
    suitableFor: 'Patient investors who can wait for value to unlock over time',
    keyPoints: [
      'Buys stocks that are currently undervalued',
      'Requires patience as turnaround takes time',
      'Can outperform during market recoveries',
      'Ideal for 5+ year investment horizon'
    ]
  },
  {
    name: 'Focused Funds',
    icon: Target,
    color: 'text-warning-amber',
    bgColor: 'bg-warning-amber/10',
    borderColor: 'border-l-warning-amber',
    sebiDefinition: 'Funds that invest in maximum 30 stocks. High conviction portfolio with concentrated bets on best ideas.',
    example: 'Instead of spreading across 50+ stocks, focused funds put money in their top 30 best ideas for higher impact.',
    riskLevel: 'High',
    suitableFor: 'Investors comfortable with concentrated portfolios and higher volatility',
    keyPoints: [
      'Maximum 30 stocks in portfolio',
      'High conviction, concentrated bets',
      'Can outperform or underperform significantly',
      'Ideal for 5+ year investment horizon'
    ]
  },
  {
    name: 'Thematic/Sectoral Funds',
    icon: Factory,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
    borderColor: 'border-l-destructive',
    sebiDefinition: 'Funds that invest at least 80% in a specific sector (banking, pharma, IT) or theme (infrastructure, consumption, ESG).',
    example: 'Like betting on a specific industry. If you believe banking sector will boom, invest in a Banking Fund.',
    riskLevel: 'Very High',
    suitableFor: 'Experienced investors with strong sector views and high risk tolerance',
    keyPoints: [
      'Concentrated exposure in one sector/theme',
      'Can give exceptional or poor returns',
      'Requires market timing knowledge',
      'Only for tactical allocation (5-10% of portfolio)'
    ]
  },
  {
    name: 'ELSS Funds',
    icon: Shield,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-l-primary',
    sebiDefinition: 'Equity Linked Savings Scheme - tax-saving mutual funds that invest at least 80% in equity with a 3-year lock-in period.',
    example: 'Invest up to ₹1.5 lakh and claim tax deduction under Section 80C. Your money is locked for 3 years but grows tax-free.',
    riskLevel: 'Moderate to High',
    suitableFor: 'Anyone looking for tax-saving investment with equity exposure',
    keyPoints: [
      'Tax deduction up to ₹1.5 lakh under 80C',
      'Shortest lock-in among 80C options (3 years)',
      'Better returns potential than PPF/FD',
      'Mandatory 3-year holding period'
    ]
  }
];

const glossaryTerms = [
  {
    term: 'Expense Ratio',
    icon: Percent,
    definition: 'The annual fee charged by the mutual fund to manage your money. It\'s deducted from your investment automatically.',
    whyItMatters: 'Lower expense ratio = more money stays invested. Even 0.5% difference compounds to lakhs over 20+ years.',
    example: 'If you invest ₹1 lakh and expense ratio is 1.5%, you pay ₹1,500/year. In a Direct Plan (0.5%), you pay only ₹500/year - saving ₹1,000 annually!',
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    term: 'NAV (Net Asset Value)',
    icon: IndianRupee,
    definition: 'The price of one unit of a mutual fund. It\'s calculated by dividing the total value of the fund\'s assets by the number of units.',
    whyItMatters: 'NAV tells you the current value per unit. When you invest, you buy units at the current NAV.',
    example: 'If a fund has ₹100 crore in assets and 10 crore units, NAV = ₹10. If you invest ₹10,000, you get 1,000 units.',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10'
  },
  {
    term: 'AUM (Assets Under Management)',
    icon: BarChart3,
    definition: 'The total money managed by a mutual fund across all investors. Shows the fund\'s size and popularity.',
    whyItMatters: 'Larger AUM can mean lower costs (economies of scale) but too large can limit flexibility in small/mid cap funds.',
    example: 'A fund with ₹50,000 crore AUM is massive and well-established. A ₹500 crore fund is smaller and may be more agile.',
    color: 'text-info-cyan',
    bgColor: 'bg-info-cyan/10'
  },
  {
    term: 'Exit Load',
    icon: Clock,
    definition: 'A fee charged when you withdraw money before a specified period (usually 1 year). Discourages short-term trading.',
    whyItMatters: 'If you might need money within 1 year, exit load will reduce your returns. Plan your investment horizon.',
    example: 'Most equity funds charge 1% exit load if you redeem within 1 year. Withdraw ₹1 lakh = pay ₹1,000 as exit load.',
    color: 'text-warning-amber',
    bgColor: 'bg-warning-amber/10'
  },
  {
    term: 'SIP (Systematic Investment Plan)',
    icon: PiggyBank,
    definition: 'A method to invest a fixed amount regularly (monthly/weekly) instead of one-time lump sum. Automates your investing.',
    whyItMatters: 'SIP averages out market ups and downs (rupee cost averaging). You buy more units when market is low, fewer when high.',
    example: 'Invest ₹5,000 every month. When NAV is ₹50, you get 100 units. When NAV drops to ₹40, you get 125 units for the same ₹5,000!',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10'
  },
  {
    term: 'Lump Sum',
    icon: Wallet,
    definition: 'Investing a large amount at once instead of spreading it over time. Good when you have surplus cash.',
    whyItMatters: 'Works well in rising markets but risky if market falls right after investing. Best for experienced investors.',
    example: 'You receive ₹5 lakh bonus. Invest all at once = lump sum. If market rises 20%, you gain ₹1 lakh. But if it falls 20%, you lose ₹1 lakh.',
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    term: 'Equity Funds',
    icon: TrendingUp,
    definition: 'Mutual funds that invest primarily in company stocks. Higher risk but potentially higher returns over long term.',
    whyItMatters: 'Best for long-term goals (5+ years). Can beat inflation significantly. But be prepared for volatility.',
    example: 'Large cap equity funds have returned 12-15% annually over 10+ years, beating FD rates of 6-7%.',
    color: 'text-info-cyan',
    bgColor: 'bg-info-cyan/10'
  },
  {
    term: 'Debt Funds',
    icon: Shield,
    definition: 'Funds that invest in fixed-income securities like government bonds, corporate bonds. Lower risk than equity.',
    whyItMatters: 'Good for short-term goals or conservative investors. More stable but lower returns compared to equity.',
    example: 'Debt funds typically return 6-8% annually. Your ₹1 lakh becomes ~₹1.08 lakh in 1 year vs potential 15% in equity (with higher risk).',
    color: 'text-warning-amber',
    bgColor: 'bg-warning-amber/10'
  },
  {
    term: 'Hybrid Funds',
    icon: Scale,
    definition: 'Funds that invest in both equity and debt. Provides balance between growth and stability.',
    whyItMatters: 'Good for moderate risk appetite. You get some equity growth with debt cushion during market falls.',
    example: 'A balanced hybrid fund (50% equity, 50% debt) might return 9-11% annually with less volatility than pure equity.',
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    term: 'CAGR (Compound Annual Growth Rate)',
    icon: TrendingUp,
    definition: 'The average annual return of an investment over a period, accounting for compounding. Shows real growth rate.',
    whyItMatters: 'Helps compare funds accurately. A fund showing 100% in 5 years has ~15% CAGR, not 20%.',
    example: 'If ₹1 lakh becomes ₹2 lakh in 5 years, CAGR is ~14.87%. This is the "true" annual return accounting for compounding.',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10'
  },
  {
    term: 'Index Funds',
    icon: BarChart3,
    definition: 'Passively managed funds that replicate a stock market index like Nifty 50, Sensex, or Nifty Next 50 by holding the same stocks.',
    whyItMatters: 'Lowest fees among equity funds (0.1-0.5%). Over 80% of active funds fail to beat their benchmark index over 10+ years.',
    example: 'Nifty 50 Index Fund holds all 50 Nifty stocks. If Nifty rises 12%, your fund rises ~12% minus the tiny expense ratio.',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10'
  },
  {
    term: 'Step-up SIP',
    icon: TrendingUp,
    definition: 'A SIP that automatically increases by a fixed percentage every year, usually aligned with salary increments.',
    whyItMatters: 'Helps you invest more as you earn more. A 10% annual step-up can nearly double your final corpus compared to flat SIP.',
    example: 'Start with ₹5,000/month. With 10% step-up, Year 2 becomes ₹5,500, Year 3 becomes ₹6,050, and so on.',
    color: 'text-info-cyan',
    bgColor: 'bg-info-cyan/10'
  }
];

const directVsRegularExamples = [
  { name: 'HDFC Flexi Cap Fund - Direct Plan', type: 'Direct', expense: '0.80%' },
  { name: 'HDFC Flexi Cap Fund - Regular Plan', type: 'Regular', expense: '1.68%' },
  { name: 'UTI Nifty 50 Index Fund - Direct', type: 'Direct', expense: '0.18%' },
  { name: 'UTI Nifty 50 Index Fund - Regular', type: 'Regular', expense: '0.30%' },
  { name: 'Axis Bluechip Fund Direct Growth', type: 'Direct', expense: '0.45%' },
  { name: 'Axis Bluechip Fund Regular Growth', type: 'Regular', expense: '1.28%' },
  { name: 'HDFC Nifty Next 50 Index - Direct', type: 'Direct', expense: '0.25%' },
  { name: 'SBI Small Cap Fund Dir Growth', type: 'Direct', expense: '0.69%' },
  { name: 'Mirae Asset Large Cap Fund Direct', type: 'Direct', expense: '0.51%' },
];

const growthVsIdcwExamples = [
  { name: 'HDFC Flexi Cap Fund Direct Growth', type: 'Growth', dividendOption: 'NAV compounds' },
  { name: 'HDFC Flexi Cap Fund Direct IDCW', type: 'IDCW', dividendOption: 'Periodic payouts' },
  { name: 'SBI Blue Chip Fund Direct Plan Growth', type: 'Growth', dividendOption: 'NAV compounds' },
  { name: 'SBI Blue Chip Fund Direct Plan IDCW Payout', type: 'IDCW', dividendOption: 'Cash payouts' },
  { name: 'Axis Midcap Fund Direct Growth', type: 'Growth', dividendOption: 'NAV compounds' },
  { name: 'Axis Midcap Fund Direct IDCW Reinvestment', type: 'IDCW', dividendOption: 'Reinvested' },
  { name: 'ICICI Pru Bluechip Fund Growth', type: 'Growth', dividendOption: 'NAV compounds' },
  { name: 'Nippon India Small Cap Fund Growth', type: 'Growth', dividendOption: 'NAV compounds' },
  { name: 'Kotak Equity Opportunities Fund IDCW', type: 'IDCW', dividendOption: 'Periodic payouts' },
];

function identifyPlanType(fundName: string): { type: 'Direct' | 'Regular'; confidence: 'high' | 'medium' } {
  const directKeywords = ['direct', 'dir', 'direct plan', 'direct growth', '-direct', '- direct'];
  const lowerName = fundName.toLowerCase();
  
  for (const keyword of directKeywords) {
    if (lowerName.includes(keyword)) {
      return { type: 'Direct', confidence: 'high' };
    }
  }
  
  return { type: 'Regular', confidence: 'medium' };
}

function identifyGrowthOrIdcw(fundName: string): { type: 'Growth' | 'IDCW'; confidence: 'high' | 'medium' } {
  const idcwKeywords = ['idcw', 'dividend', 'div', 'income distribution', 'payout', 'reinvestment'];
  const growthKeywords = ['growth', 'gr', 'accumulation'];
  const lowerName = fundName.toLowerCase();
  
  for (const keyword of idcwKeywords) {
    if (lowerName.includes(keyword)) {
      return { type: 'IDCW', confidence: 'high' };
    }
  }
  
  for (const keyword of growthKeywords) {
    if (lowerName.includes(keyword)) {
      return { type: 'Growth', confidence: 'high' };
    }
  }
  
  // Default to Growth as it's more common
  return { type: 'Growth', confidence: 'medium' };
}

export default function Learn() {
  const [testFundName, setTestFundName] = useState('');
  const [testResult, setTestResult] = useState<{ type: 'Direct' | 'Regular'; confidence: 'high' | 'medium' } | null>(null);
  const [testGrowthIdcwName, setTestGrowthIdcwName] = useState('');
  const [testGrowthIdcwResult, setTestGrowthIdcwResult] = useState<{ type: 'Growth' | 'IDCW'; confidence: 'high' | 'medium' } | null>(null);

  const handleTestFund = () => {
    if (testFundName.trim()) {
      setTestResult(identifyPlanType(testFundName));
    }
  };

  const handleTestGrowthIdcw = () => {
    if (testGrowthIdcwName.trim()) {
      setTestGrowthIdcwResult(identifyGrowthOrIdcw(testGrowthIdcwName));
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 mb-6">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Learning Hub for Indian Investors</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Your <span className="gradient-text">Mutual Fund</span> Education Center
            </h1>
            <p className="text-muted-foreground">
              No jargon. No confusing terms. Just simple explanations to help you become a confident investor.
              Perfect for beginners starting their investment journey.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#what-is-mutual-fund" className="px-4 py-2 rounded-full bg-primary/20 hover:bg-primary/30 text-sm font-medium transition-colors border border-primary/30">
              🎯 What is Mutual Fund?
            </a>
            <a href="#direct-vs-regular" className="px-4 py-2 rounded-full bg-accent hover:bg-accent/80 text-sm font-medium transition-colors">
              Direct vs Regular Plans
            </a>
            <a href="#growth-vs-idcw" className="px-4 py-2 rounded-full bg-accent hover:bg-accent/80 text-sm font-medium transition-colors">
              Growth vs IDCW
            </a>
            <a href="#index-funds" className="px-4 py-2 rounded-full bg-secondary/20 hover:bg-secondary/30 text-sm font-medium transition-colors border border-secondary/30">
              📊 Index Funds
            </a>
            <a href="#glossary" className="px-4 py-2 rounded-full bg-accent hover:bg-accent/80 text-sm font-medium transition-colors">
              MF Glossary
            </a>
            <a href="#fund-categories" className="px-4 py-2 rounded-full bg-accent hover:bg-accent/80 text-sm font-medium transition-colors">
              Fund Categories
            </a>
          </div>
        </div>
      </section>

      {/* What is Mutual Fund Section */}
      <section id="what-is-mutual-fund" className="py-12 md:py-16 bg-gradient-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">What is a Mutual Fund?</h2>
                <p className="text-sm text-muted-foreground">Your first step to smart investing</p>
              </div>
            </div>

            {/* Simple Explanation */}
            <div className="glass-card rounded-xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">The Simple Answer</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    A <strong className="text-foreground">Mutual Fund</strong> is like a group investment where many investors pool their money together. 
                    A professional fund manager then invests this money in stocks, bonds, or other assets on behalf of everyone.
                  </p>
                  <div className="mt-4 p-4 bg-accent rounded-lg">
                    <p className="text-sm">
                      <strong>🥘 Think of it like a potluck dinner:</strong> Everyone contributes a dish (money), 
                      a professional chef (fund manager) combines everything into a feast (diversified portfolio), 
                      and everyone enjoys the meal (returns) based on how much they contributed.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Mutual Funds */}
            <h3 className="text-xl font-semibold mb-4">Why Should You Choose Mutual Funds?</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="glass-card rounded-xl p-5 border-l-4 border-l-secondary">
                <div className="flex items-center gap-2 mb-3">
                  <Shuffle className="w-5 h-5 text-secondary" />
                  <h4 className="font-semibold">Instant Diversification</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  With just ₹500, you own pieces of 50+ companies. If one stock falls, others can balance it out. 
                  Buying individual stocks would require lakhs for the same diversification.
                </p>
              </div>

              <div className="glass-card rounded-xl p-5 border-l-4 border-l-primary">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold">Professional Management</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Expert fund managers research, analyze, and make investment decisions for you. 
                  You don't need to track stock markets daily or become a finance expert.
                </p>
              </div>

              <div className="glass-card rounded-xl p-5 border-l-4 border-l-info-cyan">
                <div className="flex items-center gap-2 mb-3">
                  <PiggyBank className="w-5 h-5 text-info-cyan" />
                  <h4 className="font-semibold">Start Small, Dream Big</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Begin with as low as ₹500/month via SIP. No need for large lump sums. 
                  Investing becomes a habit, not a financial burden.
                </p>
              </div>

              <div className="glass-card rounded-xl p-5 border-l-4 border-l-warning-amber">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-warning-amber" />
                  <h4 className="font-semibold">SEBI Regulated</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  All mutual funds in India are regulated by SEBI (Securities and Exchange Board of India). 
                  Your money is safe, transparent, and well-governed.
                </p>
              </div>
            </div>

            {/* Biggest Advantage */}
            <div className="glass-card rounded-xl p-6 mb-8 bg-gradient-to-r from-secondary/10 to-primary/10 border-2 border-secondary/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">The Biggest Advantage: Power of Compounding</h3>
                  <p className="text-sm text-muted-foreground">Albert Einstein called it the 8th wonder of the world</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">
                In mutual funds, your returns generate their own returns. This snowball effect, called <strong className="text-foreground">compounding</strong>, 
                is why starting early matters more than investing more.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-background/50 rounded-lg">
                  <h4 className="font-semibold text-secondary mb-2">📈 Example: The Early Investor</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Starts at age 25 with ₹5,000/month</li>
                    <li>• Invests for 10 years, then stops</li>
                    <li>• Total invested: ₹6 lakh</li>
                    <li>• At age 60 (12% CAGR): <strong className="text-secondary">₹1.76 Crore</strong></li>
                  </ul>
                </div>
                <div className="p-4 bg-background/50 rounded-lg">
                  <h4 className="font-semibold text-warning-amber mb-2">⏰ Example: The Late Starter</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Starts at age 35 with ₹5,000/month</li>
                    <li>• Invests for 25 years continuously</li>
                    <li>• Total invested: ₹15 lakh</li>
                    <li>• At age 60 (12% CAGR): <strong className="text-warning-amber">₹95 Lakh</strong></li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-3 bg-secondary/10 rounded-lg">
                <p className="text-sm text-center">
                  <strong>💡 Key Insight:</strong> The early investor invested <strong>₹9 lakh less</strong> but ended up with <strong>₹81 lakh more</strong>. 
                  That's the magic of time + compounding!
                </p>
              </div>
            </div>

            {/* Who Should Invest */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                Who Should Invest in Mutual Funds?
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">👨‍💼</span>
                  </div>
                  <h4 className="font-medium mb-1">Salaried Professionals</h4>
                  <p className="text-xs text-muted-foreground">Build wealth through monthly SIPs from your salary</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🧑‍🎓</span>
                  </div>
                  <h4 className="font-medium mb-1">Young Starters</h4>
                  <p className="text-xs text-muted-foreground">Start with ₹500/month and let time work its magic</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-warning-amber/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">👨‍👩‍👧</span>
                  </div>
                  <h4 className="font-medium mb-1">Parents</h4>
                  <p className="text-xs text-muted-foreground">Plan for children's education and marriage</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-accent rounded-lg text-center">
                <p className="text-sm">
                  <strong>Bottom line:</strong> Anyone who wants their money to grow faster than FDs and beat inflation should consider mutual funds!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Direct vs Regular Section */}
      <section id="direct-vs-regular" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Scale className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Direct vs Regular Plans</h2>
                <p className="text-sm text-muted-foreground">The most important decision for DIY investors</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Direct Plan Card */}
              <div className="glass-card rounded-xl p-6 border-2 border-secondary/50">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-secondary" />
                  <h3 className="text-xl font-semibold">Direct Plan</h3>
                  <span className="ml-auto text-xs px-2 py-1 rounded-full bg-secondary/20 text-secondary font-medium">Recommended</span>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary font-bold">✓</span>
                    <span>No distributor commission - you invest directly with AMC</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary font-bold">✓</span>
                    <span>Lower expense ratio (typically 0.5-1% less)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary font-bold">✓</span>
                    <span>Higher returns over long term due to lower fees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary font-bold">✓</span>
                    <span>Same fund manager, same portfolio, same NAV timing</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-secondary/10 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    <strong>How to identify:</strong> Look for "Direct", "Dir", or "Direct Plan" in the fund name
                  </p>
                </div>
              </div>

              {/* Regular Plan Card */}
              <div className="glass-card rounded-xl p-6 opacity-80">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-6 h-6 text-warning-amber" />
                  <h3 className="text-xl font-semibold">Regular Plan</h3>
                  <span className="ml-auto text-xs px-2 py-1 rounded-full bg-warning-amber/20 text-warning-amber font-medium">Higher Fees</span>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-warning-amber font-bold">→</span>
                    <span>Includes distributor/advisor commission (0.5-1%)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-warning-amber font-bold">→</span>
                    <span>Higher expense ratio eats into your returns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-warning-amber font-bold">→</span>
                    <span>Good if you need hand-holding from an advisor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-warning-amber font-bold">→</span>
                    <span>Same underlying fund, just with extra fees</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-warning-amber/10 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    <strong>How to identify:</strong> If it doesn't say "Direct", it's Regular by default
                  </p>
                </div>
              </div>
            </div>

            {/* Real Examples */}
            <div className="glass-card rounded-xl p-6 mb-8">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-warning-amber" />
                Real Fund Examples
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 font-medium">Fund Name</th>
                      <th className="text-center py-2 font-medium">Type</th>
                      <th className="text-right py-2 font-medium">Expense Ratio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {directVsRegularExamples.map((fund, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="py-2 text-muted-foreground">{fund.name}</td>
                        <td className="text-center py-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            fund.type === 'Direct' 
                              ? 'bg-secondary/20 text-secondary' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {fund.type}
                          </span>
                        </td>
                        <td className={`text-right py-2 font-medium ${
                          fund.type === 'Direct' ? 'text-secondary' : 'text-muted-foreground'
                        }`}>
                          {fund.expense}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Try It Yourself */}
            <div className="glass-card rounded-xl p-6 bg-accent/30">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-info-cyan" />
                Try It: Enter a Fund Name
              </h3>
              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  value={testFundName}
                  onChange={(e) => setTestFundName(e.target.value)}
                  placeholder="e.g., Axis Bluechip Direct Growth"
                  className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  onClick={handleTestFund}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Identify
                </button>
              </div>
              {testResult && (
                <div className={`p-4 rounded-lg ${
                  testResult.type === 'Direct' 
                    ? 'bg-secondary/10 border border-secondary/30' 
                    : 'bg-warning-amber/10 border border-warning-amber/30'
                }`}>
                  <div className="flex items-center gap-2">
                    {testResult.type === 'Direct' ? (
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-warning-amber" />
                    )}
                    <span className="font-semibold">{testResult.type} Plan</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {testResult.type === 'Direct' 
                      ? 'Great choice! This is a Direct plan with lower expense ratio. You save on distributor commission.'
                      : 'This appears to be a Regular plan. Consider switching to Direct plan to save on fees.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Growth vs IDCW Section */}
      <section id="growth-vs-idcw" className="py-12 md:py-16 bg-gradient-to-br from-primary/5 to-info-cyan/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Growth vs IDCW Plans</h2>
                <p className="text-sm text-muted-foreground">Understanding dividend options in mutual funds</p>
              </div>
            </div>

            {/* What is IDCW */}
            <div className="glass-card rounded-xl p-6 mb-8">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-info-cyan" />
                What is IDCW?
              </h3>
              <p className="text-muted-foreground mb-4">
                <strong>IDCW</strong> stands for <strong>Income Distribution cum Capital Withdrawal</strong>. 
                Earlier called "Dividend" option, SEBI renamed it to IDCW in 2021 to clarify that payouts come from your own investment, 
                not as additional income like stock dividends.
              </p>
              <div className="p-4 bg-warning-amber/10 rounded-lg border border-warning-amber/30">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-warning-amber">Important:</strong> IDCW payouts are NOT additional earnings. 
                  They are a portion of your invested capital being returned to you, which reduces your NAV proportionally.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Growth Plan Card */}
              <div className="glass-card rounded-xl p-6 border-2 border-primary/50">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">Growth Plan</h3>
                  <span className="ml-auto text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-medium">Recommended</span>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>All profits are reinvested - NAV keeps growing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Power of compounding works fully for you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Tax efficient - no tax until you redeem</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Better for wealth creation over long term</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    <strong>Ideal for:</strong> Long-term investors, wealth building, retirement planning, those who don't need regular income
                  </p>
                </div>
              </div>

              {/* IDCW Plan Card */}
              <div className="glass-card rounded-xl p-6 opacity-90">
                <div className="flex items-center gap-2 mb-4">
                  <Wallet className="w-6 h-6 text-info-cyan" />
                  <h3 className="text-xl font-semibold">IDCW Plan</h3>
                  <span className="ml-auto text-xs px-2 py-1 rounded-full bg-info-cyan/20 text-info-cyan font-medium">Regular Payouts</span>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-info-cyan font-bold">→</span>
                    <span>Periodic payouts from your investment (not extra income)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-info-cyan font-bold">→</span>
                    <span>NAV reduces after each payout</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-info-cyan font-bold">→</span>
                    <span>Payouts are taxed at your income tax slab</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-info-cyan font-bold">→</span>
                    <span>Two sub-options: Payout (cash) or Reinvestment (buy more units)</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-info-cyan/10 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    <strong>Ideal for:</strong> Retirees needing regular income, those who want periodic cash flow from investments
                  </p>
                </div>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="glass-card rounded-xl p-6 mb-8">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Scale className="w-5 h-5 text-secondary" />
                Quick Comparison
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 font-medium">Feature</th>
                      <th className="text-center py-2 font-medium text-primary">Growth</th>
                      <th className="text-center py-2 font-medium text-info-cyan">IDCW</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-2 text-muted-foreground">Profits</td>
                      <td className="text-center py-2 text-primary">Reinvested</td>
                      <td className="text-center py-2 text-info-cyan">Distributed periodically</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 text-muted-foreground">NAV Trend</td>
                      <td className="text-center py-2 text-primary">Keeps increasing</td>
                      <td className="text-center py-2 text-info-cyan">Resets after payout</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 text-muted-foreground">Taxation</td>
                      <td className="text-center py-2 text-primary">On redemption only</td>
                      <td className="text-center py-2 text-info-cyan">On each payout + redemption</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 text-muted-foreground">Compounding</td>
                      <td className="text-center py-2 text-primary">Full benefit</td>
                      <td className="text-center py-2 text-info-cyan">Interrupted by payouts</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 text-muted-foreground">Regular Income</td>
                      <td className="text-center py-2 text-primary">No</td>
                      <td className="text-center py-2 text-info-cyan">Yes (Payout option)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* How to Identify */}
            <div className="glass-card rounded-xl p-6 mb-8">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-secondary" />
                How to Identify Growth vs IDCW?
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-primary/10 rounded-xl">
                  <h4 className="font-medium mb-2 text-primary">Growth Fund Names</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Contains "Growth" or "Gr"</li>
                    <li>• Example: "HDFC Flexi Cap Fund <strong>Growth</strong>"</li>
                    <li>• Example: "SBI Bluechip <strong>Gr</strong>"</li>
                    <li>• If no mention, usually Growth by default</li>
                  </ul>
                </div>
                <div className="p-4 bg-info-cyan/10 rounded-xl">
                  <h4 className="font-medium mb-2 text-info-cyan">IDCW Fund Names</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Contains "IDCW", "Dividend", or "Div"</li>
                    <li>• May say "IDCW Payout" or "IDCW Reinvestment"</li>
                    <li>• Example: "Axis Midcap <strong>IDCW</strong>"</li>
                    <li>• Older funds may still say "Dividend"</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Real Examples */}
            <div className="glass-card rounded-xl p-6 mb-8">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-warning-amber" />
                Real Fund Examples
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 font-medium">Fund Name</th>
                      <th className="text-center py-2 font-medium">Type</th>
                      <th className="text-right py-2 font-medium">Dividend Option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {growthVsIdcwExamples.map((fund, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="py-2 text-muted-foreground">{fund.name}</td>
                        <td className="text-center py-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            fund.type === 'Growth' 
                              ? 'bg-primary/20 text-primary' 
                              : 'bg-info-cyan/20 text-info-cyan'
                          }`}>
                            {fund.type}
                          </span>
                        </td>
                        <td className={`text-right py-2 font-medium ${
                          fund.type === 'Growth' ? 'text-primary' : 'text-info-cyan'
                        }`}>
                          {fund.dividendOption}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Try It Yourself */}
            <div className="glass-card rounded-xl p-6 bg-accent/30">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-info-cyan" />
                Try It: Enter a Fund Name
              </h3>
              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  value={testGrowthIdcwName}
                  onChange={(e) => setTestGrowthIdcwName(e.target.value)}
                  placeholder="e.g., HDFC Flexi Cap Fund Direct Growth"
                  className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  onClick={handleTestGrowthIdcw}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Identify
                </button>
              </div>
              {testGrowthIdcwResult && (
                <div className={`p-4 rounded-lg ${
                  testGrowthIdcwResult.type === 'Growth' 
                    ? 'bg-primary/10 border border-primary/30' 
                    : 'bg-info-cyan/10 border border-info-cyan/30'
                }`}>
                  <div className="flex items-center gap-2">
                    {testGrowthIdcwResult.type === 'Growth' ? (
                      <TrendingUp className="w-5 h-5 text-primary" />
                    ) : (
                      <Wallet className="w-5 h-5 text-info-cyan" />
                    )}
                    <span className="font-semibold">{testGrowthIdcwResult.type} Plan</span>
                    {testGrowthIdcwResult.confidence === 'medium' && (
                      <span className="text-xs text-muted-foreground">(assumed)</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {testGrowthIdcwResult.type === 'Growth' 
                      ? 'This is a Growth plan. Your profits are reinvested for maximum compounding. Best for long-term wealth creation!'
                      : 'This is an IDCW plan. You receive periodic payouts from your investment. Best if you need regular income.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Index Funds Section */}
      <section id="index-funds" className="py-12 md:py-16 bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Index Funds: The Smart Way to Invest</h2>
                <p className="text-sm text-muted-foreground">Why Warren Buffett recommends index funds for most investors</p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-warning-amber" />
                What are Index Funds?
              </h3>
              <p className="text-muted-foreground mb-4">
                Index funds are passively managed mutual funds that replicate a stock market index like Nifty 50, Sensex, or Nifty Next 50. 
                Instead of a fund manager picking stocks, the fund simply holds the same stocks as the index in the same proportion.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/10 rounded-xl">
                  <h4 className="font-medium mb-2 text-secondary">Active Funds</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Fund manager picks stocks</li>
                    <li>• Higher expense ratio (1-2%)</li>
                    <li>• Aims to beat the market</li>
                    <li>• 80%+ fail to beat index over 10 years</li>
                  </ul>
                </div>
                <div className="p-4 bg-primary/10 rounded-xl border-2 border-primary/30">
                  <h4 className="font-medium mb-2 text-primary">Index Funds ✓</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Simply mirrors the index</li>
                    <li>• Lowest expense ratio (0.1-0.5%)</li>
                    <li>• Aims to match the market</li>
                    <li>• Consistent, predictable returns</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Popular Index Funds in India</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-accent/50 rounded-xl">
                  <div className="font-medium mb-1">Nifty 50 Index Funds</div>
                  <p className="text-sm text-muted-foreground mb-2">Tracks top 50 companies in India</p>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>UTI Nifty 50 Index Fund - Direct</span>
                      <span className="text-secondary font-medium">0.18%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>HDFC Nifty 50 Index - Direct</span>
                      <span className="text-secondary font-medium">0.20%</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-accent/50 rounded-xl">
                  <div className="font-medium mb-1">Nifty Next 50 Index Funds</div>
                  <p className="text-sm text-muted-foreground mb-2">The next 50 large companies after Nifty 50</p>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>HDFC Nifty Next 50 Index - Direct</span>
                      <span className="text-secondary font-medium">0.25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>UTI Nifty Next 50 Index - Direct</span>
                      <span className="text-secondary font-medium">0.27%</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-accent/50 rounded-xl">
                  <div className="font-medium mb-1">Sensex Index Funds</div>
                  <p className="text-sm text-muted-foreground mb-2">Tracks 30 largest BSE companies</p>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>HDFC Index Fund Sensex - Direct</span>
                      <span className="text-secondary font-medium">0.20%</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-accent/50 rounded-xl">
                  <div className="font-medium mb-1">Nifty Midcap 150 Index</div>
                  <p className="text-sm text-muted-foreground mb-2">Mid-sized companies exposure</p>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>Motilal Nifty Midcap 150 - Direct</span>
                      <span className="text-secondary font-medium">0.30%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Who Should Invest in Index Funds?</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-accent/50">
                  <div className="text-2xl mb-2">🌱</div>
                  <div className="font-medium mb-1">Beginners</div>
                  <p className="text-xs text-muted-foreground">No need to pick funds or time the market. Just SIP and forget.</p>
                </div>
                <div className="p-4 rounded-xl bg-accent/50">
                  <div className="text-2xl mb-2">⏰</div>
                  <div className="font-medium mb-1">Busy Professionals</div>
                  <p className="text-xs text-muted-foreground">No time to research? Index funds require zero active management.</p>
                </div>
                <div className="p-4 rounded-xl bg-accent/50">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="font-medium mb-1">Long-term Investors</div>
                  <p className="text-xs text-muted-foreground">5+ year horizon? Index funds are perfect for wealth building.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Glossary Section */}
      <section id="glossary" className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Mutual Fund Glossary</h2>
                <p className="text-sm text-muted-foreground">Key terms explained in simple language</p>
              </div>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {glossaryTerms.map((item, index) => (
                <AccordionItem 
                  key={item.term} 
                  value={item.term}
                  className="glass-card rounded-xl border-none"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${item.bgColor} flex items-center justify-center`}>
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <span className="font-semibold text-left">{item.term}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-4 pl-13">
                      <div>
                        <h4 className="text-sm font-medium text-primary mb-1">What is it?</h4>
                        <p className="text-sm text-muted-foreground">{item.definition}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-secondary mb-1">Why does it matter?</h4>
                        <p className="text-sm text-muted-foreground">{item.whyItMatters}</p>
                      </div>
                      <div className="p-4 bg-accent/50 rounded-lg">
                        <h4 className="text-sm font-medium mb-1 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-warning-amber" />
                          Simple Example
                        </h4>
                        <p className="text-sm text-muted-foreground">{item.example}</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Fund Categories Section */}
      <section id="fund-categories" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">SEBI Fund Categories</h2>
                <p className="text-sm text-muted-foreground">Understanding equity mutual fund types</p>
              </div>
            </div>

            <div className="space-y-8">
              {fundCategories.map((category, index) => (
                <div 
                  key={category.name}
                  className={`glass-card rounded-2xl p-6 border-l-4 ${category.borderColor}`}
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Column */}
                    <div className="lg:w-2/3">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl ${category.bgColor} flex items-center justify-center`}>
                          <category.icon className={`w-6 h-6 ${category.color}`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{category.name}</h3>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${category.bgColor} ${category.color}`}>
                            Risk: {category.riskLevel}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 bg-accent/50 rounded-xl border border-primary/10">
                          <div className="flex items-start gap-2 mb-2">
                            <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="font-semibold text-primary text-sm">SEBI Definition</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{category.sebiDefinition}</p>
                        </div>

                        <div className="p-4 bg-muted/50 rounded-xl">
                          <div className="flex items-start gap-2 mb-2">
                            <Info className="w-5 h-5 text-info-cyan flex-shrink-0 mt-0.5" />
                            <span className="font-semibold text-sm">Simple Explanation</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{category.example}</p>
                        </div>

                        <div>
                          <span className="text-sm font-medium text-muted-foreground">Suitable For: </span>
                          <span className="text-sm">{category.suitableFor}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Key Points */}
                    <div className="lg:w-1/3">
                      <div className="p-4 bg-card rounded-xl border border-border h-full">
                        <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-secondary" />
                          Key Points
                        </h4>
                        <ul className="space-y-2">
                          {category.keyPoints.map((point, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                              <span className="text-muted-foreground">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Important Note */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-xl p-6 border border-warning-amber/30">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-warning-amber flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Important Note</h3>
                  <p className="text-muted-foreground text-sm">
                    The categorization is as per SEBI Circular dated October 6, 2017. Each fund house can have only one scheme 
                    per category (except for sectoral/thematic, index funds, and ETFs). This ensures investors can easily 
                    compare schemes across fund houses without confusion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
