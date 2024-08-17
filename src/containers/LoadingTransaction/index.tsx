import { useEffect, useState } from 'react';
import GaugeComponent from 'react-gauge-component';
import { SubArc } from 'react-gauge-component/dist/lib/GaugeComponent/types/Arc';

type Props = {};

const LoadingTransaction = (props: Props) => {
  const [value, setValue] = useState(0);
  const generateSubArcs = (percentage: number): SubArc[] => {
    const totalArcs = 40;
    const filledArcs = Math.floor((percentage * totalArcs) / 100);
    const startColor = [9, 22, 51]; // #091633
    const endColor = [43, 109, 253]; // #2B6DFD
    const emptyColor = '#111111';

    const result = Array(totalArcs)
      .fill(null)
      .map((_, index) => {
        if (index < filledArcs) {
          const gradientPosition = index / (filledArcs - 1);
          const color = startColor.map((channel, i) =>
            Math.round(channel + (endColor[i] - channel) * gradientPosition)
          );
          return {
            color: 'blue',
          };
        } else {
          return {
            color: emptyColor,
          };
        }
      });
    console.log(result);
    return result;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue((prevValue) => {
        const newValue = prevValue + 1;
        return newValue > 100 ? 100 : newValue;
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="relative flex items-center justify-center h-screen flex-col">
      <div className="relative w-[230px] h-[118px] flex items-center justify-center">
        <div className="absolute w-[63%] h-[60%] bottom-0 left-1/2 transform -translate-x-1/2 rounded-t-[170px] border-[2px] border-[#0E2454] border-b-0"></div>
        <div className="absolute text-white text-[12px] bottom-0 w-[50%] text-center text-sm font-medium">
          OG Status confirm 
        </div>
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
    </div>
  );
};

export default LoadingTransaction;
