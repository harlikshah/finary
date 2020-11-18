import React from 'react';
import { AreaClosed, LinePath } from '@vx/shape';
import { appleStock } from '@vx/mock-data';
import { curveMonotoneX } from '@vx/curve';
import { scaleTime, scaleLinear } from '@vx/scale';
import { withTooltip } from '@vx/tooltip';
import { withParentSize } from '@vx/responsive';




// placeholder stock
const stock = appleStock.slice(800);


// util
const min = (arr, fn) => Math.min(...arr.map(fn));
const max = (arr, fn) => Math.max(...arr.map(fn));
const extent = (arr, fn) => [min(arr, fn), max(arr, fn)];

// accessors
const xStock = d => new Date(d.date);
const yStock = d => d.close;

class StockGraph extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {


    const {
      height,
      margin,
      parentWidth,
    } = this.props;

    // set proper height and width
    const width = parentWidth > this.props.width ? this.props.width : parentWidth;

    if (width < 10) return null;
    

    // bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    // scales
    const xScale = scaleTime({
      range: [0, xMax],
      domain: extent(stock, xStock)
    });
    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [ min(stock, yStock) - yMax / 10, max(stock, yStock) + yMax / 10],
      nice: true
    });


    return (
      <div>
        <svg ref={s => (this.svg = s)} width={width} height={height}>
          <rect x={0} y={0} width={width} height={height} fill="#ffffff" rx={14} />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1CCE98" stopOpacity={0.4} />
              <stop offset="80%" stopColor="#1CCE98" stopOpacity={0} />
            </linearGradient>
          </defs>
          <AreaClosed
            data={stock}
            x={d => xScale(xStock(d))}
            y={d => yScale(yStock(d))}
            yScale={yScale}
            strokeWidth={2}
            stroke=""
            fill={'url(#gradient)'}
            curve={curveMonotoneX}
          />


          <LinePath
                data={stock}
                x={d => xScale(xStock(d))}
                y={d => yScale(yStock(d))}
                stroke={'#1CCE98'}
                strokeWidth={2}
                curve= {curveMonotoneX}
              />

        </svg>
      </div>
    );
  }
}

export default withParentSize(withTooltip(StockGraph));