import { useState } from 'react';
import RewardItem from './RewardItem';
import InfiniteScroll from 'react-infinite-scroll-component';
type Props = {};

const FAKE_REWARDS = [
  {
    icon_id: 1,
    title: 'Ton Fish',
    value: '1234',
  },
  {
    icon_id: 2,
    title: 'Premium Status',
    value: '1234',
  },
  {
    icon_id: 3,
    title: 'Premium Status',
    value: '1234',
  },
];
const style = {
  height: 30,
  border: '1px solid green',
  margin: 6,
  padding: 8,
};

const RewardContainer = (props: Props) => {
  const [items, setItems] = useState(FAKE_REWARDS);

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      console.log('fetching more data');
      setItems(items.concat(FAKE_REWARDS));
    }, 1500);
  };
  return (
    <div className="relative m-auto mt-6">
      <h3 className="text-lg font-semibold">Your reward</h3>
        <div>
          {FAKE_REWARDS.map((item, index) => (
            <RewardItem key={index} {...item} />
          ))}
        </div>
    </div>
  );
};

export default RewardContainer;
