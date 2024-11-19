import { PaymentHistory } from "../type";
import { TooltipItem } from 'chart.js';


export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            family: 'Arial',
          },
          color: '#333',
        },
      },
      title: {
        display: true,
        text: 'Historique des paiements',
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'line'>) {
            return `Montant: ${context.raw} €`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Montant (€)',
        },
        ticks: {
          callback: function (value: string | number) {  // Accepter à la fois string et number
            return `${value} €`; // Ajoute € à chaque valeur sur l'axe Y
          },
        },
      },
    },
  };
  
  
  
export function dataChart(paymentHistory: PaymentHistory[]) {
  return {
    labels: paymentHistory.map(item => item.date),
    datasets: [
      {
        label: 'Montant des paiements (€)',
        data: paymentHistory.map(item => item.amount),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };
}
