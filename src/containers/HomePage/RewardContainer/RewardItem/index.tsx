import FishIcon from '@/assets/icons/fish.png';
import ConfettiIcon from '@/assets/icons/confetti_ball.png';


type Props = {
  iconId: number;
  name: string;
  description: string;
  point: number;
  currency?: string;
  isPositive?: boolean;
};

const mappingIconId: Record<number, string> = {
  1: FishIcon,
  2: ConfettiIcon,
};

const RewardItem = (props: Props) => {
  const { iconId, name, description, point, currency = 'BAITS', isPositive = true } = props;
  return (
    <div className="flex items-center justify-between mb-2 last:mb-0">
      <div className="flex items-center">
        <img src={mappingIconId[iconId] || ''} alt="icon" />
        <p className='ml-3 text-xs font-medium'>{name}</p>
      </div>
      <div>
        <p className='text-sm font-semibold'>
          {isPositive ? '+' : '-'}{point} {currency}
        </p>
      </div>
    </div>
  );
};

export default RewardItem;
