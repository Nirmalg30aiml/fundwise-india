import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  TrendingUp, 
  Rocket, 
  Shuffle, 
  Target,
  Factory,
  ArrowRight
} from 'lucide-react';

const categories = [
  {
    name: 'Large Cap',
    icon: Building2,
    description: 'Top 100 companies by market cap - the established giants like Tata, Reliance, HDFC.',
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
    description: 'Companies ranked 251+ - young, ambitious companies with high growth potential.',
    color: 'text-warning-amber',
    bgColor: 'bg-warning-amber/10',
    sebiRule: '65% in companies ranked 251+',
  },
  {
    name: 'Flexi Cap',
    icon: Shuffle,
    description: 'Flexibility to invest across market caps based on fund manager\'s strategy.',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
    sebiRule: '65% in equity, flexible allocation',
  },
  {
    name: 'Multi Cap',
    icon: Target,
    description: 'Balanced exposure across market caps with minimum allocation rules.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    sebiRule: '25% each in large, mid, small cap',
  },
  {
    name: 'Sectoral/Thematic',
    icon: Factory,
    description: 'Concentrated investments in specific sectors like banking, pharma, or IT.',
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
    sebiRule: '80% in specified sector/theme',
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category, index) => (
            <div 
              key={category.name}
              className="feature-card group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-xl ${category.bgColor} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                <category.icon className={`w-7 h-7 ${category.color}`} />
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
              
              <div className="sebi-badge">
                <span>SEBI: {category.sebiRule}</span>
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
