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
    example: 'Mid cap companies are like growing teenagers - they\'ve proven themselves but still have significant room to grow. Companies like Page Industries or Astral Ltd.',
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
    example: 'Small cap companies are young, ambitious startups and growing businesses. High risk but can deliver exceptional returns - think of early investors in companies like DMart.',
    riskLevel: 'High',
    suitableFor: 'Aggressive investors with long investment horizon and high risk appetite',
    keyPoints: [
      'Highest growth potential',
      'Most volatile category',
      'Requires longer holding period',
      'Ideal for 7+ year investment horizon'
    ]
  },
  {
    name: 'Flexi Cap Funds',
    icon: Shuffle,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
    borderColor: 'border-l-secondary',
    sebiDefinition: 'Funds that invest at least 65% in equity with flexibility to invest across market capitalizations without any minimum allocation.',
    example: 'Like a skilled chef who picks the best ingredients regardless of the category - the fund manager has complete freedom to allocate based on market conditions.',
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
    name: 'Multi Cap Funds',
    icon: Target,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-l-primary',
    sebiDefinition: 'Funds that must invest at least 25% each in large cap, mid cap, and small cap companies (minimum 75% in equity).',
    example: 'Think of it as a balanced meal - you get a fixed portion of each food group. The 25-25-25 rule ensures you\'re exposed to all market segments.',
    riskLevel: 'Moderate to High',
    suitableFor: 'Investors seeking balanced exposure across all market segments',
    keyPoints: [
      'Mandatory diversification across caps',
      'SEBI mandated 25% minimum in each segment',
      'Less dependent on fund manager timing',
      'Ideal for 5-7 year investment horizon'
    ]
  },
  {
    name: 'Sectoral/Thematic Funds',
    icon: Factory,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
    borderColor: 'border-l-destructive',
    sebiDefinition: 'Funds that invest at least 80% of their assets in a specific sector (like banking, pharma, IT) or theme (infrastructure, consumption).',
    example: 'Like betting on a specific industry to outperform. If you believe India\'s banking sector will boom, you invest in a Banking Fund.',
    riskLevel: 'Very High',
    suitableFor: 'Experienced investors with strong sector views and high risk tolerance',
    keyPoints: [
      'Concentrated exposure in one sector',
      'Can give exceptional returns if sector performs',
      'Can also lead to significant losses',
      'Requires market timing and sector knowledge'
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
  }
];

const directVsRegularExamples = [
  { name: 'HDFC Flexi Cap Fund - Direct Plan', type: 'Direct', expense: '0.80%' },
  { name: 'HDFC Flexi Cap Fund - Regular Plan', type: 'Regular', expense: '1.68%' },
  { name: 'Axis Bluechip Fund Direct Growth', type: 'Direct', expense: '0.45%' },
  { name: 'Axis Bluechip Fund Regular Growth', type: 'Regular', expense: '1.28%' },
  { name: 'SBI Small Cap Fund Dir Growth', type: 'Direct', expense: '0.69%' },
  { name: 'SBI Small Cap Fund Reg Growth', type: 'Regular', expense: '1.58%' },
  { name: 'Mirae Asset Large Cap Fund Direct', type: 'Direct', expense: '0.51%' },
  { name: 'Mirae Asset Large Cap Fund Regular', type: 'Regular', expense: '1.43%' },
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

export default function Learn() {
  const [testFundName, setTestFundName] = useState('');
  const [testResult, setTestResult] = useState<{ type: 'Direct' | 'Regular'; confidence: 'high' | 'medium' } | null>(null);

  const handleTestFund = () => {
    if (testFundName.trim()) {
      setTestResult(identifyPlanType(testFundName));
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
            <a href="#direct-vs-regular" className="px-4 py-2 rounded-full bg-accent hover:bg-accent/80 text-sm font-medium transition-colors">
              Direct vs Regular Plans
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
