import FishIcon from '@/assets/icons/fish.png';
import ConfettiIcon from '@/assets/icons/confetti_ball.png';
import Fish from '@/assets/images/underwarter/fish.png';
import Whale from '@/assets/images/underwarter/whale.png';
import Shark from '@/assets/images/underwarter/shark.png';
import Squid from '@/assets/images/underwarter/squid.png';
export type RewardItemProps = {
  iconId: number;
  name: string;
  point: number;
  description?: string;

  currency?: string;
  isPositive?: boolean;
};

const mappingIconId: Record<number, string> = {
  1: Fish,
  2: Squid,
  3: Shark,
  4: Whale,
  6: ConfettiIcon,
};

const RewardItem = (props: RewardItemProps) => {
  const { iconId, name, description, point, currency = 'BAITS', isPositive = true } = props;
  return (
    <div className="flex items-center justify-between mb-2 last:mb-0">
      <div className="flex items-center">
        <img width={34} height={34} src={mappingIconId[iconId] || FishIcon} alt="icon" />
        <p className="ml-3 text-xs font-medium">{name}</p>
      </div>
      <div>
        <p className="text-sm font-semibold">
          {isPositive ? '+' : '-'}
          {point} {currency}
        </p>
      </div>
    </div>
  );
};

export default RewardItem;
