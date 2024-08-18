import FishIcon from '@/assets/icons/fish.png';
import ConfettiIcon from '@/assets/icons/confetti_ball.png';

type Props = {
  icon_id: number;
  title: string;
  value: string;
  currency?: string;
  isPositive?: boolean;
};

const mappingIconId: Record<number, string> = {
  1: FishIcon,
  2: ConfettiIcon,
};

const RewardItem = (props: Props) => {
  const { icon_id, title, value, currency = 'BAITS', isPositive = true } = props;
  return (
    <div className="flex items-center justify-between mb-2 last:mb-0">
      <div className="flex items-center">
        <img src={mappingIconId[icon_id] || ''} alt="icon" />
        <p className='ml-3 text-xs font-medium'>{title}</p>
      </div>
      <div>
        <p className='text-sm font-semibold'>
          {isPositive ? '+' : '-'}{value} {currency}
        </p>
      </div>
    </div>
  );
};

export default RewardItem;
