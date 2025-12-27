import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  TrendingUp, 
  Rocket, 
  Shuffle, 
  Target,
  Factory,
  Shield,
  BarChart3,
  TrendingDown,
  ArrowRight
} from 'lucide-react';

const categories = [
  {
    name: 'Index Funds',
    icon: BarChart3,
    description: 'Low-cost funds that mirror market indices like Nifty 50 or Sensex.',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
    sebiRule: 'Tracks benchmark index passively',
  },
  {
    name: 'Large Cap',
    icon: Building2,
    description: 'Top 100 companies by market cap - established giants like Tata, Reliance.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    sebiRule: '80% in top 100 companies',
  },
  {
    name: 'Mid Cap',
    icon: TrendingUp,
    description: 'Companies ranked 101-250 - growing businesses that could be tomorrow\'s giants.',
    color: 'text-info-cyan',
    bgColor: 'bg-info-cyan/10',
    sebiRule: '65% in companies ranked 101-250',
  },
  {
    name: 'Small Cap',
    icon: Rocket,
    description: 'Companies ranked 251+ - ambitious companies with high growth potential.',
    color: 'text-warning-amber',
    bgColor: 'bg-warning-amber/10',
    sebiRule: '65% in companies ranked 251+',
  },
  {
    name: 'Multi Cap',
    icon: Target,
    description: 'Balanced exposure with mandatory 25% in each market cap segment.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    sebiRule: '25% each in large, mid, small cap',
  },
  {
    name: 'Flexi Cap',
    icon: Shuffle,
    description: 'Complete flexibility for fund manager to invest across market caps.',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
    sebiRule: '65% in equity, flexible allocation',
  },
  {
    name: 'Contra Funds',
    icon: TrendingDown,
    description: 'Invests in out-of-favor stocks with turnaround potential.',
    color: 'text-info-cyan',
    bgColor: 'bg-info-cyan/10',
    sebiRule: 'Contrarian investment strategy',
  },
  {
    name: 'Focused Funds',
    icon: Target,
    description: 'Concentrated portfolio of maximum 30 high-conviction stocks.',
    color: 'text-warning-amber',
    bgColor: 'bg-warning-amber/10',
    sebiRule: 'Maximum 30 stocks',
  },
  {
    name: 'Thematic/Sectoral',
    icon: Factory,
    description: 'Concentrated investments in specific sectors like banking, pharma, or IT.',
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
    sebiRule: '80% in specified sector/theme',
  },
  {
    name: 'ELSS Funds',
    icon: Shield,
    description: 'Tax-saving equity funds with 3-year lock-in under Section 80C.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    sebiRule: '80% in equity, 3-year lock-in',
  },
];

export function FundCategoriesPreview() {
  return (
    <section className="py-20 bg-gradient-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Understand Fund Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            SEBI has classified mutual funds into distinct categories. 
            Understanding these helps you choose the right fund for your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-12">
          {categories.map((category, index) => (
            <div 
              key={category.name}
              className="feature-card group animate-slide-up p-4"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`w-12 h-12 rounded-xl ${category.bgColor} flex items-center justify-center mb-3 transition-transform group-hover:scale-110`}>
                <category.icon className={`w-6 h-6 ${category.color}`} />
              </div>
              
              <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
              <p className="text-muted-foreground text-xs mb-3 line-clamp-2">{category.description}</p>
              
              <div className="sebi-badge text-xs">
                <span>{category.sebiRule}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/learn">
            <Button variant="hero" size="lg" className="gap-2">
              Learn More About Categories
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
