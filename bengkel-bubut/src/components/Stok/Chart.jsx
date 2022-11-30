
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {faker} from '@faker-js/faker';
import { MdNoEncryption } from 'react-icons/md';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Overview Stok Barang',
    },
  },
};

const labels = ['Produk A', 'Produk B', 'Produk C', 'Produk D'];
const backgroundColor = ['#F58A6D', '#F9BD6C','#6F6AF8','#23B064']
export const data = {
  labels,
  datasets: [
    {
      label: 'Quantity',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: '#F58A6D',
    },
 
  ],
};
export const Chart = () => {
    return <Bar options={options} data={data} />;

}

