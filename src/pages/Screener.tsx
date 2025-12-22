import { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter,
  TrendingUp,
  TrendingDown,
  Bookmark,
  BookmarkCheck,
  ArrowUpDown,
  Shield
} from 'lucide-react';
import { sampleEquityFunds, FundWithMetrics } from '@/lib/mfapi';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const categories = ['All', 'Large Cap', 'Mid Cap', 'Small Cap', 'Flexi Cap', 'Multi Cap', 'Focused', 'Sectoral/Thematic', 'ELSS'];

export default function Screener() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'return1Y' | 'return3Y' | 'return5Y' | 'name'>('return1Y');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [bookmarkedFunds, setBookmarkedFunds] = useState<Set<number>>(new Set());

  const filteredFunds = useMemo(() => {
    let funds = [...sampleEquityFunds];

    // Filter by search
    if (searchQuery) {
      funds = funds.filter(fund => 
        fund.schemeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fund.fundHouse?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      funds = funds.filter(fund => fund.category === selectedCategory);
    }

    // Sort
    funds.sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.schemeName.localeCompare(b.schemeName)
          : b.schemeName.localeCompare(a.schemeName);
      }
      const aVal = a[sortBy] || 0;
      const bVal = b[sortBy] || 0;
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });

    return funds;
  }, [searchQuery, selectedCategory, sortBy, sortOrder]);

  const toggleBookmark = async (fund: FundWithMetrics) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to bookmark funds.",
        variant: "destructive"
      });
      return;
    }

    const isBookmarked = bookmarkedFunds.has(fund.schemeCode);
    
    if (isBookmarked) {
      const { error } = await supabase
        .from('user_bookmarks')
        .delete()
        .eq('user_id', user.id)
        .eq('fund_scheme_code', fund.schemeCode.toString());

      if (!error) {
        setBookmarkedFunds(prev => {
          const next = new Set(prev);
          next.delete(fund.schemeCode);
          return next;
        });
        toast({ title: "Bookmark Removed" });
      }
    } else {
      const { error } = await supabase
        .from('user_bookmarks')
        .insert({
          user_id: user.id,
          fund_scheme_code: fund.schemeCode.toString(),
          fund_name: fund.schemeName
        });

      if (!error) {
        setBookmarkedFunds(prev => new Set([...prev, fund.schemeCode]));
        toast({ title: "Fund Bookmarked" });
      }
    }
  };

  const toggleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'Large Cap': return 'bg-primary/10 text-primary';
      case 'Mid Cap': return 'bg-info-cyan/10 text-info-cyan';
      case 'Small Cap': return 'bg-warning-amber/10 text-warning-amber';
      case 'Flexi Cap': return 'bg-secondary/10 text-secondary';
      case 'Multi Cap': return 'bg-primary/10 text-primary';
      case 'Focused': return 'bg-info-cyan/10 text-info-cyan';
      case 'Sectoral/Thematic': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 bg-gradient-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Mutual Fund <span className="gradient-text">Screener</span>
            </h1>
            <p className="text-muted-foreground">
              Browse and filter equity mutual funds. Compare returns, check SEBI compliance, 
              and bookmark your favorites.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-border sticky top-16 bg-background/95 backdrop-blur-sm z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by fund name or AMC..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className="whitespace-nowrap"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fund List */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredFunds.length} funds
            </p>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => toggleSort('return1Y')}
                className={cn(sortBy === 'return1Y' && 'text-primary')}
              >
                1Y Return <ArrowUpDown className="w-3 h-3 ml-1" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => toggleSort('return3Y')}
                className={cn(sortBy === 'return3Y' && 'text-primary')}
              >
                3Y Return <ArrowUpDown className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>

          {/* Fund Cards */}
          <div className="grid gap-4">
            {filteredFunds.map((fund, index) => (
              <div 
                key={fund.schemeCode}
                className="fund-card animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Fund Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 mb-2">
                      <h3 className="font-semibold text-lg truncate">{fund.schemeName}</h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={cn("category-pill", getCategoryColor(fund.category))}>
                        {fund.category}
                      </span>
                      <span className="text-sm text-muted-foreground">{fund.fundHouse}</span>
                      {fund.isDirect && (
                        <span className="sebi-badge">
                          <Shield className="w-3 h-3" />
                          Direct Plan
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Returns */}
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground mb-1">1Y Return</div>
                      <div className={cn(
                        "font-semibold flex items-center justify-center gap-1",
                        (fund.return1Y || 0) >= 0 ? "text-secondary" : "text-destructive"
                      )}>
                        {(fund.return1Y || 0) >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {fund.return1Y?.toFixed(1)}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground mb-1">3Y Return</div>
                      <div className={cn(
                        "font-semibold",
                        (fund.return3Y || 0) >= 0 ? "text-secondary" : "text-destructive"
                      )}>
                        {fund.return3Y?.toFixed(1)}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground mb-1">5Y Return</div>
                      <div className={cn(
                        "font-semibold",
                        (fund.return5Y || 0) >= 0 ? "text-secondary" : "text-destructive"
                      )}>
                        {fund.return5Y?.toFixed(1)}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground mb-1">NAV</div>
                      <div className="font-semibold rupee">₹{fund.currentNAV?.toFixed(2)}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleBookmark(fund)}
                    >
                      {bookmarkedFunds.has(fund.schemeCode) ? (
                        <BookmarkCheck className="w-5 h-5 text-primary" />
                      ) : (
                        <Bookmark className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredFunds.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No funds found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
