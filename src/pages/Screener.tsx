import { useState, useMemo, useEffect } from 'react';
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
  Shield,
  Loader2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { 
  getAllMutualFunds, 
  filterEquityFunds, 
  getFundCategory, 
  isPlanType, 
  getFundHouse,
  MutualFundBasic,
  FundWithMetrics 
} from '@/lib/mfapi';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const categories = ['All', 'Large Cap', 'Mid Cap', 'Small Cap', 'Flexi Cap', 'Multi Cap', 'Focused', 'Sectoral/Thematic', 'ELSS', 'Value/Contra', 'Equity'];
const ITEMS_PER_PAGE = 50;

export default function Screener() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'name' | 'fundHouse'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [bookmarkedFunds, setBookmarkedFunds] = useState<Set<number>>(new Set());
  const [allFunds, setAllFunds] = useState<FundWithMetrics[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDirectOnly, setShowDirectOnly] = useState(false);

  // Fetch all equity funds on mount
  useEffect(() => {
    const fetchFunds = async () => {
      setIsLoading(true);
      try {
        const funds = await getAllMutualFunds();
        const equityFunds = filterEquityFunds(funds);
        
        // Transform to FundWithMetrics
        const fundsWithMetrics: FundWithMetrics[] = equityFunds.map(fund => {
          const planType = isPlanType(fund.schemeName);
          return {
            schemeCode: fund.schemeCode,
            schemeName: fund.schemeName,
            fundHouse: getFundHouse(fund.schemeName),
            category: getFundCategory(fund.schemeName),
            isDirect: planType.isDirect,
            isRegular: planType.isRegular
          };
        });
        
        setAllFunds(fundsWithMetrics);
      } catch (error) {
        console.error('Failed to fetch funds:', error);
        toast({
          title: "Failed to load funds",
          description: "Please try refreshing the page.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFunds();
  }, []);

  // Load user bookmarks
  useEffect(() => {
    const loadBookmarks = async () => {
      if (!user) return;
      
      const { data } = await supabase
        .from('user_bookmarks')
        .select('fund_scheme_code')
        .eq('user_id', user.id);
      
      if (data) {
        setBookmarkedFunds(new Set(data.map(b => parseInt(b.fund_scheme_code))));
      }
    };

    loadBookmarks();
  }, [user]);

  const filteredFunds = useMemo(() => {
    let funds = [...allFunds];

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      funds = funds.filter(fund => 
        fund.schemeName.toLowerCase().includes(query) ||
        fund.fundHouse?.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      funds = funds.filter(fund => fund.category === selectedCategory);
    }

    // Filter Direct plans only
    if (showDirectOnly) {
      funds = funds.filter(fund => fund.isDirect);
    }

    // Sort
    funds.sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.schemeName.localeCompare(b.schemeName)
          : b.schemeName.localeCompare(a.schemeName);
      }
      if (sortBy === 'fundHouse') {
        return sortOrder === 'asc' 
          ? (a.fundHouse || '').localeCompare(b.fundHouse || '')
          : (b.fundHouse || '').localeCompare(a.fundHouse || '');
      }
      return 0;
    });

    return funds;
  }, [allFunds, searchQuery, selectedCategory, sortBy, sortOrder, showDirectOnly]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, showDirectOnly]);

  // Pagination
  const totalPages = Math.ceil(filteredFunds.length / ITEMS_PER_PAGE);
  const paginatedFunds = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredFunds.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredFunds, currentPage]);

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
      setSortOrder('asc');
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
      case 'ELSS': return 'bg-secondary/10 text-secondary';
      case 'Value/Contra': return 'bg-warning-amber/10 text-warning-amber';
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
              Browse all {allFunds.length.toLocaleString()} equity-oriented mutual funds available in India. 
              Filter by category, search by name, and bookmark your favorites.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-border sticky top-16 bg-background/95 backdrop-blur-sm z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4">
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

              {/* Direct Plan Toggle */}
              <Button
                variant={showDirectOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowDirectOnly(!showDirectOnly)}
                className="gap-2"
              >
                <Shield className="w-4 h-4" />
                Direct Plans Only
              </Button>
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
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Loading mutual funds...</p>
            </div>
          ) : (
            <>
              {/* Results count and sort */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <p className="text-sm text-muted-foreground">
                  Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredFunds.length)} of {filteredFunds.length.toLocaleString()} funds
                </p>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => toggleSort('name')}
                    className={cn(sortBy === 'name' && 'text-primary')}
                  >
                    Name <ArrowUpDown className="w-3 h-3 ml-1" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => toggleSort('fundHouse')}
                    className={cn(sortBy === 'fundHouse' && 'text-primary')}
                  >
                    Fund House <ArrowUpDown className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>

              {/* Fund Cards */}
              <div className="grid gap-4">
                {paginatedFunds.map((fund, index) => (
                  <div 
                    key={fund.schemeCode}
                    className="fund-card animate-slide-up"
                    style={{ animationDelay: `${index * 0.02}s` }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Fund Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-3 mb-2">
                          <h3 className="font-semibold text-base md:text-lg leading-tight">{fund.schemeName}</h3>
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
                          {fund.isRegular && (
                            <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                              Regular Plan
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Scheme Code */}
                      <div className="text-center hidden md:block">
                        <div className="text-xs text-muted-foreground mb-1">Scheme Code</div>
                        <div className="font-mono text-sm">{fund.schemeCode}</div>
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {/* First page */}
                    {currentPage > 3 && (
                      <>
                        <Button
                          variant={currentPage === 1 ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(1)}
                          className="w-10"
                        >
                          1
                        </Button>
                        {currentPage > 4 && <span className="px-2 text-muted-foreground">...</span>}
                      </>
                    )}
                    
                    {/* Pages around current */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      if (pageNum < 1 || pageNum > totalPages) return null;
                      if ((currentPage > 3 && pageNum === 1) || (currentPage < totalPages - 2 && pageNum === totalPages)) return null;
                      
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className="w-10"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                    
                    {/* Last page */}
                    {currentPage < totalPages - 2 && (
                      <>
                        {currentPage < totalPages - 3 && <span className="px-2 text-muted-foreground">...</span>}
                        <Button
                          variant={currentPage === totalPages ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(totalPages)}
                          className="w-10"
                        >
                          {totalPages}
                        </Button>
                      </>
                    )}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              )}

              {filteredFunds.length === 0 && (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No funds found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
