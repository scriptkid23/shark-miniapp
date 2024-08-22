import { useEffect, useState } from 'react';
import RewardItem from './RewardItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import axiosInstance from '@/axiosConfig';
type Props = {};

const FAKE_REWARDS = [
  {
    iconId: 1,
    name: 'Ton Fish',
    point: 1234,
    description: 'Claim your reward',
  },
  {
    iconId: 2,
    name: 'Premium Status',
    point: 1234,
    description: 'Claim your reward',
  },
  {
    iconId: 2,
    name: 'Premium Status',
    point: 1234,
    description: 'Claim your reward',
  },
];

const RewardContainer = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axiosInstance.get('/user/get-list-claim');
      if (data?.data?.claimed && data?.data?.claimed.length > 0) {
        setItems(data.data.claimed);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div className="relative m-auto mt-6">
      <h3 className="text-lg font-semibold mb-2">Your reward</h3>
      <div>
        {items.map((item, index) => (
          <RewardItem key={index} {...item.mission} />
        ))}
      </div>
    </div>
  );
};

export default RewardContainer;
