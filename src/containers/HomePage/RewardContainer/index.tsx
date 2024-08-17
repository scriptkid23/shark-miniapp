import RewardItem from './RewardItem';

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
    icon_id: 1,
    title: 'Premium Status',
    value: '12345',
  },
];

const RewardContainer = (props: Props) => {
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
