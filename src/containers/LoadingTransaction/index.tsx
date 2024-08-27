import { checkingTotalTransaction } from '@/apis';
import { useSharkStore } from '@/stores/shark_store';
import { sleep } from '@/utils';
import { useTonWallet } from '@tonconnect/ui-react';
import { useEffect, useState } from 'react';
import GaugeComponent from 'react-gauge-component';
import { SubArc } from 'react-gauge-component/dist/lib/GaugeComponent/types/Arc';
import { useNavigate } from 'react-router-dom';

type Props = {
  title?: string | React.ReactNode;
  speed?: number;
};

const GaugeCustom = (props: Props) => {
  const { title, speed } = props;
  const [value, setValue] = useState(0);
  const generateSubArcs = (percentage: number): SubArc[] => {
    const totalArcs = 40;
    const filledArcs = Math.floor((percentage * totalArcs) / 100);
    const startColor = [9, 22, 51]; // #091633
    const endColor = [36, 91, 211]; // #2B6DFD
    const emptyColor = '#111111';

    const result = Array(totalArcs)
      .fill(null)
      .map((_, index) => {
        if (index < filledArcs) {
          const gradientPosition = index / (totalArcs - 1);
          const adjustedPosition = Math.pow(gradientPosition, 0.5);
          const color = startColor.map((channel, i) => {
            const interpolated = channel + (endColor[i] - channel) * adjustedPosition;
            const extraBrightness = Math.min(255, interpolated + 55 * gradientPosition);
            return Math.round(extraBrightness);
          });
          return {
            color: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
          };
        } else {
          return {
            color: emptyColor,
          };
        }
      });
    return result;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue((prevValue) => {
        const newValue = prevValue + 1;

        return newValue > 100 ? 100 : newValue;
      });
    }, speed || 100);

    return () => clearTimeout(timer);
  }, [value]);
  return (
    <div className="relative w-[230px] h-[118px] flex items-center justify-center">
      <div className="absolute w-[63%] h-[60%] bottom-0 left-1/2 transform -translate-x-1/2 rounded-t-[170px] border-[2px] border-[#0E2454] border-b-0"></div>
      <div className="absolute text-white text-[12px] bottom-0 w-[100%] text-center text-sm font-medium">{title}</div>
      <GaugeComponent
        type="semicircle"
        value={value}
        marginInPercent={0.026}
        style={{
          width: '100%',
          height: '100%',
        }}
        arc={{
          width: 0.3,
          padding: 0.03,
          subArcs: generateSubArcs(value),
        }}
        labels={{
          valueLabel: {
            hide: true,
          },
          tickLabels: {
            hideMinMax: true,
          },
        }}
        pointer={{
          width: 0,
        }}
      />
    </div>
  );
};
const data = {
  user: {
    id: '1049059523',
    userName: 'victorpham1',
    wallet: '{"0QAsU-KyL6g-vNgParIFfo2UffYEzAbLBNg-nnHM177AzzMf":32}',
    codeInvite: '08e9cf8d50f2826291e6035c1f4874d16749290062abcebc9c7267c65cfb4a8d',
    point: 164800,
    isPremium: false,
    invitedById: null,
    createdAt: '2024-08-21T14:42:47.191Z',
  },
  point_tx: 3200,
  totalTransaction: 32,
};

const LoadingTransaction = (props: Props) => {
  const navigate = useNavigate();
  const { setTransaction, setPoint, setWallet } = useSharkStore();
  const wallet = useTonWallet();

  useEffect(() => {
    const abortController = new AbortController();
    const { promise, cancel } = sleep(5000);
    const checkTransactionAndNavigate = async () => {
      try {
        await promise;

        const { data } = await checkingTotalTransaction(wallet?.account?.address || '', abortController);
        if (abortController.signal.aborted) return;
        setTransaction(data?.data?.totalTransaction, data?.data?.point_tx);
        if (abortController.signal.aborted) return;
        if (data?.data?.user?.point) {
          setPoint(data?.data?.user?.point);
        }
        if (data?.data?.user?.wallet) {
          setWallet(data?.data?.user?.wallet);
        }
        navigate('stories');
      } catch (error: any) {
        if (error?.name === 'AbortError') return;
        console.error('Error checking transaction:', error);
        navigate('/');
      }
    };

    checkTransactionAndNavigate();

    return () => {
      abortController.abort();
      cancel();
    };
  }, []);

  return (
  <div className="relative flex items-center justify-center h-screen flex-col gap-12">
    <GaugeCustom
        title={
          <span className="absolute bottom-[-20px] left-0 right-0">
            Tracking total <br /> on-chain transaction <br /> on Ton network
          </span>
        }
        speed={40}
      />
      <GaugeCustom
        speed={25}
        title={
          <>
            OG Status
            <br />
            confirm
          </>
        }
      />
      <GaugeCustom
        speed={10}
        title={
          <>
            Telegram
            <br />
            Premium check
          </>
        }
      />
    </div>
  );
};

export default LoadingTransaction;
