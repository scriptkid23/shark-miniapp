import { useSharkStore } from '@/stores/shark_store';
import { getLevel, stripVal } from '@/utils';
import { address } from '@ton/core';
import RewardItem, { RewardItemProps } from './RewardItem';
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
  const { user } = useSharkStore();
  const { wallet, isPremium } = user || {};

  const walletParsed = !!wallet && JSON.parse(wallet);

  const listReward = () => {
    const list: RewardItemProps[] = [];
    if (!walletParsed) return list;
    Object.keys(walletParsed).forEach((key) => {
      list.push({
        iconId: getLevel(walletParsed[key].totalTransaction || 0),
        name: stripVal(address(key).toString()),
        point: walletParsed[key]?.point || 0,
        description: 'Claim your reward',
      });
    });
    if (isPremium) {
      list.push({
        iconId: 6,
        name: 'Premium Status',
        point: 3000,
      });
    }
    return list;
  };
  listReward();

  return (
    <div className="relative m-auto mt-6">
      <h3 className="text-lg font-semibold mb-2">Your reward</h3>
      <div>
        {listReward().map((item, index) => (
          <RewardItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default RewardContainer;
