
import { Banknote, Wallet, BadgePercent } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { AccountCard } from '@/components/dashboard/AccountCard';
import { BalanceChart } from '@/components/charts/BalanceChart';
import { HeroMetrics } from '@/components/dashboard/HeroMetrics';
import { PerformanceOverview } from '@/components/dashboard/PerformanceOverview';
import { useExchangeRate } from '@/hooks/useExchangeRate';
import { useState, useEffect } from 'react';
import { DailyTransaction } from '@/types/transactions';

const STORAGE_KEY = 'daily-transactions';

const Dashboard = () => {
  const { data: exchangeRateData, isLoading } = useExchangeRate();
  const [transactions, setTransactions] = useState<DailyTransaction[]>([]);
  
  // Load transactions from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTransactions(parsed);
      } catch (error) {
        console.error('Error loading transactions:', error);
      }
    }
  }, []);

  // Calculate metrics
  const totalProfit = transactions.reduce((sum, tx) => sum + tx.profit, 0);
  const totalVolumeProcessed = transactions.reduce((sum, tx) => sum + tx.amountProcessed, 0);
  
  // Total balances
  const usdBalance = 891200;
  const nairaBalance = usdBalance * (exchangeRateData?.rate || 1280.50);
  
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your financial performance and key metrics.</p>
      </div>
      
      {/* Hero Metrics Section */}
      <HeroMetrics 
        netProfit={totalProfit}
        totalVolume={totalVolumeProcessed}
        totalBalance={usdBalance}
        exchangeRate={exchangeRateData?.rate || 1280.50}
        exchangeRateChange={exchangeRateData?.change24h || 0}
      />
      
      {/* Performance Overview */}
      <PerformanceOverview transactions={transactions} />
      
      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard 
          title="USDT Rate" 
          value={`₦${isLoading ? "Loading..." : exchangeRateData?.rate?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
          trend={exchangeRateData?.change24h >= 0 ? "up" : "down"}
          trendValue={`${exchangeRateData?.change24h >= 0 ? '+' : ''}${exchangeRateData?.change24h?.toFixed(1)}% from yesterday`}
          icon={<BadgePercent className="h-5 w-5 text-primary" />}
        />
        
        <StatCard 
          title="Naira Equivalent" 
          value={`₦${nairaBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          description="Based on current USDT rate"
          icon={<Banknote className="h-5 w-5 text-primary" />}
        />
      </div>
      
      {/* Charts & Analytics */}
      <div className="grid grid-cols-1 gap-6">
        <BalanceChart />
      </div>
      
      {/* Bank Account Summary */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Bank Accounts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AccountCard 
            name="Main USD Account" 
            balance={720000} 
            currency="USD"
            limit={1000000}
          />
          
          <AccountCard 
            name="NGN Settlement Account" 
            balance={82500000} 
            currency="NGN"
            limit={100000000}
          />
          
          <AccountCard 
            name="EUR Account" 
            balance={78500} 
            currency="EUR"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
