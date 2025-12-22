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
  Info
} from 'lucide-react';

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

export default function Learn() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 mb-6">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">SEBI Guidelines Explained</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Understand Equity <span className="gradient-text">Mutual Fund</span> Categories
            </h1>
            <p className="text-lg text-muted-foreground">
              SEBI has classified mutual funds into distinct categories to help investors make informed decisions. 
              Learn about each category with simple explanations and real-world examples.
            </p>
          </div>
        </div>
      </section>

      {/* Fund Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {fundCategories.map((category, index) => (
              <div 
                key={category.name}
                className={`glass-card rounded-2xl p-6 md:p-8 border-l-4 ${category.borderColor} animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left Column */}
                  <div className="lg:w-2/3">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-xl ${category.bgColor} flex items-center justify-center`}>
                        <category.icon className={`w-7 h-7 ${category.color}`} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{category.name}</h2>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${category.bgColor} ${category.color}`}>
                          Risk: {category.riskLevel}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-accent/50 rounded-xl border border-primary/10">
                        <div className="flex items-start gap-2 mb-2">
                          <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="font-semibold text-primary">SEBI Definition</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{category.sebiDefinition}</p>
                      </div>

                      <div className="p-4 bg-muted/50 rounded-xl">
                        <div className="flex items-start gap-2 mb-2">
                          <Info className="w-5 h-5 text-info-cyan flex-shrink-0 mt-0.5" />
                          <span className="font-semibold">Simple Explanation</span>
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
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-secondary" />
                        Key Points
                      </h3>
                      <ul className="space-y-3">
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
      </section>

      {/* Important Note */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="glass-card rounded-2xl p-6 md:p-8 border border-warning-amber/30">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-warning-amber flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Important Note</h3>
                <p className="text-muted-foreground text-sm">
                  The categorization is as per SEBI Circular dated October 6, 2017. Each fund house can have only one scheme 
                  per category (except for sectoral/thematic, index funds, and ETFs). This ensures investors can easily 
                  compare schemes across fund houses without confusion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
