
import React from 'react';
import MetricCard from '@/components/Dashboard/MetricCard';

interface OrdersSummaryProps {
  threshold: number;
}

const OrdersSummary: React.FC<OrdersSummaryProps> = ({ threshold }) => {
  // Calculate metrics based on threshold
  const rtoReduction = Math.round(threshold / 10);
  const inventoryReduction = Math.round(threshold / 3);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
      <MetricCard
        title="Quality Threshold"
        value={threshold}
        suffix="%"
        variant="highlight"
        showInfoButton={true}
        infoText="Orders with quality below this threshold will not be shipped"
      />
      <MetricCard
        title="Inventory Reduction"
        value={inventoryReduction}
        suffix="%"
        variant="success"
        showInfoButton={true}
        infoText="Percentage reduction in inventory needed due to selective shipping"
      />
      <MetricCard
        title="Expected RTO Decrease"
        value={rtoReduction}
        suffix="%"
        variant="success"
        showInfoButton={true}
        infoText="Expected decrease in Return to Origin (RTO) rate with current threshold"
      />
    </div>
  );
};

export default OrdersSummary;
